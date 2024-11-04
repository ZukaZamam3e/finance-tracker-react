import { protectedResources } from "../config/apiConfig";
import { useFetch } from "../hooks/useFetchOAProjectsAPI";
import { DayModel } from "../models/DayModel";
import {
  defaultGetFinancesResponse,
  GetFinancesResponse,
} from "../models/responses/GetFinancesResponse";
import {
  defaultLoadCalendarResponse,
  LoadCalendarResponse,
} from "../models/responses/LoadCalendarResponse";
import { TransactionModel } from "../models/TransactionModel";

export const calendarApi = () => {
  const { getData, postData } = useFetch();

  const loadCalendar = async (selectedDate: Date) => {
    let response: LoadCalendarResponse = defaultLoadCalendarResponse();

    await getData(
      `${protectedResources.oaprojectsApi.calendarEndpoint}/load?selectedDate=${selectedDate.toISOString()}`
    ).then((json) => {
      if (json.errors.length == 0) {
        response = json.model;
      }
    });

    return {
      response,
    };
  };

  const getFinances = async (accountId: number, selectedDate: Date) => {
    let response: GetFinancesResponse = defaultGetFinancesResponse();

    await getData(
      `${protectedResources.oaprojectsApi.calendarEndpoint}/getFinances?accountId=${accountId}&selectedDate=${selectedDate.toISOString()}`
    ).then((json) => {
      if (json.errors.length == 0) {
        response = json.model;
      }
    });

    return {
      response,
    };
  };

  const getFinancesOnDay = async (accountId: number, selectedDate: Date) => {
    let response: DayModel | null = null;

    await getData(
      `${protectedResources.oaprojectsApi.calendarEndpoint}/getFinancesOnDay?accountId=${accountId}&selectedDate=${selectedDate.toISOString()}`
    ).then((json) => {
      if (json.errors.length == 0) {
        response = json.model;
      }
    });

    return {
      response,
    };
  };

  const saveTransaction = async (transaction: TransactionModel) => {
    let data: TransactionModel | null = null;

    await postData(
      `${protectedResources.oaprojectsApi.calendarEndpoint}/savetransaction`,
      transaction
    ).then(async (json) => {
      if (json.errors.length == 0) {
        data = json.model;
      }
    });

    return data;
  };

  const deleteTransaction = async (
    transactionId: number,
    accountId: number
  ) => {
    let success: boolean = false;

    await postData(
      `${protectedResources.oaprojectsApi.calendarEndpoint}/deletetransaction`,
      {
        transactionId,
        accountId,
      }
    ).then(async (json) => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  const saveHardset = async (accountId: number, date: Date, amount: number) => {
    let success: boolean = false;

    await postData(
      `${protectedResources.oaprojectsApi.calendarEndpoint}/savehardset`,
      {
        accountId,
        date,
        amount,
      }
    ).then(async (json) => {
      if (json.errors.length == 0) {
        success = true;
      }
    });

    return success;
  };

  return {
    loadCalendar,
    getFinances,
    getFinancesOnDay,
    saveTransaction,
    deleteTransaction,
    saveHardset,
  };
};
