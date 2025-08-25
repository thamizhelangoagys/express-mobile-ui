#!/bin/bash

# Express Mobile UI Deployment Script
# This script deploys the application to different environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="express-mobile-ui"
REGISTRY="agilysys.azurecr.io"
IMAGE_NAME="${REGISTRY}/${PROJECT_NAME}"
NAMESPACE_PROD="express-mobile-ui"
NAMESPACE_DEV="express-mobile-ui-dev"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if kubectl is available
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed or not in PATH"
        exit 1
    fi
}

# Function to check if docker is available
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed or not in PATH"
        exit 1
    fi
}

# Function to build and push Docker image
build_and_push() {
    local tag=$1
    print_status "Building Docker image with tag: ${tag}"
    
    docker build -t "${IMAGE_NAME}:${tag}" .
    
    print_status "Pushing Docker image to registry"
    docker push "${IMAGE_NAME}:${tag}"
    
    print_success "Docker image built and pushed successfully"
}

# Function to deploy to Kubernetes
deploy_to_k8s() {
    local environment=$1
    local namespace=$2
    local tag=$3
    
    print_status "Deploying to ${environment} environment (namespace: ${namespace})"
    
    # Create namespace if it doesn't exist
    kubectl create namespace ${namespace} --dry-run=client -o yaml | kubectl apply -f -
    
    # Apply Kubernetes manifests
    kubectl apply -f k8s/ -n ${namespace}
    
    # Update deployment with new image tag
    kubectl set image deployment/${PROJECT_NAME} ${PROJECT_NAME}=${IMAGE_NAME}:${tag} -n ${namespace}
    
    # Wait for deployment to be ready
    print_status "Waiting for deployment to be ready..."
    kubectl rollout status deployment/${PROJECT_NAME} -n ${namespace} --timeout=300s
    
    print_success "Deployment to ${environment} completed successfully"
}

# Function to show deployment status
show_status() {
    local namespace=$1
    local environment=$2
    
    print_status "Status for ${environment} environment:"
    echo "----------------------------------------"
    
    # Show pods
    kubectl get pods -n ${namespace}
    echo ""
    
    # Show services
    kubectl get services -n ${namespace}
    echo ""
    
    # Show ingress
    kubectl get ingress -n ${namespace}
    echo ""
}

# Function to show logs
show_logs() {
    local namespace=$1
    local environment=$2
    
    print_status "Recent logs for ${environment} environment:"
    echo "----------------------------------------"
    
    # Get the first pod name
    local pod_name=$(kubectl get pods -n ${namespace} -l app=${PROJECT_NAME} -o jsonpath='{.items[0].metadata.name}')
    
    if [ -n "${pod_name}" ]; then
        kubectl logs ${pod_name} -n ${namespace} --tail=50
    else
        print_warning "No pods found in ${namespace} namespace"
    fi
}

# Main script logic
main() {
    local action=$1
    local environment=$2
    local tag=${3:-latest}
    
    case $action in
        "build")
            check_docker
            build_and_push $tag
            ;;
        "deploy")
            check_kubectl
            case $environment in
                "dev"|"development")
                    build_and_push $tag
                    deploy_to_k8s "development" $NAMESPACE_DEV $tag
                    ;;
                "prod"|"production")
                    build_and_push $tag
                    deploy_to_k8s "production" $NAMESPACE_PROD $tag
                    ;;
                *)
                    print_error "Invalid environment. Use 'dev' or 'prod'"
                    exit 1
                    ;;
            esac
            ;;
        "status")
            check_kubectl
            case $environment in
                "dev"|"development")
                    show_status $NAMESPACE_DEV "development"
                    ;;
                "prod"|"production")
                    show_status $NAMESPACE_PROD "production"
                    ;;
                *)
                    print_error "Invalid environment. Use 'dev' or 'prod'"
                    exit 1
                    ;;
            esac
            ;;
        "logs")
            check_kubectl
            case $environment in
                "dev"|"development")
                    show_logs $NAMESPACE_DEV "development"
                    ;;
                "prod"|"production")
                    show_logs $NAMESPACE_PROD "production"
                    ;;
                *)
                    print_error "Invalid environment. Use 'dev' or 'prod'"
                    exit 1
                    ;;
            esac
            ;;
        "cleanup")
            check_kubectl
            print_warning "This will delete all resources in the specified environment"
            read -p "Are you sure? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                case $environment in
                    "dev"|"development")
                        kubectl delete namespace $NAMESPACE_DEV
                        print_success "Development environment cleaned up"
                        ;;
                    "prod"|"production")
                        kubectl delete namespace $NAMESPACE_PROD
                        print_success "Production environment cleaned up"
                        ;;
                    *)
                        print_error "Invalid environment. Use 'dev' or 'prod'"
                        exit 1
                        ;;
                esac
            fi
            ;;
        *)
            echo "Usage: $0 {build|deploy|status|logs|cleanup} {dev|prod} [tag]"
            echo ""
            echo "Commands:"
            echo "  build [tag]     - Build and push Docker image"
            echo "  deploy env [tag] - Deploy to specified environment (dev/prod)"
            echo "  status env      - Show deployment status for environment"
            echo "  logs env        - Show logs for environment"
            echo "  cleanup env     - Clean up environment resources"
            echo ""
            echo "Examples:"
            echo "  $0 build v1.0.0"
            echo "  $0 deploy dev v1.0.0"
            echo "  $0 deploy prod latest"
            echo "  $0 status dev"
            echo "  $0 logs prod"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
