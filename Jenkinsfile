pipeline {
    agent any
    stages {
        stage('Check file') {
            steps {
                bat 'dir' 
            }
        }
        stage('Run App') {
            steps {
                bat 'docker compose up -d'
            }
        }
    }
}
