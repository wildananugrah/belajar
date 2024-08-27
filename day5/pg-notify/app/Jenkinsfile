pipeline {
  agent any

  parameters {
    string(name: "APP_ENV", defaultValue: "production", description: "APP_ENV ?")
    string(name: "DB_HOST", defaultValue: "18.141.201.108", description: "DB_HOST ?")
    string(name: "DB_PORT", defaultValue: "5432", description: "DB_PORT ?")
    string(name: "DB_DATABASE", defaultValue: "odk", description: "DB_DATABASE ?")
    string(name: "DB_USER", defaultValue: "odk", description: "DB_USER ?")
    string(name: "DB_PASS", defaultValue: "odk", description: "DB_PASS ?")
    string(name: "DB_POOL_MIN", defaultValue: "5", description: "DB_POOL_MIN ?")
    string(name: "DB_POOL_MAX", defaultValue: "10", description: "DB_POOL_MAX ?")
    string(name: "DB_IDLE_TIMEOUT", defaultValue: "1000", description: "DB_IDLE_TIMEOUT ?")
    string(name: "DB_CONNECTION_TIMEOUT", defaultValue: "1000", description: "DB_CONNECTION_TIMEOUT ?")
    string(name: "DB_MAX_USES", defaultValue: "7500", description: "DB_MAX_USES ?")
    string(name: "LIMIT_IMAGES", defaultValue: "5", description: "LIMIT_IMAGES ?")
    string(name: "APP_TARGET_FOLDER", defaultValue: "./images", description: "APP_TARGET_FOLDER ?")
  }
  options {
    disableConcurrentBuilds()
    timeout(time: 1, unit: 'HOURS')
  }

  stages {
    stage('Build & Deploy Containers') {
      stages {
        stage('Prepare Environment') {
            steps {
                sh "docker network create klhk-net || true"
                sh "echo '' > .env"
                sh "echo APP_ENV=${params.APP_ENV} >> .env"
                sh "echo DB_HOST=${params.DB_HOST} >> .env"
                sh "echo DB_PORT=${params.DB_PORT} >> .env"
                sh "echo DB_DATABASE=${params.DB_DATABASE} >> .env"
                sh "echo DB_USER=${params.DB_USER} >> .env"
                sh "echo DB_PASS=${params.DB_PASS} >> .env"
                sh "echo DB_POOL_MIN=${params.DB_POOL_MIN} >> .env"
                sh "echo DB_POOL_MAX=${params.DB_POOL_MAX} >> .env"
                sh "echo DB_IDLE_TIMEOUT=${params.DB_IDLE_TIMEOUT} >> .env"
                sh "echo DB_CONNECTION_TIMEOUT=${params.DB_CONNECTION_TIMEOUT} >> .env"
                sh "echo DB_MAX_USES=${params.DB_MAX_USES} >> .env"
                sh "echo LIMIT_IMAGES=${params.LIMIT_IMAGES} >> .env"
                sh "echo APP_TARGET_FOLDER=${params.APP_TARGET_FOLDER} >> .env"

                sh "mkdir -p ./images"

            }
        }

        stage('Build & Run.') {
            tools {
                nodejs 'klhk-npm'
            }

            steps {
                sh 'npm install'
                sh 'npm run start'
            }
        }

        stage('Done.') {
          steps {
            sleep 5
            sh "exit 0"  
          }
        }
      }
    }
  }
}