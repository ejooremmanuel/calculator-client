import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#8A2F87",
      light: "rgba(143, 57, 140, 0.20)",
      contrastText: "#e8d0e7",
    },

    error: {
      main: "#D80606",
      light: "rgba(235, 87, 87, 0.3)",
    },

    secondary: {
      main: "#263238",
      light: "#9828950d",
    },
    success: { main: "#3ab56e", light: "#d4efdf" },
    info: { main: "#0084cc", light: "#03a9f43b" },
    warning: { main: "#79581a", light: "#f8f4c3" },
  },

  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "white",
          color: grey[600],
          border: "1px solid #c6c6c6",
          boxShadow: "1px 2px 2px rgba(0, 0, 0.0.4)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: "normal",
          textTransform: "capitalize",
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
        },

        contained: {
          color: "#ffffff",
        },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        root: {
          maxHeight: "400px",
        },
      },
    },
  },

  typography: {
    fontFamily:
      '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
});
