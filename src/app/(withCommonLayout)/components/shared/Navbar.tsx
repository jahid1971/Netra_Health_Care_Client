"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box, Button, Container, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { logOutUser } from "@/services/actions/logOutuser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NetraLogo from "@/components/NetraLogo";
import { isSmallScreen } from "@/utils/isSmallScreen";

export const Navbar = ({ userInfo }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const handleLogOut = () => logOutUser();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const NavLink = ({ href, children }) => {
        const isActive = pathname === href;
        return (
            <Link href={href}>
                <Typography
                    onClick={toggleDrawer(false)}
                    sx={{
                        textDecoration: "none",
                        color: isActive ? "primary.main" : "inherit",
                        fontWeight: isActive ? 600 : 400,
                    }}>
                    {children}
                </Typography>
            </Link>
        );
    };

    const menuLinks = [
        <NavLink href="/consultation">Consultation</NavLink>,
        <NavLink href="/health-plans">Health Plans</NavLink>,
        <NavLink href="/medicine">Medicine</NavLink>,
        <NavLink href="/diagnostics">Diagnostics</NavLink>,
        <NavLink href="/ngos">NGOs</NavLink>,
        userInfo?.userId && <NavLink href="/doctors">Doctors</NavLink>,
        userInfo?.userId && <NavLink href="/dashboard">Dashboard</NavLink>,
    ];

    const authButton = userInfo?.userId ? (
        <Button onClick={handleLogOut} size={isSmallScreen() ? "small" : "medium"}>
            LOG OUT
        </Button>
    ) : (
        <Button size={isSmallScreen() ? "small" : "medium"} href="/login">
            Log In
        </Button>
    );

    return (
        <Box
            sx={{
                px: { xs: 2, md: 5 },
                position: "sticky",
                top: 0,
                zIndex: 1,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                bgcolor: "background.paper",
            }}>
            <Stack py={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Box display={"flex"} alignItems={"center"}>
                    <IconButton sx={{ display: { md: "none" } }} onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    <NetraLogo />
                </Box>

                <Stack
                    display={{ xs: "none", md: "flex" }}
                    direction={"row"}
                    justifyContent={"space-between"}
                    gap={4}>
                    {[...menuLinks]}
                </Stack>

                <Box display={{ xs: "none", md: "block" }}> {authButton}</Box>
            </Stack>

            <Drawer anchor={"top"} open={open} onClose={toggleDrawer(false)}>
                <Stack
                    direction={"column"}
                    gap={4}
                    p={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                    minHeight={300}>
                    {/* <NetraLogo /> */}

                    {[...menuLinks]}

                    {authButton}
                </Stack>
            </Drawer>
        </Box>
    );
};

export default Navbar;
