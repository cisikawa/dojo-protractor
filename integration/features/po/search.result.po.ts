import {
    browser,
    by,
    element,
    ExpectedConditions
} from 'protractor';
import {
    CommonPage
} from './common.po';

export class SearchResultPage extends CommonPage {

    private readonly CSS_SEARCH_RESULT: string;
    private readonly pagePath: string;

    constructor() {
        super();
        this.pagePath = '/busca';
        this.CSS_SEARCH_RESULT = 'ul.priority-pages li';
    }

    async getPageTitle() {
        return super.getBrowserTitle();
    }

    async getSearchResultSize() {
        const searchResult = by.css(this.CSS_SEARCH_RESULT);
        await browser.wait(ExpectedConditions.visibilityOf(element(searchResult)),
            super.getDefaultComponentWaitTime());
        return await element.all(searchResult).count().then(function (size) {
            return size;
        });
    }

    getExpectedPath() {
        return this.pagePath;
    }
}
