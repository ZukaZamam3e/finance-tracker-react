import { Paper } from "@mui/material";

export const DaysOfWeek = () => {
  const sxBorder = {
    border: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", md: "3px" },
    borderBottomWidth: { xs: "0px", md: "3px" },
    borderRadius: { xs: "1px", md: "3px" },
    mr: "-1px",
    mt: "-1px",
    fontSize: {
      xs: ".85rem",
      sm: "1.2rem",
    },
  };

  return (
    <>
      <Paper sx={sxBorder}>Sun</Paper>
      <Paper sx={sxBorder}>Mon</Paper>
      <Paper sx={sxBorder}>Tue</Paper>
      <Paper sx={sxBorder}>Wed</Paper>
      <Paper sx={sxBorder}>Thu</Paper>
      <Paper sx={sxBorder}>Fri</Paper>
      <Paper sx={sxBorder}>Sat</Paper>
    </>
  );
};
