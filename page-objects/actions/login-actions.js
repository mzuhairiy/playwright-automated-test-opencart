import { expect } from '@playwright/test';
import AuthElements from '../locators/auth-page-elements.js';
import testData from '../../utils/data.json';
import { logger } from '../../utils/logger/logger.js';

/**
 * Class representing login-related actions in the application
 */
export default class LoginActions {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.authElements = new AuthElements(page);
        this.logger = logger;
    }

    async gotoAsync(url) {
        await this.page.goto(url);
    }

    async goToLoginPage() {
        try {
            await this.authElements.MY_ACCOUNT_DROPDOWN.click();
            await this.authElements.LOGIN_LINK.click();
            await this.authElements.CONTINUE_REGISTER_BTN.click();
        } catch (error) {
            throw new Error(`Failed to navigate to login page: ${error.message}`);
        }
    }

    async loginFunctions(email, password) {
        try {
            this.logger.info(`Attempting to login with email: ${email}`);
            await this.authElements.MY_ACCOUNT_DROPDOWN.click();
            await this.authElements.LOGIN_LINK.click();
            await this.authElements.EMAIL_FIELD.fill(email);
            await this.authElements.PASSWORD_FIELD.fill('********'); // Masking password in logs
            this.logger.debug('Filled login credentials');
            await this.authElements.LOGIN_BTN.click();
            this.logger.info('Login attempt completed');
        } catch (error) {
            this.logger.error(`Login failed: ${error.message}`);
            throw new Error(`Failed to login: ${error.message}`);
        }
    }

    async loginToHomepage(email, password) {
        try {
            await this.authElements.MY_ACCOUNT_DROPDOWN.click();
            await this.authElements.LOGIN_LINK.click();
            await this.authElements.EMAIL_FIELD.fill(email);
            await this.authElements.PASSWORD_FIELD.fill(password);
            await this.authElements.LOGIN_BTN.click();
            await expect(this.authElements.MY_ACCOUNT_H2).toBeVisible();
            await this.authElements.HOME_ICON.click();
            await expect(this.authElements.FEATURED_H1).toBeVisible();
        } catch (error) {
            throw new Error(`Failed to login and navigate to homepage: ${error.message}`);
        }
    }

    async forgottenPassword(email) {
        try {
            await this.authElements.MY_ACCOUNT_DROPDOWN.click();
            await this.authElements.LOGIN_LINK.click();
            await this.authElements.FORGOTTEN_PASSWORD_LINK.click();
            await expect(this.authElements.FORGOT_PASSWORD_H2).toBeVisible();
            await this.authElements.FORGOT_PASSWORD_EMAIL_FIELD.fill(email);
            await this.authElements.CONTINUE_FORGOT_PASSWORD.click();
        } catch (error) {
            throw new Error(`Failed to reset password: ${error.message}`);
        }
    }
}