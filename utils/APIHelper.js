/**
 * API Helper for WebdriverIO-Cucumber Framework
 * Handles API integration with Jenkins for test execution tracking
 * @author Pravin - Senior QA Automation Engineer
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const winston = require('winston');

class APIHelper {
    constructor() {
        // Environment detection
        this.isJenkins = process.env.JENKINS_URL !== undefined || 
                        process.env.BUILD_NUMBER !== undefined;
        
        // API Configuration
        this.apiBaseURL = process.env.API_BASE_URL || 'https://unsobering-maribeth-hokey.ngrok-free.dev';
        this.apiToken = process.env.API_TOKEN || 'D_YIqZ4D0tYVgFTWKEaRVImEpiq3vzZkOB40lKDDSRk';
        this.orgId = process.env.ORG_ID || '374060a8-925c-49aa-8495-8a823949f3e0';
        this.createdBy = process.env.CREATED_BY || 'c9279b2d-701c-48eb-9122-fbeae465771c';
        
        // API Headers
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiToken}`
        };
        
        // Configuration
        this.timeout = 10000;
        this.pipelineRunId = null;
        this.startTime = null;
        this.scenarioStartTime = null;
        
        // Test case tracking
        this.testCasesFile = path.join(process.cwd(), '.wdio-results', '.test-cases.json');
        this.resultsDir = path.join(process.cwd(), '.wdio-results');
        
        // Logger setup
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'HH:mm:ss' }),
                winston.format.printf(({ timestamp, message }) => `${timestamp}  ${message}`)
            ),
            transports: [
                new winston.transports.Console()
            ]
        });

        // Ensure results directory exists
        this.initializeResultsDirectory();
    }

    // ==================== INITIALIZATION ====================

    initializeResultsDirectory() {
        try {
            if (!fs.existsSync(this.resultsDir)) {
                fs.mkdirSync(this.resultsDir, { recursive: true });
            }
        } catch (error) {
            this.logger.error(`❌ Could not create results directory: ${error.message}`);
        }
    }

    // ==================== UTILITY METHODS ====================

    getCurrentTimestamp() {
        return new Date().toISOString();
    }

    log(message) {
        this.logger.info(message);
    }

    getJenkinsMetadata() {
        return {
            buildNumber: process.env.BUILD_NUMBER || '',
            buildUrl: process.env.BUILD_URL || '',
            jobName: process.env.JOB_NAME || 'wdio-cucumber-framework',
            gitBranch: process.env.GIT_BRANCH || process.env.BRANCH_NAME || 'main',
            gitCommit: process.env.GIT_COMMIT || '',
            triggeredBy: process.env.BUILD_USER || process.env.BUILD_USER_ID || 'jenkins'
        };
    }

    getBrowserInfo() {
        // Browser object not available in onPrepare hook, use environment variables
        if (typeof browser === 'undefined' || !browser.capabilities) {
            return {
                browserName: process.env.BROWSER || 'chrome',
                browserVersion: 'latest',
                platformName: process.platform
            };
        }
        
        // Browser available (in hooks), use actual capabilities
        const capabilities = browser.capabilities || {};
        return {
            browserName: capabilities.browserName || 'chrome',
            browserVersion: capabilities.browserVersion || 'latest',
            platformName: capabilities.platformName || process.platform
        };
    }

    clearTestCasesFile() {
        try {
            fs.ensureDirSync(path.dirname(this.testCasesFile));
            fs.writeJsonSync(this.testCasesFile, [], { spaces: 2 });
            this.log('🗑️  Cleared test cases file');
        } catch (error) {
            this.log(`⚠️  Could not clear test cases file: ${error.message}`);
        }
    }

    saveTestCaseToFile(testId, name, status, duration) {
        try {
            let testCases = [];
            if (fs.existsSync(this.testCasesFile)) {
                testCases = fs.readJsonSync(this.testCasesFile);
            }

            testCases.push({
                test_id: testId,
                name: name,
                status: status,
                duration: duration
            });

            fs.writeJsonSync(this.testCasesFile, testCases, { spaces: 2 });
            this.log(`💾 Saved test case to file: ${name}`);
        } catch (error) {
            this.log(`⚠️  Could not save test case: ${error.message}`);
        }
    }

    readTestCasesFromFile() {
        try {
            if (!fs.existsSync(this.testCasesFile)) {
                this.log('⚠️  Test cases file not found');
                return [];
            }

            const testCases = fs.readJsonSync(this.testCasesFile);
            this.log(`📖 Read ${testCases.length} test cases from file`);
            return testCases;
        } catch (error) {
            this.log(`⚠️  Could not read test cases file: ${error.message}`);
            return [];
        }
    }

    // ==================== API METHODS ====================

    /**
     * API-1: Create Pipeline Run (Before All Tests)
     * Called from Cucumber Before hook
     */
    async beforeAllTests(frameworkName = 'webdriverio-cucumber') {
        if (!this.isJenkins) {
            this.log('⚠️  Local run detected - Skipping API calls');
            this.log('💡 Set JENKINS_URL or BUILD_NUMBER environment variable to enable API tracking');
            return null;
        }

        this.startTime = new Date();
        this.clearTestCasesFile();

        this.log('');
        this.log('═══════════════════════════════════════════════════════════');
        this.log('📡 API-1: Creating Pipeline Run with Jenkins Metadata');
        this.log('═══════════════════════════════════════════════════════════');
        this.log(`⏰ Start Time: ${this.getCurrentTimestamp()}`);

        try {
            const jenkinsMetadata = this.getJenkinsMetadata();
            const browserInfo = this.getBrowserInfo();
            const buildNumber = parseInt(jenkinsMetadata.buildNumber) || 0;

            const payload = {
                name: jenkinsMetadata.jobName,
                repo_name: 'wdio-cucumber-automation',
                environment: process.env.TEST_ENV || 'qa',
                org: this.orgId,
                created_by: this.createdBy,
                build_number: buildNumber,
                status: 'running',
                branch: jenkinsMetadata.gitBranch,
                triggered_by: jenkinsMetadata.triggeredBy,
                start_time: this.getCurrentTimestamp(),
                total_tests: 0,
                passed: 0,
                failed: 0,
                aborted: 0,
                framework: frameworkName,
                browser: browserInfo.browserName
            };

            this.log(`📤 API Endpoint: ${this.apiBaseURL}/api/pipeline-runs/`);
            this.log(`📦 Payload: ${JSON.stringify(payload, null, 2)}`);

            const response = await axios.post(
                `${this.apiBaseURL}/api/pipeline-runs/`,
                payload,
                {
                    headers: this.headers,
                    timeout: this.timeout
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const data = response.data;
                this.pipelineRunId = data.pipeline_run?.run_id || data.id;

                this.log('');
                this.log('✅ API-1 SUCCESS: Pipeline Run Created');
                this.log(`🆔 Pipeline Run ID: ${this.pipelineRunId}`);
                this.log(`🏗️  Build Number: ${buildNumber}`);
                this.log(`🌿 Branch: ${jenkinsMetadata.gitBranch}`);
                this.log(`🌐 Browser: ${browserInfo.browserName}`);
                this.log('═══════════════════════════════════════════════════════════');
                this.log('');

                return data;
            } else {
                this.log('❌ API-1 ERROR: Unexpected Response');
                this.log(`   Status Code: ${response.status}`);
                this.log(`   Response: ${JSON.stringify(response.data)}`);
                return null;
            }
        } catch (error) {
            this.log(`❌ API-1 ERROR: ${error.message}`);
            if (error.response) {
                this.log(`   Status Code: ${error.response.status}`);
                this.log(`   Response: ${JSON.stringify(error.response.data)}`);
            }
            return null;
        }
    }

    /**
     * Mark the start time of a scenario
     */
    markScenarioStart() {
        this.scenarioStartTime = new Date();
    }

    /**
     * API-3: Create Test Case (After Each Scenario)
     * Called from Cucumber AfterScenario hook
     */
    async afterEachTest(scenarioName, status, errorMessage = null) {
        if (!this.isJenkins) {
            return null;
        }

        if (!this.pipelineRunId) {
            this.log('❌ API-3 Skipped: No Pipeline Run ID available');
            return null;
        }

        // Calculate duration
        const endTime = new Date();
        const durationMs = this.scenarioStartTime 
            ? (endTime - this.scenarioStartTime) 
            : 0;
        const durationSeconds = durationMs / 1000.0;

        // Map Cucumber status to API status
        const statusMap = {
            'PASSED': 'passed',
            'FAILED': 'failed',
            'SKIPPED': 'skipped',
            'PENDING': 'skipped',
            'UNDEFINED': 'failed',
            'AMBIGUOUS': 'failed'
        };
        const apiStatus = statusMap[status] || 'failed';

        const statusEmoji = {
            'passed': '✅',
            'failed': '❌',
            'skipped': '⏭️'
        };

        this.log('');
        this.log('───────────────────────────────────────────────────────────');
        this.log(`📡 API-3: Creating Test Case - ${statusEmoji[apiStatus]} ${scenarioName}`);
        this.log(`⏱️  Duration: ${durationSeconds.toFixed(2)}s | Status: ${apiStatus.toUpperCase()}`);

        try {
            const payload = {
                name: scenarioName,
                status: apiStatus,
                run: this.pipelineRunId,
                duration: parseFloat(durationSeconds.toFixed(2)),
                created_at: this.getCurrentTimestamp(),
                start_time: this.scenarioStartTime ? this.scenarioStartTime.toISOString() : this.getCurrentTimestamp()
            };

            // Add error message if present
            if (errorMessage && apiStatus === 'failed') {
                payload.error_message = errorMessage.substring(0, 500); // Limit error message length
            }

            const response = await axios.post(
                `${this.apiBaseURL}/api/test-cases/`,
                payload,
                {
                    headers: this.headers,
                    timeout: this.timeout
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const data = response.data;
                const testCaseId = data.test_id || 'N/A';

                this.log(`✅ API-3 SUCCESS: Test Case Created`);
                this.log(`🆔 Test Case ID: ${testCaseId}`);

                // Save to file for final count
                this.saveTestCaseToFile(testCaseId, scenarioName, apiStatus, durationSeconds);

                return data;
            } else {
                this.log(`❌ API-3 ERROR: ${response.status}`);
                this.log(`   Response: ${JSON.stringify(response.data)}`);
                return null;
            }
        } catch (error) {
            this.log(`❌ API-3 ERROR: ${error.message}`);
            if (error.response) {
                this.log(`   Status: ${error.response.status}`);
                this.log(`   Response: ${JSON.stringify(error.response.data)}`);
            }
            return null;
        }
    }

    /**
     * API-4: Update Pipeline Run (After All Tests)
     * Called from Cucumber After hook
     */
    async afterAllTests() {
        if (!this.isJenkins) {
            this.log('⚠️  Local run - Skipping API calls');
            return null;
        }

        if (!this.pipelineRunId) {
            this.log('❌ API-4 Skipped: No Pipeline Run ID available');
            return null;
        }

        this.log('');
        this.log('═══════════════════════════════════════════════════════════');
        this.log('📡 API-4: Updating Pipeline Run with Final Results');
        this.log('═══════════════════════════════════════════════════════════');

        try {
            // Read test cases from file for accurate counts
            const testCases = this.readTestCasesFromFile();

            let finalTotal, finalPassed, finalFailed, finalSkipped;

            if (testCases.length > 0) {
                finalTotal = testCases.length;
                finalPassed = testCases.filter(tc => tc.status === 'passed').length;
                finalFailed = testCases.filter(tc => tc.status === 'failed').length;
                finalSkipped = testCases.filter(tc => tc.status === 'skipped').length;
            } else {
                finalTotal = 0;
                finalPassed = 0;
                finalFailed = 0;
                finalSkipped = 0;
            }

            const finalStatus = finalFailed === 0 ? 'passed' : 'failed';
            const endTime = new Date();
            const durationSeconds = this.startTime 
                ? Math.floor((endTime - this.startTime) / 1000) 
                : 0;

            const payload = {
                status: finalStatus,
                end_time: this.getCurrentTimestamp(),
                duration: durationSeconds,
                total_tests: finalTotal,
                passed: finalPassed,
                failed: finalFailed,
                aborted: finalSkipped
            };

            this.log(`📤 API Endpoint: ${this.apiBaseURL}/api/pipeline-runs/${this.pipelineRunId}/`);
            this.log(`📦 Payload: ${JSON.stringify(payload, null, 2)}`);

            const response = await axios.patch(
                `${this.apiBaseURL}/api/pipeline-runs/${this.pipelineRunId}/`,
                payload,
                {
                    headers: this.headers,
                    timeout: this.timeout
                }
            );

            if (response.status >= 200 && response.status < 300) {
                this.log('');
                this.log('✅ API-4 SUCCESS: Pipeline Run Updated');
                this.log('───────────────────────────────────────────────────────────');
                this.log(`📊 Final Status: ${finalStatus.toUpperCase()}`);
                this.log(`⏱️  Total Duration: ${durationSeconds}s`);
                this.log(`📈 Test Summary:`);
                this.log(`   Total Tests: ${finalTotal}`);
                this.log(`   ✅ Passed: ${finalPassed}`);
                this.log(`   ❌ Failed: ${finalFailed}`);
                this.log(`   ⏭️  Skipped: ${finalSkipped}`);
                this.log('═══════════════════════════════════════════════════════════');
                this.log('');

                return response.data;
            } else {
                this.log(`❌ API-4 ERROR: ${response.status}`);
                this.log(`   Response: ${JSON.stringify(response.data)}`);
                return null;
            }
        } catch (error) {
            this.log(`❌ API-4 ERROR: ${error.message}`);
            if (error.response) {
                this.log(`   Status: ${error.response.status}`);
                this.log(`   Response: ${JSON.stringify(error.response.data)}`);
            }
            return null;
        }
    }
}

module.exports = new APIHelper();
