export interface TransactionOffsetModel {
  transactionOffsetId: number;
  accountId: number;
  userId: number;
  transactionId: number;
  offsetDate: Date;
  offsetAmount: number;
}

export const defaultOffset = () => {
  const offset: TransactionOffsetModel = {
    transactionOffsetId: -1,
    transactionId: -1,
    accountId: -1,
    userId: -1,
    offsetAmount: 0,
    offsetDate: new Date(),
  };
  return offset;
};
