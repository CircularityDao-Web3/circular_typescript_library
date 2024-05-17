import {CircularConfig, fixHex, GetTransactionResponse, SendTransactionResponse} from "./types";
import {handleErrorMessagesOnCircularResponse} from "./utils";

export const sendTransaction = async (circularConfig: CircularConfig, id: string, from: string,
                                      to: string, circularTimestamp: string, type: string,
                                      sha256OfPayload: string, nonce: string,
                                      signature: string) => {
    const data = {
        "ID": id,
        "From": fixHex(from),
        "To": fixHex(to),
        "Timestamp": circularTimestamp,
        "Payload": fixHex(sha256OfPayload),
        "Nonce": nonce,
        "Signature": fixHex(signature),
        "Blockchain": fixHex(circularConfig.networkHex),
        "Type": type,
        "Version": circularConfig.version
    }
    let response = await fetch(`${circularConfig.nagUrl}?cep=Circular_AddTransaction_`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await handleErrorMessagesOnCircularResponse<SendTransactionResponse>(response);
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

    return handleErrorMessagesOnCircularResponse<GetTransactionResponse>(response);
}
