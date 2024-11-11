import { TransactionViewModel } from "../TransactionViewModel";

export interface GetTransactionResponse {
  transactions: TransactionViewModel[];
  count: number;
}

export const defaultGetTransactionResponse = () => {
  return {
    transactions: [],
    count: 0,
  };
};
