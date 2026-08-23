# Mobify - Portal de Telco Online

A modern telecom (telco) retail portal built with a React TypeScript frontend and .NET backend, designed for deployment to Azure Container Apps using Azure Developer CLI (azd). (Originally scaffolded as a food-delivery demo; rebranded to a Spanish telco operator experience for Azure SRE Agent demos. Internal class names, model properties and API routes are unchanged.)

## 📶 Features

- **Modern UI**: Beautiful, responsive design for a trustworthy online telco experience (Spanish UI)
- **Real Telco Content**: Sample product families and telco products (tarifas móviles, fibra y fijo, paquetes convergentes, móviles y dispositivos, internet móvil / datos, servicios adicionales) with themed Material-UI iconography
- **Complete Onboarding Flow**: Browse products → Add to selection → Contract → Track application status
- **Azure Container Apps**: Scalable, serverless container hosting
- **Azure Developer CLI**: One-command deployment and management

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Material-UI
- **Backend**: .NET 9 Web API with RESTful endpoints
- **Infrastructure**: Azure Container Apps + Container Registry
- **Deployment**: Azure Developer CLI (azd)

## 🚀 Complete Deployment Guide

This guide shows how to deploy Mobify with **both backend versions** (v1 with memory leak, v2 with payment failures) for testing Azure SRE Agent scenarios.

> **Nota (lab / demo del SRE Agent):** en el entorno `azure-demo-environment` la app
> **no** se despliega con `azd up` creando infraestructura nueva, sino sobre el **Spoke
> ACA existente** (`rg-lab-spoke-aca-dev`, región `uksouth`) construyendo las imágenes
> con `az acr build` sobre el ACR `acrgrubifyznl7cs3npn27k` y actualizando las Container
> Apps `ca-app-api-dev` / `ca-app-frontend-dev`. Consulta el flujo real y los nombres de
> recursos en **[docs/INTEGRATION.md](docs/INTEGRATION.md)**. La sección siguiente
> describe el modo *standalone* (`azd up`), útil para un despliegue aislado.

## 📋 Prerequisites

Before deploying Mobify, ensure you have the following tools installed and running:

### Required Tools
- **[Azure Developer CLI (azd)](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd)** - Latest version
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** - Must be **running** before deployment
- **[Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)** - For additional Azure operations
- **Azure Subscription** - With Contributor/Owner permissions

### ⚠️ Important: Docker Desktop
**Docker Desktop must be running before executing `azd up`**. The deployment will fail if Docker is not started.

To start Docker Desktop:
- **macOS/Windows**: Launch Docker Desktop application
- **Linux**: Run `sudo systemctl start docker`

Verify Docker is running:
```bash
open -a Docker
docker --version
docker ps
```

### Prerequisites

## 🚀 Quick Start

### 1. Prerequisites Check
Before starting, run our prerequisites check script:

```bash
# Run the automated prerequisites check
./scripts/check-prerequisites.sh


### 2. Initial Azure Setup

```bash
# Clone the repository (this fork)
git clone https://github.com/SpainSE-demo-environment/grubify.git
cd grubify

# ⚠️ IMPORTANT: Start Docker Desktop before proceeding
# Verify Docker is running
docker ps

# Login to Azure
azd auth login
az login --use-device-code

# Initialize azd project (if not already done)
azd init

# Set Azure location
azd env set AZURE_LOCATION eastus2
```

### 3. Deploy Infrastructure & Applications

```bash
# Deploy infrastructure and frontend first
azd up
```

This creates:
- **Resource Group**: `rg-grubify-app`
- **Container Registry**: `crgrubify`
- **Container Apps Environment**: `cae-grubify`
- **API Container App**: `ca-grubify-api`
- **Frontend Container App**: `ca-grubify-frontend`
- **Log Analytics Workspace**: `log-grubify`

### 6. Ready for SRE Scenarios

Now you have:
- ✅ **Frontend deployed** and working
- ✅ **Backend deployed** and working
- ✅ **Infrastructure configured** for testing scenarios

**SRE Agent Setup:**
1. **Create agent** - ([Azure SRE Agent Usage Guide](https://learn.microsoft.com/en-us/azure/sre-agent/usage))
2. **Map GitHub repo** that you cloned this to: **https://github.com/SpainSE-demo-environment/grubify.git**
3. **Connect Service Now** to your SRE agent
4. **Setup incident handler** with custom instructions for automated diagnosis and mitigation
5. **Simulate memory leak** using the deployed application endpoints
6. **Create incident in Service Now** to trigger SRE agent response

