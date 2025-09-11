import { expect } from '@playwright/test';
import AuthElements from '../locators/auth-page-elements.js';
import testData from '../../utils/data.json';

export default class RegisterActions {
    constructor(page) {
        this.page = page;
        this.authElements = new AuthElements(page);
    }

    async gotoAsync(url) {
        await this.page.goto(url);
    }

    async registerFunctions({ firstName, lastName, email, password} ) {
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

    
}