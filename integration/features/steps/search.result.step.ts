const { Then } = require('cucumber');
import { SearchResultPage } from '../po/search.result.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const page: SearchResultPage = new SearchResultPage();

Then(/^I expect to see topics about "([^"]*)"$/, { timeout: -1 }, async (expectedSubject: string) => {
    expect(await page.getSearchResultSize()).to.be.at.least(1);
});
