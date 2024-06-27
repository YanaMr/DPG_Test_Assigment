import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";
import assert from "node:assert";

export class LoginPage extends BasePage {
    readonly email: Locator
    readonly password: Locator
    readonly code: Locator
    readonly requestCode: Locator
    readonly submitButton: Locator
    private wrongEmailError: Locator
    private wrongPasswordError: Locator
    private loginBlocked: Locator

    constructor(page: Page) {
        super(page)
        this.email = page.locator('input[id="username"]')
        this.password = page.locator('input[id="password"]')
        this.code = page.locator('input[id="challengeCode"]')
        this.requestCode = page.locator('//a[@id="loginWithChallenge"]')
        this.submitButton = page.locator('//button[@type="submit"]')
        this.wrongEmailError = page.locator('//span[@id="errorBlock-ValidEmail"]')
        this.wrongPasswordError = page.locator('//span[@id="errorBlock-OIDC-003"]')
        this.loginBlocked = page.locator('//h1[@id="error-page_title"]')

    }

    async insertEmail(email: string) {
        await this.email.pressSequentially(email, {delay: 100})
        await this.submitButton.click()
    }

    async insertPassword(password: string) {
        await this.password.pressSequentially(password, {delay: 100})
        await this.submitButton.click()
    }

    async insertCode(code: string) {
        await this.requestCode.click()
        await this.code.pressSequentially(code, {delay: 100})
        await this.submitButton.click()
    }

    async validateEmailError(errormessage: string) {
        const error: string = await this.wrongEmailError.innerText()
        assert(error.includes(errormessage))
    }

    async validatePasswordError(errormessage: string) {
        const error: string = await this.wrongPasswordError.innerText()
        assert(error.includes(errormessage))
    }

    async validateForbiddenError(errormessage: string) {
        const error: string = await this.loginBlocked.innerText()
        assert(error.includes(errormessage))
    }

}