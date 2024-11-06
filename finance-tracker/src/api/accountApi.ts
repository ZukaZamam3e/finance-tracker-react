import { protectedResources } from "../config/apiConfig";
import { useFetch } from "../hooks/useFetchOAProjectsAPI";
import { AccountModel } from "../models/AccountModel";
import {
  defaultGetAccountResponse,
  GetAccountResponse,
} from "../models/responses/GetAccountResponse";
import {
  defaultLoadAccountResponse,
  LoadAccountResponse,
} from "../models/responses/LoadAccountResponse";

export const accountApi = () => {
  const { getData, postData } = useFetch();

  const loadAccounts = async (take: number) => {
    let response: LoadAccountResponse = defaultLoadAccountResponse();

    await getData(
      `${protectedResources.oaprojectsApi.accountEndpoint}/load?take=${take}`
    ).then((json) => {
      if (json.errors.length == 0) {
        response = json.model;
      }
    });

    return {
      response,
    };
  };

  const getAccounts = async (page: number, take: number, search: string) => {
    let response: GetAccountResponse = defaultGetAccountResponse();
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.accountEndpoint}/get?offset=${offset}&take=${take}&search=${search}`
    ).then((json) => {
      if (json.errors.length == 0) {
        response = json.model;
      }
    });

    return {
      response,
    };
  };

  const saveAccount = async (account: AccountModel) => {
    let data: AccountModel | null = null;

    await postData(
      `${protectedResources.oaprojectsApi.accountEndpoint}/saveaccount`,
      account
    ).then(async (json) => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });

    return data;
  };

  const deleteAccount = async (accountId: number) => {
    let success: boolean = false;

    await postData(
      `${protectedResources.oaprojectsApi.accountEndpoint}/deleteaccount`,
      {
        accountId,
      }
    ).then(async (json) => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  const cloneAccount = async (accountId: number) => {
    let data: AccountModel | null = null;
    await postData(
      `${protectedResources.oaprojectsApi.accountEndpoint}/cloneaccount`,
      { accountId }
    ).then(async (json) => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });
    return data;
  };

  return {
    loadAccounts,
    getAccounts,
    saveAccount,
    deleteAccount,
    cloneAccount,
  };
};
