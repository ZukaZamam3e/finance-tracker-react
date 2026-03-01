import {
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DayModel, formatCurrency } from "../../models/DayModel";

interface CalendarHeaderProps {
  monthYear: string;
  monthYearOptions: string[];
  lowestDay: DayModel;
  onCurrent: () => void;
  onBackward: () => void;
  onForward: () => void;
  onMonthYearChange: (monthYear: string) => void;
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
  const handleMonthYearChange = (event: SelectChangeEvent) => {
    props.onMonthYearChange(event.target.value);
  };

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
      <Button sx={sxCurrentLow} onClick={props.onCurrent}>
        Current
      </Button>
      <Button sx={sxBackwardForward} onClick={props.onBackward}>
        <ArrowBackIcon />
      </Button>
      <Select
        sx={sxMonthYear}
        value={props.monthYear}
        displayEmpty
        onChange={handleMonthYearChange}
      >
        {props.monthYearOptions.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <Button sx={sxBackwardForward} onClick={props.onForward}>
        <ArrowForwardIcon />
      </Button>
      <Paper sx={sxCurrentLow}>
        {new Date(props.lowestDay.date).getDate()}:{" "}
        {formatCurrency(props.lowestDay.total)}
      </Paper>
    </>
  );
};
