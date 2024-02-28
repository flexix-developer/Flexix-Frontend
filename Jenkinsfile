pipeline {
    agent any
    stages {
            stage('Clear Container') {
                steps {
                    echo 'DownTime'
                    bat 'docker compose down || true'
                }
            }
            stage('Create Container') {
                steps {
                    echo 'Run App'
                    bat 'docker compose up -d'
                }
            }
            stage('Run Robot') {
                steps {
                    echo 'Run Test Register'
                    bat 'C:\\Users\\mon\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\robot.exe ./Test_Flexix/valid_register.robot'
                    
                    echo 'Run Test Login'
                    bat 'C:\\Users\\mon\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\robot.exe ./Test_Flexix/valid_login.robot'
                    
                    echo 'Run Test Create Project'
                    bat 'C:\\Users\\mon\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\robot.exe ./Test_Flexix/valid_create_project.robot'
                    
                    echo 'Run Test Rename Project'
                    bat 'C:\\Users\\mon\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\robot.exe ./Test_Flexix/valid_rename_project.robot'
                    
                    echo 'Run Test Delete Project'
                    bat 'C:\\Users\\mon\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\robot.exe ./Test_Flexix/valid_delete_project.robot'
                }
            }

            stage('End Container') {
                steps {
                    echo 'Show Docker running'
                    bat 'docker ps'
                    echo 'Stop Docker all'
                    bat 'docker compose down || true'
                }
            }
    }
}
