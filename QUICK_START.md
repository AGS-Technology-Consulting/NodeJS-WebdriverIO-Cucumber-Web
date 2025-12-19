# Quick Start Guide

Get started with the WebdriverIO-Cucumber framework in 5 minutes!

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Chrome browser (for running tests)

## 🚀 Installation

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd wdio-cucumber-framework

# Run setup script
./setup.sh
```

The setup script will:
- ✅ Check prerequisites
- ✅ Install dependencies
- ✅ Create environment file
- ✅ Set up directories
- ✅ Install browser drivers

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Create directories
mkdir -p test-results allure-results screenshots .wdio-results
```

## ⚙️ Configuration

Edit the `.env` file with your settings:

```env
# Required for API tracking in Jenkins
API_BASE_URL=https://your-api-endpoint.dev
API_TOKEN=your_token
ORG_ID=your_org_id
CREATED_BY=your_user_id

# Test settings
BASE_URL=https://www.saucedemo.com
BROWSER=chrome
```

## 🧪 Running Tests

### Quick Commands

```bash
# Run all tests
npm test

# Run smoke tests only
npm test -- --cucumberOpts.tagExpression="@smoke"

# Run specific feature
npm test -- --spec=./features/login.feature

# Run with specific browser
BROWSER=firefox npm test
```

### Using the Interactive Test Runner

```bash
./run-tests.sh
```

This provides a menu-driven interface for:
- Running different test suites
- Selecting browsers
- Generating reports
- Cleaning results

## 📊 Viewing Reports

### Generate Allure Report

```bash
npm run report
```

This will:
1. Generate the Allure report
2. Open it in your default browser

### Other Reports

Reports are automatically generated in:
- **JUnit XML:** `./test-results/junit/`
- **JSON:** `./test-results/json/`
- **Screenshots:** `./screenshots/`

## 🎯 Test Scenarios

The framework includes 4 sample scenarios:

### ✅ Passing Tests (2)
1. **Successful login** - Tests authentication with valid credentials
2. **View product details** - Tests product catalog navigation

### ❌ Failing Test (1)
3. **Invalid login** - Tests error handling (intentionally fails for demo)

### ⏭️ Skipped Test (1)
4. **Product filter** - Pending implementation (work in progress)

## 🔧 Jenkins Integration

### Local Testing (No API Calls)

When running locally, the API helper automatically detects this and skips API calls:

```bash
# Local run - no API tracking
npm test
```

Console will show:
```
⚠️  Local run detected - Skipping API calls
```

### Jenkins Testing (With API Calls)

When running in Jenkins, API calls are automatically made:

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        // API credentials from Jenkins
        API_BASE_URL = credentials('api-base-url')
        API_TOKEN = credentials('api-token')
    }
    
    stages {
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
```

Console will show:
```
═══════════════════════════════════════════════════════════
📡 API-1: Creating Pipeline Run with Jenkins Metadata
═══════════════════════════════════════════════════════════
✅ API-1 SUCCESS: Pipeline Run Created
🆔 Pipeline Run ID: abc-123-xyz
```

## 🐛 Troubleshooting

### Tests not running?

```bash
# Check Node version
node --version  # Should be >= 18.0.0

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Browser not launching?

```bash
# Install/update browser drivers
npm install chromedriver --save-dev
npm install geckodriver --save-dev
```

### Port already in use?

```bash
# Kill process on port 4444
lsof -ti:4444 | xargs kill -9
```

## 📚 Next Steps

1. **Read the Full Documentation**
   - [README.md](README.md) - Complete guide
   - [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute

2. **Explore the Framework**
   - Check `features/` for test scenarios
   - Review `pages/` for page objects
   - Examine `utils/` for helpers

3. **Write Your Tests**
   - Create new feature files
   - Add page objects
   - Implement step definitions

4. **Set Up CI/CD**
   - Configure Jenkins pipeline
   - Set up GitHub Actions
   - Add API credentials

## 💡 Tips

- Use `@smoke` tag for critical tests
- Use `@skip` or `@wip` for work-in-progress
- Take screenshots on failures automatically
- Review Allure reports for detailed insights
- Use the interactive test runner for convenience

## 🆘 Getting Help

- Check [README.md](README.md) for detailed documentation
- Review example tests in `features/`
- Create an issue for bugs or questions
- Contact: [Your contact information]

---

**Ready to test! 🚀**

Happy testing with WebdriverIO-Cucumber Framework!
