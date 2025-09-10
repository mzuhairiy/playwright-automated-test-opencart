export default class LaypoutElements {
    constructor(page) {
        this.page = page;
        // NAVBAR
        this.NAVBAR_MENU = page.locator("//nav[@id='menu']");
        this.NAVBAR_LINKS = page.locator("#menu .nav-link");
        this.FOOTER_LINKS = page.locator("footer .row .col-sm-3 ul.list-unstyled li a");

        this.NAV_DESKTOPS = page.locator("main li:nth-child(1) a:nth-child(1)");
        this.NAV_LAPTOPS = page.locator("main li:nth-child(2) a:nth-child(1)");
        this.NAV_COMPONENTS = page.locator("main li:nth-child(3) a:nth-child(1)");
        this.NAV_TABLETS = page.locator("main li:nth-child(4) a:nth-child(1)");
        this.NAV_SOFTWARE = page.locator("main li:nth-child(5) a:nth-child(1)");
        this.NAV_PHONES = page.locator("main li:nth-child(6) a:nth-child(1)");
        this.NAV_CAMERAS = page.locator("main li:nth-child(7) a:nth-child(1)");
        this.NAV_MP3 = page.locator("main li:nth-child(8) a:nth-child(1)");
        this.NAV_DESKTOPS_H2 = page.locator("//h2[contains(text(),'Desktops')]");

        // 🔹 Search
        this.SEARCH_INPUT = page.locator("#search input[name='search']");
        this.SEARCH_BUTTON = page.locator("//button[@class='btn btn-light btn-lg']");
        this.SEARCH_RESULT_H1 = page.locator("div[id='content'] h1");
        this.NOT_FOUND_RESULT = page.locator("//p[normalize-space()='There are no products to list in this category.']");

        // 🔹 Product Page
        this.PRODUCT_PAGE_ADD_TO_CART_BTN = page.locator("div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > button:nth-child(1)");
        this.H1_PRODUCT = page.locator("//h1[contains(text(),'Apple Cinema 30\"')]");

        // 🔹 Product List
        this.PRODUCT_CARD = page.locator("#product-list .product-thumb");
        this.PRODUCT_TITLE = page.locator("#product-list .product-thumb h4 a");
        this.PRODUCT_DESCRIPTION = page.locator("#product-list .product-thumb .description p");
        this.PRODUCT_PRICE = page.locator("#product-list .product-thumb .price");
    }
}