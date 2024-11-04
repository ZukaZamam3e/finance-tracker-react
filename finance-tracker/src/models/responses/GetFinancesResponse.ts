import { DayModel, defaultDay } from "../DayModel";

export interface GetFinancesResponse {
  accountId: number;
  month: number;
  monthYear: string;
  canGoFurther: boolean;
  canGoBack: boolean;
  monthIncome: number;
  monthExpenses: number;
  lowestDay: DayModel;
  days: DayModel[];
}

export const defaultGetFinancesResponse = () => {
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
  };
};
