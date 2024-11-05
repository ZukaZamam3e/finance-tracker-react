import Grid from "@mui/material/Grid2";

export const FTGrid = (props: any) => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 1,
      }}
    >
      {props.children}
    </Grid>
  );
};
