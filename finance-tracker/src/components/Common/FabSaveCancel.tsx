import { placements } from "../../config/placementConfig";
import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface FabSaveCancelProps {
  onSaveClick: () => void;
  onCancelClick: () => void;
}

export const FabSaveCancel = (props: FabSaveCancelProps) => {
  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          bottom: placements.fab.firstIconBottom,
          right: placements.fab.right,
        }}
        color="success"
        aria-label="add"
        onClick={props.onSaveClick}
      >
        <SaveIcon />
      </Fab>
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
