/**
 * Login Step Definitions
 * @author Pravin - Senior QA Automation Engineer
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');

Given('I am on the login page', async function() {
    await LoginPage.open();
    const isOnLoginPage = await LoginPage.isOnLoginPage();
    expect(isOnLoginPage).to.be.true;
});

Given('I am logged in as {string}', async function(username) {
    await LoginPage.open();
    await LoginPage.login(username, 'secret_sauce');
    await browser.pause(1000);
    const isOnProductsPage = await ProductsPage.isOnProductsPage();
    expect(isOnProductsPage).to.be.true;
});

When('I enter username {string}', async function(username) {
    await LoginPage.enterUsername(username);
});

When('I enter password {string}', async function(password) {
    await LoginPage.enterPassword(password);
});

When('I click on the login button', async function() {
    await LoginPage.clickLogin();
    await browser.pause(1000);
});

Then('I should be redirected to the products page', async function() {
    const isOnProductsPage = await ProductsPage.isOnProductsPage();
    expect(isOnProductsPage).to.be.true;
});

Then('I should see the products title {string}', async function(expectedTitle) {
    const actualTitle = await ProductsPage.getPageTitle();
    expect(actualTitle).to.equal(expectedTitle);
});

Then('I should see an error message', async function() {
    const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
    const errorText = await LoginPage.getErrorMessage();
    expect(errorText).to.include('Epic sadface');
});

Then('I should remain on the login page', async function() {
    const isOnLoginPage = await LoginPage.isOnLoginPage();
    expect(isOnLoginPage).to.be.true;
});