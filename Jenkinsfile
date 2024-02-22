pipeline {
    agent any
    stages {
        stage('Clean Workspace') {
                steps {
                    echo 'DownTime'
                    bat 'docker compose down || true'
                }
            }
            stage('Create Container') {
                steps {
                    echo 'Run Container'
                    bat 'docker compose up -d'
                }
            }
            stage('Wait for Container') {
                steps {
                    echo 'Check Directory'
                    bat 'dir'
                }
            }
            stage('Run Robot') {
                steps {
                    echo 'Run Test Register'
                    bat 'robot ./Test_Flexix/valid_register.robot'
                    echo 'Run Test Login'
                    bat 'robot ./Test_Flexix/valid_login.robot'
                    echo 'Run Test Create Project'
                    bat 'robot ./Test_Flexix/valid_create_project.robot'
                    echo 'Run Test Rename Project'
                    bat 'robot ./Test_Flexix/valid_rename_project.robot'
                    echo 'Run Test Delete Project'
                    bat 'robot ./Test_Flexix/valid_delete_project.robot'
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
    }
}
