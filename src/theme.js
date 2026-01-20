import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4f46e5", // Modern Indigo
            light: "#818cf8",
            dark: "#3730a3",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#64748b", // Slate
            light: "#94a3b8",
            dark: "#475569",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f8fafc", // Very light slate
            paper: "#ffffff",
        },
        text: {
            primary: "#0f172a",
            secondary: "#64748b",
        },
        success: {
            main: "#10b981",
        },
        error: {
            main: "#ef4444",
        },
        divider: "rgba(0,0,0,0.08)",
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
        },
        h5: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 0,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    padding: "8px 20px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
                containedPrimary: {
                    "&:hover": {
                        backgroundColor: "#4338ca",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "none",
                    border: "1px solid rgba(0,0,0,0.08)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    },
});

export default theme;
