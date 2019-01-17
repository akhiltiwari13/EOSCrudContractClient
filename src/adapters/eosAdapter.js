import envConfig from "../../config/envConfig";
import { BadRequestError } from '../errors'
import _ from 'lodash';
import { Api, JsonRpc } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig'; // development only


const EOSBaseUrl = envConfig.get("eosBaseUrl");
const { TextEncoder, TextDecoder } = require('util');
const fetch = require('node-fetch');                            // node only; not needed in browsers
const rpc = new JsonRpc('http://51.254.99.43:8888', { fetch });
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
      const icecatUserIdTo = req.body.icecatUserIdTo; console.log("icecatUserIdTo: ", icecatUserIdTo);
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
      return resolve(result).catch(reject)
    })

  writeTransactionLine = req =>
    new Promise(async (resolve, reject) => {
      console.log("@@@@@")
      if (!req.body.transactionLineId) {
        return reject(new BadRequestError('transactionLineId is mandatory'));
      }
      if (!req.body.transactionId) {
        return reject(new BadRequestError('transactionId is mandatory'));
      }
      if (!req.body.icecatUserId) {
        return reject(new BadRequestError('icecatUserId is mandatory'));
      }
      if (!req.body.timestamp) {
        return reject(new BadRequestError('timestamp is mandatory'));
      }
      if (!req.body.value) {
        return reject(new BadRequestError('value is mandatory'));
      }
      if (!req.body.quantity) {
        return reject(new BadRequestError('quantity is mandatory'));
      }

      const transactionLineId = req.body.transactionLineId; console.log("transactionLineId: ", transactionLineId);
      const transactionId = req.body.transactionId; console.log("transactionId: ", transactionId);
      const icecatUserId = req.body.icecatUserId; console.log("icecatUserId", icecatUserId);
      const timestamp = req.body.timestamp; console.log("timestamp: ", timestamp);
      const value = req.body.value == null ? "ICY" : req.body.value; console.log("value: ", value);
      const quantity = req.body.quantity; console.log("quantity: ", quantity);
      const vat = req.body.vat; console.log("vat: ", vat);
      const description = req.body.description; console.log("description: ", description);

      const result = await api.transact({
        actions: [{
          account: 'icury',
          name: 'writetxln',
          authorization: [{
            actor: 'eosio',
            permission: 'active',
          }],
          data: {
            transactionln_id: transactionLineId,
            transaction_id: transactionId,
            tstmp: timestamp,
            icecat_id: icecatUserId,
            value: value,
            item_quantity: quantity,
            item_description: description,
            vat: vat
          },
        }]
      }, {
          blocksBehind: 3,
          expireSeconds: 30,
        })

        console.log(result);
        return resolve(result).catch(reject)
    })

    getTransaction = req =>
    new Promise(async (resolve, reject) => {
      return  resolve (await rpc.get_table_rows({
        json: true,              // Get the response as json
        code: 'icury',           // Contract that we target      
        scope: 'icury',          // Account that owns the data   
        table: 'trxs',         // Table name        
        limit: -1,
      })).catch(reject)
    })

  getTransactionLine = req =>
    new Promise(async (resolve, reject) => {
      return  resolve (await rpc.get_table_rows({
        json: true,              // Get the response as json
        code: 'icury',           // Contract that we target      
        scope: 'icury',          // Account that owns the data   
        table: 'trxlns',          // Table name        
        limit: -1,
      })).catch(reject)
    })

}

export default EOSAdapter;
