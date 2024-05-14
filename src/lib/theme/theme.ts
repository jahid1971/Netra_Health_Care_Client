import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1586FD",
            
        },
        secondary: {
            // main: "#666f73",
            main: "#F4F7FE",
        },

    },

    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                // size: "small",
            },
            // styleOverrides: {
            //     root: {
            //         padding: "8px 24px",
            //     },
            // },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                size: "small",
                fullWidth: true,
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: "lg",
                
            },
            
        },
        MuiDataGrid: {
            defaultProps: {
                hideFooter: true,
                autoHeight: true,
            },
        },
    },

    typography: {
        body1: {
            color: "#0B1134CC",
        },
    },
    
});

theme.shadows[1] = "0px 5px 22px lightgray";
