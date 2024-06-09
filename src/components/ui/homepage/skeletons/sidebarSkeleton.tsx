import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Skeleton } from "@mui/material";

export const sidebarSkeleton = [...Array(8)].map((_, index) => (
    <ListItem key={index} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <Skeleton variant="rectangular" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary={<Skeleton variant="text" width={100} />} />
        </ListItemButton>
    </ListItem>
));
