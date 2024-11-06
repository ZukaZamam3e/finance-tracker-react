import { Card } from "@mui/material";

export const FTCard = (props: any) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderWidth: "3px !important",
        borderStyle: "solid !important",
        borderColor: "#3a3a3c !important",
        ...props.sx,
      }}
    >
      {props.children}
    </Card>
  );
};
