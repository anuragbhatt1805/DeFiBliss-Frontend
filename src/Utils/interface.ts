export interface ReclaimSignature {
    signature: string;
    provider: string;
    username: string;
    loggedIn: boolean;
}

export interface TransactionRequest {
    username: string;
    signature: string;
    walletAddress: string;
    timestamp: number;
}

export interface Transaction {
    transactionId: string;
}