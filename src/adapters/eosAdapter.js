import { postRequest, getRequest } from "../lib/request";
import prepareBody from "../utils/requestBody";
import envConfig from "../../config/envConfig";
import { BadRequestError } from '../errors'
import _ from 'lodash';
import { Api, JsonRpc, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig'; // development only


const EOSBaseUrl = envConfig.get("eosBaseUrl");
const { TextEncoder, TextDecoder } = require('util'); 
const fetch = require('node-fetch');                            // node only; not needed in browsers
const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });



class EOSAdapter {
  constructor(name) {
    this.name = name;
  }

  writeTransaction = req =>
    new Promise(async (resolve, reject) => {

      if (!req.body.transactionId) {
        return reject(new BadRequestError('transactionId is mandatory'));
      }
      if (!req.body.icecatUserIdFrom) {
        return reject(new BadRequestError('icecatUserIdFrom is mandatory'));
      }
      if (!req.body.icecatUserIdTo) {
        return reject(new BadRequestError('icecatUserIdTo is mandatory'));
      }

      const transactionId = req.body.transactionId; console.log("transactionId: ", transactionId);
      const icecatUserIdFrom = req.body.icecatUserIdFrom; console.log("icecatUserIdFrom", icecatUserIdFrom);
      const icecatUserIdTo = req.body.icecatUserIdTo; console.log("icecatUserIdTo: ",icecatUserIdTo);
      const currency = req.body.currency == null ? "ICY" : req.body.currency; console.log("currency: ", currency);

      const result = await api.transact({
        actions: [{
          account: 'icury',
          name: 'writetx',
          authorization: [{
            actor: 'eosio',
            permission: 'active',
          }],
          data: {
            transaction_id: transactionId,
            icecat_userid_from: icecatUserIdFrom,
            icecat_userid_to: icecatUserIdTo,
            currency: currency,
          },
        }]
      }, {
          blocksBehind: 3,
          expireSeconds: 30,
        });
      console.log(result);
      return resolve(result)
        .catch(reject);
    });

    writeTransactionLine = (headers, accountName) =>
    new Promise(async (resolve, reject) => {
      const uuid = await this._getUuid(accountName);
      if (!uuid) {
        return reject(new BadRequestError('Account does not exists'));
      }
      return this._getAddress(headers, uuid)
        .then(address => {
          //  setting startBlockNumber and endBlockNumber 
          var endBlockNumber = web3.eth.blockNumber;
          var startBlockNumber = 0;
          const url = `${etherscanApiURL}?module=account&action=txlist&address=${address}&startblock=${startBlockNumber}&endblock=${endBlockNumber}&page=1&offset=10&sort=asc&apikey=${etherscanApiKey}`;
          return request.get(url, (error, response, body) => { // using getRequest from lib gives "socket hang up" exception.
            if (error) {
              return reject(error);
            }
            return resolve(JSON.parse(body));
          });
        })
        .catch(reject)
    })


}

export default EOSAdapter;
