#!/bin/bash

# Build and Deploy Script for Express Mobile Checkin
set -e

# Configuration
IMAGE_NAME="express-mobile-checkin"
IMAGE_TAG="latest"
REGISTRY="your-registry.com"  # Change this to your container registry
NAMESPACE="express-mobile-checkin"

echo "🚀 Starting build and deployment process..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

# Tag for registry (if using external registry)
# docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}

# Push to registry (if using external registry)
# echo "📤 Pushing image to registry..."
# docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}

# Create namespace if it doesn't exist
echo "🏗️  Creating namespace..."
kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes manifests
echo "📋 Applying Kubernetes manifests..."
kubectl apply -k k8s/

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl rollout status deployment/${IMAGE_NAME} -n ${NAMESPACE}

# Get service information
echo "🔍 Service information:"
kubectl get svc -n ${NAMESPACE}

echo "✅ Deployment completed successfully!"
echo "🌐 Access your application at: http://express-mobile-checkin.example.com"
echo "📊 Check deployment status: kubectl get pods -n ${NAMESPACE}"
