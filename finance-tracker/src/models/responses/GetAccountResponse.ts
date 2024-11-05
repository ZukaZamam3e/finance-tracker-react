import { AccountModel } from "../AccountModel";

export interface GetAccountResponse {
  accounts: AccountModel[];
  count: number;
}

export const defaultGetAccountResponse = () => {
  return {
    accounts: [],
    count: 0,
  };
};
