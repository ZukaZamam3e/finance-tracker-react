import { AccountModel } from "../AccountModel";

export interface LoadAccountResponse {
  accounts: AccountModel[];
  count: number;
}

export const defaultLoadAccountResponse = () => {
  return {
    accounts: [],
    count: 0,
  };
};
