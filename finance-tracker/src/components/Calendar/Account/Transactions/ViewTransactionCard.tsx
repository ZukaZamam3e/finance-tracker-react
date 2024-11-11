import { Link } from "@mui/material";
import { FTCard } from "../../../Common/FTCard";
import { FTGrid } from "../../../Common/FTGrid";
import Grid from "@mui/material/Grid2";
import { formatCurrency } from "../../../../models/DayModel";
import { FTTypography } from "../../../Common/FTTypography";
import { TransactionViewModel } from "../../../../models/TransactionViewModel";

interface ViewTransactionCardProps {
  transaction: TransactionViewModel;
}

export const ViewTransactionCard = (props: ViewTransactionCardProps) => {
  return (
    <FTCard>
      <FTGrid>
        <Grid
          size={{ xs: 12 }}
          sx={{
            minHeight: {
              xs: 125,
            },
          }}
        >
          <FTTypography sx={{ fontSize: "18px" }}>
            {props.transaction.transaction.name}
          </FTTypography>
          <FTTypography>
            {props.transaction.transaction.frequencyTypeIdZ}
          </FTTypography>
          <FTTypography>
            {new Date(
              props.transaction.transaction.startDate
            ).toLocaleDateString()}
          </FTTypography>
          <FTTypography>
            {props.transaction.transaction.endDate &&
              new Date(
                props.transaction.transaction.endDate
              ).toLocaleDateString()}
          </FTTypography>
          <FTTypography>
            {formatCurrency(props.transaction.transaction.amount)}
          </FTTypography>
          <FTTypography>
            {props.transaction.transaction.offsetAmount &&
              formatCurrency(props.transaction.transaction.offsetAmount)}
          </FTTypography>
          <FTTypography>
            {props.transaction.transaction.transactionUrl && (
              <Link
                target="_blank"
                href={props.transaction.transaction.transactionUrl}
              >
                Click here
              </Link>
            )}
          </FTTypography>
          <FTTypography>
            {props.transaction.transaction.transactionNotes}
          </FTTypography>
          <FTTypography>
            {props.transaction.transaction.categories}
          </FTTypography>
        </Grid>
      </FTGrid>
    </FTCard>
  );
};
