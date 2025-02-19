import {expect, test} from '@playwright/test';
import {ARTICLE, ARTICLE_WRONG, MAIN_PAGE_TITLE} from "../utils/constants";
import {HomePage} from "../page-objects/HomePage";
import assert from "node:assert";
import {ArticlePage} from "../page-objects/ArticlePage";

test.describe.parallel('Search for an article', () => {
    let homePage: HomePage
    let articlePage: ArticlePage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        articlePage = new ArticlePage(page)

        await homePage.visit()
        await homePage.acceptCookies()
        await expect(page).toHaveTitle(MAIN_PAGE_TITLE)
    })

    test('Positive - Search for an article', async ({page}) => {

        await articlePage.searchArticle(ARTICLE)

        await articlePage.clickFirstArticle()
        const pageTitle: string = await page.title()
        assert(pageTitle.includes(ARTICLE))
    })

    test('Negative - Search for an article', async ({page}) => {

        await articlePage.searchArticle(ARTICLE_WRONG)
        await articlePage.checkError(ARTICLE_WRONG)
    })
})