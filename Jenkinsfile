pipeline {
    agent any
        stages {
            stage('Check file') {
                steps {
                    sh 'ls'
                }
            }
            stage('install node modules') {
                steps {
                    sh 'npm install'
                }
            }
            stage('Run tests') {
                steps {
                    sh 'npm start'
                }
            }
        }
}