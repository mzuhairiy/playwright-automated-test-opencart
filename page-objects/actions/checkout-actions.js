import { expect } from '@playwright/test';
import ProductElements from '../locators/product-page-elements.js';
import testData from '../../utils/data.json';

export default class CheckoutActions {
    constructor(page) {
        this.page = page;
        this.pageElements = new ProductElements(page);
    }

    async gotoAsync(url) {
        await this.page.goto(url);
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