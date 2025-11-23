import { Box, Link } from "@mui/material";
import { formatCurrency } from "../../../models/DayModel";
import { MonthlyTransactionModel } from "../../../models/MonthlyTransactionModel";

interface MonthTransactionCardProps {
  transaction: MonthlyTransactionModel;
}

export const MonthTransactionCard = (props: MonthTransactionCardProps) => {
  const sxBorder = {
    border: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", sm: "3px" },
  };
  const sxTransactionName = { gridColumn: "span 2", ...sxBorder };

  return (
    <>
      {props.transaction.transactionDate && (
        <Box sx={{ gridColumn: "span 6" }}>
          <hr />
        </Box>
      )}
      <Box sx={sxBorder}>
        {props.transaction.transactionDate &&
          new Date(props.transaction.transactionDate).toLocaleDateString()}
      </Box>
      <Box sx={sxTransactionName}>
        {props.transaction.url ? (
          <Link target="_blank" href={props.transaction.url}>
            {props.transaction.transactionName}
          </Link>
        ) : (
          <>{props.transaction.transactionName}</>
        )}
      </Box>
      <Box sx={sxBorder}>
        {props.transaction.income && formatCurrency(props.transaction.income)}
      </Box>
      <Box sx={sxBorder}>
        {props.transaction.expenses &&
          formatCurrency(props.transaction.expenses)}
      </Box>
      <Box sx={sxBorder}>
        {props.transaction.endOfDayBalance &&
          formatCurrency(props.transaction.endOfDayBalance)}
      </Box>
    </>
  );
};
