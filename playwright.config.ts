import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    testMatch: '*test.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },
        // {
        //     name: 'webkit',
        //     use: {...devices['Desktop Safari']},
        // },
        {
            name: 'Google Chrome',
            use: {
                ...devices['Desktop Chrome'],
                // headless: false,
                channel: 'chrome'
            },
        },
    ],
});
