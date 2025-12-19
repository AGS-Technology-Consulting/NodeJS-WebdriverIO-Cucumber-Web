/**
 * Login Page Object
 * Handles all login page interactions
 * @author Pravin - Senior QA Automation Engineer
 */

const BasePage = require('./BasePage');

class LoginPage {
    /**
     * Page Locators
     */
    get usernameInput() {
        return $('#user-name');
    }

    get passwordInput() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }

    get errorMessage() {
        return $('[data-test="error"]');
    }

    get errorButton() {
        return $('.error-button');
    }

    /**
     * Navigate to login page
     */
    async open() {
        await BasePage.navigateTo('/');
        await BasePage.waitForPageLoad();
    }

    /**
     * Enter username
     * @param {string} username - Username to enter
     */
    async enterUsername(username) {
        await BasePage.setValue(this.usernameInput, username);
    }

    /**
     * Enter password
     * @param {string} password - Password to enter
     */
    async enterPassword(password) {
        await BasePage.setValue(this.passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        await BasePage.clickElement(this.loginButton);
    }

    /**
     * Perform login
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    /**
     * Check if error message is displayed
     * @returns {Promise<boolean>}
     */
    async isErrorMessageDisplayed() {
        return await BasePage.isDisplayed(this.errorMessage);
    }

    /**
     * Get error message text
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        return await BasePage.getText(this.errorMessage);
    }

    /**
     * Check if on login page
     * @returns {Promise<boolean>}
     */
    async isOnLoginPage() {
        return await BasePage.isDisplayed(this.loginButton);
    }
}

module.exports = new LoginPage();
