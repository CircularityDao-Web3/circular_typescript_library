export type CircularConfig = {
    name: string
    networkHex: string
    nagUrl: string
    version: string
}

export const DefaultConfigurations = {
    CircularTestnetSandbox: {
        name: "Sandbox",
        networkHex: "0x8a20baa40c45dc5055aeb26197c203e576ef389d9acb171bd62da11dc5ad72b2",
        nagUrl: "https://nag.circularlabs.io/NAG.php",
        version: "1.0.7"
    } as CircularConfig
}

export function fixHex(hex: string) {
    return hex.startsWith("0x") ? hex.slice(2) : hex;
}

export type Asset = {
    Address: string
    Amount: string
    Description: string
    EnableSwap: boolean
    Name: string
    Price: number
    Royalties: number
    Type: string
    URL: string
    URLType: string
}

export type GetWalletResponse = {
    Address: string
    Assets: Asset[]
    ContractData: []
    DateCreation: string
    Nonce: number
    PublicKey: string
    Version: string
    Vouchers: []
}

export type SendTransactionResponse = {
    TxID: string,
    Timestamp: string
}

export type GetTransactionResponse =  {
    BlockID: string;
    BroadcastFee: number;
    DeveloperFee: number;
    From: string;
    GasLimit: number;
    ID: string;
    Instructions: number;
    NagFee: number;
    NodeID: string;
    Nonce: string;
    OSignature: string;
    Payload: string;
    ProcessingFee: number;
    ProtocolFee: number;
    Status: string;
    Timestamp: string;
    To: string;
    Type: string;
};

export type CircularApiResponse<T> = {
    Result: number
    Response: T
    Node: string
}

export type CircularWalletProvider = {
    address: string
    publicKey: string
    signMessage: (message: string) => string
    getPrivateKey: () => string
}
