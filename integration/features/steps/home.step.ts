const { When } = require('cucumber');
import { HomePage } from '../po/home.po';

const homePage: HomePage = new HomePage();

When(/^I search for "([^"]*)" as filter$/, async function (advertiserName: string) {
    await homePage.waitForFilterAppears();
    await homePage.setFilter(advertiserName);
});












