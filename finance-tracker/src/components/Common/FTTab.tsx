import { useTheme } from "@emotion/react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{
        marginTop: 45,
      }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

interface FTTabProps {
  tabs: any;
  changeToTab?: number | null;
  onTabChange?: () => void;
}

export const FTTab = (props: FTTabProps) => {
  const theme: any = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useSelector((state: any) => state.isMobile.value);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (!!props.onTabChange) {
      props.onTabChange();
    }
  };

  useEffect(() => {
    setSelectedTab(props.changeToTab ?? selectedTab);
  }, [props.changeToTab]);

  const tabWidth = isMobile ? "95vw" : "initial";
  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          margin: "0 auto",
          alignItems: "center",
          width: "100vw",
          top: 48,
          zIndex: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Stack alignItems="center">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            //centered={!isMobile}
            allowScrollButtonsMobile
            sx={{
              width: tabWidth,
              "& .MuiTabScrollButton-root": {
                width: "20px",
              },
            }}
          >
            {props.tabs.map((tab: any) => (
              <Tab
                key={tab.id}
                label={tab.label}
                sx={{
                  minWidth: "45px",
                  padding: "14px 8px",
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              />
            ))}
          </Tabs>
        </Stack>
      </div>

      {props.tabs.map((tab: any) => (
        <TabPanel key={tab.id} index={tab.id} value={selectedTab}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  );
};
