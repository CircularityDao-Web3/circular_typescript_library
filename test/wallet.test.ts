
import {circular} from "../src";
import {expect} from "chai";
import { DefaultConfigurations } from "../src/types";


describe('Circular Wallet Functions', () => {

    it('should be able to create keypair for a wallet and validate privateKey', () => {
        let circularWalletProvider = circular.wallet.generateRandomKeyPair();
        expect(circular.wallet.keyPairFromPrivateHex(circularWalletProvider.getPrivateKey()).publicKey).to.eq(circularWalletProvider.publicKey);
    });


    it('should be able to register wallet', async () => {
        let circularWalletProvider = circular.wallet.generateRandomKeyPair();
        const txResponse = await circular.wallet.register(DefaultConfigurations.CircularTestnetSandbox, circularWalletProvider.publicKey, circularWalletProvider.address);
        const txId = txResponse.TxID;
        // new Promise((resolve, reject) => {  setTimeout(() => { resolve('') }, 5000) });
        let transaction = await circular.transactions.getTransactionById(DefaultConfigurations.CircularTestnetSandbox, txId);
        // @ts-ignore
        while(transaction.Result == 103 || transaction.Response.Status == "Pending") {
            transaction = await circular.transactions.getTransactionById(DefaultConfigurations.CircularTestnetSandbox, txId);
            new Promise((resolve, reject) => {  setTimeout(() => { resolve('') }, 5000) });
        }
        const wallet = await circular.wallet.fetchByAddress(DefaultConfigurations.CircularTestnetSandbox, circularWalletProvider.address);
        expect(wallet!.Address).to.eq(circularWalletProvider.address);
    })

    it('should be able to get wallet by address', async () => {
        const address = "0x528705062159c65722c86fae0213bcb1323049b14c5133dee3b92ab41fe2f69d";
        const wallet = await circular.wallet.fetchByAddress(DefaultConfigurations.CircularTestnetSandbox, address);
        expect(wallet!.Address).to.eq(address);
    })
});