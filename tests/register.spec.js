import { test, expect } from '@playwright/test';
import { generateUserCreds } from '../utils/user-data-generator.js';
import ResistStorePage from '../page-objects/actions/resistStorePage';
import PageElements from '../page-objects/elements/pageElements';
import testNameData from '../tests/test-data/register-data-name-validation';
import config from '../app-config/config.json'
const { checkUserDataInDatabase } = require('../utils/db-regis.js');

test.describe('Register Scenarios POM', () => {
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

  test('Register with valid data', async ({}) => {
    const userCreds = generateUserCreds();
    await actions.registerFunctions(userCreds);
    await expect(elements.REGISTRATION_SUCCESSFUL_TEXT).toBeVisible();
    await elements.REGISTER_CONTINUE_TO_ACCOUNT_BTN.click();
    await expect(elements.MY_ACCOUNT_H2).toBeVisible();

    // Checking database
    const userData = await checkUserDataInDatabase(userCreds.email);
    expect(userData[0].firstname).toBe(userCreds.firstName);
    expect(userData[0].lastname).toBe(userCreds.lastName);
    expect(userData[0].email).toBe(userCreds.email);
    // console.log(`The user has been successfully registered and stored in the database.`);
    // console.log('--------------------------------------------------------------------')
    // console.log(`User Data\nFirst Name: ${userData[0].firstname}\nLast Name: ${userData[0].lastname}\nEmail: ${userData[0].email}`);
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