import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Day } from "./Day";
import { DaysOfWeek } from "./DaysOfWeek";
import { Days } from "./Days";
import { CalendarHeader } from "./CalendarHeader";
import { ManageAccount } from "./ManageAccount";
import { BackwardForward } from "./BackwardForward";
import { IncomeExpense } from "./IncomeExpense";
import { calendarApi } from "../../api/calendarApi";
import {
  defaultLoadCalendarResponse,
  LoadCalendarResponse,
} from "../../models/responses/LoadCalendarResponse";
import { DayModel, defaultDay } from "../../models/DayModel";
import { Hardset } from "./Hardset";
import { AccountModel } from "../../models/AccountModel";
import { Accounts } from "./Account/Accounts";
import { CodeValueModel } from "../../models/CodeValueModel";
import { TransactionModel } from "../../models/TransactionModel";
import { Categories } from "./Category/Categories";
import { Month } from "./Month/Month";

export const Calendar = () => {
  const {
    loadCalendar,
    getFinances,
    saveHardset,
    saveTransaction,
    deleteTransaction,
  } = calendarApi();

  const [calendarData, setCalendarData] = useState<LoadCalendarResponse>(
    defaultLoadCalendarResponse()
  );

  const [date, setDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [selectedDay, setSelectedDay] = useState<DayModel | null>(null);
  const [viewHardset, setViewHardset] = useState(false);
  const [viewAccounts, setViewAccounts] = useState(false);
  const [viewMonth, setViewMonth] = useState(false);
  const [viewCategories, setViewCategories] = useState(false);

  const [days, setDays] = useState<DayModel[]>([]);
  const [monthYear, setMonthYear] = useState<string>("");
  const [lowestDay, setLowestDay] = useState<DayModel>(defaultDay());
  const [monthIncome, setMonthIncome] = useState<number>(0);
  const [monthExpenses, setMonthExpenses] = useState<number>(0);
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [accountId, setAccountId] = useState<number>(0);
  const [frequencyTypeIds, setFrequencyTypeIds] = useState<CodeValueModel[]>(
    []
  );
  const showAccounts = false;

  const load = async () => {
    const { response } = await loadCalendar(date);
    setCalendarData(response);

    if (!!response) {
      setAccountId(response.accountId);

      response.days = response.days.map((day) => {
        day.transactions.map((transaction) => {
          const filter = day.offsets.filter(
            (m) =>
              new Date(m.offsetDate).getTime() ==
                new Date(day.date).getTime() &&
              m.transactionId == transaction.transactionId
          );

          if (filter.length > 0) {
            transaction.offsetAmount = filter[0].offsetAmount;
            transaction.offsetDate = filter[0].offsetDate;
          }
          return transaction;
        });
        return day;
      });

      setDays(response.days);
      setLowestDay(response.lowestDay);
      setMonthYear(response.monthYear);
      setMonthIncome(response.monthIncome);
      setMonthExpenses(response.monthExpenses);
      setAccounts(response.accounts);
      setAccountId(response.accountId);
      setFrequencyTypeIds(response.frequencyTypeIds);
    }
  };

  const get = async (date: Date, onSelectDay?: (day: DayModel) => void) => {
    const { response } = await getFinances(accountId, date);

    if (!!response) {
      response.days = response.days.map((day) => {
        day.transactions.map((transaction) => {
          const filter = day.offsets.filter(
            (m) =>
              new Date(m.offsetDate).getTime() ==
                new Date(day.date).getTime() &&
              m.transactionId == transaction.transactionId
          );

          if (filter.length > 0) {
            transaction.offsetAmount = filter[0].offsetAmount;
            transaction.offsetDate = filter[0].offsetDate;
          }
          return transaction;
        });
        return day;
      });

      setDays(response.days);
      setLowestDay(response.lowestDay);
      setMonthYear(response.monthYear);
      setMonthIncome(response.monthIncome);
      setMonthExpenses(response.monthExpenses);
      setAccountId(response.accountId);

      if (!!onSelectDay) {
        const day = response.days.filter(
          (m) => new Date(m.date).getTime() == new Date(date).getTime()
        )[0];
        onSelectDay(day);
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSelectDay = (day: DayModel) => {
    setSelectedDay(day);
  };

  const handleCancelDay = () => {
    setSelectedDay(null);
  };

  const handleCurrent = async () => {
    const updatedDate = new Date();
    setDate(updatedDate);
  };

  const handleBackward = async () => {
    const updatedDate = new Date(date);
    updatedDate.setMonth(updatedDate.getMonth() - 1);
    setDate(updatedDate);
  };

  const handleForward = async () => {
    const updatedDate = new Date(date);
    updatedDate.setMonth(updatedDate.getMonth() + 1);
    setDate(updatedDate);
  };

  const handleOpenHardset = () => {
    setViewHardset(true);
  };

  const handleCancelHardset = () => {
    setViewHardset(false);
  };

  const handleHardsetSave = async (hardsetDate: Date, amount: number) => {
    let success = await saveHardset(accountId, hardsetDate, amount);

    if (success) {
      get(hardsetDate);
      handleCancelHardset();
    }
  };

  const handleAccountChange = (newAccountId: number) => {
    setAccountId(newAccountId);
  };

  const handleOpenAccount = () => {
    setViewAccounts(true);
  };

  const handleCancelAccount = () => {
    setViewAccounts(false);
  };

  const handleOpenMonth = () => {
    setViewMonth(true);
  };

  const handleCancelMonth = () => {
    setViewMonth(false);
  };

  const handleOpenCategories = () => {
    setViewCategories(true);
  };

  const handleCancelCategories = () => {
    setViewCategories(false);
  };

  const handleSaveTransaction = async (
    transaction: TransactionModel,
    selectedDate: Date
  ) => {
    const updatedTransaction = await saveTransaction(
      accountId,
      selectedDate,
      transaction
    );

    if (updatedTransaction != null) {
      await get(new Date(selectedDate), handleSelectDay);
    }

    return updatedTransaction;
  };

  const handleDeleteTransaction = async (
    transactionId: number,
    selectedDate: Date
  ) => {
    const success = await deleteTransaction(transactionId, accountId);

    if (success) {
      await get(new Date(selectedDate), handleSelectDay);
    }
  };

  useEffect(() => {
    get(date);
  }, [accountId, date]);

  const selectedDayView = selectedDay != null && (
    <Day
      day={selectedDay}
      frequencyTypeIds={frequencyTypeIds}
      onCancelDay={handleCancelDay}
      largeView={true}
      onDeleteTransaction={handleDeleteTransaction}
      onSaveTransaction={handleSaveTransaction}
    />
  );

  const hardsetView = viewHardset && (
    <Hardset
      onCancelHardset={handleCancelHardset}
      onSaveHardset={handleHardsetSave}
    />
  );

  const accountsView = viewAccounts && (
    <Accounts
      onCancelAccount={handleCancelAccount}
      onSetAccounts={setAccounts}
    />
  );

  const monthView = viewMonth && (
    <Month
      accountId={accountId}
      selectedDate={date}
      onCancelMonth={handleCancelMonth}
    />
  );

  const categoriesView = viewCategories && (
    <Categories
      accountId={accountId}
      selectedDate={date}
      onCancelCategories={handleCancelCategories}
    />
  );

  const sxBody = {
    display:
      !showAccounts &&
      selectedDay == null &&
      !viewHardset &&
      !viewAccounts &&
      !viewCategories &&
      !viewMonth
        ? "initial"
        : "none",
  };

  const sxBox = {
    width: "100vw",
  };

  const header_grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: "5px",
    rowGap: "5px",
  };

  const days_grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: { xs: "0px", md: "5px" },
    rowGap: { xs: "0px", md: "5px" },
    paddingTop: "5px",
  };

  const total_grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: "5px",
    rowGap: "5px",
    paddingTop: "5px",
  };

  const footer_grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: "5px",
    rowGap: "5px",
    paddingTop: "5px",
  };

  const body = (
    <Box style={sxBody}>
      <div style={header_grid}>
        <CalendarHeader
          lowestDay={lowestDay}
          onCurrent={handleCurrent}
          onBackward={handleBackward}
          onForward={handleForward}
          monthYear={monthYear}
        />
      </div>
      <Box sx={days_grid}>
        <DaysOfWeek />
        <Days onSelectDay={handleSelectDay} days={days} />
      </Box>
      <Box sx={total_grid}>
        <IncomeExpense
          income={monthIncome}
          expenses={monthExpenses}
          onHardsetClick={handleOpenHardset}
        />
      </Box>
      <Box sx={footer_grid}>
        <ManageAccount
          accounts={accounts}
          accountId={accountId}
          onAccountChange={handleAccountChange}
          onAccountClick={handleOpenAccount}
          onCategoriesClick={handleOpenCategories}
          onMonthClick={handleOpenMonth}
        />
        <BackwardForward
          onBackward={handleBackward}
          onForward={handleForward}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={sxBox}>
      {body}
      {selectedDayView}
      {hardsetView}
      {accountsView}
      {monthView}
      {categoriesView}
    </Box>
  );
};
