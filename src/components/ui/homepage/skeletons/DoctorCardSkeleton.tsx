import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";

const DoctorCardSkeleton = () => {
    return (
        <Stack direction={{ xs: "column", md: "row" }} gap={{ md: 1 }} my={{ xs: 4, md: 0 }}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                flex={1}
                gap={3}
                sx={{ height: 235, bgcolor: "white", p: 3 }}>
                
             
                <Skeleton variant="rectangular" width={190} height={190} />

         
                <Stack flex={1} justifyContent="space-between">
                    <Box>
                        <Skeleton variant="text" width="70%" height={30} />
                        <Skeleton variant="text" width="50%" height={20} sx={{ my: 1 }} />
                        <Skeleton variant="text" width="80%" height={20} />
                    </Box>

                    <Skeleton variant="rectangular" width="30%" height={30} />
                </Stack>
            </Stack>

         
            <Stack sx={{ height: 235, bgcolor: "white", width: { xs: "100%", md: "400px" }, p: 3 }}>
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
                <Skeleton variant="rectangular" width="30%" height={30} sx={{ mt: "auto" }} />
            </Stack>
        </Stack>
    );
};

export default DoctorCardSkeleton;
