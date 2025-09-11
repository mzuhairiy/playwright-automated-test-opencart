import { expect } from '@playwright/test';
import AuthElements from '../locators/auth-page-elements.js';
import testData from '../../utils/data.json';

export default class LoginActions {
    constructor(page) {
        this.page = page;
        this.authElements = new AuthElements(page);
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

    async loginToHomepage(email, password) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.EMAIL_FIELD.fill(email);
        await this.pageElements.PASSWORD_FIELD.fill(password);
        await this.pageElements.LOGIN_BTN.click();
        await expect(this.pageElements.MY_ACCOUNT_H2).toBeVisible();
        await this.pageElements.HOME_ICON.click();
        await expect(this.pageElements.FEATURED_H1).toBeVisible();
    }

    async forgottenPassword(email) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.FORGOTTEN_PASSWORD_LINK.click();
        await expect(this.pageElements.FORGOT_PASSWORD_H2).toBeVisible();
        await this.pageElements.FORGOT_PASSWORD_EMAIL_FIELD.fill(email);
        await this.pageElements.CONTINUE_FORGOT_PASSWORD.click();
    }
}