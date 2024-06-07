"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Box,
    Button,
    Drawer,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { logOutUser } from "@/services/actions/logOutuser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NetraLogo from "@/components/NetraLogo";

import { grey } from "@mui/material/colors";
import { useIsSmallScreen } from "@/utils/isSmallScreen";
import { TUserInfo } from "@/services/actions/auth.services";

export const Navbar = ({ userInfo }: { userInfo?: TUserInfo }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isSmallScreen = useIsSmallScreen();

    const handleLogOut = () => logOutUser(router);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const NavLink = ({ href, children }: any) => {
        const isActive = pathname === href;
        return (
            <Link href={href}>
                <Typography
                    onClick={toggleDrawer(false)}
                    sx={{
                        textDecoration: "none",
                        color: isActive ? "primary.main" : "inherit",
                        fontWeight: isActive ? 600 : 400,
                    }}
                >
                    {children}
                </Typography>
            </Link>
        );
    };

    const menuLinks = [
        <Typography key={"health-care"} color={grey[900]}>
            Health Plans
        </Typography>,
        <Typography key={"medicine"} color={grey[900]}>
            Medicine
        </Typography>,
        <NavLink key={"Doctor"} href="/doctors">
            Doctors
        </NavLink>,
        userInfo?.userId && (
            <NavLink key={"dashboard"} href="/dashboard">
                Dashboard
            </NavLink>
        ),
    ];

    const authButton = userInfo?.userId ? (
        <Button
            onClick={handleLogOut}
            size={isSmallScreen ? "small" : "medium"}
        >
            LOG OUT
        </Button>
    ) : (
        <Button size={isSmallScreen ? "small" : "medium"} href="/login">
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
            }}
        >
            <Stack
                py={2}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box display={"flex"} alignItems={"center"}>
                    <IconButton
                        sx={{ display: { md: "none" } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <NetraLogo />
                </Box>

                <Stack
                    display={{ xs: "none", md: "flex" }}
                    direction={"row"}
                    justifyContent={"space-between"}
                    gap={4}
                >
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
                    minHeight={300}
                >
                    {/* <NetraLogo /> */}

                    {[...menuLinks]}

                    {authButton}
                </Stack>
            </Drawer>
        </Box>
    );
};

export default Navbar;
