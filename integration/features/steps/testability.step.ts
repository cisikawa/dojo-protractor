import { TestabilityPage } from '../po/testability.po';
import { TestabilityData } from '../data/testability.data';

const { Then } = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const testabilityPage: TestabilityPage = new TestabilityPage();
const testabilityData: TestabilityData = new TestabilityData();


Then('I expect to be at testability screen', async () => {
    await Promise.all([
        await testabilityPage.waitForFieldAppear('header'),
        await testabilityPage.waitForFieldAppear('body')
    ]);
    expect(await testabilityPage.getFieldValue('header')).to.be.equals(testabilityData.getTestabilityHeader());
    expect(await testabilityPage.getFieldValue('body')).to.be.equals(testabilityData.getTestabilityBody());
});
