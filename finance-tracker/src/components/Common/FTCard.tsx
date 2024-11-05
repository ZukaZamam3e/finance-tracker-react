import { Card } from "@mui/material";

export const FTCard = (props: any) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.children}
    </Card>
  );
};
