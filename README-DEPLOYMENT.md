# Express Mobile UI - Deployment Guide

This document provides comprehensive instructions for deploying the Express Mobile UI application using Azure DevOps pipelines and Kubernetes.

## 🚀 Overview

The Express Mobile UI application is deployed using:
- **Azure DevOps Pipelines** for CI/CD automation
- **Azure Container Registry (ACR)** for Docker image storage
- **Azure Kubernetes Service (AKS)** for container orchestration
- **NGINX Ingress Controller** for load balancing and SSL termination

## 📋 Prerequisites

### Required Tools
- Azure CLI
- kubectl
- Docker
- Git

### Required Azure Resources
- Azure DevOps Organization and Project
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Azure Key Vault (for secrets management)

### Required Permissions
- Azure DevOps Pipeline permissions
- ACR push/pull permissions
- AKS cluster access

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `ENVIRONMENT` | Deployment environment | `production` |
| `API_URL` | Backend API endpoint | `https://api.agilysys.com` |
| `APP_NAME` | Application name | `Express Mobile UI` |
| `NODE_ENV` | Node.js environment | `production` |

### Azure DevOps Pipeline Variables

Configure these variables in your Azure DevOps pipeline:

```yaml
variables:
  buildConfiguration: 'production'
  nodeVersion: '20.x'
  dockerfilePath: 'Dockerfile'
  imageRepository: 'express-mobile-ui'
  containerRegistry: 'agilysys.azurecr.io'
  namespace: 'express-mobile-ui'
  deploymentName: 'express-mobile-ui'
  environment: 'production'
  apiUrl: 'https://api.agilysys.com'
  appName: 'Express Mobile UI'
```

## 🏗️ Pipeline Stages

### 1. Build Stage
- **Purpose**: Build and test the Angular application
- **Triggers**: Changes to `main` or `develop` branches
- **Actions**:
  - Install Node.js dependencies
  - Build Angular application
  - Run unit tests with code coverage
  - Publish build artifacts

### 2. Docker Stage
- **Purpose**: Build and push Docker image to ACR
- **Triggers**: Only on `main` branch
- **Actions**:
  - Build Docker image with production configuration
  - Push to Azure Container Registry
  - Tag with build ID and latest

### 3. Deploy Stage
- **Purpose**: Deploy to production Kubernetes cluster
- **Triggers**: Only on `main` branch
- **Actions**:
  - Create Kubernetes secrets
  - Deploy application manifests
  - Verify deployment

### 4. DeployDev Stage
- **Purpose**: Deploy to development environment
- **Triggers**: Only on `develop` branch
- **Actions**:
  - Deploy to development namespace
  - Use development configuration

## 🐳 Docker Configuration

### Multi-Stage Build
The Dockerfile uses a multi-stage build approach:

1. **Builder Stage**: Node.js environment for building the Angular app
2. **Production Stage**: NGINX for serving static files

### Health Checks
The container includes health checks:
- Endpoint: `/health`
- Interval: 30 seconds
- Timeout: 3 seconds
- Retries: 3

### Build Arguments
- `BUILD_CONFIGURATION`: Build configuration (default: production)

## ☸️ Kubernetes Deployment

### Namespaces
- **Production**: `express-mobile-ui`
- **Development**: `express-mobile-ui-dev`

### Resources
- **CPU Request**: 100m
- **CPU Limit**: 200m
- **Memory Request**: 128Mi
- **Memory Limit**: 256Mi

### Scaling
- **Minimum Replicas**: 2
- **Maximum Replicas**: 10
- **CPU Target**: 70%
- **Memory Target**: 80%

### Ingress Configuration
- **Host**: `express-mobile-ui.agilysys.com`
- **SSL**: Automatic with Let's Encrypt
- **CORS**: Enabled for cross-origin requests

## 🚀 Deployment Methods

### 1. Azure DevOps Pipeline (Recommended)

The pipeline automatically deploys:
- **Develop branch** → Development environment
- **Main branch** → Production environment

#### Pipeline Setup
1. Connect your repository to Azure DevOps
2. Import the `azure-pipelines.yml` file
3. Configure service connections:
   - Azure Container Registry
   - AKS Production Cluster
   - AKS Development Cluster

#### Service Connections Required
```yaml
# ACR Service Connection
- name: Azure Container Registry
  type: dockerRegistry
  url: agilysys.azurecr.io

# AKS Production Service Connection
- name: aks-service-connection
  type: kubernetes
  cluster: production-aks-cluster

# AKS Development Service Connection
- name: aks-dev-service-connection
  type: kubernetes
  cluster: development-aks-cluster
```

