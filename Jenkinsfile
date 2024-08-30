pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('3')
    }

    stages {
        stage('Build and Pushh Docker Images') {
            steps {
                script{
                    
                    
                    bat 'docker-compose build'
                    
                        bat 'echo %DOCKERHUB_CREDENTIALS_PSW%'
                        bat 'docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%'
                    
                   
                    bat 'docker-compose push' 
                }
                }
            
        }

        stage('Run Docker Compose') {
            steps {
                   
                    bat 'docker compose --project-name=global up -d'
                
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
