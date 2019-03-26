import { browser, by, element, ExpectedConditions } from 'protractor';
import { CommonPage } from './common.po';

export class TestabilityPage extends CommonPage {

    private readonly ID_HEADER: string;
    private readonly CSS_SHORT_DESCRIPTION: string;
    private readonly fieldList;

    constructor() {
        super();
        this.ID_HEADER = 'testability';
        this.CSS_SHORT_DESCRIPTION = '.short-description';
        this.fieldList = [];
        this.fieldList['header'] = {
            value: () => this.getHeaderValue(),
            field: by.id(this.ID_HEADER)
        };
        this.fieldList['body'] = {
            value: () => this.getShortDescriptionValue(),
            field: by.css(this.CSS_SHORT_DESCRIPTION)
        }
    }

    async waitForFieldAppear(field: string) {
        await browser.wait(ExpectedConditions.visibilityOf(element(this.fieldList[field].field)),
            super.getDefaultComponentWaitTime());
    }

    async getFieldValue(field: string) {
        return await this.fieldList[field].value();
    }

    private async getHeaderValue() {
        return await element(by.id(this.ID_HEADER)).getText();
    }

    private async getShortDescriptionValue() {
        return await element(by.css(this.CSS_SHORT_DESCRIPTION)).getText();
    }

}
