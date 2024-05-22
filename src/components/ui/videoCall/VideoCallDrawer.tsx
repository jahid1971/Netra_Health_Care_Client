import { Box, Drawer, IconButton } from "@mui/material";
import SideArea from "./SideArea";
import CloseIcon from "@mui/icons-material/Close";
import { relative } from "path";

const VideoCallDrawer = ({
    drawerWidth,
    setDrawerWidth,
    mobileOpen,
    handleDrawerTransitionEnd,
    handleDrawerClose,
    // handleDrawerToggle,
    isDrawerOpen,
    appointments,
    currentAppointment,
    drawerContainer
}: any) => {
    return (
        <Drawer
            anchor="right"
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

            // sx={{
            //     display: { xs: "block", sm: "none" },
            //     "& .MuiDrawer-paper": {
            //         boxSizing: "border-box",
            //         width: drawerWidth,
            //     },
            // }}
        >
            <Box width={"550px"} p={2}>
                <IconButton
                    onClick={handleDrawerClose}
                    sx={{ position: "absolute", left: 2, top: 2 }}
                >
                    <CloseIcon />
                </IconButton>

                <SideArea
                    appointments={appointments}
                    currentAppointment={currentAppointment}
                    drawerContainer={drawerContainer}
                />
            </Box>
        </Drawer>
    );
};

export default VideoCallDrawer;
