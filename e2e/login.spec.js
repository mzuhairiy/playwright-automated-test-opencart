import { test, expect } from '@playwright/test';
import ResistStorePage from "../page-objects/actions/main-actions";
import PageElements from '../page-objects/locators/main-page-elements';
import config from '../app-config/config.json'

test.describe('Login Scenarios POM', () => {
  /** @type {ResistStorePage} */
  let actions;
  /** @type {PageElements} */
  let locators;

  test.beforeEach(async ({ page }) => {
    actions = new ResistStorePage(page);
    locators = new PageElements(page);
    await actions.gotoAsync(config.baseURL)
    await expect(page).toHaveTitle(/Resist Store/);
  });

  test('User should be able to login with registered credentials', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
  });

  test('User should not be able to login unregistered credentials.', async ({}) => {
    await actions.loginFunctions('yz@mailinator.com', 'ngadmin')
    await expect(locators.ERROR_ALERT).toBeVisible();
  });
  
  test('User should be able to resets the password and login with the new password', async ({}) => {
    const email = 'qahucyc@mailinator.com'
    await actions.forgottenPassword(email)
    const newPassword = await actions.resetPassword();
    await expect(locators.SUCCESS_FORGOT_PASSWORD).toBeVisible();
    await actions.loginFunctions(email, newPassword);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
  });

  test('User should not be able to reset the password with unregistered email', async ({}) => {
    await actions.forgottenPassword('admin@aaaa.com')
    await expect(locators.FAILED_FORGOT_PASSWORD).toBeVisible();
  });
  
  test('User should be able to redirected to the Register Page', async ({}) => {
    await actions.goToLoginPage();
    await expect(locators.REGISTER_ACCOUNT_H1).toBeVisible();
  });

  test('User should not be able to login with incorrect password', async ({}) => {
    await actions.loginFunctions(config.validUser.email, 'wrongpassword')
    await expect(locators.ERROR_ALERT).toBeVisible();
  });

  test('User should not be able to login with incorrect email', async ({}) => {
    await actions.loginFunctions('invalid@email', config.validUser.password)
    await expect(locators.ERROR_ALERT).toBeVisible();
  });

  test('User should be able to logout successfully', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await actions.logoutFunction();
    await expect(locators.SUCCESSFULLY_LOGOUT_H1).toBeVisible();
  });
});