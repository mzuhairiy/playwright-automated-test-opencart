import { test, expect } from '@playwright/test';
import ResistStorePage from "../page-objects/actions/resistStorePage"
import PageElements from '../page-objects/elements/pageElements';
import config from '../app-config/config.json'

test.describe('Login Scenarios POM', () => {
  /** @type {ResistStorePage} */
  let actions;
  /** @type {PageElements} */
  let elements;

  test.beforeEach(async ({ page }) => {
    actions = new ResistStorePage(page);
    elements = new PageElements(page);
    await actions.gotoAsync(config.baseURL)
    await expect(page).toHaveTitle(/Resist Store/);
  });

  test('User should be able to login with registered credentials', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(elements.MY_ACCOUNT_H2).toBeVisible();
  });

  test('User should not be able to login unregistered credentials.', async ({}) => {
    await actions.loginFunctions('yz@mailinator.com', 'ngadmin')
    await expect(elements.ERROR_ALERT).toBeVisible();
  });
  
  test('User should be able to resets the password.', async ({}) => {
    await actions.forgottenPassword('jyzyzonex@mailinator.com')
    await expect(elements.SUCCESS_FORGOT_PASSWORD).toBeVisible();
  });

  test('User should not be able to reset the password with unregistered email', async ({}) => {
    await actions.forgottenPassword('admin@aaaa.com')
    await expect(elements.FAILED_FORGOT_PASSWORD).toBeVisible();
  });
  
  test('User should be able to redirected to the Register Page', async ({}) => {
    await actions.goToLoginPage();
    await expect(elements.REGISTER_ACCOUNT_H1).toBeVisible();
  });

  test('User should not be able to login with incorrect password', async ({}) => {
    await actions.loginFunctions(config.validUser.email, 'wrongpassword')
    await expect(elements.ERROR_ALERT).toBeVisible();
  });

  test('User should not be able to login with incorrect email', async ({}) => {
    await actions.loginFunctions('invalid@email', config.validUser.password)
    await expect(elements.ERROR_ALERT).toBeVisible();
  });
});