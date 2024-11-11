import { TransactionViewModel } from "../TransactionViewModel";

export interface LoadTransactionResponse {
  transactions: TransactionViewModel[];
  count: number;
}

export const defaultLoadTransactionResponse = () => {
  return {
    transactions: [],
    count: 0,
  };
};
