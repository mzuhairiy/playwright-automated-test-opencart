import { expect } from '@playwright/test';
import ProductElements from '../locators/product-page-elements.js';
import testData from '../../utils/data.json';

export default class ProductActions {
    constructor(page) {
        this.page = page;
        this.pageElements = new ProductElements(page);
    }

    async gotoAsync(url) {
        await this.page.goto(url);
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

    async checkProductContent() {
        const products = this.page.locator('#product-list .product-thumb');
        const count = await products.count();

        if (count === 0) {
            await expect(this.pageElements.NOT_FOUND_RESULT).toBeVisible();
            const notFoundText = await this.pageElements.NOT_FOUND_RESULT.textContent();
            console.log(`❌ No products found. Message: ${notFoundText?.trim()}`);
            return;
        }

        // pilih index random
        const randomIndex = Math.floor(Math.random() * count);
        const randomProduct = products.nth(randomIndex);

        // ambil title, description, dan price dari produk random
        const title = randomProduct.locator('h4 a');
        const description = randomProduct.locator('.description p');
        const price = randomProduct.locator('.price');

        // assertions
        await expect(title).toBeVisible();
        await expect(description).toBeVisible();
        await expect(price).toBeVisible();

        // logging ke console (optional)
        console.log(`✅ Checked product content:
            Title: ${await title.textContent()}
            Description: ${await description.textContent()}
            Price: ${await price.textContent()}
        `);
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

     isSortedAscending(values) {
        return values.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
    }

    isSortedDescending(values) {
        return values.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
    }
}
