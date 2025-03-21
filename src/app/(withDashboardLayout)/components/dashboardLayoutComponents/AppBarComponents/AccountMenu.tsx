"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/services/actions/logOutuser";

import { grey } from "@mui/material/colors";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useUserSelector } from "@/redux/slices/authSlice";
import { USER_ROLE } from "@/constants/role";

const menuStyles = {
    paper: {
        elevation: 0,
        sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
            },
        },
    },
};

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useUserSelector();
    let role = user?.role;
    if (role === USER_ROLE.SUPER_ADMIN) role = USER_ROLE.ADMIN;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        logOutUser(router);
        dispatch({ type: "RESET_APP" });
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip
                    title="Account settings"
                    componentsProps={{
                        tooltip: {
                            sx: {
                                bgcolor: "#cdd1da5c",
                                color: "primary.main", // Change text color if necessary
                            },
                        },
                    }}
                >
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        //   size='small'
                        sx={{
                            backgroundColor: grey[100],
                            "& svg": {
                                color: "primary.main",
                            },
                        }}
                    >
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    ...menuStyles,
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar
                        sx={{
                            background: "transparent",
                            color: "primary.main",
                        }}
                    />
                    <Link href={`/dashboard/${role?.toLowerCase()}/profile`}>
                        {" "}
                        Profile
                    </Link>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: "error.main" }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
