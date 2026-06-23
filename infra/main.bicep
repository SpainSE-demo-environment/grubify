targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Name of the resource group')
param resourceGroupName string = ''

@description('API container image')
param apiImage string = ''

@description('Frontend container image')
param frontendImage string = ''

// ============================================================================
// Parámetros para usar infraestructura existente (Spoke ACA de azure-demo-environment)
// Si se proporcionan, se reutiliza la infraestructura del Hub & Spoke.
// Si están vacíos, se crea infraestructura nueva (comportamiento original).
// ============================================================================

@description('Resource Group existente donde desplegar. Si está vacío, se crea uno nuevo.')
param existingResourceGroupName string = ''

@description('Nombre del Container Apps Environment existente. Si está vacío, se crea uno nuevo.')
param existingContainerAppsEnvironmentName string = ''

@description('Nombre del Container Registry existente. Si está vacío, se crea uno nuevo.')
param existingContainerRegistryName string = ''

var abbrs = loadJsonContent('abbreviations.json')
var resourceToken = 'grubify'  // Fixed naming instead of random string
var tags = { 'azd-env-name': environmentName }

// Determinar si usar infraestructura existente
var useExistingRg = !empty(existingResourceGroupName)
var useExistingCae = !empty(existingContainerAppsEnvironmentName)
var useExistingAcr = !empty(existingContainerRegistryName)

// ============================================================================
// Resource Group
// ============================================================================

// Crear nuevo RG si no se proporciona uno existente
resource newRg 'Microsoft.Resources/resourceGroups@2021-04-01' = if (!useExistingRg) {
  name: !empty(resourceGroupName) ? resourceGroupName : 'rg-grubify-app'
  location: location
  tags: tags
}

// Referencia a RG existente
resource existingRg 'Microsoft.Resources/resourceGroups@2021-04-01' existing = if (useExistingRg) {
  name: existingResourceGroupName
}

// Scope para los módulos
var targetRgName = useExistingRg ? existingResourceGroupName : (!empty(resourceGroupName) ? resourceGroupName : 'rg-grubify-app')

// ============================================================================
// Container Registry (nuevo o existente)
// ============================================================================

module containerRegistry 'core/host/container-registry.bicep' = if (!useExistingAcr) {
  name: 'container-registry'
  scope: resourceGroup(targetRgName)
  params: {
    name: '${abbrs.containerRegistryRegistries}${resourceToken}'
    location: location
    tags: tags
  }
  dependsOn: useExistingRg ? [] : [newRg]
}

// ============================================================================
// Container Apps Environment (nuevo o existente)
// ============================================================================

module containerAppsEnvironment 'core/host/container-apps-environment.bicep' = if (!useExistingCae) {
  name: 'container-apps-environment'
  scope: resourceGroup(targetRgName)
  params: {
    name: '${abbrs.appManagedEnvironments}${resourceToken}'
    location: location
    tags: tags
  }
  dependsOn: useExistingRg ? [] : [newRg]
}

// Referencia al CAE existente para obtener defaultDomain
module existingCaeRef 'core/host/container-apps-environment-ref.bicep' = if (useExistingCae) {
  name: 'cae-reference'
  scope: resourceGroup(targetRgName)
  params: {
    name: existingContainerAppsEnvironmentName
  }
  dependsOn: useExistingRg ? [] : [newRg]
}

// Variables derivadas
var caeName = useExistingCae ? existingContainerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
var acrName = useExistingAcr ? existingContainerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
var caeDefaultDomain = useExistingCae ? existingCaeRef.outputs.defaultDomain : containerAppsEnvironment.outputs.defaultDomain

// ============================================================================
// Container Apps (siempre se crean, pero usan infra existente si se proporciona)
// ============================================================================

module api 'core/host/container-app.bicep' = {
  name: 'api'
  scope: resourceGroup(targetRgName)
  params: {
    name: 'ca-grubify-api'
    location: location
    tags: union(tags, { 'azd-service-name': 'api' })
    containerAppsEnvironmentName: caeName
    containerRegistryName: acrName
    containerName: 'grubify-api'
    containerImage: !empty(apiImage) ? apiImage : 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
    targetPort: 8080
    external: true
    minReplicas: 1
    maxReplicas: 1
    env: [
      {
        name: 'ASPNETCORE_ENVIRONMENT'
        value: 'Production'
      }
      {
        name: 'AllowedOrigins__0'
        value: 'https://ca-grubify-frontend.${caeDefaultDomain}'
      }
    ]
  }
  dependsOn: useExistingCae ? [existingCaeRef] : [containerAppsEnvironment, containerRegistry]
}

module frontend 'core/host/container-app.bicep' = {
  name: 'frontend'
  scope: resourceGroup(targetRgName)
  params: {
    name: 'ca-grubify-frontend'
    location: location
    tags: union(tags, { 'azd-service-name': 'frontend' })
    containerAppsEnvironmentName: caeName
    containerRegistryName: acrName
    containerName: 'grubify-frontend'
    containerImage: !empty(frontendImage) ? frontendImage : 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
    targetPort: 80
    external: true
    minReplicas: 1
    maxReplicas: 1
    env: [
      {
        name: 'REACT_APP_API_BASE_URL'
        value: 'https://${api.outputs.fqdn}/api'
      }
    ]
  }
  dependsOn: [api]
}

// ============================================================================
// Outputs
// ============================================================================

output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output AZURE_RESOURCE_GROUP string = targetRgName
output RESOURCE_GROUP_ID string = useExistingRg ? existingRg.id : newRg.id

output AZURE_CONTAINER_REGISTRY_ENDPOINT string = useExistingAcr ? '${acrName}.azurecr.io' : containerRegistry.outputs.loginServer
output AZURE_CONTAINER_REGISTRY_NAME string = acrName

output API_BASE_URL string = 'https://${api.outputs.fqdn}'
output FRONTEND_URL string = 'https://${frontend.outputs.fqdn}'

// Outputs adicionales para integración con azure-demo-environment
output CONTAINER_APPS_ENVIRONMENT_NAME string = caeName
output CONTAINER_APPS_DEFAULT_DOMAIN string = caeDefaultDomain
