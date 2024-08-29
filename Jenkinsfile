pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('3')
    }

    stages {
        stage('Build and Push Docker Images') {
            steps {
                script{
                    
                    // Build the Docker images using docker-compose.yaml
                    bat 'docker-compose build' // Build the images
                    // Log in to Docker Hub using credentials stored in Jenkins
                        bat 'echo %DOCKERHUB_CREDENTIALS_PSW%'
                        bat 'docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%'
                    
                    // Push the Docker images to Docker Hub
                    bat 'docker-compose push' // This assumes the images are defined in the docker-compose.yml
                }
                }
            
        }

        stage('Run Docker Compose') {
            steps {
                    // Start the containers in detached mode
                    bat 'docker compose --project-name=global up -d' // Use this to run containers
                
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Please check the console output.'
        }
    }
}
