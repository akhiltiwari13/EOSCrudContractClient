const prepareBody = (bodyParams) => {
    return {"jsonrpc": "2.0", "method": "call", "params": bodyParams, "id":1};
}

export default prepareBody;
