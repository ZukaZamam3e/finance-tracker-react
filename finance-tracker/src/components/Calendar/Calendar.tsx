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

export const Calendar = () => {
  const { loadCalendar, getFinances, saveHardset } = calendarApi();

  const [calendarData, setCalendarData] = useState<LoadCalendarResponse>(
    defaultLoadCalendarResponse()
  );

  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayModel | null>(null);
  const [viewHardset, setViewHardset] = useState(false);
  const [viewAccounts, setViewAccounts] = useState(false);

  const [days, setDays] = useState<DayModel[]>([]);
  const [monthYear, setMonthYear] = useState<string>("");
  const [lowestDay, setLowestDay] = useState<DayModel>(defaultDay());
  const [monthIncome, setMonthIncome] = useState<number>(0);
  const [monthExpenses, setMonthExpenses] = useState<number>(0);
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [accountId, setAccountId] = useState<number>(0);
  const showAccounts = false;

  const load = async () => {
    const { response } = await loadCalendar(date);
    setCalendarData(response);

    if (!!response) {
      setAccountId(response.accountId);
      setDays(response.days);
      setLowestDay(response.lowestDay);
      setMonthYear(response.monthYear);
      setMonthIncome(response.monthIncome);
      setMonthExpenses(response.monthExpenses);
      setAccounts(response.accounts);
    }
  };

  const get = async (date: Date) => {
    const { response } = await getFinances(accountId, date);

    if (!!response) {
      setDays(response.days);
      setLowestDay(response.lowestDay);
      setMonthYear(response.monthYear);
      setMonthIncome(response.monthIncome);
      setMonthExpenses(response.monthExpenses);
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
    let success = await saveHardset(accountId, date, amount);

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

  useEffect(() => {
    get(date);
  }, [accountId, date]);

  const selectedDayView = selectedDay != null && (
    <Day day={selectedDay} onCancelDay={handleCancelDay} largeView={true} />
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

  const sxBody = {
    display:
      !showAccounts && selectedDay == null && !viewHardset && !viewAccounts
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
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
    </Box>
  );
};
