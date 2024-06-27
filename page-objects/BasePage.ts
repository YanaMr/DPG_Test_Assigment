import {Page} from "@playwright/test";

export abstract class BasePage {
    readonly page: Page

    protected constructor(page: Page) {
        this.page = page
    }

    async wait(time: number) {
        await this.page.waitForTimeout(time)
    }

    async acceptCookies() {
        const privacyIframe = this.page.frameLocator('#sp_message_iframe_1118242')
        await privacyIframe.locator('//button[@title="Akkoord"]').click()
        await this.wait(1000)
    }
}