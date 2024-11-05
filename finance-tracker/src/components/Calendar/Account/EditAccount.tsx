import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FTGrid } from "../../Common/FTGrid";
import { FTGridItem } from "../../Common/FTGridItem";
import { AccountModel } from "../../../models/AccountModel";
import { useState } from "react";
import { FTTextField } from "../../Common/FTTextField";
import { FabSaveCancel } from "../../Common/FabSaveCancel";

interface EditAccountProps {
  account: AccountModel;
  onCancelEditAccount: () => void;
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

  const handleAccountSave = () => {};

  return (
    <Box>
      <Paper
        sx={{
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "white",
          borderRadius: 3,
          m: 2,
          padding: 3,
        }}
      >
        <FTGrid>
          <FTGridItem size={{ xs: 12 }}>
            <FTTextField
              fullWidth
              name="accountName"
              label="Name"
              defaultValue={account.accountName}
              onChange={handleChange}
            />
          </FTGridItem>
          <FTGridItem size={{ xs: 12 }}>
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
          </FTGridItem>
        </FTGrid>
      </Paper>
      <FabSaveCancel
        onSaveClick={handleAccountSave}
        onCancelClick={props.onCancelEditAccount}
      />
    </Box>
  );
};
