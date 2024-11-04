import { useAuth0 } from "@auth0/auth0-react";
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
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const NavigationBar = () => {
  const { isAuthenticated } = useAuth0();

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
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </Toolbar>
    </AppBar>
  );
};
