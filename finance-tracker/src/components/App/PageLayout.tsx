import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { NavigationBar } from "./NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { PopUpNotification } from "./PopUpNotification";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <NavigationBar />
      <br />
      <Container
        className="app_container"
        component="main"
        maxWidth="xl"
        sx={{ paddingLeft: "5px", paddingRight: "5px", paddingTop: "10px" }}
      >
        <Box
          sx={{
            display: "flex",
            marginTop: 3,
            justifyContent: "center",
          }}
        >
          {isAuthenticated ? (
            children
          ) : (
            <div>
              <div>
                Please log in with your email you used in the old version.
              </div>
              <div>
                If this your first time logging in, please contact me and I will
                get you account set up.
              </div>
            </div>
          )}
        </Box>
        <Loading />
        <ErrorMessage />
        <PopUpNotification />
      </Container>
    </Box>
  );
};
