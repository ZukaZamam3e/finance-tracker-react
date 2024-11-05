export interface AccountModel {
  accountId: number;
  userId: number;
  accountName: string;
  defaultIndc: boolean;
}

export const defaultAccount = () => {
  return {
    accountId: 0,
    userId: 0,
    accountName: "",
    defaultIndc: false,
  };
};
