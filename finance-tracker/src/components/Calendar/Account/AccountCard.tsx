import { AccountModel } from "../../../models/AccountModel";
import { FTCard } from "../../Common/FTCard";
import { FTGrid } from "../../Common/FTGrid";
import Grid from "@mui/material/Grid2";
import { FTTypography } from "../../Common/FTTypography";
import { Stack } from "@mui/material";
import { FTIconButton } from "../../Common/FTIconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface AccountCardProps {
  account: AccountModel;
  onSelectAccount: (account: AccountModel) => void;
  onDeleteAccount: (accountId: number) => void;
  onCloneAccount: (accountId: number) => void;
}

export const AccountCard = (props: AccountCardProps) => {
  return (
    <FTCard>
      <FTGrid>
        <Grid
          size={{ xs: 6, sm: 12 }}
          sx={{
            minHeight: {
              xs: 50,
            },
          }}
        >
          <FTTypography>{props.account.accountName}</FTTypography>
          <FTTypography>
            Default: {props.account.defaultIndc ? "Yes" : "No"}
          </FTTypography>
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
                onClick={() => props.onSelectAccount(props.account)}
              >
                <EditIcon style={{ color: "cornflowerblue" }} />
              </FTIconButton>
              <FTIconButton
                aria-label="Delete"
                onClick={() => {
                  props.onDeleteAccount(props.account.accountId);
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
              </FTIconButton>
              <FTIconButton
                aria-label="Delete"
                onClick={() => {
                  props.onCloneAccount(props.account.accountId);
                }}
              >
                <ContentCopyIcon style={{ color: "yellow" }} />
              </FTIconButton>
            </Stack>
          </Stack>
        </Grid>
      </FTGrid>
    </FTCard>
  );
};
