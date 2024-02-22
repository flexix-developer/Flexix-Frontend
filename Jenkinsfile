pipeline {
    agent any
    stages {
        stage('Clean Workspace') {
                steps {
                    echo 'DownTime'
                    bat 'docker compose -f ./compose.yaml down || true'
                    bat 'docker system prune -a -f || true'
                }
            }
            stage('Stop and Remove Docker Container') {
                steps {
                    echo 'Show Docker running'
                    bat 'docker ps'
                    echo 'Stop Docker all'
                    bat 'docker compose down || true'
                }
            }
            stage('Create Container') {
                steps {
                    echo 'Run Container'
                    bat 'docker compose -f ./compose.yaml up -d --build'
                }
            }
            stage('Run Robot') {
                steps {
                    echo 'Run Test Register'
                    bat 'robot ./valid_register.robot'
                    echo 'Run Test Login'
                    bat 'robot ./valid_login.robot'
                    echo 'Run Test Create Project'
                    bat 'robot ./valid_create_project.robot'
                    echo 'Run Test Rename Project'
                    bat 'robot ./valid_rename_project.robot'
                    echo 'Run Test Delete Project'
                    bat 'robot ./valid_delete_project.robot'
                }
            }
    }
}
