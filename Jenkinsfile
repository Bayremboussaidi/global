pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'global', url: 'https://github.com/Bayremboussaidi/global.git']])
            }
        }

        stage('Install Node.js Dependencies') {
            parallel {
                stage('Install Backend Dependencies') {
                    steps {
                        dir('back') {
                            bat 'npm install' // Using bat for Windows shell
                        }
                    }
                }

                stage('Install Frontend Dependencies') {
                    steps {
                        dir('front') {
                            bat 'npm install' // Using bat for Windows shell
                        }
                    }
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Build the Docker images using docker-compose.yaml
                    bat 'docker-compose build' // Build the images
                    // Log in to Docker Hub using credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: '3', usernameVariable:'DOCKER_USERNAME',passwordVariable:'DOCKER_PASSWORD')]) {
                        bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                    }
                    // Push the Docker images to Docker Hub
                    bat 'docker-compose push' // This assumes the images are defined in the docker-compose.yml
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    // Start the containers in detached mode
                    bat 'docker-compose up -d' // Use this to run containers
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir('front') {
                    bat 'npm run build' // Using bat for Windows shell
                }
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