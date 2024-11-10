export interface MonthlyTransactionModel {
  transactionId: number;
  transactionDate: Date;
  transactionName: string;
  frequencyTypeIdZ: string;
  income?: number;
  expenses?: number;
  endOfDayBalance?: number;
}
