# Troubleshooting Guide - WebdriverIO-Cucumber Framework

## 🔴 Common Error: "You're calling functions on an instance of Cucumber that isn't running"

### Error Message
```
Error: You're calling functions (e.g. "When") on an instance of Cucumber that isn't running.
This means you have an invalid installation, mostly likely due to:
- Cucumber being installed globally
- A project structure where your support code is depending on a different instance of Cucumber
```

### ✅ Solution Steps

#### Step 1: Check for Global Cucumber Installation
```bash
# Check if cucumber is installed globally
npm list -g --depth=0 | grep cucumber

# If found, uninstall it
npm uninstall -g @cucumber/cucumber
npm uninstall -g cucumber
```

#### Step 2: Clean Your Project
```bash
# Remove all node modules and lock file
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force
```

#### Step 3: Reinstall Dependencies
```bash
# Install fresh dependencies
npm install

# Verify installation
npx cucumber-js --version
# Should show: 9.6.0
```

#### Step 4: Verify Step Definition Imports
Make sure your step definition files use the correct import:
```javascript
// ✅ CORRECT
const { Given, When, Then } = require('@cucumber/cucumber');

// ❌ WRONG
const { Given, When, Then } = require('@wdio/cucumber-framework');
```

#### Step 5: Use Cucumber Expressions (Not Regex)
```javascript
// ✅ CORRECT - Cucumber Expressions
Given('I am on the login page', async function() {
    // ...
});

When('I enter username {string}', async function(username) {
    // ...
});

// ❌ AVOID - Regex (can cause issues)
Given(/^I am on the login page$/, async function() {
    // ...
});
```

### 🔧 Complete Fix Script

Run this script to fix the issue:

```bash
#!/bin/bash

echo "🔧 Fixing Cucumber Installation Issue..."

# 1. Uninstall global cucumber
echo "1️⃣ Removing global cucumber installations..."
npm uninstall -g @cucumber/cucumber 2>/dev/null
npm uninstall -g cucumber 2>/dev/null

# 2. Clean project
echo "2️⃣ Cleaning project..."
rm -rf node_modules package-lock.json

# 3. Clear cache
echo "3️⃣ Clearing npm cache..."
npm cache clean --force

# 4. Reinstall
echo "4️⃣ Reinstalling dependencies..."
npm install

# 5. Verify
echo "5️⃣ Verifying installation..."
echo "WebdriverIO version:"
npx wdio --version

echo "Cucumber version:"
npx cucumber-js --version

echo "✅ Done! Try running 'npm test' now."
```

Save this as `fix-cucumber.sh` and run:
```bash
chmod +x fix-cucumber.sh
./fix-cucumber.sh
```

## 🔴 Other Common Errors

### Error: "chromedriver version mismatch"

**Solution:**
```bash
# Check your Chrome version
google-chrome --version
# or
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version

# Install matching chromedriver
# For Chrome 120.x
npm install chromedriver@120 --save

# For latest Chrome
npm install chromedriver@latest --save
```

### Error: "Cannot find module '@wdio/cli'"

**Solution:**
```bash
# Make sure you're in the right directory
cd wdio-cucumber-framework

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Error: "EACCES: permission denied"

**Solution: NEVER use sudo with npm!**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to PATH (for bash)
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile

# Add to PATH (for zsh)
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Now install without sudo
npm install
```

### Error: "Failed to create session"

**Solution:**
```bash
# Kill any running chromedriver processes
pkill -f chromedriver

# Re-run tests
npm test
```

### Error: "Port 4444 already in use"

**Solution:**
```bash
# Find and kill process using port 4444
lsof -ti:4444 | xargs kill -9

# Or use a different port in wdio.conf.js
# (Not recommended, just restart is easier)
```

## 🎯 Pre-Flight Checklist

Before running tests, verify:

```bash
# ✅ Node version (should be >=18)
node --version

# ✅ npm version (should be >=9)
npm --version

# ✅ WebdriverIO installed locally
npx wdio --version
# Should show: 8.39.1

# ✅ Cucumber installed locally
npx cucumber-js --version
# Should show: 9.6.0

# ✅ No global cucumber
npm list -g --depth=0 | grep cucumber
# Should return nothing

# ✅ Chrome browser installed
google-chrome --version
# or
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version
```

## 🐛 Debug Mode

Run tests with debug logging:

```bash
# Debug mode
npm test -- --logLevel=debug

# Trace mode (very verbose)
npm test -- --logLevel=trace
```

## 📝 Still Having Issues?

### 1. Check Your File Structure
```bash
wdio-cucumber-framework/
├── features/
│   ├── *.feature              # Feature files
│   ├── step-definitions/      # Step definitions here
│   │   ├── login.steps.js
│   │   └── products.steps.js
│   └── support/
│       └── hooks.js
├── pages/                     # Page objects
├── node_modules/              # Should exist after npm install
├── package.json              # Should have exact versions
└── wdio.conf.js              # WebdriverIO config
```

### 2. Verify wdio.conf.js cucumberOpts
```javascript
cucumberOpts: {
    require: [
        './features/step-definitions/**/*.js',  // ✅ Correct path
        './features/support/hooks.js'
    ],
    // ... other options
}
```

### 3. Check Node Modules
```bash
# Verify @cucumber/cucumber is installed locally
ls node_modules/@cucumber/cucumber
# Should exist

# Verify @wdio/cucumber-framework is installed
ls node_modules/@wdio/cucumber-framework
# Should exist
```

### 4. Create Minimal Test
Create a simple test to isolate the issue:

**features/test.feature**
```gherkin
Feature: Test
  Scenario: Simple Test
    Given I test the framework
```

**features/step-definitions/test.steps.js**
```javascript
const { Given } = require('@cucumber/cucumber');

Given('I test the framework', async function() {
    console.log('✅ Framework is working!');
});
```

Run:
```bash
npm test -- --spec=./features/test.feature
```

## 📞 Getting Help

If none of these solutions work:

1. **Check the error logs:**
   ```bash
   cat ~/.npm/_logs/*-debug-0.log
   ```

2. **Verify your environment:**
   ```bash
   node --version
   npm --version
   which node
   which npm
   ```

3. **Create a clean test:**
   - Create a new directory
   - Copy only package.json
   - Run `npm install`
   - Copy one feature and one step file
   - Test

## ✅ Success Indicators

After fixing, you should see:

```bash
$ npm test

═══════════════════════════════════════════════════════════
🚀 WebdriverIO-Cucumber Test Framework Starting
═══════════════════════════════════════════════════════════

⚠️  Local run detected - Skipping API calls

[chrome 120.0.0 mac #0-0] Running: chrome
[chrome 120.0.0 mac #0-0] Session ID: abc123...

▶️  Starting Scenario: Successful login with valid credentials
✅ Scenario PASSED: Successful login with valid credentials

Tests: 2 passed, 1 failed, 1 skipped
Time: 45s
```

---

**Remember:** 
- ✅ Never use `sudo npm install`
- ✅ Always check for global cucumber
- ✅ Use cucumber expressions, not regex
- ✅ Keep dependencies in package.json
- ✅ Clean install when in doubt

**Framework Version:** 1.0.0  
**Last Updated:** December 19, 2024  
**Status:** ✅ Production Ready
