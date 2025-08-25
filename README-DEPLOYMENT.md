# Express Mobile Checkin - Deployment Guide

This guide covers how to containerize and deploy the Express Mobile Checkin Angular application to Kubernetes.

## 🏗️ Architecture Overview

The application is containerized using a multi-stage Docker build:
- **Stage 1**: Node.js builder to compile the Angular application
- **Stage 2**: Nginx server to serve the static files

## 📋 Prerequisites

- Docker installed and running
- Kubernetes cluster (local or cloud)
- kubectl configured
- Container registry (optional, for production)

## 🐳 Docker Build

### Local Development with Docker Compose

```bash
# Build and run locally
docker-compose up --build

# Access the application
open http://localhost:8080
```

### Manual Docker Build

```bash
# Build the image
docker build -t express-mobile-checkin:latest .

# Run the container
docker run -p 8080:80 express-mobile-checkin:latest
```

## ☸️ Kubernetes Deployment

### Quick Deployment

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Deploy to Kubernetes
./scripts/build-and-deploy.sh
```

### Manual Deployment

1. **Create namespace and resources:**
   ```bash
   kubectl apply -k k8s/
   ```

2. **Check deployment status:**
   ```bash
   kubectl get pods -n express-mobile-checkin
   kubectl get svc -n express-mobile-checkin
   ```

3. **Access the application:**
   ```bash
   # Port forward to local machine
   kubectl port-forward svc/express-mobile-checkin-service 8080:80 -n express-mobile-checkin
   ```

### Production Deployment

For production deployment, you'll need to:

1. **Update the image registry in deployment.yaml:**
   ```yaml
   image: your-registry.com/express-mobile-checkin:latest
   ```

2. **Configure your domain in ingress.yaml:**
   ```yaml
   hosts:
     - your-domain.com
   ```

3. **Set up SSL certificates with cert-manager**

4. **Configure monitoring and logging**

## 📊 Kubernetes Resources

The deployment includes:

- **Namespace**: `express-mobile-checkin`
- **ConfigMap**: Application configuration
- **Deployment**: 3 replicas with health checks
- **Service**: ClusterIP service
- **Ingress**: External access with SSL
- **HPA**: Auto-scaling based on CPU/Memory

## 🔧 Configuration

### Environment Variables

Configure via ConfigMap in `k8s/configmap.yaml`:

```yaml
data:
  environment: "production"
  api_url: "https://api.your-domain.com"
  app_name: "Express Mobile Checkin"
```

### Resource Limits

Default resource limits in `k8s/deployment.yaml`:

```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "50m"
  limits:
    memory: "128Mi"
    cpu: "100m"
```

## 📈 Monitoring and Scaling

### Health Checks

- **Liveness Probe**: `/health` endpoint
- **Readiness Probe**: `/health` endpoint
- **Auto-scaling**: 2-10 replicas based on CPU/Memory

### Monitoring Commands

```bash
# Check pod status
kubectl get pods -n express-mobile-checkin

# View logs
kubectl logs -f deployment/express-mobile-checkin -n express-mobile-checkin

# Check HPA status
kubectl get hpa -n express-mobile-checkin

# Monitor resource usage
kubectl top pods -n express-mobile-checkin
```

## 🧹 Cleanup

```bash
# Remove all resources
./scripts/cleanup.sh

# Or manually
kubectl delete namespace express-mobile-checkin
```

## 🔒 Security Considerations

- HTTPS enforced via ingress
- Security headers configured in nginx
- Resource limits prevent resource exhaustion
- Health checks ensure application availability

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy to Kubernetes
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and push Docker image
        # Add your registry push steps
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -k k8s/
          kubectl rollout status deployment/express-mobile-checkin -n express-mobile-checkin
```

## 🐛 Troubleshooting

### Common Issues

1. **Image pull errors**: Ensure image exists in registry
2. **Pod not starting**: Check resource limits and health checks
3. **Ingress not working**: Verify ingress controller is installed
4. **SSL issues**: Check cert-manager configuration

### Debug Commands

```bash
# Describe pod for detailed status
kubectl describe pod <pod-name> -n express-mobile-checkin

# Check events
kubectl get events -n express-mobile-checkin

# Test connectivity
kubectl exec -it <pod-name> -n express-mobile-checkin -- curl localhost/health
```

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration](https://nginx.org/en/docs/)
