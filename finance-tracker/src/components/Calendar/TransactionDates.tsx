import { Box } from "@mui/material";
import { DayModel } from "../../models/DayModel";
import { TransactionModel } from "../../models/TransactionModel";
import { FabCancel } from "../Common/FabCancel";
import { DayCard } from "./DayCard";
import { TransactionCardView } from "./TransactionCardView";
import { FTCard } from "../Common/FTCard";

interface TransactionDatesProps {
  transaction: TransactionModel;
  day: DayModel;
  largeView?: boolean;
  onCancelTransactionDates: () => void;
}

export const TransactionDates = (props: TransactionDatesProps) => {
  const getTransactionDates = (transaction: TransactionModel) => {
    let dates = [];
    // loop through the transaction date to the current date by months
    let startDate = new Date(transaction.startDate);

    let endDate = new Date(new Date(props.day.date).getFullYear(), 12, 31);

    if (
      transaction.endDate != null &&
      endDate > new Date(transaction.endDate)
    ) {
      endDate = new Date(transaction.endDate);
    }

    if (transaction.frequencyTypeId == 1001) {
      // If the transaction is a single transaction, set the end date to the start date
      endDate = new Date(transaction.startDate);
    }

    let iterDate = new Date(startDate);

    while (iterDate <= endDate) {
      dates.push(new Date(iterDate));

      switch (transaction.frequencyTypeId) {
        case 1002: // Daily
          iterDate.setDate(iterDate.getDate() + 1);
          break;
        case 1003: // Weekly
          iterDate.setDate(iterDate.getDate() + 7);
          break;
        case 1004: // Bi-Weekly
          iterDate.setDate(iterDate.getDate() + 14);
          break;
        case 1005: // Every Four Weeks
          iterDate.setDate(iterDate.getDate() + 28);
          break;
        case 1006: // Monthly
          iterDate = new Date(
            iterDate.getFullYear(),
            iterDate.getMonth() + 1,
            new Date(transaction.startDate).getDate()
          );
          if (iterDate.getDate() != new Date(transaction.startDate).getDate()) {
            iterDate.setDate(iterDate.getDate() + iterDate.getDate() * -1);
          }
          break;
        case 1007: // Quarterly
          iterDate = new Date(
            iterDate.getFullYear(),
            iterDate.getMonth() + 3,
            new Date(transaction.startDate).getDate()
          );
          if (iterDate.getDate() != new Date(transaction.startDate).getDate()) {
            iterDate.setDate(iterDate.getDate() + iterDate.getDate() * -1);
          }
          break;
        case 1008: // Yearly
          iterDate.setFullYear(iterDate.getFullYear() + 1);
          break;
        case 1009: // Every N Days
          iterDate.setMonth(iterDate.getDay() + (transaction.interval ?? 0));
          break;
        case 1010: // Every N Weeks
          iterDate.setMonth(
            iterDate.getDay() + (transaction.interval ?? 0) * 7
          );
          break;
        case 1011: // Every N Months
          iterDate.setMonth(iterDate.getMonth() + (transaction.interval ?? 0));
          break;
        default:
          break;
      }
    }

    const filteredDates = dates.filter((date: Date) => {
      return date.getFullYear() === new Date(props.day.date).getFullYear();
    });

    return filteredDates;
  };
  const sxBody = {
    display: "initial",
  };

  const sxDayRow = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: "5px",
    rowGap: "5px",
  };

  const sxTransactionRow = {
    paddingTop: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: "5px",
    rowGap: "5px",
  };

  const sxFiller = {
    gridColumn: { xs: "span 2", sm: "span 3" },
  };

  const sxCenter = {
    gridColumn: { xs: "span 3", sm: "span 1" },
  };

  const body = (
    <div style={sxBody}>
      <div style={sxDayRow}>
        <Box sx={sxFiller} />
        <Box sx={sxCenter}>
          <DayCard day={props.day} largeView={props.largeView} />
        </Box>
        <Box sx={sxFiller} />
      </div>
      <div style={sxTransactionRow}>
        <Box sx={sxFiller} />
        <Box sx={sxCenter}>
          <TransactionCardView transaction={props.transaction} />
        </Box>
        <Box sx={sxFiller} />
      </div>
      <div style={sxTransactionRow}>
        <Box sx={sxFiller} />
        <Box sx={sxCenter}>
          <FTCard>
            {getTransactionDates(props.transaction).map((date: Date) => (
              <div key={date.toLocaleDateString()}>
                {date.toLocaleDateString()}
              </div>
            ))}
          </FTCard>
        </Box>
        <Box sx={sxFiller} />
      </div>
      <FabCancel onCancelClick={props.onCancelTransactionDates} />
    </div>
  );

  return <>{body}</>;
};
