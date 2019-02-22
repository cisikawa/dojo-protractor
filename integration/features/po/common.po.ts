import { browser, by, element, ExpectedConditions, protractor, Key } from 'protractor';
import { PageUtils } from './page.utils';
import { Alert } from 'selenium-webdriver';
export class CommonPage extends PageUtils {

  private readonly ID_LOGO: string;
  private readonly CSS_POPUP_BTN_BULK_CHANGE: string;
  private readonly CSS_POPUP_CONTENT: string;


  constructor() {
    super();
    this.ID_LOGO = 'logo';
    this.CSS_POPUP_BTN_BULK_CHANGE = '.ng-star-inserted > mat-dialog-actions > button.mat-primary';
    this.CSS_POPUP_CONTENT = 'mat-dialog-content';

  }

  async navigateTo(site: string) {
    await super.navigateTo(site);
  }

  async closeScreen() {
    await browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('t').perform();
    await browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('w').perform();
    await this.stopForALittle();
  }

  async pressEnter() {
    await browser.actions().keyDown(protractor.Key.ENTER).perform();
    await this.stopForALittle();
  }

  async refreshScreen() {
    await browser.navigate().refresh();
  }

  async getAlertText() {
    const alert: Alert = await protractor.browser.switchTo().alert();
    return await alert.getText();
  }

  async acceptAlertText() {
    const alert: Alert = await protractor.browser.switchTo().alert();
    await alert.accept();
    await this.stopForALittle();
  }

  /**
   * Accept alert and don't throw error message if it doesn't exists.
   * This method is used do start a new test.
   */
  async acceptAlertTextIfExists() {
    await protractor.browser.switchTo().alert().catch(function (e) {
      // Prevent error log when no dialog is found.
      if (e.name !== protractor.error.NoSuchAlertError.name) { throw e; }
    })
    .then(function (alert) {
      if (alert) { return alert.accept(); }
    });
    await this.stopForALittle();
  }

  async dismissAlertText() {
    const alert: Alert = await protractor.browser.switchTo().alert();
    await alert.dismiss();
    await this.stopForALittle();
  }

  async waitUntilLogoAppears() {
    const locatorLogo = by.id(this.ID_LOGO);
    await super.stopForALittle();
    await browser.wait(ExpectedConditions.visibilityOf(element(locatorLogo)),
      super.getDefaultComponentWaitTime());
  }

  async clickBtnPopup() {
    await element(by.css(this.CSS_POPUP_BTN_BULK_CHANGE)).click();
    await super.stopForALittle();
  }

  async getDialogContent() {
    return await element(by.css(this.CSS_POPUP_CONTENT)).getText();
  }
}
