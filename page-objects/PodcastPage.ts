import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {URL_PODCASTS} from "../utils/constants";
import assert from "node:assert";

export class PodcastPage extends BasePage {
    readonly podcasts: Locator
    readonly title: Locator


    constructor(page: Page) {
        super(page)
        this.podcasts = page.locator('xpath=//a[@data-category="teaser"]')
        this.title = page.locator('//title >> nth=0')
    }

    async openRandomPodcast() {
        const podcasts = this.podcasts
        await expect(podcasts.last()).toBeVisible();
        const count = await podcasts.count();
        expect(count).toBeGreaterThan(0)
        const randomIndex = Math.floor(Math.random() * count)
        const header = await podcasts.nth(randomIndex).innerText()
        await this.podcasts.nth(randomIndex).click()
        await this.wait(1000)
        const pageTitle = await this.title.innerText()
        assert(header.includes(pageTitle))
    }

    async visit() {
        await this.page.goto(URL_PODCASTS)
    }
}