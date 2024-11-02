import { Box, Container } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { NavigationBar } from "./NavigationBar";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
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
          {children}
        </Box>
      </Container>
    </Box>
  );
};
