import { Box, Card, Typography } from "@mui/material";

interface DayCardProps {
  i: number;
  onSelectDate: (date: Date) => void;
}

export const DayCard = (props: DayCardProps) => {
  let date = new Date();
  const sxBorder = {
    border: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", md: "3px" },
    borderRadius: { xs: "1px", md: "3px" },
    mr: "-1px",
    mt: "-1px",
  };
  const sxDay = {
    display: "flex",
    flexDirection: "column",
    height: { xs: "11vh", sm: "12vh" },
    ...sxBorder,
  };

  const sxIncomeExpense = {
    mr: "auto",
    pl: "1px",
    fontWeight: "bolder",
  };

  const sxTotal = {
    ml: "auto",
    pr: 0.5,
    mt: "auto",
    fontWeight: "bolder",
  };

  const sxFontSize = {
    fontSize: {
      xs: ".7rem",
      sm: "16px",
      md: "20px",
    },
  };

  const sxDate = {
    ml: "auto",
    pr: 0.5,
    fontWeight: "bolder",
    fontSize: {
      xs: ".85rem",
      sm: "24px",
    },
  };
  return (
    <Card sx={sxDay} onClick={() => props.onSelectDate(date)}>
      <Box sx={{ ...sxDate }}>10/1</Box>
      <Box
        sx={{
          ...sxIncomeExpense,
          ...sxFontSize,
          pt: "4px",
          color: "lightgreen",
        }}
      >
        $999,999
      </Box>
      <Box sx={{ ...sxIncomeExpense, ...sxFontSize, color: "#ff9c46" }}>
        ($999,999)
      </Box>
      <Box sx={{ ...sxTotal, ...sxFontSize, color: "lightgreen" }}>
        $999,999
      </Box>
    </Card>
  );
};
