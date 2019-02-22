import { CommonPage } from '../po/common.po';
const { Given, When, Then } = require('cucumber');
import { CommonData } from '../data/common.data';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const page: CommonPage = new CommonPage();
const commonData: CommonData = new CommonData();

Given(/^I go to "([^"]*)"$/, { timeout: 20000 }, async function (site) {
    await page.navigateTo(site);
});

When('I refresh the screen', async () => {
    await page.refreshScreen();
});

When('I close my screen', async () => {
    await page.closeScreen();
});

Then(/^I expect an alert with message with text "([^"]*)"$/, async (expectedMessage: string) => {
    expect(await page.getAlertText()).to.not.be.equal(expectedMessage);
});

Then(/^I expect an popup with message with text an "([^"]*)"$/, async (expectedMessage: string) => {

    let messageByKey = commonData.getMessageByKey(expectedMessage);
    if (!messageByKey) {
        messageByKey = expectedMessage;
    }

    expect(await page.getDialogContent()).to.be.equal(messageByKey);
});

Then(/^I click at "([^"]*)" option in alert$/, async (clickOption: string) => {
    if (clickOption === 'yes') {
        await page.acceptAlertText();
    } else {
        await page.dismissAlertText();
    }
});
