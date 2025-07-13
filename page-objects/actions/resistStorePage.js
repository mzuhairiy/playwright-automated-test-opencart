import { expect } from '@playwright/test';
import PageElements from '../elements/pageElements';

export default class ResistStorePage {
    constructor(page) {
        this.page = page;
        this.pageElements = new PageElements(page);
    }

    async gotoAsync(url) {
        await this.page.goto(url);
    }

    async goToLoginPage() {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.CONTINUE_REGISTER_BTN.click();
    }

    async loginFunctions(email, password) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.EMAIL_FIELD.fill(email);
        await this.pageElements.PASSWORD_FIELD.fill(password);
        await this.pageElements.LOGIN_BTN.click();
    }

    async loginToHomepage(email, password) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.EMAIL_FIELD.fill(email);
        await this.pageElements.PASSWORD_FIELD.fill(password);
        await this.pageElements.LOGIN_BTN.click();
        await expect(this.pageElements.MY_ACCOUNT_H2).toBeVisible();
        await this.pageElements.HOME_ICON.click();
        await expect(this.pageElements.FEATURED_H1).toBeVisible();
    }

    async forgottenPassword(email) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.LOGIN_LINK.click();
        await this.pageElements.FORGOTTEN_PASSWORD_LINK.click();
        await expect(this.pageElements.FORGOT_PASSWORD_H2).toBeVisible();
        await this.pageElements.FORGOT_PASSWORD_EMAIL_FIELD.fill(email);
        await this.pageElements.CONTINUE_FORGOT_PASSWORD.click();
    }

    async registerFunctions({ firstName, lastName, email, password} ) {
        await this.pageElements.MY_ACCOUNT_DROPDOWN.click();
        await this.pageElements.REGISTER_LINK.click();
        await expect(this.pageElements.REGISTER_ACCOUNT_H1).toBeVisible();
        await this.pageElements.FIRST_NAME_FIELD.fill(firstName);
        await this.pageElements.LAST_NAME_FIELD.fill(lastName);
        await this.pageElements.REGISTER_EMAIL_FIELD.fill(email);
        await this.pageElements.REGISTER_PASSWORD_FIELD.fill(password);
        await this.pageElements.SUBS_NEWSLETTER_TOOGLE.click();
        await this.pageElements.PRIVACY_POLICY_TOOGLE.click();
        await this.pageElements.REGISTER_CONTINUE_BUTTON.click();
        await this.page.waitForTimeout(500);
    }

    async selectRandomProduct() {
        const productCount = await this.pageElements.PRODUCT_IMAGES.count(); // Count the products
        const randomIndex = Math.floor(Math.random() * productCount) + 1; // Select random product
        const randomProductLocator = this.page.locator(`div:nth-child(${randomIndex}) > .product-thumb > .image`);
        console.log(`Total Products: ${productCount}`);
        await randomProductLocator.click();
    }

    async assertProductTitleAndAttributes() {
        const title = await this.pageElements.PRODUCT_TITLE_HEADING.textContent(); // Get text from product title
        const productAttributes = await this.pageElements.PRODUCT_ATTRIBUTES.textContent(); // Get text from product attributes
        console.log(`Selected Product: ${title}`); // Print product title
        return title;
    }

    async addRandomProductToCart() {
        const addToCartIcon = await this.page.locator('div.button-group:nth-child(1) > button:nth-child(1)');
        const validIndexes = [0, 1];
        const randomIndex = validIndexes[Math.floor(Math.random() * validIndexes.length)];

        await addToCartIcon.nth(randomIndex).click();
        await this.page.waitForTimeout(1000);
        await expect(this.pageElements.SUCCESS_ADD_TO_CART).toBeVisible();

        return randomIndex;
    }

    async guestCheckoutFromHomepage({ firstName,lastName,email,company,address1,address2,city,postcode}) {
        await this.pageElements.BUTTON_CART.click();
        await expect(this.pageElements.CART_DROPDOWN_MENU).toBeVisible();
        await this.pageElements.CHECKOUT_DD_MENU.click();
        await expect(this.pageElements.CHECKOUT_H1).toBeVisible();
        await this.pageElements.RADIO_GUEST_ACCOUNT.click();
        await this.pageElements.FIRSTNAME_FIELD_CO.fill(firstName);
        await this.pageElements.LASTNAME_FIELD_CO.fill(lastName);
        await this.pageElements.EMAIL_FIELD_CO.fill(email);
        await this.pageElements.COMPANY_FIELD_CO.fill(company);
        await this.pageElements.ADDRESS1_FIELD_CO.fill(address1);
        await this.pageElements.ADDRESS2_FIELD_CO.fill(address2);
        await this.pageElements.CITY_FIELD_CO.fill(city);
        await this.pageElements.POSTCODE_FIELD_CO.fill(postcode);
    }

    async selectRandomCountry(){
        const countryDropdown = await this.pageElements.COUNTRY_DROPDOWN_CO;
        const countryOptions = await countryDropdown.locator('option').filter({ hasText: /^(?!0|.*Please Select).*$/ }).all();
        const countryRandomOption = countryOptions[Math.floor(Math.random() * countryOptions.length)];
        const countryRandomValue = await countryRandomOption.getAttribute('value');
        await countryDropdown.selectOption(countryRandomValue);
        const selectedCountry = await countryRandomOption.innerText();
        // console.log(`Selected Country: ${selectedCountry}`);
    }

    async selectRandomRegion(){
        const regionDropdown = await this.pageElements.REGION_DROPDOWN_CO;
        await this.pageElements.REGION_DROPDOWN_CO.click();
        const regionOptions = await regionDropdown.locator('option').filter({ hasText: /^(?!.*Please Select).*$/ }).all();
        const regionRandomOption = regionOptions[Math.floor(Math.random() * regionOptions.length)];
        const regionRandomValue = await regionRandomOption.getAttribute('value');
        await regionDropdown.selectOption(regionRandomValue);
        const selectedRegion = await regionRandomOption.innerText();
        // console.log(`Selected Region: ${selectedRegion}`);
    }

    async choosePaymentMethod(){
        await this.pageElements.CHOOSE_PAYMENT_METHOD_BTN.click();
        await expect(this.pageElements.MODAL_DIALOG_PAYMENT_METHOD).toBeVisible();
        await this.pageElements.RADIO_BANK_TRANSFER.click();
        await this.pageElements.CONTINUE_MODAL_PAYMENT.click();
        await expect(this.pageElements.BANK_TRANSFER_INSTRUCTIONS).toBeVisible();
    }

    async chooseShippingMethod(){
        await this.pageElements.CHOOSE_SHIPPING_METHOD_BTN.click();
        await expect(this.pageElements.MODAL_DIALOG_SHIPPING_METHOD).toBeVisible();
        await this.pageElements.RADIO_FLAT_SHIPPING.click();
        await this.pageElements.CONTINUE_MODAL_SHIPPING.click();
    }
}