export class CommonData {
  private readonly messages;

  constructor() {
    this.messages = {
      '': ``
    };
  }

  getMessageByKey(key: string) {
    return this.messages[key];
  }

}
