"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setIsLoadingFalse, setUser } from "@/redux/slices/authSlice";

import DashboardDrawer from "./dashboardLayoutComponents/DashboardDrawer";
import TopBar from "./dashboardLayoutComponents/AppBar";

import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { setNotification } from "@/redux/slices/notificationSlice";
import { USER_ROLE } from "@/constants/role";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(250);
    const dispatch = useAppDispatch();

    const { data } = useGetMyProfileQuery(undefined);

    useEffect(() => {
        dispatch(setUser(data?.data));
        if (data?.data) dispatch(setIsLoadingFalse());
        if (
            data?.data?.needPasswordChange &&
            data?.data?.role !== USER_ROLE.PATIENT
        ) {
            //temporary testing --------------------
            dispatch(
                setNotification({
                    text: `Please change your Password .To secure your account you must change the default password`,
                    active: true,
                    link: "/dashboard/change-password",
                    linkLabel: "Change Password",
                })
            );
        }
    }, [data?.data, dispatch]);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    transition: "width 0.1s",
                    ml: { sm: `${drawerWidth}px` },
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "white",
                    // background: "#F4F7FE",
                    boxShadow: "none",
                }}
            >
                <TopBar handleDrawerToggle={handleDrawerToggle} />
            </AppBar>

            <DashboardDrawer
                drawerWidth={drawerWidth}
                setDrawerWidth={setDrawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerClose={handleDrawerClose}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerToggle={handleDrawerToggle}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: "#F4F7FE",
                    // backgroundColor:grey[100],
                    minHeight: "100vh",
                }}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    );
}
