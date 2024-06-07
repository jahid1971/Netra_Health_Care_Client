"use client";
import { Box, Drawer, IconButton } from "@mui/material";
import SideArea from "./SideArea";
import CloseIcon from "@mui/icons-material/Close";
import { useIsSmallScreen } from "@/utils/isSmallScreen";



const VideoCallDrawer = ({
    handleDrawerTransitionEnd,
    handleDrawerClose,
  
    isDrawerOpen,
    appointments,
    currentAppointment,
    drawerContainer,
    userData,
    isJoined
}: any) => {
    const isSmallScreen = useIsSmallScreen()
    const anchor = isSmallScreen ? "bottom" : "right";
    return (
        <Drawer
            anchor={anchor}
            variant="temporary"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onTransitionEnd={handleDrawerTransitionEnd}
            sx={{ position: "relative" }}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                sx: {
                    "& .MuiBackdrop-root": {
                        backgroundColor: "transparent",
                    },
                },
            }}
        >
            <Box
                width={{ xs: "100%", md: "550px" }}
                p={2}
                height={{ xs: "340px", md: "100vh" }}
            >
                <IconButton
                    onClick={handleDrawerClose}
                    sx={{ position: "absolute", left: 2, top: 2, zIndex: 20 }}
                >
                    <CloseIcon />
                </IconButton>

                <SideArea
                    appointments={appointments}
                    currentAppointment={currentAppointment}
                    drawerContainer={drawerContainer}
                    userData={userData}
                    isJoined={isJoined}
                />
            </Box>
        </Drawer>
    );
};

export default VideoCallDrawer;
