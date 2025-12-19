/**
 * WebdriverIO Configuration File
 * Professional Test Automation Framework
 * @author Pravin - Senior QA Automation Engineer
 */

require('dotenv').config();
const path = require('path');
const apiHelper = require('./utils/APIHelper');

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './features/**/*.feature'
    ],
    
    // Patterns to exclude
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    //
    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--window-size=1920,1080',
                    '--disable-blink-features=AutomationControlled',
                    '--disable-extensions',
                    '--disable-infobars',
                    '--start-maximized'
                ],
                prefs: {
                    'download.default_directory': path.join(__dirname, 'downloads'),
                    'download.prompt_for_download': false,
                    'profile.default_content_setting_values.notifications': 2
                }
            },
            acceptInsecureCerts: true,
            'wdio:maxInstances': 1
        }
        // Uncomment for Firefox
        // {
        //     browserName: 'firefox',
        //     'moz:firefoxOptions': {
        //         args: ['-headless', '-width=1920', '-height=1080'],
        //         prefs: {
        //             'browser.download.folderList': 2,
        //             'browser.download.manager.showWhenStarting': false
        //         }
        //     },
        //     acceptInsecureCerts: true
        // }
    ],
    
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    //
    // ==============
    // Test Framework
    // ==============
    framework: 'cucumber',
    
    //
    // =================
    // Test Reporter
    // =================
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true
            }
        ],
        [
            'junit',
            {
                outputDir: './test-results/junit',
                outputFileFormat: function(options) {
                    return `results-${options.cid}.${options.capabilities.browserName}.xml`;
                }
            }
        ],
        [
            'json',
            {
                outputDir: './test-results/json',
                outputFileFormat: function(options) {
                    return `results-${options.cid}.${options.capabilities.browserName}.json`;
                }
            }
        ]
    ],
    
    //
    // =====================
    // Cucumber Configuration
    // =====================
    cucumberOpts: {
        require: [
            './features/step-definitions/**/*.js',
            './features/support/hooks.js'
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    
    //
    // =====
    // Hooks
    // =====
    
    /**
     * Gets executed once before all workers get launched.
     */
    onPrepare: async function (config, capabilities) {
        console.log('\n');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('🚀 WebdriverIO-Cucumber Test Framework Starting');
        console.log('═══════════════════════════════════════════════════════════');
        console.log(`📅 Date: ${new Date().toLocaleString()}`);
        console.log(`🌐 Base URL: ${config.baseUrl}`);
        console.log(`🔧 Framework: ${config.framework}`);
        console.log('═══════════════════════════════════════════════════════════');
        console.log('\n');
        
        // Call API-1: Create Pipeline Run
        await apiHelper.beforeAllTests('webdriverio-cucumber');
    },
    
    /**
     * Gets executed before test execution begins.
     */
    before: async function (capabilities, specs) {
        // Global imports
        global.expect = require('chai').expect;
        global.assert = require('chai').assert;
        
        // Set global timeout
        browser.setTimeout({
            implicit: 10000,
            pageLoad: 30000,
            script: 30000
        });
        
        // Maximize browser window
        try {
            await browser.maximizeWindow();
        } catch (error) {
            console.log('Could not maximize window:', error.message);
        }
    },
    
    /**
     * Gets executed after all tests are done.
     */
    onComplete: async function(exitCode, config, capabilities, results) {
        console.log('\n');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('🏁 Test Execution Completed');
        console.log('═══════════════════════════════════════════════════════════');
        
        // Call API-4: Update Pipeline Run
        await apiHelper.afterAllTests();
        
        console.log('\n');
        console.log('📊 Reports Generated:');
        console.log('   • Allure: ./allure-results');
        console.log('   • JUnit: ./test-results/junit');
        console.log('   • JSON: ./test-results/json');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('\n');
    }
};
