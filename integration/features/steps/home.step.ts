const { When } = require('cucumber');
import { HomePage } from '../po/home.po';
import { CommonPage } from '../po/common.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const homePage: HomePage = new HomePage();
const commonPage: CommonPage = new CommonPage();

When(/^I search for "([^"]*)" as filter$/, async function (advertiserName: string) {
    await homePage.setFilter(advertiserName);
});
