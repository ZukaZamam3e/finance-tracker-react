import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HeadProvider, Meta } from "react-head";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PageLayout } from "./components/App/PageLayout";
import { Pages } from "./components/App/Pages";
import store from "./store";
import { Provider } from "react-redux";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#121212",
      dark: "#272727",
    },
  },
  breakpoints: {
    values: {
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          position: "initial",
        },
      },
    },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       borderStyle: "solid !important",
    //       borderColor: "#3a3a3c !important",
    //     },
    //   },
    // },
  },
});

const App = () => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <Meta name="viewport" content="initial-scale=1, width=device-width" />
        <div className="App">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />

              <PageLayout>
                <Pages />
              </PageLayout>
            </ThemeProvider>
          </LocalizationProvider>
        </div>
      </Provider>
    </HeadProvider>
  );
};

export default App;
