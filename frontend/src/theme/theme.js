import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#22c55e",
      dark: "#16a34a",
      light: "#4ade80",
    },
    secondary: {
      main: "#f97316",
      dark: "#ea580c",
      light: "#fb923c",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
    text: {
      primary: "#f9fafb",
      secondary: "#9ca3af",
    },
    divider: "#374151",
    error: {
      main: "#ef4444",
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 300,
      fontSize: "3rem",
    },
    h2: {
      fontWeight: 400,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          fontWeight: 600,
          borderRadius: "6px",
          padding: "8px 16px",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f2937",
          borderRadius: "12px",
          border: "1px solid #374151",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "#4b5563",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#374151",
            borderRadius: "6px",
            "& fieldset": {
              borderColor: "#4b5563",
            },
            "&:hover fieldset": {
              borderColor: "#6b7280",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#22c55e",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#9ca3af",
            "&.Mui-focused": {
              color: "#22c55e",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "#f9fafb",
            "&::placeholder": {
              color: "#6b7280",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f2937",
          borderBottom: "1px solid #374151",
          boxShadow: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1f2937",
          border: "1px solid #374151",
          borderRadius: "8px",
          marginTop: "8px",
          minWidth: "200px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#f9fafb",
          padding: "12px 16px",
          "&:hover": {
            backgroundColor: "#374151",
          },
          "&.Mui-selected": {
            backgroundColor: "#22c55e",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#374151",
          color: "#9ca3af",
          borderRadius: "6px",
          fontSize: "0.75rem",
          height: "24px",
          "&:hover": {
            backgroundColor: "#4b5563",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: "#22c55e",
            height: "2px",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#9ca3af",
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: "0.875rem",
          "&.Mui-selected": {
            color: "#f9fafb",
          },
          "&:hover": {
            color: "#d1d5db",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#22c55e",
          color: "#ffffff",
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
        standardError: {
          backgroundColor: "#7f1d1d",
          border: "1px solid #dc2626",
          color: "#fca5a5",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f2937",
          backgroundImage: "none",
        },
      },
    },
  },
})
