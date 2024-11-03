import { Paper, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListIcon from "@mui/icons-material/List";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { DayCard } from "./DayCard";
import { useState } from "react";
import { Day } from "./Day";

export const Calendar = () => {
  const showAccounts = false;

  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const sxBody = {
    display: !showAccounts && selectedDate == null ? "initial" : "none",
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

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCancelDate = () => {
    setSelectedDate(null);
  };

  const selectedDay = selectedDate != null && (
    <Day date={selectedDate} onCancelDate={handleCancelDate} />
  );

  const body = (
    <Box style={sxBody}>
      <div style={header_grid}>
        <CalendarNav />
      </div>
      <Box sx={days_grid}>
        <DaysOfWeek />
        <Days onSelectDate={handleSelectDate} />
      </Box>
      <Box sx={total_grid}>
        <IncomeExpense />
      </Box>
      <Box sx={footer_grid}>
        <ManageAccount />
        <BackwardForward />
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

export const CalendarNav = () => {
  const sxHeight = {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const sxBorder = { border: "3px solid rgb(58, 58, 60)" };

  const sxCurrentLow = {
    ...sxHeight,
    ...sxBorder,
    fontSize: {
      xs: ".8rem",
      sm: "1rem",
      md: ".9rem",
      lg: "1rem",
    },
    gridColumn: {
      xs: "span 2",
      md: "span 1",
    },
  };

  const sxBackwardForward = {
    ...sxHeight,
    ...sxBorder,
    gridColumn: {
      xs: "span 0",
      md: "span 2",
    },
    display: {
      xs: "none",
      md: "flex",
    },
  };

  const sxMonthYear = {
    gridColumn: {
      xs: "span 3",
      md: "span 1",
    },
    fontWeight: "bolder",
    fontSize: "1.5rem",
    ...sxHeight,
    ...sxBorder,
  };

  return (
    <>
      <Button sx={sxCurrentLow}>Current</Button>
      <Button sx={sxBackwardForward}>
        <ArrowBackIcon />
      </Button>
      <Paper sx={sxMonthYear}>Nov 2024</Paper>
      <Button sx={sxBackwardForward}>
        <ArrowForwardIcon />
      </Button>
      <Button sx={sxCurrentLow}>31: $(999,999)</Button>
    </>
  );
};

export const DaysOfWeek = () => {
  const sxBorder = {
    border: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", md: "3px" },
    borderRadius: { xs: "1px", md: "3px" },
    mr: "-1px",
    mt: "-1px",
    fontSize: {
      xs: ".85rem",
      sm: "1.2rem",
    },
  };

  return (
    <>
      <Paper sx={sxBorder}>Sun</Paper>
      <Paper sx={sxBorder}>Mon</Paper>
      <Paper sx={sxBorder}>Tue</Paper>
      <Paper sx={sxBorder}>Wed</Paper>
      <Paper sx={sxBorder}>Thu</Paper>
      <Paper sx={sxBorder}>Fri</Paper>
      <Paper sx={sxBorder}>Sat</Paper>
    </>
  );
};

interface DaysProps {
  onSelectDate: (date: Date) => void;
}

export const Days = (props: DaysProps) => {
  let dayCards: number[] = [];

  for (let i = 0; i < 42; ++i) {
    dayCards.push(i);
  }

  return dayCards.map((day) => (
    <DayCard i={day} onSelectDate={props.onSelectDate} />
  ));
};

export const ManageAccount = () => {
  const sxHeight = {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const sxBorder = { border: "3px solid rgb(58, 58, 60)" };
  const sxAccounts = { gridColumn: "span 2", ...sxBorder, ...sxHeight };
  const sxAccountList = { gridColumn: "span 1", ...sxBorder, ...sxHeight };
  const sxMonthView = { gridColumn: "span 1", ...sxBorder, ...sxHeight };
  return (
    <>
      <Paper sx={sxAccounts}>Accounts</Paper>
      <Button sx={sxAccountList}>
        <ListIcon />
      </Button>
      <Button sx={sxMonthView}>
        <CalendarMonthIcon />
      </Button>
    </>
  );
};

export const IncomeExpense = () => {
  const sxHeight = {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const sxBorder = { border: "3px solid rgb(58, 58, 60)" };
  const sxUpdateCurrent = { gridColumn: "span 3", ...sxBorder, ...sxHeight };

  const sxIncome = {
    gridColumn: "span 2",
    ...sxBorder,
    ...sxHeight,
    color: "lightgreen",
  };
  const sxExpense = {
    gridColumn: "span 2",
    ...sxBorder,
    ...sxHeight,
    color: "#ff9c46",
  };
  return (
    <>
      <Paper sx={sxIncome}>999,999</Paper>
      <Button sx={sxUpdateCurrent}>
        <PriceChangeIcon />
      </Button>
      <Paper sx={sxExpense}>$(999,999)</Paper>
    </>
  );
};

export const BackwardForward = () => {
  const sxHeight = {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const sxDisplay = {
    display: {
      xs: "flex",
      md: "none",
    },
  };
  const sxBorder = { border: "3px solid rgb(58, 58, 60)" };
  const sxBackward = {
    gridColumn: "span 2",
    ...sxBorder,
    ...sxHeight,
    ...sxDisplay,
  };
  const sxForward = {
    gridColumn: "span 2",
    ...sxBorder,
    ...sxHeight,
    ...sxDisplay,
  };
  return (
    <>
      <Button sx={sxBackward}>
        <ArrowBackIcon />
      </Button>
      <Button sx={sxForward}>
        <ArrowForwardIcon />
      </Button>
    </>
  );
};
