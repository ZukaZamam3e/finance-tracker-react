import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ alignItems: "center" }}>
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          Finance Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
