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

export const Calendar = () => {
  const { loadCalendar, getFinances } = calendarApi();

  const [calendarData, setCalendarData] = useState<LoadCalendarResponse>(
    defaultLoadCalendarResponse()
  );

  const [date, setDate] = useState(new Date());

  const [days, setDays] = useState<DayModel[]>([]);
  const [monthYear, setMonthYear] = useState<string>("");
  const [lowestDay, setLowestDay] = useState<DayModel>(defaultDay());
  const [monthIncome, setMonthIncome] = useState<number>(0);
  const [monthExpenses, setMonthExpenses] = useState<number>(0);

  const showAccounts = false;

  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const sxBody = {
    display: !showAccounts && selectedDate == null ? "initial" : "none",
    width: "100vw",
  };

  const load = async () => {
    const { response } = await loadCalendar(date);
    setCalendarData(response);

    if (!!response) {
      setDays(response.days);
      setLowestDay(response.lowestDay);
      setMonthYear(response.monthYear);
      setMonthIncome(response.monthIncome);
      setMonthExpenses(response.monthExpenses);
    }
  };

  const get = async (date: Date) => {
    const { response } = await getFinances(calendarData.accountId, date);

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

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCancelDate = () => {
    setSelectedDate(null);
  };

  const handleCurrent = async () => {
    const updatedDate = new Date();
    setDate(updatedDate);

    get(updatedDate);
  };

  const handleBackward = async () => {
    const updatedDate = date;
    updatedDate.setMonth(updatedDate.getMonth() - 1);
    setDate(updatedDate);

    get(updatedDate);
  };

  const handleForward = async () => {
    const updatedDate = date;
    updatedDate.setMonth(updatedDate.getMonth() + 1);
    setDate(updatedDate);

    get(updatedDate);
  };

  const selectedDay = selectedDate != null && (
    <Day date={selectedDate} onCancelDate={handleCancelDate} />
  );

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
        <Days onSelectDate={handleSelectDate} days={days} />
      </Box>
      <Box sx={total_grid}>
        <IncomeExpense income={monthIncome} expenses={monthExpenses} />
      </Box>
      <Box sx={footer_grid}>
        <ManageAccount />
        <BackwardForward
          onBackward={handleBackward}
          onForward={handleForward}
        />
      </Box>
    </Box>
  );

  return (
    <>
      {body}
      {selectedDay}
    </>
  );
};
