#!/bin/bash

# Cleanup Script for Express Mobile Checkin
set -e

NAMESPACE="express-mobile-checkin"

echo "🧹 Starting cleanup process..."

# Delete all resources in the namespace
echo "🗑️  Deleting all resources in namespace ${NAMESPACE}..."
kubectl delete namespace ${NAMESPACE}

# Remove Docker image (optional)
read -p "Do you want to remove the Docker image? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🐳 Removing Docker image..."
    docker rmi express-mobile-checkin:latest || true
fi

echo "✅ Cleanup completed successfully!"
