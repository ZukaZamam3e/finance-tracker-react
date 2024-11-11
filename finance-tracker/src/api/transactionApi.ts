import { useState } from "react";
import { protectedResources } from "../config/apiConfig";
import { useFetch } from "../hooks/useFetchOAProjectsAPI";
import {
  defaultGetTransactionResponse,
  GetTransactionResponse,
} from "../models/responses/GetTransactionResponse";
import {
  defaultLoadTransactionResponse,
  LoadTransactionResponse,
} from "../models/responses/LoadTransactionResponse";
import { TransactionViewModel } from "../models/TransactionViewModel";

export const transactionApi = () => {
  const { getData, postData } = useFetch();

  const loadTransactions = async (accountId: number, take: number) => {
    let response: LoadTransactionResponse = defaultLoadTransactionResponse();

    await getData(
      `${protectedResources.oaprojectsApi.transactionEndpoint}/load?accountId=${accountId}&take=${take}`
    ).then((json) => {
      if (json.errors.length == 0) {
        response = json.model;
      }
    });

    return {
      response,
    };
  };

  const getTransactions = async (
    accountId: number,
    page: number,
    take: number,
    search: string
  ) => {
    let response: GetTransactionResponse = defaultGetTransactionResponse();
    const offset = page * take;

    await getData(
      `${protectedResources.oaprojectsApi.transactionEndpoint}/get?accountId=${accountId}&offset=${offset}&take=${take}&search=${search}`
    ).then((json) => {
      if (json.errors.length == 0) {
        response = json.model;
      }
    });

    return {
      response,
    };
  };

  return { loadTransactions, getTransactions };
};
