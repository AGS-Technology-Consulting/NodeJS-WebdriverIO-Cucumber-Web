/**
 * Products Page Object
 * Handles all products page interactions
 * @author Pravin - Senior QA Automation Engineer
 */

const BasePage = require('./BasePage');

class ProductsPage {
    /**
     * Page Locators
     */
    get productsTitle() {
        return $('.title');
    }

    get productsList() {
        return $$('.inventory_item');
    }

    get firstProduct() {
        return $('.inventory_item:first-child .inventory_item_name');
    }

    get sortDropdown() {
        return $('.product_sort_container');
    }

    get addToCartButtons() {
        return $$('button[id^="add-to-cart"]');
    }

    get shoppingCartBadge() {
        return $('.shopping_cart_badge');
    }

    /**
     * Check if on products page
     * @returns {Promise<boolean>}
     */
    async isOnProductsPage() {
        try {
            await BasePage.waitForElement(this.productsTitle, 5000);
            const url = await BasePage.getCurrentUrl();
            return url.includes('inventory');
        } catch (error) {
            return false;
        }
    }

    /**
     * Get products page title
     * @returns {Promise<string>}
     */
    async getPageTitle() {
        return await BasePage.getText(this.productsTitle);
    }

    /**
     * Click on first product
     */
    async clickFirstProduct() {
        await BasePage.clickElement(this.firstProduct);
    }

    /**
     * Get number of products
     * @returns {Promise<number>}
     */
    async getProductsCount() {
        const products = await this.productsList;
        return products.length;
    }

    /**
     * Select sort filter
     * @param {string} filterOption - Filter option to select
     */
    async selectFilter(filterOption) {
        await this.sortDropdown.selectByVisibleText(filterOption);
    }

    /**
     * Add first product to cart
     */
    async addFirstProductToCart() {
        const buttons = await this.addToCartButtons;
        if (buttons.length > 0) {
            await buttons[0].click();
        }
    }

    /**
     * Get cart badge count
     * @returns {Promise<string>}
     */
    async getCartCount() {
        try {
            return await BasePage.getText(this.shoppingCartBadge);
        } catch (error) {
            return '0';
        }
    }
}

module.exports = new ProductsPage();
