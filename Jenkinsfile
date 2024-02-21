pipeline {
    agent any
    stages {
        stage('Check file') {
            steps {
                bat 'dir'
            }
        }
        stage('Install node modules') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run tests') {
            steps {
                script {
                    // ใช้ Start-Process เพื่อให้ npm start ทำงานเบื้องหลัง
                    powershell 'Start-Process npm -ArgumentList "start" -NoNewWindow -PassThru'
                }
            }
        }
    }
}
