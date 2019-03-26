import { browser, by, element, ExpectedConditions } from 'protractor';
import { CommonPage } from './common.po';


export class SearchResultPage extends CommonPage {

    private readonly pagePath: string;

    constructor() {
        super();
        this.pagePath = '/busca';
    }

    async getPageTitle() {
        return super.getBrowserTitle();
    }

    getExpectedPath() {
        return this.pagePath;
    }
}
