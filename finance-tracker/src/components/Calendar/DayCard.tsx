import { Box, Card } from "@mui/material";
import { DayModel, formatCurrency } from "../../models/DayModel";

interface DayCardProps {
  day: DayModel;
  onSelectDay?: (day: DayModel) => void;
  largeView?: boolean;
}

export const DayCard = (props: DayCardProps) => {
  const largeView = props.largeView ?? false;
  const today = new Date();
  const month = new Date(props.day.date).getMonth();
  const day = new Date(props.day.date).getDate();
  const year = new Date(props.day.date).getFullYear();

  const currentMonth = today.getMonth() == month;
  const currentDay = today.getDate() == day;
  const currentYear = today.getFullYear() == year;

  const sxBorder = {
    borderWidth: { xs: !largeView ? "1px" : "3px", md: "3px" },
    borderRadius: { xs: !largeView ? "1px" : "3px", md: "3px" },
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
    height: { xs: !largeView ? "10.5vh" : "125px", sm: "125px" },
    // width: !largeView ? "initial" : "125px",
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
      xs: !largeView ? ".7rem" : "1rem",
      sm: !largeView ? ".9rem" : "1rem",
      md: "1.1rem",
    },
  };

  const sxFontSize = {
    fontSize: {
      xs: !largeView ? ".65rem" : "1rem",
      sm: !largeView ? ".9rem" : "1rem",
      md: "1rem",
    },
  };

  const sxDate = {
    ml: "auto",
    pr: 0.5,
    fontWeight: "bolder",
    fontSize: {
      xs: !largeView ? "1rem" : "1.1rem",
      md: "1.1rem",
    },
  };

  const handleSelectDay = () => {
    if (!!props.onSelectDay) {
      props.onSelectDay(props.day);
    }
  };

  return (
    <Card sx={{ ...sxDay, ...sxDayBorder }} onClick={handleSelectDay}>
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
      <Box
        sx={{
          ...sxTotal,
          color:
            props.day.total > 500
              ? "lightgreen"
              : props.day.total < 0
                ? "red"
                : "yellow",
        }}
      >
        {formatCurrency(props.day.total)}
      </Box>
    </Card>
  );
};
