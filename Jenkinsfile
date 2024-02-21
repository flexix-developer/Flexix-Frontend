pipeline {
    agent any
        stages {
            stage('Install Packages') {
                agent {
                    label 'flexix-frontend'
                }
                steps {
                    sh 'npm install'
                }
            }
            stage('Run Project') {
                agent {
                    label 'flexix-frontend'
                }
                steps {
                    sh 'npm start'
                }
            }
        }
}