import { Box, Container } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { NavigationBar } from "./Navigationbar";

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
        sx={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}
      >
        {children}
      </Container>
    </Box>
  );
};
