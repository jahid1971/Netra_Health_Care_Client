"use client";

import { ReactNode, useEffect } from "react";
import { theme } from "../theme/theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    );
};

export default Providers;
