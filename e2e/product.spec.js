import { test, expect } from '@playwright/test';
import { generateUserCheckoutData } from '../utils/user-data-generator';
import ResistStorePage from '../page-objects/actions/resistStorePage';
import PageElements from '../page-objects/locators/pageElements';
import config from '../app-config/config.json';

test.describe('Product Scenarios POM', () => {
  /** @type {ResistStorePage} */
  let actions;
  /** @type {PageElements} */
  let locators;

  test.beforeEach(async ({ page }) => {
    actions = new ResistStorePage(page);
    locators = new PageElements(page);
    await actions.gotoAsync(config.baseURL)
    await expect(page).toHaveTitle(/Resist Store/);
  })

  test('Should be able to see product details when open a product from the homepage', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await actions.selectRandomProductFromHomepage();
    const title = await actions.assertProductTitleAndAttributes();
    await expect(locators.PRODUCT_TITLE_HEADING).toBeVisible();
    await expect(locators.PRODUCT_ATTRIBUTES).toBeVisible();
    expect(title).not.toBeNull();
    expect(actions.productAttributes).not.toBeNull();
  });

  test('Add a product from the homepage to the cart.', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await actions.addARandomProductFromHomepageToCart();
  });

  test('Add a product from the product page to the cart. ', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await locators.NAV_DESKTOPS.click();
    await expect(locators.NAV_DESKTOPS_H2).toBeVisible();
    await locators.PRODUCT_PAGE_ADD_TO_CART_BTN.click();
    await expect(locators.H1_PRODUCT).toBeVisible();
  });

  test('Checkout a product from the homepage - Guest', async ({ page }) => {
    const userData = generateUserCheckoutData();
    const randomIndex = await actions.addARandomProductFromHomepageToCart();
    await actions.guestCheckoutFromHomepage(userData);
    await actions.selectRandomCountry();
    await actions.selectRandomRegion();
    await locators.CONTINUE_CO_BTN.click();
    await expect(locators.SUCCESS_GUEST_USER_INFORMATION).toBeVisible();

    if (randomIndex === 0) {
      await actions.choosePaymentMethod();
    }
    else if (randomIndex === 1) {
      await actions.chooseShippingMethod();
      await actions.choosePaymentMethod();
    }
    await locators.COMMENT_FIELD_CO.fill("test checkout");
    await page.waitForTimeout(3000);
    await locators.CONFIRM_ORDER_BTN.click();
    await expect(locators.SUCCESS_ORDER_H1).toBeVisible();
    await expect(locators.SUCCESS_ORDER_H1).toHaveText('Your order has been placed!');
  });

  test('Should be able to do product comparison', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await actions.compareRandomProduct();
    await expect(locators.PRODUCT_COMPARISON_H1).toBeVisible();
    await expect(locators.PRODUCT_COMPARISON_CONTENT_TABLE).toBeVisible();
  });

  test('Should be able to remove a single product from cart after adding it from homepage', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await actions.addARandomProductFromHomepageToCart();
    await actions.CheckRemoveAProductFromCart();
  });

  test('Shoulde be able to remove multiple products from cart after adding them from homepage', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await actions.addMultipleProductsFromHomepageToCart();
    await actions.CheckRemoveProductsFromCart();
  });

  test('Should be able to search for a product from the homepage', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await actions.searchForProduct();
  });

  test('Should be able to show not found message when searching for a non-existing product', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await actions.searchNonExistingProduct('skincare');
  });

  test('Should be able to do price sorting low to high', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(locators.MY_ACCOUNT_H2).toBeVisible();
    await locators.HOME_ICON.click();
    await expect(locators.FEATURED_H1).toBeVisible();
    await actions.searchForProduct();
    await actions.selectSortOption('Price (Low > High)');
    await expect(locators.PRODUCT_PRICE.first()).toBeVisible();
    await actions.getAllPrices();
    const prices = await actions.getAllPrices();
    const sortedAscending = actions.isSortedAscending(prices);
    expect(sortedAscending).toBeTruthy();
  });

  test('Should be able to do price sorting high to low', async ({ page }) => {
  await actions.loginFunctions(config.validUser.email, config.validUser.password);
  await expect(locators.MY_ACCOUNT_H2).toBeVisible();
  await locators.HOME_ICON.click();
  await expect(locators.FEATURED_H1).toBeVisible();
  await actions.searchForProduct();
  await actions.selectSortOption('Price (High > Low)');
  await expect(locators.PRODUCT_PRICE.first()).toBeVisible();
  const prices = await actions.getAllPrices();
  const sortedDescending = await actions.isSortedDescending(prices);
  expect(sortedDescending).toBeTruthy();
});
});