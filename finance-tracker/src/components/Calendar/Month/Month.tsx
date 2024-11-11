import { useEffect, useState } from "react";
import { calendarApi } from "../../../api/calendarApi";
import { FabCancel } from "../../Common/FabCancel";
import { MonthlyTransactionModel } from "../../../models/MonthlyTransactionModel";
import { MonthTransactionCard } from "./MonthTransactionCard";
import { Box } from "@mui/material";

interface MonthProps {
  onCancelMonth: () => void;
  accountId: number;
  selectedDate: Date;
}

export const Month = (props: MonthProps) => {
  const { getMonthlyTransactions } = calendarApi();

  const [monthlyTransactions, setMonthlyTransactions] = useState<
    MonthlyTransactionModel[]
  >([]);
  const load = async () => {
    const { response } = await getMonthlyTransactions(
      props.accountId,
      props.selectedDate
    );

    if (!!response) {
      setMonthlyTransactions(response);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const sxBody = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: { xs: "2px", sm: "5px" },
    rowGap: { xs: "2px", sm: "5px" },
    fontSize: { xs: "12px", sm: "16px" },
    paddingBottom: {
      xs: "185px",
      sm: "185px",
      md: "52px",
      lg: "52px",
    },
  };

  const body = (
    <Box sx={sxBody}>
      <Header />
      {monthlyTransactions.map((transaction) => (
        <MonthTransactionCard transaction={transaction} />
      ))}
      <Box sx={{ gridColumn: "span 6", pb: "50px" }}>
        <hr />
      </Box>
      <FabCancel onCancelClick={props.onCancelMonth} />
    </Box>
  );

  return <>{body}</>;
};

const Header = () => {
  const sxBorder = {
    borderBottom: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", sm: "3px" },
  };
  const sxTransactionName = { gridColumn: "span 2", ...sxBorder };

  return (
    <>
      <Box sx={sxBorder}>Date</Box>
      <Box sx={sxTransactionName}>Name</Box>
      <Box sx={sxBorder}>Income</Box>
      <Box sx={sxBorder}>Expense</Box>
      <Box sx={sxBorder}>Balance</Box>
    </>
  );
};
