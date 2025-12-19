# Contributing to WebdriverIO-Cucumber Framework

Thank you for your interest in contributing! This document provides guidelines and steps for contributing.

## 🤝 How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating an issue
3. **Include details:**
   - WebdriverIO version
   - Browser and OS
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs if applicable

### Suggesting Enhancements

1. **Check existing feature requests**
2. **Describe the enhancement** clearly
3. **Explain the use case**
4. **Provide examples** if possible

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following the coding standards
4. **Write/update tests** for your changes
5. **Ensure tests pass:**
   ```bash
   npm test
   npm run lint
   ```
6. **Commit with clear messages:**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork:**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

## 📝 Coding Standards

### JavaScript Style Guide

- Use **ES6+** syntax
- Follow **Airbnb JavaScript Style Guide**
- Use **4 spaces** for indentation
- Maximum line length: **120 characters**
- Use **single quotes** for strings
- Use **semicolons**

### Naming Conventions

- **Page Objects:** PascalCase (e.g., `LoginPage.js`)
- **Methods:** camelCase (e.g., `clickLoginButton()`)
- **Variables:** camelCase (e.g., `userName`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_TIMEOUT`)
- **Feature Files:** kebab-case (e.g., `user-login.feature`)

### File Structure

```
features/
├── feature-name.feature          # Feature file
├── step-definitions/
│   └── feature-name.steps.js    # Step definitions
└── support/
    └── hooks.js                  # Hooks

pages/
└── PageName.js                   # Page object

utils/
└── HelperName.js                 # Utility helpers
```

### Commit Message Format

Follow the **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(login): add remember me functionality
fix(api): correct timeout handling in API helper
docs(readme): update installation instructions
test(checkout): add checkout validation tests
```

## 🧪 Testing Guidelines

### Writing Tests

1. **Follow BDD principles:**
   ```gherkin
   Scenario: User logs in successfully
     Given I am on the login page
     When I enter valid credentials
     And I click the login button
     Then I should be redirected to dashboard
   ```

2. **Use Page Object Model:**
   ```javascript
   // Good
   await LoginPage.login(username, password);
   
   // Bad
   await $('#username').setValue(username);
   ```

3. **Write clear assertions:**
   ```javascript
   // Good
   expect(await ProductsPage.getPageTitle()).to.equal('Products');
   
   // Bad
   expect(title).to.equal('Products');
   ```

### Test Organization

- **One feature per file**
- **Related scenarios together**
- **Use tags appropriately:** `@smoke`, `@regression`, `@skip`
- **Background for common steps**

## 📊 Documentation

### Code Comments

- **Use JSDoc** for functions and classes
- **Explain why, not what** when commenting
- **Keep comments updated** with code changes

```javascript
/**
 * Login to the application
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<void>}
 */
async login(username, password) {
    // Implementation
}
```

### README Updates

- Update README when adding features
- Include examples for new functionality
- Update configuration sections as needed

## 🔍 Code Review Process

### For Reviewers

- **Be constructive** and respectful
- **Explain reasoning** behind suggestions
- **Focus on:**
  - Code quality
  - Test coverage
  - Documentation
  - Performance
  - Security

### For Contributors

- **Respond to feedback** promptly
- **Ask questions** if unclear
- **Make requested changes** or discuss alternatives
- **Keep PR scope focused**

## ✅ Checklist Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No linting errors
- [ ] Commit messages follow convention
- [ ] PR description is clear

## 🚀 Development Setup

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/your-username/wdio-cucumber-framework.git

# Add upstream remote
git remote add upstream https://github.com/original/wdio-cucumber-framework.git

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Staying Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### Running Tests Locally

```bash
# All tests
npm test

# Specific tag
npm test -- --cucumberOpts.tagExpression="@smoke"

# Lint check
npm run lint

# Generate report
npm run report
```

## 📞 Getting Help

- **Create an issue** for questions
- **Check existing issues** first
- **Join discussions** in the repository
- **Contact maintainers** for urgent matters

## 🙏 Recognition

Contributors will be:
- Listed in the README
- Acknowledged in release notes
- Credited in commit history

Thank you for contributing to make this framework better! 🚀
