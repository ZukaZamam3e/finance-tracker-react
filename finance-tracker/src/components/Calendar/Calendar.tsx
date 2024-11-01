import { Paper, Fab, Pagination, Stack, useTheme, Box } from "@mui/material";

export const Calendar = () => {
  const showAccounts = false;

  const sxBody = {
    display: !showAccounts ? "initial" : "none",
    width: "100vw",
  };

  const header_grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: "10px",
    rowGap: "10px",
  };

  const days_grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: { xs: "0px", sm: "10px" },
    rowGap: { xs: "0px", sm: "10px" },
    paddingTop: "10px",
  };

  const footer_grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    columnGap: "10px",
    rowGap: "10px",
    paddingTop: "10px",
  };

  const sxDaysBorder = {
    border: "3px solid rgb(58, 58, 60)",
    borderWidth: "3px",
  };

  const body = (
    <div style={sxBody}>
      <div style={header_grid}>
        <CalendarNav />
      </div>
      <Box sx={days_grid}>
        <DaysOfWeek />
        <Days />
      </Box>
      <div style={footer_grid}>
        <ManageAccount />
        <IncomeExpense />
        <BackwardForward />
      </div>
    </div>
  );

  return body;
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
    gridColumn: {
      xs: "span 2",
      sm: "span 1",
    },
  };

  const sxBackwardForward = {
    ...sxHeight,
    ...sxBorder,
    gridColumn: {
      xs: "span 0",
      sm: "span 1",
    },
    display: {
      xs: "none",
      sm: "flex",
    },
  };

  const sxMonthYear = { gridColumn: "span 3", ...sxHeight, ...sxBorder };

  return (
    <>
      <Paper sx={sxCurrentLow}>Current</Paper>
      <Paper sx={sxBackwardForward}>Backward</Paper>
      <Paper sx={sxMonthYear}>11/2024</Paper>
      <Paper sx={sxBackwardForward}>Forward</Paper>
      <Paper sx={sxCurrentLow}>Low</Paper>
    </>
  );
};

export const DaysOfWeek = () => {
  const sxBorder = {
    border: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", sm: "3px" },
    borderRadius: { xs: "1px", sm: "3px" },
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

export const Days = () => {
  const sxBorder = {
    border: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", sm: "3px" },
    borderRadius: { xs: "1px", sm: "3px" },
  };
  let dayCards: number[] = [];
  const sxDay = { height: "9.5vh", ...sxBorder };

  for (let i = 0; i < 42; ++i) {
    dayCards.push(i);
  }

  return dayCards.map((day) => <Paper sx={sxDay}>{day}</Paper>);
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
      <Paper sx={sxAccountList}>List</Paper>
      <Paper sx={sxMonthView}>Month View</Paper>
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
  const sxIncome = { gridColumn: "span 2", ...sxBorder, ...sxHeight };
  const sxExpense = { gridColumn: "span 2", ...sxBorder, ...sxHeight };
  return (
    <>
      <Paper sx={sxIncome}>Income</Paper>
      <Paper sx={sxExpense}>Expense</Paper>
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
  const sxBorder = { border: "3px solid rgb(58, 58, 60)" };
  const sxBackward = { gridColumn: "span 2", ...sxBorder, ...sxHeight };
  const sxForward = { gridColumn: "span 2", ...sxBorder, ...sxHeight };
  return (
    <>
      <Paper sx={sxBackward}>Backward</Paper>
      <Paper sx={sxForward}>Forward</Paper>
    </>
  );
};
