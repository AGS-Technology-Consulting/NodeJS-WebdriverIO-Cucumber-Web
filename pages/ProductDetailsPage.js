/**
 * Product Details Page Object
 * Handles product details page interactions
 * @author Pravin - Senior QA Automation Engineer
 */

const BasePage = require('./BasePage');

class ProductDetailsPage {
    /**
     * Page Locators
     */
    get productName() {
        return $('.inventory_details_name');
    }

    get productDescription() {
        return $('.inventory_details_desc');
    }

    get productPrice() {
        return $('.inventory_details_price');
    }

    get productImage() {
        return $('.inventory_details_img');
    }

    get backButton() {
        return $('#back-to-products');
    }

    get addToCartButton() {
        return $('button[id^="add-to-cart"]');
    }

    /**
     * Check if on product details page
     * @returns {Promise<boolean>}
     */
    async isOnProductDetailsPage() {
        try {
            await BasePage.waitForElement(this.productName, 5000);
            const url = await BasePage.getCurrentUrl();
            return url.includes('inventory-item');
        } catch (error) {
            return false;
        }
    }

    /**
     * Get product name
     * @returns {Promise<string>}
     */
    async getProductName() {
        return await BasePage.getText(this.productName);
    }

    /**
     * Get product price
     * @returns {Promise<string>}
     */
    async getProductPrice() {
        return await BasePage.getText(this.productPrice);
    }

    /**
     * Get product description
     * @returns {Promise<string>}
     */
    async getProductDescription() {
        return await BasePage.getText(this.productDescription);
    }

    /**
     * Check if product image is displayed
     * @returns {Promise<boolean>}
     */
    async isProductImageDisplayed() {
        return await BasePage.isDisplayed(this.productImage);
    }

    /**
     * Click back to products button
     */
    async clickBackButton() {
        await BasePage.clickElement(this.backButton);
    }

    /**
     * Add product to cart
     */
    async addToCart() {
        await BasePage.clickElement(this.addToCartButton);
    }
}

module.exports = new ProductDetailsPage();
