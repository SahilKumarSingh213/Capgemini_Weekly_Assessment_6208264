import {test} from "@playwright/test"

test("cricbuzz", async ({page}) => {
    const baseUrl = 'https://www.cricbuzz.com/';
    await page.goto(baseUrl);

    const liveScores = page.getByText('Live Scores');
    await liveScores.click();

    const firstMatch = page.getByTitle('Live Score').first();
    await firstMatch.click();

    const scorecard = page.getByTitle('Scorecard', {exact: true});
    await scorecard.click();

    const runsLocator = page.locator('(//div[@class="flex justify-center items-center font-bold text-sm  wb:text-sm"])[3]');
    const runs = await runsLocator.textContent();
    console.log("Ahmad Faiz's runs are ", runs);

    await page.screenshot({path: "screenshot/q10.png"});
});