import { Box, Card } from "@mui/material";
import { DayModel, formatCurrency, formatter } from "../../models/DayModel";

interface DayCardProps {
  day: DayModel;
  onSelectDate: (date: Date) => void;
}

export const DayCard = (props: DayCardProps) => {
  const today = new Date();
  const month = new Date(props.day.date).getMonth();
  const day = new Date(props.day.date).getDate();
  const year = new Date(props.day.date).getFullYear();

  const currentMonth = today.getMonth() == month;
  const currentDay = today.getDate() == day;
  const currentYear = today.getFullYear() == year;

  const sxBorder = {
    borderWidth: { xs: "1px", md: "3px" },
    borderRadius: { xs: "1px", md: "3px" },
  };

  const sxNonMonthDayBorder = {
    border: "solid rgb(58, 58, 60)",
  };

  const sxMonthDayBorder = {
    border: "solid rgb(100, 149, 237)",
  };

  const sxTodayBorder = {
    border: "solid rgb(102, 255, 0)",
  };

  const sxDayBorder =
    currentYear && currentMonth && currentDay
      ? sxTodayBorder
      : currentYear && currentMonth && !currentDay
        ? sxMonthDayBorder
        : sxNonMonthDayBorder;

  const sxDay = {
    display: "flex",
    flexDirection: "column",
    height: { xs: "10.5vh", sm: "125px" },
    ...sxBorder,
  };

  const sxIncomeExpense = {
    mr: "auto",
    pl: "1px",
    fontWeight: "bolder",
  };

  const sxTotal = {
    ml: "auto",
    pr: 0.5,
    mt: "auto",
    fontWeight: "bolder",
    fontSize: {
      xs: ".7rem;",
      sm: ".9rem",
      md: "1.1rem",
    },
  };

  const sxFontSize = {
    fontSize: {
      xs: ".65rem",
      sm: ".9rem",
      md: "1rem",
    },
  };

  const sxDate = {
    ml: "auto",
    pr: 0.5,
    fontWeight: "bolder",
    fontSize: {
      xs: "1rem",
      sm: "1rem",
      md: "1.1rem",
    },
  };
  return (
    <Card
      sx={{ ...sxDay, ...sxDayBorder }}
      onClick={() => props.onSelectDate(props.day.date)}
    >
      <Box sx={{ ...sxDate }}>
        {month + 1}/{day}
      </Box>
      {props.day.income > 0 && (
        <Box
          sx={{
            ...sxIncomeExpense,
            ...sxFontSize,
            pt: "4px",
            color: "lightgreen",
          }}
        >
          {formatCurrency(props.day.income)}
        </Box>
      )}
      {props.day.expenses < 0 && (
        <Box sx={{ ...sxIncomeExpense, ...sxFontSize, color: "#ff9c46" }}>
          {formatCurrency(props.day.expenses)}
        </Box>
      )}
      <Box sx={{ ...sxTotal, color: "lightgreen" }}>
        {formatCurrency(props.day.total)}
      </Box>
    </Card>
  );
};
