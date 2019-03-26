import { browser, by, element, ExpectedConditions } from 'protractor';
import { CommonPage } from './common.po';

export class MainFilterPage extends CommonPage {

    private readonly CSS_SEARCH_RESULT: string;
    private readonly CSS_TESTABILITY: string;
    private readonly fieldList;

    constructor() {
        super();
        this.CSS_TESTABILITY = 'a.search-result-item';
        this.CSS_SEARCH_RESULT = 'ul.priority-pages li';
        this.fieldList = [];
        this.fieldList['result item'] = {
            click: () => this.clickResultItem(),
            read: () => this.getResultItemValue()
        }
    }

    async getSearchResultSize() {
        const searchResult = by.css(this.CSS_SEARCH_RESULT);
        await browser.wait(ExpectedConditions.visibilityOf(element(searchResult)),
            super.getDefaultComponentWaitTime());
        return await element.all(searchResult).count().then(function (size) {
            return size;
        });
    }

    async clickFilterField(field: string) {
        await this.fieldList[field].click();
    }

    async getFilterValue(field: string) {
        console.log('this.fieldList[field]  ', this.fieldList[field])
        return await this.fieldList[field].read();
    }

    private async getResultItemValue() {
        return await element(by.css(this.CSS_TESTABILITY)).getText();
    }

    private async clickResultItem() {
        return await element(by.css(this.CSS_TESTABILITY)).click();
    }
}
