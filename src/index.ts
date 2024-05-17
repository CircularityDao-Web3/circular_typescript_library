import {generateRandomKeyPair, fetchByAddress, keyPairFromPrivateHex, register} from "./wallet";
import {sha256, stringToHex, timestampForCircular} from "./utils";
import {getTransactionById, sendTransaction} from "./transactions";

export const circular = {
    common: {
        sha256: sha256,
        stringToHex: stringToHex,
        timestampForCircular: timestampForCircular
    },
    transactions: {
        sendTransaction: sendTransaction,
        getTransactionById: getTransactionById
    },
    wallet: {
        fetchByAddress: fetchByAddress,
        register: register,
        generateRandomKeyPair: generateRandomKeyPair,
        keyPairFromPrivateHex: keyPairFromPrivateHex
    }
}
