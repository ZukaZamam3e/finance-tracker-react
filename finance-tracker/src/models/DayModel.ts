import { TransactionModel } from "./TransactionModel";
import { TransactionOffsetModel } from "./TransactionOffsetModel";

export interface DayModel {
  date: Date;
  dateZ: string;
  total: number;
  expenses: number;
  income: number;
  transactions: TransactionModel[];
  offsets: TransactionOffsetModel[];
}

export const defaultDay = () => {
  return {
    date: new Date(),
    dateZ: "",
    total: -1,
    expenses: -1,
    income: -1,
    transactions: [],
    offsets: [],
  };
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatCurrency = (amount: number) => {
  let amountZ = formatter.format(amount);

  if (amount < 0) {
    amountZ = `(${amountZ.substring(1)})`;
  }

  return amountZ;
};
