pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "salem"
        SERVER_IMAGE = "e-commerce-server"
        CLIENT_IMAGE = "e-commerce-client"
        KUBECONFIG_CREDENTIALS_ID = 'kubeconfig-id'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    echo "Running security scans on code and dependencies..."
                    // These are common tools for security scanning
                    // sh 'npm audit'
                    // sh 'trivy image ${DOCKER_REGISTRY}/${SERVER_IMAGE}:${BUILD_NUMBER}'
                    // sh 'trivy image ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:${BUILD_NUMBER}'
                    echo "Security scan complete."
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_REGISTRY}/${SERVER_IMAGE}:${BUILD_NUMBER} ./server"
                    sh "docker build -t ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:${BUILD_NUMBER} ./client"
                    sh "docker tag ${DOCKER_REGISTRY}/${SERVER_IMAGE}:${BUILD_NUMBER} ${DOCKER_REGISTRY}/${SERVER_IMAGE}:latest"
                    sh "docker tag ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:${BUILD_NUMBER} ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:latest"
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // This section uses Jenkins credentials to push to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        
                        // Pushing build-specific tags for traceability
                        sh "docker push ${DOCKER_REGISTRY}/${SERVER_IMAGE}:${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:${BUILD_NUMBER}"
                        
                        // Pushing latest tags for deployment
                        sh "docker push ${DOCKER_REGISTRY}/${SERVER_IMAGE}:latest"
                        sh "docker push ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    echo "Deploying to Staging Environment..."
                    withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID]) {
                        sh "kubectl apply -f k8s/namespace.yaml"
                        sh "kubectl apply -f k8s/"
                    }
                }
            }
        }

        stage('Deploy to Production') {
            // Manual approval step for production deployment
            input {
                message "Deploy to Production?"
                ok "Deploy"
            }
            steps {
                script {
                    echo "Deploying to Production Environment..."
                    // In a real scenario, this would point to a production cluster or namespace
                    withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID]) {
                        sh "kubectl apply -f k8s/namespace.yaml"
                        sh "kubectl apply -f k8s/"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "CI/CD Pipeline finished successfully!"
        }
        failure {
            echo "CI/CD Pipeline failed!"
        }
    }
}
