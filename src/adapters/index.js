import EOSAdapter from './eosAdapter';
import { BadRequestError } from '../errors';

export const getBlockchain = (blockchain) => {
  switch (blockchain) {
    case 'EOS':
      return new EOSAdapter();
    default:
      throw new BadRequestError('Unknown Blockchain Passed');
  }
}

export { EOSAdapter};
