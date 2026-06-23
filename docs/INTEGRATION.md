# Grubify — Integración con azure-demo-environment

Este fork de [dm-chelupati/grubify](https://github.com/dm-chelupati/grubify) añade soporte para desplegar la aplicación en infraestructura **existente** creada por el entorno [azure-demo-environment](https://github.com/SpainSE-demo-environment/azure-demo-environment) (Hub & Spoke).

## Nuevos parámetros

| Parámetro | Default | Descripción |
|-----------|---------|-------------|
| `existingResourceGroupName` | `''` | Si se proporciona, despliega en este RG existente |
| `existingContainerAppsEnvironmentName` | `''` | Nombre del CAE existente (ej: `cae-spoke-aca`) |
| `existingContainerRegistryName` | `''` | Nombre del ACR existente (ej: `acrspokeaca`) |

## Modos de despliegue

### 1. Standalone (original)
```bash
azd up
```
Crea RG + CAE + ACR + Container Apps (comportamiento original).

### 2. Integrado con Hub & Spoke
Primero despliega la infraestructura del Spoke ACA:
```bash
# En azure-demo-environment/lab/spokes/aca
az deployment sub create -f main.bicep -p aca.bicepparam -l westeurope
```

Luego despliega Grubify sobre esa infraestructura:
```bash
azd env set existingResourceGroupName "rg-spoke-aca"
azd env set existingContainerAppsEnvironmentName "cae-spoke-aca"
azd env set existingContainerRegistryName "acrspokeaca"
azd up
```

## Arquitectura integrada

```
┌───────────────────────────────────────────────────────────┐
│ azure-demo-environment                                    │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ Spoke ACA (rg-spoke-aca)                            │  │
│ │  ├─ VNet (10.10.0.0/16)                             │  │
│ │  ├─ Container Apps Environment                      │  │
│ │  ├─ Container Registry                              │  │
│ │  └─ Application Insights → Hub Log Analytics       │  │
│ └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
              │
              │  existingContainerAppsEnvironmentName
              ▼
┌───────────────────────────────────────────────────────────┐
│ Grubify (este repo)                                       │
│  ├─ ca-grubify-api     (Container App, port 8080)        │
│  └─ ca-grubify-frontend (Container App, port 80)         │
└───────────────────────────────────────────────────────────┘
```

## Cambios respecto al repo original

1. **infra/main.bicep**: Lógica condicional para reutilizar recursos existentes
2. **infra/core/host/container-apps-environment-ref.bicep**: Módulo auxiliar para obtener `defaultDomain` de CAE existente

## Sincronización con upstream

Este fork puede recibir PRs del repo original. Los cambios añadidos son aditivos (nuevos params con defaults vacíos), por lo que no deberían generar conflictos.
