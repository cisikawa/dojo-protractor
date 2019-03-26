import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

export type ExpressRequestHandler = (req?: express.Request, res?: express.Response, next?: Function) => any;

export class MockServer {

  private static server: express.Application;
  private static serverStarted;
  private static bodyList: Array<any>;

  private static userLoggedIn = false;

  private static mockList: Array<any> = [];

  public static stop(): void {
    this.serverStarted.close();
  }

  public static getUserLoggedIn() {
    return this.userLoggedIn;
  }

  public static setUserLoggedIn() {
    this.userLoggedIn = true;
  }

  public static getBodyList() {
    return this.bodyList;
  }

  public static resetServer() {
    this.bodyList = [];
  }

  public static setMock(path: string, body: JSON, validationFunction: Function = () => true) {
    this.mockList[path] = {
      body, validationFunction
    };
  }

  public static deleteMock(path: string) {
    this.mockList[path] = undefined;
  }

  public static start(): void {
    this.resetServer();
    this.server = express();
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(bodyParser.urlencoded({
      extended: false
    }));

    this.server.use((req: any, res: any, next: any) => {
      res.removeHeader('Connection');
      res.removeHeader('Content-Length');
      res.removeHeader('X-Powered-By');
      res.type('json');
      if (this.mockList[req.originalUrl]) {
        const mockedSpecification = this.mockList[req.originalUrl];
        if (mockedSpecification) {
          if (mockedSpecification.validationFunction(req.body)) {
            res.jsonp(mockedSpecification.body);
          } else {
            res.sendStatus(500);
          }
        } else {
          next();
        }
      } else {
        next();
      }
    });

    this.serverStarted = this.server.listen(3000);

  }
}
