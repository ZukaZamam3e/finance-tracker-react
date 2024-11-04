export interface TransactionModel {
  transactionId: number;
  accountId: number;
  userId: number;
  startDate: Date;
  endDate?: Date;
  amount: number;
  name: string;
  frenquencyTypeId: number;
  frenquencyTypeIdZ?: string;
  transactionNotes?: string;
  transactionUrl?: string;
  interval?: number;
  offsetDate?: Date;
  offsetAmount?: number;
}
