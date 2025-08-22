import { expect } from '@playwright/test';
import PageElements from '../elements/pageElements';
import testData from '../../utils/data.json';

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

    async selectRandomProductFromHomepage() {
        const productCount = await this.pageElements.PRODUCT_IMAGES.count(); // Count the products
        const randomIndex = Math.floor(Math.random() * productCount) + 1; // Select random product
        const randomProductLocator = this.page.locator(`div:nth-child(${randomIndex}) > .product-thumb > .image`);
        //console.log(`Total Products: ${productCount}`);
        await randomProductLocator.click();
    }

    async CheckRemoveAProductFromCart() {
        await this.pageElements.CART_BUTTON.click();
        await this.pageElements.CART_CLOSE_BUTTON.click();
        await expect(this.pageElements.SUCCESS_REMOVE_FROM_CART).toBeVisible();
        await this.pageElements.CLOSE_SUCCESS_REMOVE_BTN.click();
        await this.pageElements.CART_BUTTON.click();
        await expect(this.pageElements.CART_IS_EMPTY_TEXT).toBeVisible();
    }

    async CheckRemoveProductsFromCart() {
        await this.pageElements.CART_BUTTON.click();
        while (await this.pageElements.CART_CLOSE_BUTTON.count() > 0) {
            // Klik tombol close pertama
            await this.pageElements.CART_CLOSE_BUTTON.first().click();
            // Tunggu popup success muncul
            await expect(this.pageElements.SUCCESS_REMOVE_FROM_CART).toBeVisible();
            // Close popup
            await this.pageElements.CLOSE_SUCCESS_REMOVE_BTN.click();
            // Buka lagi cart (karena tadi tertutup setelah klik close)
            await this.pageElements.CART_BUTTON.click();
        }
        // Setelah loop selesai, cek teks "Your Cart is Empty"
        await expect(this.pageElements.CART_IS_EMPTY_TEXT).toBeVisible();
    }

    async compareRandomProduct() {
        const productCount = await this.pageElements.PRODUCT_IMAGES.count();
        if (productCount < 2) {
            throw new Error('Need at least 2 products to compare');
        }
        // Pilih 2 index acak yang unik
        const indices = new Set();
        while (indices.size < 2) {
            const randomIndex = Math.floor(Math.random() * productCount) + 1;
            indices.add(randomIndex);
        }

        let clickCount = 0;
        for (const index of indices) {
            const compareBtnLocator = this.page.locator(
            `body > main:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(${index}) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > button:nth-child(3)`
            );
            await compareBtnLocator.click();
            clickCount++;
            if (clickCount === 1) {
            // Tunggu 1 detik setelah klik pertama
                await this.page.waitForTimeout(1000);
            }
        }
        await this.pageElements.PRODUCT_COMPARISON_LINK.click();
    }

    async assertProductTitleAndAttributes() {
        const title = await this.pageElements.PRODUCT_TITLE_HEADING.textContent(); // Get text from product title
        const productAttributes = await this.pageElements.PRODUCT_ATTRIBUTES.textContent(); // Get text from product attributes
        console.log(`Selected Product: ${title}`); // Print product title
        return title;
    }

    async addARandomProductFromHomepageToCart() {
        const addToCartIcon = await this.page.locator('div.button-group:nth-child(1) > button:nth-child(1)');
        const validIndexes = [0, 1];
        const randomIndex = validIndexes[Math.floor(Math.random() * validIndexes.length)];

        await addToCartIcon.nth(randomIndex).click();
        await this.page.waitForTimeout(1000);
        await expect(this.pageElements.SUCCESS_ADD_TO_CART).toBeVisible();
        await this.pageElements.CLOSE_SUCCESS_ADD_TO_CART_BTN.click();
        return randomIndex; // Return the index of the product added to cart
    }

    async addMultipleProductsFromHomepageToCart(totalAdd) {
    const addToCartIcon = this.page.locator('div.button-group:nth-child(1) > button:nth-child(1)');
    const validIndexes = [0, 1]; // klik hanya index 0 & 1

    for (let i = 0; i < totalAdd; i++) {
        const index = validIndexes[i % validIndexes.length];
        await addToCartIcon.nth(index).click();
        await this.page.waitForTimeout(1000); // kasih jeda biar UI update
        await expect(this.pageElements.SUCCESS_ADD_TO_CART).toBeVisible();
        await this.pageElements.CLOSE_SUCCESS_ADD_TO_CART_BTN.click();
    }
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

    async searchForProduct(){
        const products = testData.search.products;
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        await this.pageElements.SEARCH_INPUT.fill(randomProduct);
        await this.pageElements.SEARCH_BUTTON.click();
        await expect(this.pageElements.SEARCH_RESULT_H1).toBeVisible();
        await expect(this.pageElements.SEARCH_RESULT_H1).toHaveText(`Search - ${randomProduct}`);
        await expect(this.pageElements.PRODUCT_TITLE.first()).toContainText(randomProduct);
        return randomProduct;
    }

    async searchNonExistingProduct(productName) {
        await this.pageElements.SEARCH_INPUT.fill(productName);
        await this.pageElements.SEARCH_BUTTON.click();
        await expect(this.pageElements.NOT_FOUND_RESULT).toHaveText("There is no product that matches the search criteria.");
    }

    async selectSortOption(optionText) {
        await this.pageElements.FILTER_OPTIONS.selectOption({ label: optionText });
    }

    async getAllPrices() {
        const prices = await this.pageElements.PRODUCT_PRICE.allTextContents();
        return prices.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
    }

    async isSortedAscending(values) {
        return values.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
    }

    async isSortedDescending(values) {
        return values.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
    }
}