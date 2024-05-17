import {CircularApiResponse, CircularConfig, fixHex, SendTransactionResponse} from "./types";
import {handleErrorMessagesOnCircularResponse} from "./utils";

export const sendTransaction = (circularConfig: CircularConfig, from: string,
                                      to: string, circularTimestamp: string, type: string,
                                      sha256OfPayload: string, nonce: string,
                                      signature: string, blockchainHex: string) => {
    const data = {
        "From": fixHex(from),
        "To": fixHex(to),
        "Timestamp": circularTimestamp,
        "Payload": sha256OfPayload,
        "Nonce": nonce,
        "Signature": signature,
        "Blockchain": fixHex(blockchainHex),
        "Type": type,
        "Version": "1.0.7"
    }
    return fetch(`${circularConfig.nagUrl}?cep=Circular_AddTransaction_`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response) => handleErrorMessagesOnCircularResponse<SendTransactionResponse>(response))
}

export const getTransactionById = async (circularConfig: CircularConfig, txId: string) => {
    let data = JSON.stringify({
        "Blockchain" : fixHex(circularConfig.networkHex),
        "End":0,
        "ID": fixHex(txId),
        "Start": 0,
        "version": "1.0.7"
    });
    const response = await fetch(`${circularConfig.nagUrl}?cep=Circular_GetTransactionbyID_`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
    })
    return (await response.json()) as CircularApiResponse<any>;
}
