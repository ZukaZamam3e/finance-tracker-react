import { Paper } from "@mui/material";

export const FTPaper = (props: any) => {
  return (
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
      {props.children}
    </Paper>
  );
};
