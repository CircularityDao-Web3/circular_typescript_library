import {CircularApiResponse, CircularConfig, CircularWalletProvider, fixHex, GetWalletResponse} from "./types";
import {randomBytes} from "crypto";
import secp256k1 from "secp256k1";
import {handleErrorMessagesOnCircularResponse, sha256, stringToHex, timestampForCircular} from "./utils";
import {sendTransaction} from "./transactions";

export const generateRandomKeyPair = () => {
    while (true) {
        const privateKey = randomBytes(32)
        if (secp256k1.privateKeyVerify(privateKey)) return keyPairFromPrivateHex(Buffer.from(privateKey).toString('hex'))
    }
}

export const keyPairFromPrivateHex = (hex: string) => {
    const privateKey = Uint8Array.from(Buffer.from(fixHex(hex), 'hex'))
    const publicKey = Buffer.from(secp256k1.publicKeyCreate(privateKey, false)).toString('hex')
    return {
        address: "0x" + sha256(stringToHex(publicKey)),
        publicKey: "0x" + stringToHex(publicKey),
        signMessage: (message: string) => Buffer.from(secp256k1.ecdsaSign(new TextEncoder().encode(message), privateKey).signature)
            .toString('hex'),
        getPrivateKey: () => "0x" + Buffer.from(privateKey).toString('hex')
    } as CircularWalletProvider
}

export const register = (circularConfig: CircularConfig, publicKey: string, address: string) => {
    const From       = fixHex(address);
    const To         = From ;
    const Nonce      = "0";
    const Type       = 'C_TYPE_REGISTERWALLET';
    const PayloadObj = {
        "Action" : "CP_REGISTERWALLET",
        "PublicKey": fixHex(publicKey)
    };
    const jsonstr    = JSON.stringify(PayloadObj);
    const Payload    = stringToHex(jsonstr);
    const Timestamp  = timestampForCircular();
    const Signature  = "";

    return sendTransaction(circularConfig, From, To, Timestamp, Type, Payload, Nonce, Signature, fixHex(circularConfig.networkHex))
}

export const fetchByAddress = async (circularConfig: CircularConfig, address: string) => {
    const response = await fetch(`${circularConfig.nagUrl}?cep=Circular_GetWallet_`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "Blockchain" : fixHex(circularConfig.networkHex),
            "Address" : fixHex(address)
        })
    })
    return handleErrorMessagesOnCircularResponse<GetWalletResponse>(response).then((response) => {
        response.Address = "0x" + response.Address;
        return response;
    });
}

