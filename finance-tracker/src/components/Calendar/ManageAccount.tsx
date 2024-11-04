import { Button, Paper } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const ManageAccount = () => {
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
      <Paper sx={sxAccounts}>Accounts</Paper>
      <Button sx={sxAccountList}>
        <ListIcon />
      </Button>
      <Button sx={sxMonthView}>
        <CalendarMonthIcon />
      </Button>
    </>
  );
};
