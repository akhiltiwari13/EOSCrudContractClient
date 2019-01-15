import { AccountController, TransactionController } from "../controller";
import Responder from '../lib/expressResponder';
import * as Adapters from '../adapters';

const _checkAuthentication = (req, res, next) => {
  // TODO: check authentication
  next();
};

const _getBlockChain = (req, res, next) => {
  req.adapter = Adapters.getBlockchain(req.headers["blockchain"]);
  next();
};

const _getSvcStatus = (req, res) => Responder.success(res, 'Service is up');;

const initRoutes = app => {
  // Health Check Routes
  app.get('/healthCheck', _checkAuthentication, _getSvcStatus);

  // Coin Routes
  // app.get('/coin/:coinId/price', _checkAuthentication, _getBlockChain, CoinController.getPrice);

  // Account Routes
  // app.get("/account/:accountName/balance", _checkAuthentication, _getBlockChain, AccountController.getBalance);
  // app.get("/account/:accountName/txnHistory", _checkAuthentication, _getBlockChain, AccountController.getTxnHistory);
  // app.post("/account", _checkAuthentication, AccountController.createAccount);

  // Transfer/Transaction Routes
  // app.get("/transaction/:txnId/status", _checkAuthentication, _getBlockChain, TransactionController.status);
  app.post("/transaction/:txnId/write", _checkAuthentication, _getBlockChain, TransactionController.wtrx);
};

export default initRoutes;
