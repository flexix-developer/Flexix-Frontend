pipeline {
    agent any
        stages {
            stage('Check file') {
                steps {
                    sh 'ls'
                }
            }
            stage('run app') {
                steps {
                    sh 'docker compose up -d'
                }
            }
        }
}