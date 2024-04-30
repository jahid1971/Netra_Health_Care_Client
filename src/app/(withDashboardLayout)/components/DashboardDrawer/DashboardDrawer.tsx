"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";


import N_AppBar from "./N_AppBar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import Sidebar from "./components/sidebar/Sidebar";


export default function DashboardDrawer({ children, userInfo }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(250);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUser(userInfo));
        console.log(userInfo, "useInfo in drawer");
    }, []);

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
                    background: "#F4F7FE",
                    boxShadow: "none",
                }}>
                <N_AppBar handleDrawerToggle={handleDrawerToggle} />
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, transition: "width 0.1s", flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                {/* mobile...........mobile */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}>
                    <Sidebar handleDrawerToggle = {handleDrawerToggle} />
                </Drawer>

                {/* desktop.............desktop */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            transition: "width 0.1s",
                        },
                    }}
                    open>
                    <Sidebar setDrawerWidth={setDrawerWidth} drawerWidth={drawerWidth} />
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
