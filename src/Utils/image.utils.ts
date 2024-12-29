import { Transaction, TransactionRequest } from "./interface";

export const getTransactionId = ({walletAddress, signature, username, timestamp} : TransactionRequest): Transaction => {

    return {
        transactionId: `${username}-${walletAddress}-${timestamp}-${signature}`
    }
};