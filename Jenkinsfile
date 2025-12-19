/**
 * Jenkinsfile for WebdriverIO-Cucumber Test Framework
 * Professional CI/CD Pipeline Configuration
 * @author Pravin - Senior QA Automation Engineer
 */

pipeline {
    agent any

    tools {
        nodejs 'Node18'  // Use the name you configured
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        ansiColor('xterm')
    }

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'firefox', 'edge'],
            description: 'Browser to run tests on'
        )
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'staging', 'production'],
            description: 'Environment to test against'
        )
        string(
            name: 'TAG',
            defaultValue: '@regression',
            description: 'Cucumber tags to execute (e.g., @smoke, @regression)'
        )
        booleanParam(
            name: 'PARALLEL_EXECUTION',
            defaultValue: false,
            description: 'Run tests in parallel'
        )
    }

    environment {
        // API Configuration
        API_BASE_URL = 'https://unsobering-maribeth-hokey.ngrok-free.dev'
        API_TOKEN = 'D_YIqZ4D0tYVgFTWKEaRVImEpiq3vzZkOB40lKDDSRk'
        ORG_ID = '374060a8-925c-49aa-8495-8a823949f3e0'
        CREATED_BY = 'c9279b2d-701c-48eb-9122-fbeae465771c'
        
        // Test Configuration
        TEST_ENV = "${params.ENVIRONMENT}"
        BROWSER = "${params.BROWSER}"
        
        // Node Configuration
        NODE_OPTIONS = '--max-old-space-size=4096'
        
        // Paths
        WORKSPACE_PATH = "${WORKSPACE}"
        RESULTS_PATH = "${WORKSPACE}/test-results"
        ALLURE_PATH = "${WORKSPACE}/allure-results"
        SCREENSHOTS_PATH = "${WORKSPACE}/screenshots"
    }

    stages {
        stage('🔧 Setup') {
            steps {
                script {
                    echo "═══════════════════════════════════════════════════════"
                    echo "🚀 Starting WebdriverIO-Cucumber Test Pipeline"
                    echo "═══════════════════════════════════════════════════════"
                    echo "📦 Build Number: ${BUILD_NUMBER}"
                    echo "🔗 Build URL: ${BUILD_URL}"
                    echo "👤 Started By: ${currentBuild.getBuildCauses()[0].shortDescription}"
                    echo "🌿 Branch: ${env.GIT_BRANCH ?: 'main'}"
                    echo "🌐 Browser: ${params.BROWSER}"
                    echo "🏷️  Environment: ${params.ENVIRONMENT}"
                    echo "🏷️  Tags: ${params.TAG}"
                    echo "═══════════════════════════════════════════════════════"
                }
            }
        }

        stage('📥 Checkout') {
            steps {
                echo '📥 Checking out code from repository...'
                checkout scm
                sh 'git log -1 --pretty=format:"%h - %an: %s"'
            }
        }

        stage('🔍 Environment Check') {
            steps {
                echo '🔍 Checking environment...'
                sh '''
                    echo "Node version: $(node --version)"
                    echo "NPM version: $(npm --version)"
                    echo "Working directory: $(pwd)"
                    echo "Available disk space:"
                    df -h
                '''
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo '📦 Installing npm dependencies...'
                sh '''
                    npm ci --prefer-offline --no-audit
                    echo "Dependencies installed successfully"
                '''
            }
        }

        stage('🧹 Clean Previous Results') {
            steps {
                echo '🧹 Cleaning previous test results...'
                sh '''
                    rm -rf allure-results allure-report test-results screenshots .wdio-results
                    mkdir -p allure-results test-results screenshots .wdio-results
                    echo "Previous results cleaned"
                '''
            }
        }

        stage('🧪 Run Tests') {
            steps {
                script {
                    echo '🧪 Executing WebdriverIO-Cucumber tests...'
                    
                    def cucumberOpts = "--cucumberOpts.tagExpression='${params.TAG}'"
                    
                    try {
                        sh """
                            export JENKINS_URL=${JENKINS_URL}
                            export BUILD_NUMBER=${BUILD_NUMBER}
                            export BUILD_URL=${BUILD_URL}
                            export JOB_NAME=${JOB_NAME}
                            export GIT_BRANCH=${env.GIT_BRANCH ?: 'main'}
                            export GIT_COMMIT=${env.GIT_COMMIT ?: ''}
                            
                            npm run test -- ${cucumberOpts}
                        """
                    } catch (Exception e) {
                        echo "⚠️  Tests failed with errors: ${e.message}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('📊 Generate Reports') {
            steps {
                echo '📊 Generating test reports...'
                script {
                    try {
                        sh 'npm run report || echo "Allure report generation completed"'
                    } catch (Exception e) {
                        echo "⚠️  Allure report generation failed: ${e.message}"
                    }
                }
            }
        }

        stage('📈 Publish Results') {
            steps {
                echo '📈 Publishing test results...'
                script {
                    // Publish JUnit test results
                    try {
                        junit allowEmptyResults: true, testResults: 'test-results/junit/*.xml'
                    } catch (Exception e) {
                        echo "⚠️  JUnit results publishing failed: ${e.message}"
                    }

                    // Archive test artifacts
                    archiveArtifacts artifacts: '''
                        test-results/**/*,
                        allure-results/**/*,
                        screenshots/**/*.png,
                        .wdio-results/**/*
                    ''', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up workspace...'
            script {
                echo 'Workspace cleanup skipped to preserve artifacts'
            }
        }

        success {
            script {
                echo '✅ Pipeline completed successfully!'
                echo "═══════════════════════════════════════════════════════"
                echo "✅ BUILD SUCCESSFUL"
                echo "📊 Build Number: ${BUILD_NUMBER}"
                echo "⏱️  Duration: ${currentBuild.durationString}"
                echo "═══════════════════════════════════════════════════════"
            }
        }

        failure {
            script {
                echo '❌ Pipeline failed!'
                echo "═══════════════════════════════════════════════════════"
                echo "❌ BUILD FAILED"
                echo "📊 Build Number: ${BUILD_NUMBER}"
                echo "⏱️  Duration: ${currentBuild.durationString}"
                echo "═══════════════════════════════════════════════════════"
            }
        }

        unstable {
            script {
                echo '⚠️  Pipeline completed with test failures'
                echo "═══════════════════════════════════════════════════════"
                echo "⚠️  BUILD UNSTABLE - Some tests failed"
                echo "📊 Build Number: ${BUILD_NUMBER}"
                echo "⏱️  Duration: ${currentBuild.durationString}"
                echo "═══════════════════════════════════════════════════════"
            }
        }
    }
}