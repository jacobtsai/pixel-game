const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport for a retro feel
    await page.setViewportSize({ width: 600, height: 800 });

    try {
        console.log('Navigating to http://localhost:5173...');
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

        // Take a screenshot of the Home Screen
        const homePath = path.join('/Users/jacob/.gemini/antigravity/brain/4f829cf5-5213-4650-9fef-535dd5f4298e', 'game_home.png');
        await page.screenshot({ path: homePath });
        console.log(`Screenshot saved to ${homePath}`);

        // Enter ID and click button
        await page.fill('.pixel-input', 'Tester_AI');
        await page.click('.pixel-button');

        // Wait for quiz screen
        await page.waitForTimeout(2000);
        const quizPath = path.join('/Users/jacob/.gemini/antigravity/brain/4f829cf5-5213-4650-9fef-535dd5f4298e', 'game_quiz.png');
        await page.screenshot({ path: quizPath });
        console.log(`Quiz screenshot saved to ${quizPath}`);

    } catch (err) {
        console.error('Error during browser simulation:', err);
    } finally {
        await browser.close();
    }
})();
