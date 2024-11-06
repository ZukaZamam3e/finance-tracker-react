import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FTGrid } from "../../Common/FTGrid";
import Grid from "@mui/material/Grid2";
import { AccountModel } from "../../../models/AccountModel";
import { useState } from "react";
import { FTTextField } from "../../Common/FTTextField";
import { FabSaveCancel } from "../../Common/FabSaveCancel";
import { FTPaper } from "../../Common/FTPaper";

interface EditAccountProps {
  account: AccountModel;
  onCancelEditAccount: () => void;
  onAccountSave: (account: AccountModel) => void;
}

export const EditAccount = (props: EditAccountProps) => {
  const [account, setAccount] = useState<AccountModel>(props.account);
  const restartBinge = account.defaultIndc ? 1 : 0;

  const handleChange = (e: any) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleRestartBingeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    const bNewValue = newValue == 1;
    const updatedAccount = { ...account, ["defaultIndc"]: bNewValue };
    setAccount(updatedAccount);
  };

  const handleAccountSave = () => {
    const saveData: AccountModel = { ...account };
    props.onAccountSave(saveData);
  };

  return (
    <Box>
      <FTPaper>
        <FTGrid>
          <Grid size={{ xs: 12 }}>
            <FTTextField
              fullWidth
              name="accountName"
              label="Name"
              defaultValue={account.accountName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={restartBinge}
              onChange={handleRestartBingeChange}
              fullWidth
            >
              <ToggleButton value={0}>Not Default</ToggleButton>
              <ToggleButton value={1}>Default</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </FTGrid>
      </FTPaper>
      <FabSaveCancel
        onSaveClick={handleAccountSave}
        onCancelClick={props.onCancelEditAccount}
      />
    </Box>
  );
};
