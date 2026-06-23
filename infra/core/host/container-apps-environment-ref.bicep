// ============================================================================
// Referencia a Container Apps Environment existente
// ----------------------------------------------------------------------------
// Módulo auxiliar para obtener propiedades de un CAE existente (defaultDomain).
// ============================================================================

param name string

resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2023-05-01' existing = {
  name: name
}

output name string = containerAppsEnvironment.name
output id string = containerAppsEnvironment.id
output defaultDomain string = containerAppsEnvironment.properties.defaultDomain
