import Responder from '../lib/expressResponder';

export default class TransactionController {
  static wtrx = (req, res) =>
    req.adapter
      .writeTransaction(req)
      .then(result => Responder.success(res, { TranscationId: result }))
      .catch(error => Responder.operationFailed(res, error));
};

