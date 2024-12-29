import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import ResistStoreActions from '../page-objects/actions/resistStorePage';
import PageElements from '../page-objects/elements/pageElements';

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomEmail = faker.internet.email();
const randomCompany = faker.company.name();
const randomAddress1 = faker.location.streetAddress();
const randomAddress2 = faker.location.streetAddress();
const randomCity = faker.location.city();
const randomPostcode = faker.finance.routingNumber();

test.describe('Product Scenarios POM', () => {
  let actions;
  let elements;

  test.beforeEach(async ({ page }) => {
    actions = new ResistStoreActions(page);
    elements = new PageElements(page);
    await actions.gotoAsync('http://localhost/demo/index.php?route=common/home&language=en-gb')
    await expect(page).toHaveTitle(/Resist Store/);
  })

  test('View product details by clicking on its image', async ({}) => {
    await actions.loginFunctions('Kendrick.Smitham90@hotmail.com', 'abcd1234')
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
    await actions.loginFunctions('Kendrick.Smitham90@hotmail.com', 'abcd1234');
    await expect(elements.MY_ACCOUNT_H2).toBeVisible();
    await elements.HOME_ICON.click();
    await expect(elements.FEATURED_H1).toBeVisible();
    await actions.addRandomProductToCart();
  });

  test('Add a product from the product page to the cart. ', async ({ page }) => {
    await actions.loginFunctions('Kendrick.Smitham90@hotmail.com', 'abcd1234');
    await expect(elements.MY_ACCOUNT_H2).toBeVisible();
    await elements.HOME_ICON.click();
    await expect(elements.FEATURED_H1).toBeVisible();
    await elements.NAV_DESKTOPS.click();
    await expect(elements.NAV_DESKTOPS_H2).toBeVisible();
    await elements.PRODUCT_PAGE_CART_BTN.click();
    await expect(elements.H1_PRODUCT).toBeVisible();
  });

  test('Checkout a product from the homepage - Guest', async ({ page }) => {
    const randomIndex = await actions.addRandomProductToCart();
    await elements.ALERT_CLOSE_BTN.click();
    await actions.guestCheckoutFromHomepage(randomFirstName, randomLastName, randomEmail, randomCompany, 
      randomAddress1, randomAddress2, randomCity, randomPostcode);
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
    await elements.CONFIRM_ORDER_BTN.dblclick();
    await page.waitForTimeout(1000);
    await expect(elements.SUCCESS_ORDER_H1).toBeVisible();
    await expect(elements.SUCCESS_ORDER_H1).toHaveText("Your order has been placed!");
    
  });
});