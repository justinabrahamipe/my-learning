pipeline {
    agent any

    stages {
        stage('Show files') {
            steps {
                sh 'ls -la'
            }
        }

        stage('Stop old containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build and deploy') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Verify running') {
            steps {
                sh 'docker compose ps'
            }
        }
    }

    post {
        success {
            echo '✓ Deployed successfully'
        }
        failure {
            echo '✗ Deploy failed'
        }
    }
}
