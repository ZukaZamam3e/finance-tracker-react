import { AccountModel } from "../AccountModel";
import { DayModel, defaultDay } from "../DayModel";

export interface LoadCalendarResponse {
  accountId: number;
  month: number;
  monthYear: string;
  canGoFurther: boolean;
  canGoBack: boolean;
  monthIncome: number;
  monthExpenses: number;
  lowestDay: DayModel;
  days: DayModel[];
  accounts: AccountModel[];
}

export const defaultLoadCalendarResponse = () => {
  return {
    accountId: -1,
    month: -1,
    monthYear: "",
    canGoFurther: false,
    canGoBack: false,
    monthIncome: -1,
    monthExpenses: -1,
    lowestDay: defaultDay(),
    days: [],
    accounts: [],
  };
};