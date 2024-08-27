pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Bayremboussaidi/global.git', branch: 'main'
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

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the Dockerfile in the root of the repository
                    bat 'docker build -t bayrem/application .' // Update this to match your image name
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Log in to Docker Hub using credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: '1', usernameVariable: 'bayrem', passwordVariable: 'Alizahida123')]) {
                        bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                    }
                    // Push the Docker image to Docker Hub
                    bat 'docker push bayrem/application:latest' // Update this to match your image name
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

//permiss issue when trying to connect docker daemon and jenkins