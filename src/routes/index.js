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
  
  // transaction/* Routes
  app.get("/transaction/gettrxln", _checkAuthentication, _getBlockChain, TransactionController.gtrxln);
  app.get("/transaction/gettrx", _checkAuthentication, _getBlockChain, TransactionController.gtrx);
  app.post("/transaction/writetrx", _checkAuthentication, _getBlockChain, TransactionController.wtrx);
  app.post("/transaction/writetrxln", _checkAuthentication, _getBlockChain, TransactionController.wtrxln);
};

export default initRoutes;
