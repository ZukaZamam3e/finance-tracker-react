import {
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AccountModel } from "../../models/AccountModel";
import { useEffect, useState } from "react";

interface ManageAccountProps {
  accounts: AccountModel[];
  accountId: number;
  onAccountClick: () => void;
  onAccountChange: (accountId: number) => void;
}

export const ManageAccount = (props: ManageAccountProps) => {
  const [accountId, setAccountId] = useState<any>(props.accountId);

  useEffect(() => {
    setAccountId(props.accountId);
  }, [props.accountId]);

  const handleAccountChange = (event: SelectChangeEvent) => {
    props.onAccountChange(parseInt(event.target.value));
  };

  const sxHeight = {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const sxBorder = { border: "3px solid rgb(58, 58, 60)" };
  const sxAccounts = { gridColumn: "span 2", ...sxBorder, ...sxHeight };
  const sxAccountList = { gridColumn: "span 1", ...sxBorder, ...sxHeight };
  const sxMonthView = { gridColumn: "span 1", ...sxBorder, ...sxHeight };
  return (
    <>
      <Select
        sx={sxAccounts}
        value={accountId}
        displayEmpty
        onChange={handleAccountChange}
      >
        <MenuItem value="0">Select Account</MenuItem>
        {props.accounts.map((item) => (
          <MenuItem key={item.accountId} value={item.accountId}>
            {item.accountName}
          </MenuItem>
        ))}
      </Select>
      <Button sx={sxAccountList} onClick={props.onAccountClick}>
        <ListIcon />
      </Button>
      <Button sx={sxMonthView}>
        <CalendarMonthIcon />
      </Button>
    </>
  );
};
