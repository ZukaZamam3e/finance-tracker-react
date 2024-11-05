import { Button, Paper } from "@mui/material";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { formatCurrency } from "../../models/DayModel";

interface IncomeExpenseProps {
  income: number;
  expenses: number;
  onHardsetClick: () => void;
}

export const IncomeExpense = (props: IncomeExpenseProps) => {
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
      <Paper sx={sxIncome}>{formatCurrency(props.income)}</Paper>
      <Button sx={sxUpdateCurrent} onClick={props.onHardsetClick}>
        <PriceChangeIcon />
      </Button>
      <Paper sx={sxExpense}>{formatCurrency(props.expenses)}</Paper>
    </>
  );
};
