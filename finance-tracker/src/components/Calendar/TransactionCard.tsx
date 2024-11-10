import { Link, Stack, Typography } from "@mui/material";
import { TransactionModel } from "../../models/TransactionModel";
import { FTCard } from "../Common/FTCard";
import { FTGrid } from "../Common/FTGrid";
import Grid from "@mui/material/Grid2";
import { formatCurrency } from "../../models/DayModel";
import { FTTypography } from "../Common/FTTypography";
import { FTIconButton } from "../Common/FTIconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TransactionCardProps {
  transaction: TransactionModel;
  selectedDate: Date;
  onSelectTransaction: (transaction: TransactionModel) => void;
  onDeleteTransaction: (transactionId: number, selectedDate: Date) => void;
}

export const TransactionCard = (props: TransactionCardProps) => {
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
        <Grid size={{ xs: 6, sm: 12 }}>
          <Stack direction="column" spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "center" }}
            >
              <FTIconButton
                aria-label="Edit"
                onClick={() => props.onSelectTransaction(props.transaction)}
              >
                <EditIcon style={{ color: "cornflowerblue" }} />
              </FTIconButton>
              <FTIconButton
                aria-label="Delete"
                onClick={() => {
                  props.onDeleteTransaction(
                    props.transaction.transactionId,
                    props.selectedDate
                  );
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
              </FTIconButton>
            </Stack>
          </Stack>
        </Grid>
      </FTGrid>
    </FTCard>
  );
};
