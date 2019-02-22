import { browser, by, element, ExpectedConditions } from 'protractor';
import { CommonPage } from './common.po';

export class HomePage extends CommonPage {

    private readonly CSS_INPUT_FILTER;

    constructor() {
        super();
        this.CSS_INPUT_FILTER = 'input[placeholder="Search"]';
    }

    async setFilter(value: string) {
        const filter = by.css(this.CSS_INPUT_FILTER);
        await browser.wait(ExpectedConditions.visibilityOf(element(filter)),
            super.getDefaultComponentWaitTime());
        await element(filter).clear().then(() => {
          element(filter).sendKeys(value);
        });
    }

}
