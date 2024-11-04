import { useState } from "react";
import { placements } from "../../config/placementConfig";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

interface DayProps {
  date: Date;
  onCancelDate: () => void;
}

export const Day = (props: DayProps) => {
  const [hideAddButton, setHideAddButton] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editingTransaction: () => {},
  });
  const [creating, setCreating] = useState({
    show: false,
    creatingTransaction: () => {},
  });

  const handleAddNew = () => {
    // let newSub: WhatsNextSubModel = () => {};
    // setCreating({ show: true, creatingTransaction: () => {} });
  };

  const sxBody = {
    display: !editing.show && !creating.show ? "initial" : "none",
  };

  const body = (
    <div style={sxBody}>
      {!hideAddButton && (
        <>
          <Fab
            sx={{
              position: "fixed",
              bottom: placements.fab.secondIconBottom,
              right: placements.fab.right,
            }}
            color="success"
            aria-label="add"
            onClick={handleAddNew}
          >
            <AddIcon />
          </Fab>
          <Fab
            sx={{
              position: "fixed",
              bottom: placements.fab.thirdIconBottom,
              right: placements.fab.right,
            }}
            color="error"
            aria-label="close"
            onClick={props.onCancelDate}
          >
            <CancelIcon />
          </Fab>
        </>
      )}
      {new Date(props.date).toLocaleDateString()}
    </div>
  );

  return <>{body}</>;
};
