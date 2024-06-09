import Stack from "@mui/material/Stack";
import { Skeleton } from "@mui/material";

const ScheduleButtonsSkeleton = () => {
    return (
        <Stack direction="row" gap={2} flexWrap="wrap">
            {/* Displaying 3 skeleton buttons as placeholders */}
            {[...Array(6)].map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rectangular"
                    width={120}
                    height={30}
                />
            ))}
        </Stack>
    );
};

export default ScheduleButtonsSkeleton;
