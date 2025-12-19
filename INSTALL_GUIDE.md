# Installation Guide - WebdriverIO-Cucumber Framework

## ✅ VERIFIED PACKAGE VERSIONS

This `package.json` uses **EXACT versions** that are verified to exist in npm registry:

### Core Testing Framework
- `@wdio/cli: 8.39.1` - WebdriverIO CLI
- `@wdio/cucumber-framework: 8.39.0` - Cucumber integration
- `@wdio/local-runner: 8.39.1` - Test runner
- `@cucumber/cucumber: 9.6.0` - Cucumber BDD (stable v9)

### Reporters
- `@wdio/spec-reporter: 8.39.0` - Console reporter
- `@wdio/allure-reporter: 8.38.0` - Allure reporter
- `@wdio/junit-reporter: 8.38.0` - JUnit reporter
- `@wdio/json-reporter: 8.38.0` - JSON reporter
- `allure-commandline: 2.25.0` - Allure CLI

### Browser Drivers
- `chromedriver: 120.0.1` - Chrome driver
- `geckodriver: 4.3.1` - Firefox driver

### Utilities
- `axios: 1.6.0` - HTTP client for API calls
- `chai: 4.3.10` - Assertion library
- `winston: 3.11.0` - Logging
- `dotenv: 16.3.1` - Environment variables
- `fs-extra: 11.2.0` - File system utilities

### Dev Dependencies
- `eslint: 8.55.0` - Code linting
- `eslint-config-airbnb-base: 15.0.0` - Airbnb style guide
- `eslint-plugin-import: 2.29.1` - Import linting

## 🚀 Installation Steps

### Step 1: Extract Framework
```bash
unzip wdio-cucumber-framework.zip
cd wdio-cucumber-framework
```

### Step 2: Install Dependencies
```bash
# Do NOT use sudo!
npm install
```

**Expected output:**
```
added 500+ packages in 2m
```

### Step 3: Configure Environment
```bash
cp .env.example .env
# Edit .env with your API credentials
```

### Step 4: Verify Installation
```bash
# Check WebdriverIO CLI
npx wdio --version
# Should show: 8.39.1

# Check Cucumber
npx cucumber-js --version
# Should show: 9.6.0
```

### Step 5: Run Tests
```bash
# Run all tests (local - no API calls)
npm test

# Or use the interactive runner
chmod +x run-tests.sh
./run-tests.sh
```

## 🔧 Troubleshooting

### Issue: "npm ERR! code ETARGET"
**Solution:** Delete `node_modules` and `package-lock.json`, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "chromedriver version mismatch"
**Solution:** Update chromedriver to match your Chrome version:
```bash
npm install chromedriver@latest --save
```

### Issue: "Cannot find module '@wdio/cli'"
**Solution:** Ensure you're in the correct directory:
```bash
cd wdio-cucumber-framework
npm install
```

### Issue: "Permission denied"
**Solution:** Do NOT use sudo. Fix npm permissions:
```bash
# Fix npm global permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile
```

## 📝 Why These Versions?

### WebdriverIO 8.39.x
- ✅ **Stable** and battle-tested
- ✅ **All packages available** in npm
- ✅ **Production-ready** - used by thousands of projects
- ✅ **Full feature set** - everything you need

### Cucumber 9.6.0
- ✅ **Stable version** - v10 had issues
- ✅ **Full BDD support** with Gherkin
- ✅ **Compatible** with WebdriverIO 8.x
- ✅ **Well documented** and supported

### Exact Versions (No Carets ^)
- ✅ **Reproducible builds** - same versions every time
- ✅ **No surprises** - versions won't change unexpectedly
- ✅ **Verified compatibility** - all packages tested together
- ✅ **Production-safe** - no breaking changes

## 🎯 What Works

✅ All API integration features
✅ Jenkins integration (API calls only in Jenkins)
✅ Local development (API calls skipped)
✅ Multiple reporters (Allure, JUnit, JSON)
✅ Screenshot on failure
✅ Page Object Model
✅ Cucumber hooks
✅ ESLint code quality
✅ Winston logging
✅ Docker support

## 📦 Package Size

After installation:
- **node_modules:** ~500MB
- **Framework code:** ~130KB
- **Total install time:** ~2-3 minutes

## ✅ Success Indicators

After successful installation, you should see:
```bash
wdio-cucumber-framework/
├── node_modules/          # ✅ Created
│   ├── @wdio/
│   ├── @cucumber/
│   └── ... (500+ packages)
├── package-lock.json      # ✅ Created
└── package.json           # ✅ Already there
```

## 🚀 Next Steps

1. **Configure API credentials** in `.env`
2. **Run tests locally** with `npm test`
3. **Set up Jenkins** with the Jenkinsfile
4. **Add your test scenarios** in `features/`
5. **Create page objects** in `pages/`

## 💡 Pro Tips

### Faster Installation
```bash
# Use npm ci for faster, cleaner installs
npm ci
```

### Keep Dependencies Updated
```bash
# Check for updates
npm outdated

# Update specific package
npm update chromedriver
```

### Clean Installation
```bash
# Remove everything and reinstall
npm run clean
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Delete `node_modules` and reinstall
3. Verify Node.js version: `node --version` (should be >=18)
4. Check npm version: `npm --version` (should be >=9)
5. Review error logs in `~/.npm/_logs/`

## 🎉 Ready to Test!

Once installation is successful:
```bash
npm test
```

You should see tests running and creating API calls in Jenkins! 🚀

---

**Framework Version:** 1.0.0  
**WebdriverIO:** 8.39.1  
**Cucumber:** 9.6.0  
**Status:** ✅ Production Ready
