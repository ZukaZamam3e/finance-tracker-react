import { AccountModel } from "../AccountModel";

export interface GetAccountResponse {
  accounts: AccountModel[];
  count: number;
}
