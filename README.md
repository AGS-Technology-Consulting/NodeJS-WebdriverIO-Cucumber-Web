# WebdriverIO-Cucumber Professional Test Automation Framework

![WebdriverIO](https://img.shields.io/badge/WebdriverIO-9.2.8-orange)
![Cucumber](https://img.shields.io/badge/Cucumber-11.0.1-green)
![Node](https://img.shields.io/badge/Node-18+-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Overview

Professional test automation framework built with **WebdriverIO v9** and **Cucumber BDD** for end-to-end web application testing. This framework includes enterprise-grade features like Jenkins integration, multiple reporters, API tracking, and CI/CD pipelines.

**Author:** Pravin - Senior QA Automation Engineer  
**Experience:** 5+ years in Test Automation  
**Expertise:** WebdriverIO, Selenium, Cypress, Playwright, Appium

## ✨ Key Features

- ✅ **Latest WebdriverIO 9.2.8** with Cucumber BDD
- ✅ **Page Object Model (POM)** design pattern
- ✅ **Multiple Test Reporters** (Allure, JUnit, JSON, Spec)
- ✅ **Jenkins Integration** with comprehensive Jenkinsfile
- ✅ **GitHub Actions** CI/CD workflow
- ✅ **API Integration** for test execution tracking
- ✅ **Parallel Test Execution** support
- ✅ **Screenshot on Failure** automation
- ✅ **Latest Browser Drivers** (Chrome, Firefox, Edge)
- ✅ **Environment Configuration** management
- ✅ **Professional Logging** with Winston
- ✅ **Chai Assertions** library

## 📋 Prerequisites

- Node.js >= 18.0.0
- NPM >= 9.0.0
- Chrome/Firefox/Edge browser installed
- (Optional) Jenkins for CI/CD
- (Optional) Allure Commandline for reporting

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd wdio-cucumber-framework
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Run Tests

```bash
# Run all tests
npm test

# Run specific tests with tags
npm test -- --cucumberOpts.tagExpression="@smoke"

# Run with specific browser
npm run test:chrome
npm run test:firefox
```

## 📁 Project Structure

```
wdio-cucumber-framework/
├── features/                          # Feature files (BDD scenarios)
│   ├── login.feature                  # Login feature scenarios
│   ├── products.feature               # Products feature scenarios
│   ├── step-definitions/              # Step definition files
│   │   ├── login.steps.js            # Login step implementations
│   │   └── products.steps.js         # Products step implementations
│   └── support/                       # Support files
│       └── hooks.js                   # Cucumber hooks
├── pages/                             # Page Object Model
│   ├── BasePage.js                    # Base page with common methods
│   ├── LoginPage.js                   # Login page object
│   ├── ProductsPage.js                # Products page object
│   └── ProductDetailsPage.js          # Product details page object
├── utils/                             # Utility files
│   └── APIHelper.js                   # API integration helper
├── test-results/                      # Test execution results
│   ├── junit/                         # JUnit XML reports
│   └── json/                          # JSON reports
├── allure-results/                    # Allure test results
├── screenshots/                       # Failure screenshots
├── .github/workflows/                 # GitHub Actions workflows
│   └── test-automation.yml           # CI/CD pipeline
├── wdio.conf.js                      # WebdriverIO configuration
├── Jenkinsfile                       # Jenkins pipeline configuration
├── package.json                      # NPM dependencies
├── .env.example                      # Environment variables template
└── README.md                         # This file
```

## 🧪 Test Scenarios

The framework includes sample test scenarios:

### ✅ Passed Tests (2)
1. **Successful login with valid credentials** - Tests user authentication flow
2. **View product details** - Tests product catalog navigation

### ❌ Failed Test (1)
3. **Login with invalid credentials** - Tests error handling (intentionally fails for demo)

### ⏭️ Skipped Test (1)
4. **Filter products by price** - Pending implementation (work in progress)

## 📊 Test Reporting

### Allure Reports

Generate and open Allure reports:

```bash
npm run report
```

### JUnit Reports

JUnit XML reports are generated automatically at:
```
./test-results/junit/
```

### JSON Reports

JSON reports are generated at:
```
./test-results/json/
```

## 🔧 Configuration

### WebdriverIO Configuration

Main configuration file: `wdio.conf.js`

Key configurations:
- **Framework:** Cucumber
- **Reporters:** Allure, JUnit, JSON, Spec
- **Base URL:** Configurable via environment
- **Timeouts:** Customizable wait times
- **Capabilities:** Browser-specific settings

### Environment Variables

Configure in `.env` file:

```env
# API Configuration
API_BASE_URL=https://your-api-endpoint.dev
API_TOKEN=your_token
ORG_ID=your_org_id
CREATED_BY=your_user_id

# Test Configuration
BASE_URL=https://www.saucedemo.com
TEST_ENV=qa
BROWSER=chrome
```

## 🏗️ Jenkins Integration

### API Tracking Features

The framework automatically tracks test execution in Jenkins:

1. **API-1:** Create Pipeline Run (Before all tests)
   - Captures build metadata
   - Sets up test execution tracking

2. **API-3:** Create Test Case (After each test)
   - Records individual test results
   - Captures test duration and status

3. **API-4:** Update Pipeline Run (After all tests)
   - Updates final test counts
   - Records total execution time

### Running in Jenkins

1. Configure Jenkins credentials:
   - `api-base-url`
   - `api-token`
   - `org-id`
   - `created-by`

2. Create Jenkins pipeline job pointing to Jenkinsfile

3. Configure build parameters:
   - **BROWSER:** chrome/firefox/edge
   - **ENVIRONMENT:** qa/staging/production
   - **TAG:** Cucumber tags (@smoke, @regression)
   - **PARALLEL_EXECUTION:** true/false

### Pipeline Parameters

- **Browser Selection:** Chrome, Firefox, Edge
- **Environment:** QA, Staging, Production
- **Cucumber Tags:** Run specific test scenarios
- **Parallel Execution:** Enable/disable parallel runs

## 🚀 CI/CD with GitHub Actions

The framework includes a complete GitHub Actions workflow:

### Features:
- ✅ Automated test execution on push/PR
- ✅ Scheduled daily test runs (2 AM UTC)
- ✅ Manual workflow dispatch with parameters
- ✅ Multi-node matrix testing (Node 18.x, 20.x)
- ✅ Artifact upload for test results
- ✅ Allure report generation
- ✅ GitHub Pages deployment for reports
- ✅ PR comments with test results
- ✅ Email notifications on failure

### Configuration

Set these secrets in your GitHub repository:

```
API_BASE_URL
API_TOKEN
ORG_ID
CREATED_BY
EMAIL_USERNAME (for notifications)
EMAIL_PASSWORD (for notifications)
NOTIFICATION_EMAIL
```

## 📝 Writing Tests

### 1. Create Feature File

```gherkin
@regression @checkout
Feature: Shopping Cart Checkout
  As a user
  I want to checkout items from my cart
  So that I can complete my purchase

  @smoke
  Scenario: Successful checkout
    Given I have items in my cart
    When I proceed to checkout
    Then I should see the checkout page
```

### 2. Create Page Object

```javascript
const BasePage = require('./BasePage');

class CheckoutPage {
    get checkoutButton() {
        return $('#checkout');
    }

    async clickCheckout() {
        await BasePage.clickElement(this.checkoutButton);
    }
}

module.exports = new CheckoutPage();
```

### 3. Create Step Definitions

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const CheckoutPage = require('../../pages/CheckoutPage');

When('I proceed to checkout', async function() {
    await CheckoutPage.clickCheckout();
});
```

## 🎯 Best Practices

1. **Page Object Model:** All UI interactions through page objects
2. **DRY Principle:** Reusable methods in BasePage
3. **Explicit Waits:** Use waitForElement, waitForClickable
4. **Descriptive Names:** Clear scenario and step names
5. **Error Handling:** Try-catch blocks for robust tests
6. **Screenshots:** Automatic capture on failures
7. **Logging:** Winston logger for detailed execution logs

## 🔍 Debugging

### Local Debugging

```bash
# Run tests with debug logs
npm test -- --logLevel=debug

# Run specific feature file
npm test -- --spec=./features/login.feature

# Run with specific tag
npm test -- --cucumberOpts.tagExpression="@smoke"
```

### Jenkins Debugging

Check these logs in Jenkins:
- Console Output
- Allure Reports
- JUnit Reports
- Screenshot Artifacts

## 📈 Continuous Improvement

### Future Enhancements
- [ ] Docker containerization
- [ ] Cross-browser testing in cloud (BrowserStack/Sauce Labs)
- [ ] Visual regression testing
- [ ] Performance testing integration
- [ ] API test automation
- [ ] Mobile testing with Appium

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**AGS - Technology Consulting**

## 📞 Support

For issues, questions, or contributions:
- Open an issue in the repository
- Contact via Upwork profile
- Email: [Your email]

## 🙏 Acknowledgments

- WebdriverIO Team
- Cucumber.js Team
- Allure Framework Team
- Open Source Community

---

**Happy Testing! 🚀**
