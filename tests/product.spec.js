import { test, expect } from '@playwright/test';
import ResistStoreActions from '../page-objects/actions/resistStorePage';
import PageElements from '../page-objects/elements/pageElements';

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
});