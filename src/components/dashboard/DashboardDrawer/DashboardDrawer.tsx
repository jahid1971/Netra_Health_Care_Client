"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "../sidebar/Sidebar";
import { Avatar, Badge, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

// let drawerWidth = 250;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}

export default function DashboardDrawer({
    children,
    window,
}: {
    children: React.ReactNode;
    window?: () => Window;
}) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [drawerWidth, setDrawerWidth] = React.useState(250);

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

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    background: "#F4F7FE",
                    boxShadow: "none",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    transition: "width 0.1s",
                    ml: { sm: `${drawerWidth}px` },
                    borderBottom: "1px solid #ddd",
                }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                        <Box>
                            <Typography
                                variant="body2"
                                noWrap
                                component="div"
                                sx={{ color: "rgba(11, 17, 52, 0.6)" }}>
                                {/* Hi, {isLoading ? "Loading..." : data?.name}, */}
                            </Typography>
                            <Typography variant="h6" noWrap component="div" sx={{ color: "primary.main" }}>
                                Welcome to NETRA Health Care!
                            </Typography>
                        </Box>
                        <Stack direction="row" gap={3}>
                            <Badge badgeContent={0} color="primary">
                                <IconButton sx={{ background: "#ffffff" }}>
                                    <NotificationsNoneIcon color="action" />
                                </IconButton>
                            </Badge>
                            {/* <Avatar alt={data?.name} src={data?.profilePhoto} /> */}
                            {/* <AccountMenu /> */}
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, transition: "width 0.1s", flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
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
                    <Sidebar />
                </Drawer>
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
