import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { useEffect, useState } from "react";
import { drawerItems } from "./SidebarMenus";
import { getUserInfo } from "@/services/actions/auth.services";
import { TUserRole } from "@/types/common";
import { usePathname } from "next/navigation";
import { blue } from "@mui/material/colors";

const Sidebar = ({ drawerWidth, setDrawerWidth }) => {
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<TUserRole>("");

    useEffect(() => {
        const { role } = getUserInfo() as any;
        setUserRole(role);
    }, []);

    const lgScreenDrawerToggle = () => {
        setDrawerWidth(drawerWidth === 250 ? 50 : 250);
    };

    return (
        <Box whiteSpace={"nowrap"}>
            {/* Sidebar Header....................Sidebar Header */}
            <Toolbar
                sx={{
                    display: "flex",
                    gap: 0,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <Stack
                    sx={{ py: 1, mt: 1, display: drawerWidth === 50 ? "none" : "flex" }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    component={Link}
                    href="/">
                    <Image src={assets.svgs.logo} width={20} alt="logo" />
                    <Typography variant="h6" component={Link} href="/" fontWeight={600} fontSize={17}>
                        NE
                        <Box component="span" color="primary.main">
                            TRA
                        </Box>{" "}
                        Health Care
                    </Typography>
                </Stack>

                <IconButton
                    edge="start"
                    onClick={lgScreenDrawerToggle}
                    sx={{ opacity: drawerWidth === 50 ? 1 : 0, transition: "opacity 0.1s ease-in-out" }}>
                    <MenuIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    onClick={lgScreenDrawerToggle}
                    sx={{ opacity: drawerWidth === 50 ? 0 : 1, transition: "opacity .1s ease-in-out" }}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>

            <Divider />

            {/* SideBar Items.......................SideBar Items */}
            <List>
                {drawerItems(userRole).map((item, index) => (
                    <Link key={index} href={`/dashboard/${item.path}`}>
                        <ListItem
                            sx={{
                                ...(pathname === `/dashboard/${item.path}`
                                    ? {
                                          borderRight: "3px solid #1586FD",
                                          "& svg": { color: "#1586FD" },
                                          backgroundColor: blue[50],
                                      }
                                    : {}),
                            }}
                            disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
                                <ListItemText primary={item?.title} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
        </Box>
    );
};

export default Sidebar;
