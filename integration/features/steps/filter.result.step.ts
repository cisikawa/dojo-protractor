const { Then } = require('cucumber');
import { MainFilterPage } from '../po/main.filter.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const mainFilterPage: MainFilterPage = new MainFilterPage();

Then(/^I expect to see topics about "([^"]*)"$/, async (expectedSubject: string) => {
    expect(await mainFilterPage.getSearchResultSize()).to.be.at.least(1);
    expect(await mainFilterPage.getFilterValue('result item')).to.be.equals(expectedSubject);
});

Then('I click at {string} filter item', async (expectedSubject: string) => {
    expect(await mainFilterPage.getSearchResultSize()).to.be.at.least(1);
    expect(await mainFilterPage.getFilterValue('result item')).to.be.equals(expectedSubject);
    await mainFilterPage.clickFilterField('result item');
});
