import { browser, by, element, Key, ElementFinder } from 'protractor';

export class PageUtils {

  private readonly defaultComponentWaitTime: number;
  private readonly defaultBrowserWaitTime: number;
  private readonly defaultBrowserWaitMinTime: number;

  constructor() {
    this.defaultComponentWaitTime = 30000;
    this.defaultBrowserWaitTime = 2500;
    this.defaultBrowserWaitMinTime = 500;
  }

  async navigateTo(site: string) {
    await browser.driver.get(site);
  }

  async getBrowserUrl() {
    return await browser.getCurrentUrl();
  }

  async getBrowserTitle() {
    return await browser.getTitle();
  }

  async stopForALittle() {
    await browser.driver.sleep(this.defaultBrowserWaitTime);
  }

  async freeze() {
    await browser.driver.wait(() => false);
  }

  protected async stopForALittleLess() {
    await browser.driver.sleep(this.defaultBrowserWaitMinTime);
  }

  getDefaultComponentWaitTime() {
    return this.defaultComponentWaitTime;
  }

  async setDate(selector: ElementFinder, date: string) {
    await selector.sendKeys(Key.CONTROL + 'a');
    await selector.sendKeys(Key.DELETE);
    await selector.sendKeys(date);
  }

  async clickAutoCompleteOption(optionNumber: number, autoCompleteId: string = 'mat-option') {
    const desiredOption = element.all(by.tagName(autoCompleteId)).get(optionNumber);

    await this.stopForALittle();

    await desiredOption.click();
  }

  protected async pageUp() {
    await browser.executeScript('window.scrollTo(0,0);');
  }

  protected async pageDown() {
    await browser.executeScript('window.scrollTo(0,10000);');
  }


}
