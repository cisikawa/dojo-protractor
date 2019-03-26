export class TestabilityData {
  private readonly testabilityHeader;
  private readonly testabilityBody;

  constructor() {
    this.testabilityHeader = 'Testability';
    this.testabilityBody = 'The Testability service provides testing hooks that can be accessed ' +
      'from the browser and by services such as Protractor. Each ' +
      'bootstrapped Angular application on the page will have an instance of Testability.';
  }

  getTestabilityHeader() {
    return this.testabilityHeader;
  }

  getTestabilityBody() {
    return this.testabilityBody;
  }

}
