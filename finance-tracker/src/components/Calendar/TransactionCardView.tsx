import { Link, Stack } from "@mui/material";
import { TransactionModel } from "../../models/TransactionModel";
import { FTCard } from "../Common/FTCard";
import { FTGrid } from "../Common/FTGrid";
import Grid from "@mui/material/Grid2";
import { formatCurrency } from "../../models/DayModel";
import { FTTypography } from "../Common/FTTypography";

interface TransactionCardViewProps {
  transaction: TransactionModel;
}

export const TransactionCardView = (props: TransactionCardViewProps) => {
  return (
    <FTCard>
      <FTGrid>
        <Grid
          size={{ xs: 6, sm: 12 }}
          sx={{
            minHeight: {
              xs: 125,
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
          <FTTypography>{props.transaction.categories}</FTTypography>
        </Grid>
      </FTGrid>
    </FTCard>
  );
};
