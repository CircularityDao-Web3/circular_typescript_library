export type CircularConfig = {
    name: string
    networkHex: string
    nagUrl: string
}

export const DefaultConfigurations = {
    CircularTestnetSandbox: {
        name: "Sandbox",
        networkHex: "0x8a20baa40c45dc5055aeb26197c203e576ef389d9acb171bd62da11dc5ad72b2",
        nagUrl: "https://nag.circularlabs.io/NAG.php"
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
