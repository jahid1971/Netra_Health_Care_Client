"use client";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { usePathname } from "next/navigation";
import { blue } from "@mui/material/colors";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/slices/authSlice";
import { sidebarSkeleton } from "@/components/ui/homepage/skeletons/sidebarSkeleton";
import dynamic from "next/dynamic";
import { sidebarMenus } from "@/constants/userMenus";

const NetraLogo = dynamic(() => import("@/components/NetraLogo"), {
    ssr: false,
});

const Sidebar = ({ drawerWidth, setDrawerWidth, handleDrawerToggle }: any) => {
    const pathname = usePathname();
    const user = useAppSelector(selectUser);

    const drawerToggle = () => {
        if (handleDrawerToggle)
            handleDrawerToggle(); // for mobile sidebar which wroks like modal
        else setDrawerWidth(drawerWidth === 250 ? 50 : 250);
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
                }}
            >
                <Stack
                    sx={{
                        py: 1,
                        mt: 1,
                        display: drawerWidth === 50 ? "none" : "flex",
                    }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    component={Link}
                    href="/"
                >
                    <Image src={assets.svgs.logo} width={20} alt="logo" />

                    <NetraLogo fontsize={17} />
                </Stack>

                <IconButton
                    edge="start"
                    onClick={drawerToggle}
                    sx={{
                        opacity: drawerWidth === 50 ? 1 : 0,
                        transition: "opacity 0.1s ease-in-out",
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <IconButton
                    edge="end"
                    onClick={drawerToggle}
                    sx={{
                        opacity: drawerWidth === 50 ? 0 : 1,
                        transition: "opacity .1s ease-in-out",
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>

            <Divider />

            {/* SideBar Items.......................SideBar Items */}
            <List>
                {user?.role
                    ? sidebarMenus(user?.role)?.map((item, index) => (
                          <Link key={index} href={`/dashboard/${item.path}`}>
                              <ListItem
                                  sx={{
                                      ...(pathname === `/dashboard/${item.path}`
                                          ? {
                                                borderRight:
                                                    "3px solid #1586FD",
                                                "& svg": { color: "#1586FD" },
                                                backgroundColor: blue[50],
                                            }
                                          : {}),
                                  }}
                                  disablePadding
                              >
                                  <ListItemButton>
                                      <ListItemIcon>
                                          {item?.icon && <item.icon />}
                                      </ListItemIcon>

                                      <ListItemText primary={item?.title} />
                                  </ListItemButton>
                              </ListItem>
                          </Link>
                      ))
                    : sidebarSkeleton}
            </List>
            <Divider />
        </Box>
    );
};

export default Sidebar;
