"use client";

import { ReactNode, useEffect } from "react";
import { theme } from "../theme/theme";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { usePathname } from "next/navigation";
import { refreshTokenGen } from "@/services/actions/cookies";

const Providers = ({ children }: { children: ReactNode }) => {
    // const location = usePathname();

    // useEffect(() => {
    //     refreshTokenGen();
    // }, [location]);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    );
};

export default Providers;
