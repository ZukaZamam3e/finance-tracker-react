import { Box, Card } from "@mui/material";

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
    height: { xs: "10.5vh", sm: "125px" },
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
    fontSize: {
      xs: ".7rem;",
      sm: ".9rem",
      md: "1.1rem",
    },
  };

  const sxFontSize = {
    fontSize: {
      xs: ".7rem",
      sm: ".9rem",
      md: "1rem",
    },
  };

  const sxDate = {
    ml: "auto",
    pr: 0.5,
    fontWeight: "bolder",
    fontSize: {
      xs: "1rem",
      sm: "1rem",
      md: "1.1rem",
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
      <Box sx={{ ...sxTotal, color: "lightgreen" }}>($999,999)</Box>
    </Card>
  );
};
