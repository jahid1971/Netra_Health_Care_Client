import { Box, Drawer } from "@mui/material";
import Sidebar from "./Sidebar";

const DashboardDrawer = ({
    drawerWidth,
    setDrawerWidth,
    mobileOpen,
    handleDrawerTransitionEnd,
    handleDrawerClose,
    handleDrawerToggle
}: any) => {
    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                transition: "width 0.1s",
                flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
        >
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
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <Sidebar handleDrawerToggle={handleDrawerToggle} />
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
                open
            >
                <Sidebar
                    setDrawerWidth={setDrawerWidth}
                    drawerWidth={drawerWidth}
                />
            </Drawer>
        </Box>
    );
};

export default DashboardDrawer;
