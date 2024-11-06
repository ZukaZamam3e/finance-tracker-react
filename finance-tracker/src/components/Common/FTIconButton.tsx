import { IconButton } from "@mui/material";

export const FTIconButton = (props: any) => {
  const sxButton = { border: 1, borderRadius: "25%" };

  return (
    <IconButton sx={sxButton} {...props}>
      {props.children}
    </IconButton>
  );
};
