import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import ResistStoreActions from '../page-objects/actions/resistStorePage';
import PageElements from '../page-objects/elements/pageElements';
import testNameData from '../tests/test-data/register-data-name-validation';
const { checkUserDataInDatabase } = require('../utils/db-regis.js');

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomEmail = faker.internet.email();

test.describe('Register Scenarios POM', () => {
  let actions;
  let elements;

  test.beforeEach(async ({ page }) => {
    actions = new ResistStoreActions(page);
    elements = new PageElements(page);
    await actions.gotoAsync('http://localhost/demo/index.php?route=common/home&language=en-gb')
    await expect(page).toHaveTitle(/Resist Store/);
  });

  
  
  test('Register with existing data', async ({}) => {
    await actions.registerFunctions("Rocky", "Jean", "rocky@rock.com", 'ngadmin1234');
    await expect(elements.REGISTRATION_FAILURE_TEXT).toBeVisible();
  });

    // Verify validation errors are displayed when attempting to register with invalid values.
    testNameData.forEach(({ firstName, lastName, expected, validationField }, index) => {
      test(`Validation errors ${index + 1}: First Name: "${firstName}", Last Name: "${lastName}"`, async () => {
        await actions.registerFunctions(firstName, lastName, randomEmail, 'admin1234');
        await expect(elements[validationField]).toHaveText(expected);
      })
    })

    test('Register with invalid email', async ({ page }) => {
      await actions.registerFunctions(randomFirstName, randomLastName, 'logan@login', 'admin1234')
      await expect(elements.EMAIL_WARNING).toBeVisible();
    });

    test('Email validation', async ({ page }) => {
      await actions.registerFunctions(randomFirstName, randomLastName, 'eee', 'admin1234');
      const emailField = elements.REGISTER_EMAIL_FIELD;
      const validationMessage = await emailField.evaluate(input => input.validationMessage);
      await expect(validationMessage).toContain("Please include an '@' in the email address.");
    });
});