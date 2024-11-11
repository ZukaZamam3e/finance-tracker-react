import { TransactionModel } from "./TransactionModel";

export interface CategoryModel {
  category: string;
  transactions: TransactionModel[];
  total: number;
}
