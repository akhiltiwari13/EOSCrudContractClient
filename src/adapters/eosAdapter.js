import { postRequest, getRequest } from "../lib/request";
import prepareBody from "../utils/requestBody";
import envConfig from "../../config/envConfig";
// import { User } from "../entity/user";
// import { Transfer } from "../entity/transfer";
import { BadRequestError } from '../errors'
import _ from 'lodash';

const EOSBaseUrl = envConfig.get("eosBaseUrl");

class EOSAdapter {
  constructor(name) {
    this.name = name;
  }

  getBalance = (headers, accountName) =>
    new Promise(async (resolve, reject) => {
      console.log("EOS GET BALANCE");
      return resolve(true)
        .catch(reject)
    })

   // getPrice = (coin, query) =>
  //   new Promise((resolve, reject) => {
  //     if (coin !== 'BTS') {
  //       return reject(new BadRequestError('Coin and Blockchain mismatched'));
  //     }
  //     const currency = query.currency || 'USD';
  //     const url = `${priceBaseUrl}/data/price?fsym=${coin}&tsyms=${currency}`;
  //     const headers = { Apikey: 'f212d4142590ea9d2850d73ab9bb78b6f414da4613786c6a83b7e764e7bf67f7' };
  //     return getRequest(url, {}, headers)
  //       .then(result => {
  //         if (result.Response === 'Error' && result.Message === `There is no data for any of the toSymbols ${currency} .`) {
  //           return reject(new BadRequestError('Invalid Currency'));
  //         }
  //         return resolve({ coin, [currency]: result[currency] })
  //       })
  //       .then(txn => resolve(txn.txn_id))
  //       .catch(err => reject(new ParameterInvalidError('Error in Transaction')));
  //   });
}

export default EOSAdapter;
