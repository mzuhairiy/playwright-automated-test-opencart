class PageElements {
    constructor(page) {

        // Register and Login Elements
        this.page = page;
        this.REGISTER_LINK = this.page.locator("//a[normalize-space()='Register']")
        this.LOGIN_LINK = this.page.locator("//a[normalize-space()='Login']")
        this.MY_ACCOUNT_DROPDOWN = page.locator("//span[normalize-space()='My Account']");
        this.H2_RETURNING_CUSTOMER = page.locator("form[id='form-login'] h2");
        this.EMAIL_FIELD = page.locator("#input-email");
        this.PASSWORD_FIELD = page.locator("#input-password");
        this.LOGIN_BTN = page.locator("//button[normalize-space()='Login']");
        this.MY_ACCOUNT_H2 = page.locator("//h2[normalize-space()='My Account']");
        this.ERROR_ALERT = page.getByText('Warning: No match for E-Mail');
        this.CONTINUE_REGISTER_BTN = page.locator("//a[normalize-space()='Continue']");
        this.FORGOTTEN_PASSWORD_LINK = page.locator('#form-login').getByRole('link', { name: 'Forgotten Password' });
        this.FORGOT_PASSWORD_H2 = page.getByRole('heading', { name: 'Forgot Your Password?' });
        this.FORGOT_PASSWORD_EMAIL_FIELD = page.getByPlaceholder('E-Mail Address');
        this.CONTINUE_FORGOT_PASSWORD = page.getByRole('button', { name: 'Continue' });
        this.SUCCESS_FORGOT_PASSWORD = page.getByText('Success: Your password has been successfully updated.');
        this.FAILED_FORGOT_PASSWORD = page.getByText('Warning: The E-Mail Address was not found in our records!')
        this.REGISTER_ACCOUNT_H1 = page.locator("//h1[normalize-space()='Register Account']");
        this.FIRST_NAME_FIELD = page.getByPlaceholder('First Name')
        this.LAST_NAME_FIELD = page.getByPlaceholder('Last Name')
        this.REGISTER_EMAIL_FIELD = page.getByPlaceholder('E-Mail')
        this.REGISTER_PASSWORD_FIELD = page.getByPlaceholder('Password')
        this.SUBS_NEWSLETTER_TOOGLE = page.locator('#input-newsletter')
        this.PRIVACY_POLICY_TOOGLE = page.locator('input[name="agree"]')
        this.REGISTER_CONTINUE_BUTTON = page.getByRole('button', { name: 'Continue' })
        this.LOGIN_PAGE_LINK_REG = page.getByRole('link', { name: 'login page' })
        this.PRIVACY_POLICY_LINK = page.locator('#form-register').getByRole('link', { name: 'Privacy Policy' })
        this.REGISTRATION_SUCCESSFUL_TEXT = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.REGISTRATION_FAILURE_TEXT = page.getByText('Warning: E-Mail Address is already registered!');
        this.FIRST_NAME_WARNING = page.getByText('First Name must be between 1 and 32 characters!')
        this.LAST_NAME_WARNING = page.getByText('Last Name must be between 1 and 32 characters!')
        this.EMAIL_WARNING = page.getByText('E-Mail Address does not appear to be valid!')
        this.PASSWORD_WARNING = page.getByText('Password must be between 4 and 20 characters!')
        this.PRIVACY_POLICY_WARNING = page.getByText('Warning: You must agree to the Privacy Policy!')
        this.REGISTER_CONTINUE_TO_ACCOUNT_BTN = page.locator("//a[normalize-space()='Continue']")
        this.HOME_ICON = page.locator('.breadcrumb-item').first();

        // Products, Checkout Elements without login first
        this.PRODUCT_IMAGES = page.locator(".product-thumb");
        this.ADD_TO_CART_ICON = page.getByLabel('Add to Cart').nth(0);
        this.PRODUCT_TITLE_HEADING = page.locator('h1');
        this.FEATURED_H1 = page.getByRole('heading', { name: 'Featured' });
        this.PRICE_TEXT = page.locator("ul[class='list-unstyled'] li h2");
        this.PRODUCT_ATTRIBUTES = page.locator("body > main:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(2)");
        this.SUCCESS_ADD_TO_CART = page.getByText("Success: You have added");
        this.BUTTON_CART = page.locator(".btn.btn-lg.btn-inverse.btn-block.dropdown-toggle");
        this.DROPDOWN_MENU = page.locator(".dropdown-menu.dropdown-menu-end.p-2.show");
        this.CHECKOUT_DD_MENU = page.locator("body > header:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(2) > p:nth-child(2) > a:nth-child(2)");
        this.VIEW_CART_DD_MENU = page.locator("body > header:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(2) > p:nth-child(2) > a:nth-child(1)")
        this.REMOVE_FROM_CART_BTN = page.locator("button[title='Remove']");
        this.SUCCESS_REMOVE_FROM_CART = page.getByText("Success: You have removed");
        this.CHECKOUT_H1 = page.getByRole('heading', { name: 'Checkout' });
        this.RADIO_REGISTER_ACCOUNT = page.getByLabel('Register Account');
        this.RADIO_GUEST_ACCOUNT = page.getByLabel('Guest Account');
        this.FIRSTNAME_FIELD_CO = page.getByPlaceholder('First Name');
        this.LASTNAME_FIELD_CO = page.getByPlaceholder('Last Name');
        this.EMAIL_FIELD_CO = page.getByPlaceholder('E-Mail');
        this.COMPANY_FIELD_CO = page.getByPlaceholder('Company');
        this.ADDRESS1_FIELD_CO = page.getByPlaceholder('Address 1');
        this.ADDRESS2_FIELD_CO = page.getByPlaceholder('Address 2');
        this.CITY_FIELD_CO = page.getByPlaceholder('City');
        this.POSTCODE_FIELD_CO = page.getByPlaceholder('Post Code');
        this.COUNTRY_DROPDOWN_CO = page.getByPlaceholder('Country');
        this.REGION_DROPDOWN_CO = page.getByPlaceholder('Region / State');
        this.PASSWORD_FOR_REGISTERED_ACC = page.getByPlaceholder('Password');
        this.TOGGLE_NEWSLETTER = page.getByLabel('I wish to subscribe to the')
        this.TOGGLE_PRIVACY_POLICY = page.locator('#input-register-agree')
        this.CONTINUE_CO_BTN = page.getByRole('button', { name: 'Continue' })
        this.PAYMENT_METHOD_BTN = page.getByRole('button', { name: 'Choose' })
        this.COMMENT_FIELD_CO = page.getByLabel('Add Comments About Your Order')
        this.DETAILS_FIELD_CO = page.getByRole('cell', { name: '1x MacBook - Reward Points:' })
        this.TOTAL_CO = page.locator('#checkout-confirm tbody').getByRole('cell', { name: '$' })
        this.SUCCESS_GUEST_USER_INFORMATION = page.getByText("Success: Your guest account");
        this.SUCCESS_REGIST_USER_INFORMATION = page.getByText("Success: Your has been successfully created");
        this.SUCCESS_UPDATE_USER_INFORMATION = page.getByText("Success: Your has been successfully updated");
        this.MODAL_DIALOG_PAYMENT_METHOD = page.locator('.modal-content')
        this.RADIO_BANK_TRANSFER = page.locator('#input-payment-method-bank_transfer-bank-transfer')
        this.CONTINUE_MODAL_PAYMENT = page.getByRole('button', { name: 'Continue'})
        this.BANK_TRANSFER_INSTRUCTIONS = page.locator("div[id='checkout-payment'] fieldset")
        this.CONFIRM_ORDER_BTN = page.getByRole('button', { name: 'Confirm Order'})
        this.SUCCESS_ORDER_H1 = page.getByRole('heading', { name: 'Your order has been placed!'})
    }   
}

export default PageElements;