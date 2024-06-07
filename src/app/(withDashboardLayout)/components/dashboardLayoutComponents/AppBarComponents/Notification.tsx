import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Badge, Box, Divider, IconButton, Link } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { blue, grey } from "@mui/material/colors";
import NextLink from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectNotifications } from "@/redux/slices/notificationSlice";

export default function Notification() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const notificationData = useAppSelector(selectNotifications);
    const [notifications, setNotifications] = React.useState(notificationData);

    React.useEffect(() => {
        setNotifications(notificationData);
    }, [notificationData]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (index: number) => {
        setNotifications((prev:any) =>
            prev.map((item:any, i:number) =>
                i === index ? { ...item, active: false, clicked: true } : item
            )
        );
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const truncateText = (str: string) => {
        return str.length > 50 ? str.substring(0, 50) + "..." : str;
    };

    return (
        <div>
            <IconButton
                aria-describedby={id}
                sx={{
                    backgroundColor: grey[100],
                }}
                onClick={handleClick}
            >
                <Badge
                    badgeContent={
                        notifications.filter((item:any) => item.active).length
                    }
                    color="primary"
                >
                    <NotificationsNoneIcon color="action" fontSize="medium" />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box maxWidth={400} p={2}>
                    <Typography variant="h6" textAlign="center">
                        Notifications
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {notifications?.length ? (
                        notifications.map((item:any, index:number) => (
                            <Box
                                key={index}
                                sx={{
                                    backgroundColor: item.active
                                        ? blue[50]
                                        : "white",
                                    p: 2,
                                    my: 1,
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                    "&:hover": {
                                        backgroundColor: item.active
                                            ? blue[100]
                                            : grey[200],
                                    },
                                }}
                                onClick={() => handleNotificationClick(index)}
                            >
                                {!item?.clicked
                                    ? truncateText(item.text)
                                    : item.text}{" "}
                                {item.link && (
                                    <Link
                                        component={NextLink}
                                        href={item.link}
                                        underline="always"
                                    >
                                        {item.linkLabel}
                                    </Link>
                                )}
                            </Box>
                        ))
                    ) : (
                        <Typography textAlign="center">
                            No notifications
                        </Typography>
                    )}
                </Box>
            </Popover>
        </div>
    );
}
