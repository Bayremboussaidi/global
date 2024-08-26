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