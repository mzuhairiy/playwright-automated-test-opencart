import { test, expect } from '@playwright/test';
import ResistStoreActions from "../page-objects/actions/resistStorePage"

test('User can login with valid credentials', async ({ page }) => {
  const REGISTER_LINK = page.locator("//a[normalize-space()='Register']")
  const LOGIN_LINK = page.locator("//a[normalize-space()='Login']")
  const MY_ACCOUNT_DROPDOWN = page.locator("//span[normalize-space()='My Account']")
  const H2_RETURNING_CUSTOMER = page.locator("form[id='form-login'] h2")
  const EMAIL_FIELD = page.getByPlaceholder("E-mail Address")
  const PASSWORD_FIELD = page.getByPlaceholder("Password")
  const LOGIN_BTN = page.getByRole('button', { name: 'Login' })
  const MY_ACCOUNT_H2 = page.locator('#content').getByRole('heading', { name: 'My Account' })
  const ERROR_ALERT = page.locator("div.alert.alert-danger.alert-dismissible >> text=Warning: No match for E-Mail Address and/or Password.");

  await page.goto('http://localhost/demo/index.php?route=common/home&language=en-gb');
  await expect(page).toHaveTitle(/Resist Store/);
  await expect(page.getByRole('img', { name: 'Resist Store' })).toBeVisible();
  await MY_ACCOUNT_DROPDOWN.click();
  await expect(REGISTER_LINK).toBeVisible();
  await expect(LOGIN_LINK).toBeVisible();
  await LOGIN_LINK.click();
  await expect(H2_RETURNING_CUSTOMER).toBeVisible();
  await EMAIL_FIELD.fill('Kendrick.Smitham90@hotmail.com');
  await PASSWORD_FIELD.fill('abcd1234');
  await LOGIN_BTN.click();
  await expect(MY_ACCOUNT_H2).toBeVisible();
});

test('User cant login with unregistered email', async ({ page }) => {
  const REGISTER_LINK = page.locator("//a[normalize-space()='Register']")
  const LOGIN_LINK = page.locator("//a[normalize-space()='Login']")
  const MY_ACCOUNT_DROPDOWN = page.locator("//span[normalize-space()='My Account']")
  const H2_RETURNING_CUSTOMER = page.locator("form[id='form-login'] h2")
  const EMAIL_FIELD = page.getByPlaceholder("E-mail Address")
  const PASSWORD_FIELD = page.getByPlaceholder("Password")
  const LOGIN_BTN = page.getByRole('button', { name: 'Login' })
  const MY_ACCOUNT_H2 = page.locator('#content').getByRole('heading', { name: 'My Account' })
  const ERROR_ALERT = page.getByText('Warning: No match for E-Mail')

  await page.goto('http://localhost/demo/index.php?route=common/home&language=en-gb');
  await expect(page).toHaveTitle(/Resist Store/);
  await MY_ACCOUNT_DROPDOWN.click();
  await expect(REGISTER_LINK).toBeVisible();
  await expect(LOGIN_LINK).toBeVisible();
  await LOGIN_LINK.click();
  await expect(H2_RETURNING_CUSTOMER).toBeVisible();
  await EMAIL_FIELD.fill('jyz@mailinator.com');
  await PASSWORD_FIELD.fill('ngadmin');
  await LOGIN_BTN.click();
  await expect(ERROR_ALERT).toBeVisible();
});

test.describe('Login Scenarios POM', () => {
  let actions;

  test.beforeEach(async ({ page }) => {
    actions = new ResistStoreActions(page);
    await actions.gotoAsync('http://localhost/demo/index.php?route=common/home&language=en-gb')
    await expect(page).toHaveTitle(/Resist Store/);
  });

  test('Login with registered credentials', async ({}) => {
    await actions.loginFunctions('Kendrick.Smitham90@hotmail.com', 'abcd1234')
    await expect(actions.pageElements.MY_ACCOUNT_H2).toBeVisible();
  });

  test('Login with unregistered credentials.', async ({}) => {
    await actions.loginFunctions('yz@mailinator.com', 'ngadmin')
    await expect(actions.pageElements.ERROR_ALERT).toBeVisible();
  });

  test('User successfully resets the password.', async ({}) => {
    await actions.forgottenPassword('jyzyzonex@mailinator.com')
    await expect(actions.pageElements.SUCCESS_FORGOT_PASSWORD).toBeVisible();
  });

  test('User fails to reset the password', async ({}) => {
    await actions.forgottenPassword('admin@aaaa.com')
    await expect(actions.pageElements.FAILED_FORGOT_PASSWORD).toBeVisible();
  });
  
  test('User is successfully redirected to the Register Page', async ({}) => {
    await actions.goToLoginPage();
    await expect(actions.pageElements.REGISTER_ACCOUNT_H1).toBeVisible();
  });
});