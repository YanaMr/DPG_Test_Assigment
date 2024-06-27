import {expect, test} from '@playwright/test';
import {
    EMAIL,
    EMAIL_WRONG,
    ERROR_LOGIN_BLOCKED,
    ERROR_WRONG_EMAIL,
    ERROR_WRONG_PASSWORD,
    LOGIN_PAGE_TITLE,
    MAIN_PAGE_TITLE,
    PASSWORD,
    PASSWORD_WRONG,
    USER_NAME
} from "../utils/constants";
import {HomePage} from "../page-objects/HomePage";
import {LoginPage} from "../page-objects/LoginPage";

test.describe.parallel('Login scenarios', () => {
    let homePage: HomePage
    let logInPage: LoginPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        logInPage = new LoginPage(page)

        await homePage.visit()
        await homePage.acceptCookies()
        await homePage.wait(1000)
        await expect(page).toHaveTitle(MAIN_PAGE_TITLE)
    })
    test('Positive - Log in with password', async ({page}) => {

        await homePage.navigateToLoginPage()
        await logInPage.insertEmail(EMAIL)
        await logInPage.insertPassword(PASSWORD)
        await homePage.confirmUserName(USER_NAME)
    })

    test('Positive - Log in with code', async ({page}) => {

        await homePage.navigateToLoginPage()
        await logInPage.insertEmail(EMAIL)
        //TODO get code from email
        await logInPage.insertCode("code")
        await homePage.confirmUserName(USER_NAME)
    })

    test('Positive - Bot avoidance system', async ({page}) => {

        await homePage.navigateToLoginPage()
        await logInPage.insertEmail(EMAIL)
        await logInPage.insertPassword(PASSWORD)
        await logInPage.validateForbiddenError(ERROR_LOGIN_BLOCKED)
    })

    test('Negative - Wrong email', async ({page}) => {

        await homePage.navigateToLoginPage()
        await expect(page).toHaveTitle(LOGIN_PAGE_TITLE)
        await logInPage.insertEmail(EMAIL_WRONG)
        await logInPage.validateEmailError(ERROR_WRONG_EMAIL)
    })

    test('Negative - Wrong password', async ({page}) => {

        await homePage.navigateToLoginPage()
        await expect(page).toHaveTitle(LOGIN_PAGE_TITLE)

        await logInPage.insertEmail(EMAIL)
        await logInPage.insertPassword(PASSWORD_WRONG)
        await logInPage.validatePasswordError(ERROR_WRONG_PASSWORD)
    })
})
