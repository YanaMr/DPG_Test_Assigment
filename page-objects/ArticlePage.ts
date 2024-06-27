import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";
import assert from "node:assert";

export class ArticlePage extends BasePage {
    readonly search: Locator
    readonly typeArticle: Locator
    readonly searchButton: Locator
    private firstArticle: Locator
    private error: Locator

    constructor(page: Page) {
        super(page)
        this.search = page.locator('//div[@class="primary-nav__list-item--search"]')
        this.typeArticle = page.locator('input[placeholder="Zoek op trefwoord, titel of auteur"]')
        this.searchButton = page.locator('//button[@type="submit"]')
        this.firstArticle = page.locator('//a[@data-position="1"]')
        this.error = page.locator('//main/section/section/div/div/h2')

    }

    async searchArticle(article: string) {
        await this.search.click()
        await this.typeArticle.pressSequentially(article, {delay: 100})
        await this.searchButton.click()
    }

    async clickFirstArticle() {
        await this.firstArticle.click()
    }

    async checkError(article: string) {
        const error: string = await this.error.innerText()
        assert(error.includes("Geen resultaten voor “" + article + "” gevonden"))
    }

}