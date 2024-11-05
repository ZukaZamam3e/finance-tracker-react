import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface FTTypographyProps {
  children: ReactNode;
  sx?: any;
}

export const FTTypography = (props: FTTypographyProps) => {
  return (
    <Typography variant="body2" color="text.primary" {...props.sx}>
      {props.children}
    </Typography>
  );
};
