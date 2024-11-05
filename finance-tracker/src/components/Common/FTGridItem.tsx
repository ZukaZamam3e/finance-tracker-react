import Grid from "@mui/material/Grid2";
import { ReactNode } from "react";

interface FTGridItemProps {
  children: ReactNode;
  sx?: any;
  size?: any;
}

export const FTGridItem = (props: FTGridItemProps) => {
  return (
    <Grid
      size={{ ...props.size }}
      sx={{
        ...props.sx,
      }}
    >
      {props.children}
    </Grid>
  );
};
