/**
 * Products Step Definitions
 * @author Pravin - Senior QA Automation Engineer
 */

const { When, Then } = require('@cucumber/cucumber');
const ProductsPage = require('../../pages/ProductsPage');
const ProductDetailsPage = require('../../pages/ProductDetailsPage');

When('I am on the products page', async function() {
    const isOnProductsPage = await ProductsPage.isOnProductsPage();
    expect(isOnProductsPage).to.be.true;
});

When('I click on the first product', async function() {
    await ProductsPage.clickFirstProduct();
    await browser.pause(1000);
});

When('I select filter {string}', async function(filterOption) {
    await ProductsPage.selectFilter(filterOption);
    await browser.pause(1000);
});

Then('I should see the product details page', async function() {
    const isOnDetailsPage = await ProductDetailsPage.isOnProductDetailsPage();
    expect(isOnDetailsPage).to.be.true;
});

Then('I should see the product name', async function() {
    const productName = await ProductDetailsPage.getProductName();
    expect(productName).to.not.be.empty;
    expect(productName.length).to.be.greaterThan(0);
});

Then('I should see the product price', async function() {
    const productPrice = await ProductDetailsPage.getProductPrice();
    expect(productPrice).to.not.be.empty;
    expect(productPrice).to.include('$');
});

Then('products should be sorted by price ascending', async function() {
    return 'pending';
});