### 2. Manual Deployment Script

Use the provided deployment script for manual deployments:

```bash
# Build and push Docker image
./scripts/deploy.sh build v1.0.0

# Deploy to development
./scripts/deploy.sh deploy dev v1.0.0

# Deploy to production
./scripts/deploy.sh deploy prod v1.0.0

# Check status
./scripts/deploy.sh status dev
./scripts/deploy.sh status prod

# View logs
./scripts/deploy.sh logs dev
./scripts/deploy.sh logs prod

# Cleanup environment
./scripts/deploy.sh cleanup dev
```

### 3. kubectl Commands

Direct kubectl deployment:

```bash
# Apply all manifests
kubectl apply -f k8s/ -n express-mobile-ui

# Update image
kubectl set image deployment/express-mobile-ui express-mobile-ui=agilysys.azurecr.io/express-mobile-ui:latest -n express-mobile-ui

# Check status
kubectl get pods -n express-mobile-ui
kubectl get services -n express-mobile-ui
kubectl get ingress -n express-mobile-ui

# View logs
kubectl logs -l app=express-mobile-ui -n express-mobile-ui
```

## 🔍 Monitoring and Troubleshooting

### Health Checks
- **Liveness Probe**: `/health` endpoint
- **Readiness Probe**: `/health` endpoint
- **Initial Delay**: 30 seconds (liveness), 5 seconds (readiness)

### Logging
- Application logs are available via kubectl
- NGINX access logs are included
- Structured logging format

### Metrics
- CPU and Memory utilization
- Request/response metrics
- Error rates

### Common Issues

#### 1. Image Pull Errors
```bash
# Check ACR credentials
kubectl get secrets -n express-mobile-ui

# Update ACR secret if needed
kubectl create secret docker-registry acr-secret \
  --docker-server=agilysys.azurecr.io \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-email=<email> \
  -n express-mobile-ui
```

#### 2. Ingress Issues
```bash
# Check ingress controller
kubectl get pods -n ingress-nginx

# Check ingress status
kubectl describe ingress express-mobile-ui-ingress -n express-mobile-ui
```

#### 3. Resource Issues
```bash
# Check resource usage
kubectl top pods -n express-mobile-ui

# Check events
kubectl get events -n express-mobile-ui --sort-by='.lastTimestamp'
```

## 🔐 Security

### Secrets Management
- Use Azure Key Vault for sensitive data
- Kubernetes secrets for non-sensitive configuration
- ACR authentication via service principals

### Network Security
- HTTPS enforcement via ingress
- CORS configuration for API access
- Network policies for pod-to-pod communication

### Container Security
- Non-root user in containers
- Minimal base images
- Regular security updates

## 📊 Performance Optimization

### Caching
- Browser caching via NGINX headers
- CDN integration for static assets
- Application-level caching

### Scaling
- Horizontal Pod Autoscaler (HPA)
- Cluster Autoscaler for node scaling
- Resource requests and limits

### Monitoring
- Azure Monitor integration
- Prometheus metrics
- Grafana dashboards

## 🔄 Rollback Procedures

### Quick Rollback
```bash
# Rollback to previous deployment
kubectl rollout undo deployment/express-mobile-ui -n express-mobile-ui

# Check rollback status
kubectl rollout status deployment/express-mobile-ui -n express-mobile-ui
```

### Manual Rollback
```bash
# Deploy specific version
kubectl set image deployment/express-mobile-ui express-mobile-ui=agilysys.azurecr.io/express-mobile-ui:v1.0.0 -n express-mobile-ui
```

## 📝 Environment-Specific Configurations

### Development Environment
- **Namespace**: `express-mobile-ui-dev`
- **API URL**: `https://dev-api.agilysys.com`
- **Log Level**: `debug`
- **Replicas**: 1-3

### Production Environment
- **Namespace**: `express-mobile-ui`
- **API URL**: `https://api.agilysys.com`
- **Log Level**: `info`
- **Replicas**: 2-10

## 🆘 Support

For deployment issues:
1. Check Azure DevOps pipeline logs
2. Review Kubernetes events and logs
3. Verify service connections and permissions
4. Contact the DevOps team

## 📚 Additional Resources

- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/)
- [Azure Kubernetes Service Documentation](https://docs.microsoft.com/en-us/azure/aks/)
- [NGINX Ingress Controller Documentation](https://kubernetes.github.io/ingress-nginx/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
