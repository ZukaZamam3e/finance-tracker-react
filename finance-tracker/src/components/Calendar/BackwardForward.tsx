import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface BackwardForwardProps {
  onBackward: () => void;
  onForward: () => void;
}

export const BackwardForward = (props: BackwardForwardProps) => {
  const sxHeight = {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const sxDisplay = {
    display: {
      xs: "flex",
      md: "none",
    },
  };
  const sxBorder = { border: "3px solid rgb(58, 58, 60)" };
  const sxBackward = {
    gridColumn: "span 3",
    ...sxBorder,
    ...sxHeight,
    ...sxDisplay,
  };
  const sxForward = {
    gridColumn: "span 3",
    ...sxBorder,
    ...sxHeight,
    ...sxDisplay,
  };
  return (
    <>
      <Button sx={sxBackward} onClick={props.onBackward}>
        <ArrowBackIcon />
      </Button>
      <Button sx={sxForward} onClick={props.onForward}>
        <ArrowForwardIcon />
      </Button>
    </>
  );
};
