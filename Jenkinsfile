pipeline {
    agent any
    stages {
        stage('Clean Workspace') {
                steps {
                    echo 'DownTime'
                    bat 'docker compose down'
                }
            }
            stage('RUN & TEST') {
                steps {
                    echo 'Run Container'
                    bat 'docker compose up -d'
                }
            }
            stage('Stop and Remove Docker Container') {
                steps {
                    echo 'Show Docker running'
                    bat 'docker ps'
                    echo 'Stop Docker all'
                    bat 'docker compose down'
                }
            }
    }
}
