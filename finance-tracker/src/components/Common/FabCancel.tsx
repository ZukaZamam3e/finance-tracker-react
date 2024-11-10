import { placements } from "../../config/placementConfig";
import { Fab } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface FabCancelProps {
  onCancelClick: () => void;
}

export const FabCancel = (props: FabCancelProps) => {
  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: placements.fab.secondIconBottom,
          right: placements.fab.right,
        }}
        color="error"
        aria-label="add"
        onClick={props.onCancelClick}
      >
        <CancelIcon />
      </Fab>
    </>
  );
};
