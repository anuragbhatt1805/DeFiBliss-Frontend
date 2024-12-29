import { Transaction, TransactionRequest, DownloadResult, DownloadedTransaction } from "./interface";

export const getTransactionId = async ({walletAddress, signature, username, timestamp} : TransactionRequest): Promise<Transaction> => {

    return {
        transactionId: `${username}-${walletAddress}-${timestamp}-${signature}`
    }
};

export const getDownloadProof = async ({userAddress, artistsAddress, amount} : DownloadedTransaction) : Promise<DownloadResult> => {

    return {
        success: true,
        transactionId: `${userAddress}-${artistsAddress}-${amount}`
    }
}