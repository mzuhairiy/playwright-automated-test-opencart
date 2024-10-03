import { expect } from '@playwright/test';
import PageElements from '../elements/pageElements';

class ResistStorePage {
    constructor(page) {
        this.page = page;
        this.pageElements = new PageElements(page);
    }

    async gotoAsync(url) {
        await this.page.goto(url);
    }

    async goToLoginPage() {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.CONTINUE_REGISTER_BTN.click();
    }

    async loginFunctions(email, password) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.EMAIL_FIELD.fill(email);
        await this.pageElements.PASSWORD_FIELD.fill(password);
        await this.pageElements.LOGIN_BTN.click();
    }

    async forgottenPassword(email) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.FORGOTTEN_PASSWORD_LINK.click();
        await expect(this.pageElements.FORGOT_PASSWORD_H2).toBeVisible();
        await this.pageElements.FORGOT_PASSWORD_EMAIL_FIELD.fill(email);
        await this.pageElements.CONTINUE_FORGOT_PASSWORD.click();
    }

    async registerFunctions(firstName, lastName, email, password){
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.REGISTER_LINK.click();
        await expect(this.pageElements.REGISTER_ACCOUNT_H1).toBeVisible();
        await this.pageElements.FIRST_NAME_FIELD.fill(firstName);
        await this.pageElements.LAST_NAME_FIELD.fill(lastName);
        await this.pageElements.REGISTER_EMAIL_FIELD.fill(email);
        await this.pageElements.REGISTER_PASSWORD_FIELD.fill(password);
        await this.pageElements.SUBS_NEWSLETTER_TOOGLE.click();
        await this.pageElements.PRIVACY_POLICY_TOOGLE.click();
        await this.pageElements.REGISTER_CONTINUE_BUTTON.click();
        await this.page.waitForTimeout(500);
    }

    async selectRandomProduct(){
        const productCount = await this.pageElements.PRODUCT_IMAGES.count(); // Count the products
        const randomIndex = Math.floor(Math.random() * productCount) + 1; // Select random product
        const randomProductLocator = this.page.locator(`div:nth-child(${randomIndex}) > .product-thumb > .image`);
        console.log(`Total Products: ${productCount}`);
        
        await randomProductLocator.click();
    }

    async assertProductTitleAndAttributes(){
        const title = await this.pageElements.PRODUCT_TITLE_HEADING.textContent(); // Get text from product title
        const productAttributes = await this.pageElements.PRODUCT_ATTRIBUTES.textContent(); // Get text from product attributes
        console.log(`Selected Product: ${title}`); // Print product title
        return title;
    }

    async addRandomProductToCart(){
        const addToCartIcon = await this.page.locator('div.button-group:nth-child(1) > button:nth-child(1)');
        const iconCount = await addToCartIcon.count();
        const randomIndex = Math.floor(Math.random() * iconCount); // Select random add to cart icon
        console.log(`Total add to cart icons: ${iconCount}`);

        await addToCartIcon.nth(randomIndex).click();
        await this.page.waitForTimeout(1000);
    }
}

export default ResistStorePage;