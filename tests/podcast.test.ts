import {expect, test} from '@playwright/test';
import {PodcastPage} from "../page-objects/PodcastPage";
import {PODCAST_PAGE_TITLE} from "../utils/constants";

test.describe.parallel('Open random podcast and check that correct podcast is opened', () => {
    let podcastPage: PodcastPage

    test.beforeEach(async ({page}) => {
        podcastPage = new PodcastPage(page)
        await podcastPage.visit()
        await podcastPage.acceptCookies()
        await podcastPage.wait(1000)
        await expect(page).toHaveTitle(PODCAST_PAGE_TITLE)
    })

    test('Open random podcast and check that correct podcast is opened', async ({page}) => {
        await podcastPage.openRandomPodcast()
    })
})
