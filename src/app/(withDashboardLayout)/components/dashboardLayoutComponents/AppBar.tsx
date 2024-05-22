import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import AccountMenu from "./AppBarComponents/AccountMenu";
import { grey } from "@mui/material/colors";
import { useAppSelector } from "@/redux/hooks";
import { selectIsLoading, selectUser } from "@/redux/slices/authSlice";
import Notification from "./AppBarComponents/Notification";

const AppBar = ({ handleDrawerToggle }) => {
    const profileData = useAppSelector(selectUser);
    const isLoading = useAppSelector(selectIsLoading);

    let greeting;

    const hours = new Date().getHours();

    if (hours < 5) {
        greeting = "Welcome Back";
    } else if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return (
        <Box>
            <Toolbar>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "end", md: "space-between" },
                        width: "100%",
                    }}
                >
                    <Box display={{ xs: "none", md: "block" }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ color: "primary.main" }}
                        >
                            {greeting}, {profileData?.name}
                        </Typography>
                    </Box>
                    <Stack direction="row" gap={3}>
                        <Notification />
                        <Avatar
                            alt={profileData?.name}
                            src={profileData?.profilePhoto}
                            sx={{
                                width: 35,
                                height: 35,
                            }}
                        />
                        <AccountMenu />
                    </Stack>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default AppBar;
