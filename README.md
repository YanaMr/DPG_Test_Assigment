<img height="24" width="24" src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" /> Language: TypeScript  
<img height="24" width="24" src="https://playwright.dev/img/playwright-logo.svg" /> Frameworks: Playwright  

# General Description
Test core repo created to demonstrate the usage of Playwright in action along with TypeScript.

### Installation
1. Clone the repo

   HTTP: ` `  
   Github CLI: ` ` 

2. Install NodeJS and NPM

3. Do a `npm install` in the project root

## Running the tests
* Run `npx playwright test`


The report will be placed in the `playwright-report` folder. In order to display the report after the local execution you may need to use `npx playwright show-report` command.

Screenshot and video will be made for failed tests.

## Scenarios
1. `articleSearch.test.ts` - covers Positive and Negative for searching an article 
2. `login.test.ts` 
* covers Positive and Negative flows for login scenarios 
* 3 scenarios will fail due to security reasons
* `Positive - Log in with code` --- is not finished, steps to get code from email should be added 
3. `podcast.test.ts` - opens random podcast and check it's title

## Future Development

* Login/Registration tests without bot avoidance system or Testing bot avoidance system Email validation