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

export interface DownloadedTransaction {
    userAddress: string;
    artistsAddress: string;
    amount: number;
}

export interface DownloadResult {
    success: boolean;
    transactionId: string;
}