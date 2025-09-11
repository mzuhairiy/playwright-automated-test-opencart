import { expect } from '@playwright/test';
import LayoutElements from '../locators/layout-elements';
import testData from '../../utils/data.json';

export default class LayoutActions {
    constructor(page) {
        this.page = page;
        this.pageElements = new LayoutElements(page);
    }

    async gotoAsync(url) {
        await this.page.goto(url);
    }

    async accessAllNavbarMenus() {
        const links = this.pageElements.NAVBAR_LINKS;
        const total = await links.count();
        console.log(`Total Navbar Links: ${total}`);
            expect(total).toBeGreaterThan(0);

        for (let i = 0; i < total; i++) {
            const link = links.nth(i);
            const itemText = (await link.innerText()).trim();

            await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            link.click(),
            ]);

            console.log(`Accessed Navbar Menu: ${itemText}`);
            await this.checkProductContent();
        }
    }

    async accessAllFooterMenus() {
        const footerLinks = this.pageElements.FOOTER_LINKS;
        const count = await footerLinks.count();
        console.log(`Total footer links: ${count}`);

        for (let i = 0; i < count; i++) {
            const link = footerLinks.nth(i);
            const text = await link.textContent();

            await link.click();
            await this.page.waitForTimeout(1000);

            console.log(`✅ Accessed footer link: ${text}`);
        }
    }

    async accessAllSidebarMenus() {
        const sidebarItems = this.pageElements.SIDEBAR_MENU;
        const itemCount = await sidebarItems.count();

        for (let i = 0; i < itemCount; i++) {
            const item = sidebarItems.nth(i);
            const itemText = await item.textContent();
            await item.click();
            await this.page.waitForTimeout(1000);
            console.log(`Accessed Sidebar Menu: ${itemText}`);
            await this.pageElements.HOME_ICON.click();
            await expect(this.pageElements.FEATURED_H1).toBeVisible();
        }
    }
}