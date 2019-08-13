const fs = require('fs');
const { Builder, Key, By, until } = require('../index');
const configJson = require('./driver.config.json');

(async function doStuff() {
    let driver;
    try {
        driver = await new Builder().setConfig(configJson).build();
        await driver.launch();
        console.log("driver launched");
        await driver.wait(until.documentLoaded(), 15000);
        console.log("document loaded ");
        await driver.wait(until.elementLocated(By.name('BROWSE')), 20000);
        console.log("sent keys");
        await driver.sendKeys([
            Key.DOWN,
            Key.DOWN,
            Key.DOWN,
            Key.OK
        ]);
        await driver.wait(until.elementLocated(By.text('Til Death Do Us Part')), 20000);
        console.log("text found ");
        await driver.sendKeys([
            Key.DOWN,
            Key.DOWN,
            Key.OK
        ]);
        // await driver.wait(until.elementLocated(By.id('exampleVector2DAnimation')), 2000);
        const screenshot = await driver.takeScreenshot();
        const nowSeconds = Math.round(Date.now() / 1000);
        fs.writeFileSync(`screenshots/screenshot_${nowSeconds}.jpg`, screenshot);

    } catch(err) {
        console.error(err);
    } finally {
        if (driver) {
            await driver.sendKey(Key.HOME, 1000);
            driver.disconnect();
        }
    }
})();
