pipeline {
    agent any
    stages {
        stage('Check file') {
            steps {
                bat 'dir'  // ใช้ bat แทน sh สำหรับ Windows
            }
        }
        stage('install node modules') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run tests') {
            steps {
                bat 'npm start'
            }
        }
    }
}
