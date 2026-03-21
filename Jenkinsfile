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
                    // Requires docker login credentials configured in Jenkins
                    // withCredentials([usernamePassword(credentialsId: 'docker-hub-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    //     sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    //     sh "docker push ${DOCKER_REGISTRY}/${SERVER_IMAGE}:${BUILD_NUMBER}"
                    //     sh "docker push ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:${BUILD_NUMBER}"
                    //     sh "docker push ${DOCKER_REGISTRY}/${SERVER_IMAGE}:latest"
                    //     sh "docker push ${DOCKER_REGISTRY}/${CLIENT_IMAGE}:latest"
                    // }
                    echo "Pushing images to registry..."
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID]) {
                    //     sh "kubectl apply -f k8s/namespace.yaml"
                    //     sh "kubectl apply -f k8s/"
                    // }
                    echo "Deploying to Kubernetes..."
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
