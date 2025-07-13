import { test, expect } from '@playwright/test';
import { generateUserCheckoutData } from '../utils/user-data-generator';
import ResistStorePage from '../page-objects/actions/resistStorePage';
import PageElements from '../page-objects/elements/pageElements';
import config from '../app-config/config.json';

test.describe('Product Scenarios POM', () => {
  /** @type {ResistStorePage} */
  let actions;
  /** @type {PageElements} */
  let elements;

  test.beforeEach(async ({ page }) => {
    actions = new ResistStorePage(page);
    elements = new PageElements(page);
    await actions.gotoAsync(config.baseURL)
    await expect(page).toHaveTitle(/Resist Store/);
  })

  test('View product details by clicking on its image', async ({}) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password)
    await expect(elements.MY_ACCOUNT_H2).toBeVisible();
    await elements.HOME_ICON.click();
    await expect(elements.FEATURED_H1).toBeVisible();
    await actions.selectRandomProduct();
    const title = await actions.assertProductTitleAndAttributes();
    await expect(elements.PRODUCT_TITLE_HEADING).toBeVisible();
    await expect(elements.PRODUCT_ATTRIBUTES).toBeVisible();
    expect(title).not.toBeNull();
    expect(actions.productAttributes).not.toBeNull();
  });

  test('Add a product from the homepage to the cart.', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(elements.MY_ACCOUNT_H2).toBeVisible();
    await elements.HOME_ICON.click();
    await expect(elements.FEATURED_H1).toBeVisible();
    await actions.addRandomProductToCart();
  });

  test('Add a product from the product page to the cart. ', async ({ page }) => {
    await actions.loginFunctions(config.validUser.email, config.validUser.password);
    await expect(elements.MY_ACCOUNT_H2).toBeVisible();
    await elements.HOME_ICON.click();
    await expect(elements.FEATURED_H1).toBeVisible();
    await elements.NAV_DESKTOPS.click();
    await expect(elements.NAV_DESKTOPS_H2).toBeVisible();
    await elements.PRODUCT_PAGE_CART_BTN.click();
    await expect(elements.H1_PRODUCT).toBeVisible();
  });

  test('Checkout a product from the homepage - Guest', async ({ page }) => {
    const userData = generateUserCheckoutData();
    const randomIndex = await actions.addRandomProductToCart();
    await elements.ALERT_CLOSE_BTN.click();
    await actions.guestCheckoutFromHomepage(userData);
    await actions.selectRandomCountry();
    await actions.selectRandomRegion();
    await elements.CONTINUE_CO_BTN.click();
    await expect(elements.SUCCESS_GUEST_USER_INFORMATION).toBeVisible();

    if (randomIndex === 0) {
      await actions.choosePaymentMethod();
    }
    else if (randomIndex === 1) {
      await actions.chooseShippingMethod();
      await actions.choosePaymentMethod();
    }
    await elements.COMMENT_FIELD_CO.fill("test checkout");
    await page.waitForTimeout(1000);
    await elements.CONFIRM_ORDER_BTN.click();
    await page.waitForTimeout(1000);
    await expect(elements.SUCCESS_ORDER_H1).toBeVisible();
    await expect(elements.SUCCESS_ORDER_H1).toHaveText("Your order has been placed!");
    
  });
});