pipeline {
    agent any
        stages {
            stage('Check file') {
                agent {
                    label 'flexix-frontend'
                }
                steps {
                    sh 'ls'
                }
            }
            stage('run app') {
                agent {
                    label 'flexix-frontend'
                }
                steps {
                    sh 'docker compose up -d'
                }
            }
        }
}