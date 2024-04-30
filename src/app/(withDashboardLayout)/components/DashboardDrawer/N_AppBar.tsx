import { Avatar, Badge, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import AccountMenu from "./components/AccountMenu/AccountMenu";

const N_AppBar = ({ handleDrawerToggle }) => {
    const { data: profileData, isLoading } = useGetMyProfileQuery(undefined);

    console.log(profileData, "my profile");

    return (
        <Box>
            <Toolbar>
                <IconButton
                    color="primary"
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
                        justifyContent: { xs: "end", md: "space-between" },
                        width: "100%",
                    }}>
                    <Box display={{ xs: "none", md: "block" }}>
                        <Typography
                            variant="body2"
                            noWrap
                            component="div"
                            sx={{ color: "rgba(11, 17, 52, 0.6)" }}>
                            Hi, {isLoading ? "Loading..." : profileData?.name}
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
                        <Avatar alt={profileData?.name} src={profileData?.profilePhoto} />
                        <AccountMenu />
                    </Stack>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default N_AppBar;
