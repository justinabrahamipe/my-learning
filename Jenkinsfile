pipeline {
    agent any

    stages {
        stage('Show files') {
            steps {
                sh 'ls -la'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }
    }

    post {
        success {
            echo '✓ Build succeeded'
        }
        failure {
            echo '✗ Build failed'
        }
    }
}
