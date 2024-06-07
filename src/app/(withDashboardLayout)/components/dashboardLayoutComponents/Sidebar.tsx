"use client";
import {
    Box,
    Collapse,
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
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IDrawerItem } from "@/types/common";
// import NetraLogo from "@/components/NetraLogo";

const NetraLogo = dynamic(() => import("@/components/NetraLogo"), {
    ssr: false,
});


const Sidebar = ({ drawerWidth, setDrawerWidth, handleDrawerToggle }: any) => {
    const pathname = usePathname();
    const user = useAppSelector(selectUser);
    const [collapseValue, setCollapseValue] = useState("");

    const [noHoverEffect, setNoHoverEffect] = useState(false);

    const drawerToggle = () => {
        if (handleDrawerToggle) {
            handleDrawerToggle(); //will be availbale only on mobile .for mobile sidebar wroks like modal
        } else {
            setDrawerWidth(drawerWidth === 250 ? 60 : 250);
            drawerWidth === 60
                ? setNoHoverEffect(true)
                : setNoHoverEffect(false);
        }
    };

    const SideItem = ({ title, path, icon, childItems }: IDrawerItem) => (
        <Box
            component={path ? Link : "div"}
            href={path ? `/dashboard/${path}` : undefined}
        >
            <ListItem
                sx={{
                    ...(pathname === `/dashboard/${path}`
                        ? {
                              borderRight: "3px solid #1586FD",
                              backgroundColor: blue[50],
                          }
                        : {}),
                }}
                disablePadding
            >
                <ListItemButton
                    onClick={() =>
                        childItems &&
                        (collapseValue === title
                            ? setCollapseValue("")
                            : setCollapseValue(title))
                    }
                >
                    <ListItemIcon>
                        <Box sx={{ color: "primary.main" }}>{icon}</Box>
                    </ListItemIcon>

                    <ListItemText primary={title} />
                    {childItems &&
                        (collapseValue === title ? (
                            <ExpandLessIcon />
                        ) : (
                            <ExpandMoreIcon />
                        ))}
                </ListItemButton>
            </ListItem>
        </Box>
    );

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
                        display: drawerWidth === 60 ? "none" : "flex",
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
                        opacity: drawerWidth === 60 ? 1 : 0,
                        transition: "opacity 0.1s ease-in-out",
                        "& svg": { color: "#1586FD" },
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <IconButton
                    edge="end"
                    onClick={drawerToggle}
                    sx={{
                        opacity: drawerWidth === 60 ? 0 : 1,
                        transition: "opacity .1s ease-in-out",
                        "& svg": { color: "#1586FD" },
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>

            <Divider />

            {/* SideBar Items.......................SideBar Items */}
            <List
                onMouseEnter={() => {
                    !noHoverEffect && setDrawerWidth(250);
                }}
                onMouseLeave={() => {
                    !noHoverEffect && setDrawerWidth(60);
                }}
                sx={{ height: "100%" }}
            >
                {user?.role
                    ? sidebarMenus(user?.role)?.map((item, index) => (
                          <Box key={index}>
                              <SideItem
                                  title={item.title}
                                  path={item.path}
                                  icon={<item.icon />}
                                  childItems={item.childItems}
                              />

                              {item.childItems && (
                                  <Collapse
                                      in={collapseValue === item.title}
                                      timeout={500}
                                      unmountOnExit
                                  >
                                      <List component={"div"} disablePadding>
                                          {item.childItems.map(
                                              (item: any, index: number) => (
                                                  <Box
                                                      pl={
                                                          drawerWidth === 250
                                                              ? 2
                                                              : 0
                                                      }
                                                      key={index}
                                                  >
                                                      <SideItem
                                                          title={item.title}
                                                          path={item.path}
                                                          icon={<item.icon />}
                                                      />
                                                  </Box>
                                              )
                                          )}
                                      </List>
                                  </Collapse>
                              )}
                          </Box>
                      ))
                    : sidebarSkeleton}
            </List>
            {/* <Divider /> */}
        </Box>
    );
};

export default Sidebar;
