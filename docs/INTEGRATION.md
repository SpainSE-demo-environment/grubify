# Mobify (fork de Grubify) — Integración con el Spoke ACA de azure-demo-environment

Este fork de [dm-chelupati/grubify](https://github.com/dm-chelupati/grubify) —rebrandeado a **Mobify**, una operadora de telecomunicaciones para demos del **Azure SRE Agent**— se despliega sobre la infraestructura **existente** del Spoke ACA creado por [azure-demo-environment](https://github.com/SpainSE-demo-environment/azure-demo-environment) (topología Hub & Spoke).

> Los nombres internos de clases C#, propiedades de modelo y rutas de API (`/api/restaurants`, `/api/fooditems`, `/api/cart`, `/api/orders`) se mantienen: solo cambian marca, textos y catálogo mostrados.

## Recursos reales del Spoke ACA (entorno `dev`)

Estos son los recursos existentes sobre los que se despliega la app (RG `rg-lab-spoke-aca-dev`, región **uksouth**):

| Recurso | Nombre real | Tipo |
|---------|-------------|------|
| Resource Group | `rg-lab-spoke-aca-dev` | `Microsoft.Resources/resourceGroups` |
| Container Apps Environment | `cae-spoke-aca-dev` | `Microsoft.App/managedEnvironments` |
| Container Registry | `acrgrubifyznl7cs3npn27k` | `Microsoft.ContainerRegistry/registries` |
| Application Insights | `appi-spoke-aca-dev` | `Microsoft.Insights/components` |
| VNet | `vnet-spoke-aca-dev` (`10.10.0.0/16`) | `Microsoft.Network/virtualNetworks` |
| Container App — API | `ca-app-api-dev` | `Microsoft.App/containerApps` |
| Container App — Frontend | `ca-app-frontend-dev` | `Microsoft.App/containerApps` |
| Azure SRE Agent | `sre-aca-dev` | `Microsoft.App/agents` |
| Alerta HTTP 5xx (API app) | `alert-http5xx-banking-api` | `Microsoft.Insights/metricAlerts` |

> El nombre del ACR lleva sufijo aleatorio (`acrgrubify…`); confírmalo siempre con
> `az acr list -g rg-lab-spoke-aca-dev --query "[].name" -o tsv`.

Dominio por defecto del CAE: `purpleplant-c8daeac4.uksouth.azurecontainerapps.io`
(frontend accesible en `https://ca-app-frontend-dev.<defaultDomain>`).

## Parámetros de Bicep para reutilizar el Spoke

`infra/main.bicep` acepta estos parámetros; si se rellenan, reutiliza la infraestructura del Spoke en vez de crear recursos nuevos:

| Parámetro | Valor en el lab `dev` | Descripción |
|-----------|-----------------------|-------------|
| `existingResourceGroupName` | `rg-lab-spoke-aca-dev` | RG existente donde desplegar |
| `existingContainerAppsEnvironmentName` | `cae-spoke-aca-dev` | CAE existente |
| `existingContainerRegistryName` | `acrgrubifyznl7cs3npn27k` | ACR existente |

Si se dejan vacíos, el Bicep crea infraestructura nueva (modo standalone, ver README).

## Despliegue sobre el Spoke con `az acr build` (flujo del lab)

Las imágenes se construyen **en el propio ACR** del Spoke (`az acr build`, no requiere Docker local) y las Container Apps se actualizan a la nueva imagen. Repositorios de imagen en el ACR: `app-api` y `app-frontend` (existen también los legacy `grubify-api` / `grubify-frontend`).

```bash
RG=rg-lab-spoke-aca-dev
ACR=acrgrubifyznl7cs3npn27k
TAG=latest   # usa 'buggy' para la variante con el memory-leak de la demo

# 1) Construir las imágenes en el ACR desde los Dockerfiles del repo
az acr build -r $ACR -t app-api:$TAG      ./GrubifyApi
az acr build -r $ACR -t app-frontend:$TAG ./grubify-frontend

# 2) Actualizar las Container Apps a la imagen recién construida
az containerapp update -g $RG -n ca-app-api-dev \
  --image $ACR.azurecr.io/app-api:$TAG
az containerapp update -g $RG -n ca-app-frontend-dev \
  --image $ACR.azurecr.io/app-frontend:$TAG
```

> La API desplegada en el lab usa la etiqueta `app-api:buggy`, que contiene el
> memory-leak intencionado de `CartController` (buffer de 10 MB por
> `AddItemToCart` acumulado en un `static List<byte[]>`). Es el fallo central de
> la demo: dispara `OutOfMemoryException` / HTTP 5xx y activa la alerta
> `alert-http5xx-banking-api`, que a su vez notifica al SRE Agent `sre-aca-dev`.

### Alternativa: `azd up` sobre el Spoke

También puedes usar `azd` pasándole los recursos existentes:

```bash
azd env set AZURE_LOCATION uksouth
azd env set existingResourceGroupName rg-lab-spoke-aca-dev
azd env set existingContainerAppsEnvironmentName cae-spoke-aca-dev
azd env set existingContainerRegistryName acrgrubifyznl7cs3npn27k
azd up
```

## Arquitectura integrada

```
┌─────────────────────────────────────────────────────────────────┐
│ azure-demo-environment · Spoke ACA (rg-lab-spoke-aca-dev, uksouth)│
│                                                                   │
│  VNet vnet-spoke-aca-dev (10.10.0.0/16)                           │
│  ├─ Container Apps Environment  cae-spoke-aca-dev                 │
│  │   ├─ ca-app-api-dev        (Mobify API,      :8080)           │
│  │   ├─ ca-app-frontend-dev   (Mobify Frontend, :80)            │
│  │   └─ ca-supplier-api-dev   (servicio auxiliar de la demo)      │
│  ├─ Container Registry  acrgrubifyznl7cs3npn27k                   │
│  │   └─ repos: app-api, app-frontend                             │
│  ├─ Application Insights  appi-spoke-aca-dev  → Log Analytics Hub │
│  ├─ Alerta  alert-http5xx-banking-api  (HTTP 5xx)                 │
│  └─ Azure SRE Agent  sre-aca-dev                                 │
└─────────────────────────────────────────────────────────────────┘
                     │  telemetría (5xx por memory-leak)
                     ▼
        Alerta → SRE Agent sre-aca-dev → diagnóstico / mitigación
```

## Cambios de este fork respecto al repo original

1. **Rebrand a Mobify**: UI en español y catálogo de productos de telco
   (la iconografía es de Material-UI; ya **no** se usan imágenes de Unsplash).
2. **infra/main.bicep**: lógica condicional para reutilizar RG/CAE/ACR existentes.
3. **infra/core/host/container-apps-environment-ref.bicep**: módulo auxiliar para
   obtener el `defaultDomain` de un CAE existente.

## Sincronización con upstream

Este fork puede recibir PRs del repo original. Los cambios de infraestructura son
aditivos (nuevos parámetros con defaults vacíos), por lo que no deberían generar
conflictos.
