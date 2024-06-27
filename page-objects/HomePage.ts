import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import {URL_MAIN} from "../utils/constants";
import assert from "node:assert";

export class HomePage extends BasePage {
    readonly logIn: Locator
    readonly userMenu: Locator
    readonly userName: Locator


    constructor(page: Page) {
        super(page)
        this.logIn = page.getByText('Inloggen')
        this.userMenu = page.locator('//div[@class="primary-nav__profile-button"]')
        this.userName = page.locator('//span[@class="menu__popover-link-item-prefix"]')

    }

    async navigateToLoginPage() {
        await this.logIn.click()
        await this.wait(1000)
    }

    async confirmUserName(name: string) {
        await this.userMenu.click()
        const userName: string = await this.userName.innerText()
        assert(userName.includes(name))
    }

    async visit() {
        await this.page.goto(URL_MAIN)
    }
}