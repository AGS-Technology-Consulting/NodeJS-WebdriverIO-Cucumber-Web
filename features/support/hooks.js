/**
 * Cucumber Hooks
 * Manages test lifecycle and integrates with API Helper
 * @author Pravin - Senior QA Automation Engineer
 */

const { Before, After, BeforeAll, AfterAll, Status } = require('@cucumber/cucumber');
const apiHelper = require('../../utils/APIHelper');
const fs = require('fs-extra');
const path = require('path');

/**
 * Before All Scenarios Hook
 * This runs once before all scenarios
 */
BeforeAll(async function() {
    console.log('\n🎬 Starting Test Suite Execution\n');
    
    // Ensure screenshot directory exists
    const screenshotDir = path.join(process.cwd(), 'screenshots');
    fs.ensureDirSync(screenshotDir);
});

/**
 * Before Each Scenario Hook
 * Runs before each scenario
 */
Before(async function(scenario) {
    console.log(`\n▶️  Starting Scenario: ${scenario.pickle.name}`);
    console.log(`📝 Tags: ${scenario.pickle.tags.map(t => t.name).join(', ') || 'None'}`);
    
    // Mark scenario start time for API tracking
    apiHelper.markScenarioStart();
});

/**
 * After Each Scenario Hook
 * Runs after each scenario - handles screenshots and API calls
 */
After(async function(scenario) {
    const scenarioName = scenario.pickle.name;
    const scenarioStatus = scenario.result.status;
    
    // Map Cucumber status
    const statusMap = {
        [Status.PASSED]: 'PASSED',
        [Status.FAILED]: 'FAILED',
        [Status.SKIPPED]: 'SKIPPED',
        [Status.PENDING]: 'SKIPPED',
        [Status.UNDEFINED]: 'FAILED',
        [Status.AMBIGUOUS]: 'FAILED'
    };
    
    const mappedStatus = statusMap[scenarioStatus] || 'FAILED';
    
    // Get error message if failed
    let errorMessage = null;
    if (scenarioStatus === Status.FAILED && scenario.result.message) {
        errorMessage = scenario.result.message;
    }
    
    // Take screenshot on failure
    if (scenarioStatus === Status.FAILED) {
        try {
            const screenshot = await browser.takeScreenshot();
            const screenshotName = `${scenarioName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.png`;
            const screenshotPath = path.join(process.cwd(), 'screenshots', screenshotName);
            
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
        } catch (error) {
            console.log(`⚠️  Could not take screenshot: ${error.message}`);
        }
    }
    
    // Call API-3: Create Test Case
    await apiHelper.afterEachTest(scenarioName, mappedStatus, errorMessage);
    
    // Log scenario result
    const statusEmoji = {
        'PASSED': '✅',
        'FAILED': '❌',
        'SKIPPED': '⏭️'
    };
    
    console.log(`${statusEmoji[mappedStatus] || '❓'} Scenario ${mappedStatus}: ${scenarioName}\n`);
});

/**
 * After All Scenarios Hook
 * This runs once after all scenarios
 */
AfterAll(async function() {
    console.log('\n🏁 Test Suite Execution Completed\n');
});