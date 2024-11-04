import { AccountModel } from "../AccountModel";

export interface LoadAccountResponse {
  accounts: AccountModel[];
  count: number;
}
