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


    // this.server.post('/order/lock', (req, res) => {

    //   this.bodyList['post-lock'] = req.body;

    //   const body = req.body.pop();

    //   if (!this.lockSuccess) {
    //     res.sendStatus(422);
    //   } else if (body.orderId == '1117147956' &&
    //     body.enterpriseMarketId == '55') {
    //     res.jsonp(lockPostDepot);
    //   } else if (body.orderId == '1108550993' &&
    //     body.enterpriseMarketId == '73') {
    //     res.jsonp(lockPostRob);
    //   } else if (body.orderId == '1108526252' &&
    //     body.enterpriseMarketId == '73') {
    //     res.jsonp(lockPostGeico);
    //   } else {
    //     res.sendStatus(500);
    //   }
    // });

    // this.server.post('/order/bulk-order-update', (req, res) => {
    //   this.bodyList['bulk-order-update'] = req.body;
    //   res.jsonp(bulkCangeUpdate);
    // });
  }
}
