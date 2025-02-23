export interface TransactionModel {
  transactionId: number;
  accountId: number;
  userId: number;
  startDate: Date;
  endDate?: Date;
  amount: number;
  name: string;
  frequencyTypeId: number;
  frequencyTypeIdZ?: string;
  transactionNotes?: string;
  transactionUrl?: string;
  interval?: number;
  offsetDate?: Date;
  offsetAmount?: number;
  categories?: string;
  conditional?: number;
  conditionalZ?: string;
  conditionalAmount?: number;
}

export const defaultTransaction = (startDate?: Date) => {
  const transaction: TransactionModel = {
    transactionId: -1,
    accountId: -1,
    userId: -1,
    startDate: startDate ?? new Date(),
    amount: 0,
    name: "",
    frequencyTypeId: -1,
  };
  return transaction;
};
