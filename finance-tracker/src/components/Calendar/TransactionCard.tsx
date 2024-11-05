import { Link, Typography } from "@mui/material";
import { TransactionModel } from "../../models/TransactionModel";
import { FTCard } from "../Common/FTCard";
import { FTGrid } from "../Common/FTGrid";
import { FTGridItem } from "../Common/FTGridItem";
import { ReactNode } from "react";
import { formatCurrency } from "../../models/DayModel";
import { FTTypography } from "../Common/FTTypography";

interface TransactionCardProps {
  transaction: TransactionModel;
}

export const TransactionCard = (props: TransactionCardProps) => {
  return (
    <FTCard>
      <FTGrid>
        <FTGridItem
          size={{ xs: 12 }}
          sx={{
            minHeight: {
              xs: 85,
              sm: 100,
            },
            p: 1,
            mt: {
              xs: 0,
              sm: 0,
            },
          }}
        >
          <FTTypography sx={{ fontSize: "18px" }}>
            {props.transaction.name}
          </FTTypography>
          <FTTypography>{props.transaction.frequencyTypeIdZ}</FTTypography>
          <FTTypography>
            {new Date(props.transaction.startDate).toLocaleDateString()}
          </FTTypography>
          <FTTypography>
            {props.transaction.endDate &&
              new Date(props.transaction.endDate).toLocaleDateString()}
          </FTTypography>
          <FTTypography>
            {formatCurrency(props.transaction.amount)}
          </FTTypography>
          <FTTypography>
            {props.transaction.offsetAmount &&
              formatCurrency(props.transaction.offsetAmount)}
          </FTTypography>
          <FTTypography>
            {props.transaction.transactionUrl && (
              <Link target="_blank" href={props.transaction.transactionUrl}>
                Click here
              </Link>
            )}
          </FTTypography>
          <FTTypography>{props.transaction.transactionNotes}</FTTypography>
        </FTGridItem>
      </FTGrid>
    </FTCard>
  );
};
