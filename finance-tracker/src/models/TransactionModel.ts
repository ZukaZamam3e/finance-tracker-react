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
}

export const defaultTransaction = () => {
  const transaction: TransactionModel = {
    transactionId: -1,
    accountId: -1,
    userId: -1,
    startDate: new Date(),
    amount: 0,
    name: "",
    frequencyTypeId: -1,
    offsetDate: new Date(),
  };
  return transaction;
};
