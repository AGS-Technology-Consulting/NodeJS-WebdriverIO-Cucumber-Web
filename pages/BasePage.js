/**
 * Base Page Object
 * Contains common methods used across all page objects
 * @author Pravin - Senior QA Automation Engineer
 */

class BasePage {
    /**
     * Wait for element to be displayed
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for element to be clickable
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForClickable(element, timeout = 10000) {
        await element.waitForClickable({ timeout });
    }

    /**
     * Click on element
     * @param {WebdriverIO.Element} element - Element to click
     */
    async clickElement(element) {
        await this.waitForClickable(element);
        await element.click();
    }

    /**
     * Set value to input field
     * @param {WebdriverIO.Element} element - Input element
     * @param {string} value - Value to set
     */
    async setValue(element, value) {
        await this.waitForElement(element);
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Get text from element
     * @param {WebdriverIO.Element} element - Element to get text from
     * @returns {Promise<string>}
     */
    async getText(element) {
        await this.waitForElement(element);
        return await element.getText();
    }

    /**
     * Check if element is displayed
     * @param {WebdriverIO.Element} element - Element to check
     * @returns {Promise<boolean>}
     */
    async isDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Navigate to URL
     * @param {string} url - URL to navigate to
     */
    async navigateTo(url) {
        await browser.url(url);
    }

    /**
     * Get current URL
     * @returns {Promise<string>}
     */
    async getCurrentUrl() {
        return await browser.getUrl();
    }

    /**
     * Wait for page to load
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForPageLoad(timeout = 30000) {
        await browser.waitUntil(
            async () => await browser.execute(() => document.readyState === 'complete'),
            {
                timeout,
                timeoutMsg: 'Page did not load within the specified time'
            }
        );
    }

    /**
     * Scroll to element
     * @param {WebdriverIO.Element} element - Element to scroll to
     */
    async scrollToElement(element) {
        await element.scrollIntoView();
    }

    /**
     * Take screenshot
     * @param {string} filename - Screenshot filename
     */
    async takeScreenshot(filename) {
        await browser.saveScreenshot(`./screenshots/${filename}.png`);
    }

    /**
     * Pause execution
     * @param {number} milliseconds - Time to pause in milliseconds
     */
    async pause(milliseconds) {
        await browser.pause(milliseconds);
    }
}

module.exports = new BasePage();
