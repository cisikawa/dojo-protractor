const { When } = require('cucumber');
import { HomePage } from '../po/home.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const homePage: HomePage = new HomePage();

When(/^I search for "([^"]*)" as filter$/, async function (advertiserName: string) {
    await homePage.setFilter(advertiserName);
});
