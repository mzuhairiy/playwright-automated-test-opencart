import { test, expect } from '@playwright/test';
import ResistStorePage from "../page-objects/actions/resistStorePage"
import PageElements from '../page-objects/locators/pageElements';
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

  test('User should be able to access all menus on the navbar', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await actions.accessAllNavbarMenus();
  });

  test('User should be able to access all menus on the footer', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await actions.accessAllFooterMenus();
  });

  test('User should be able to access all menus on the sidebar', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await actions.accessAllSidebarMenus();
  });
});