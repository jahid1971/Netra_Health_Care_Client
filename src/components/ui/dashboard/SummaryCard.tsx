import { Box, Stack, Typography } from "@mui/material";

import { blue, grey } from "@mui/material/colors";
import React from "react";

type TDashboardCard = {
    icon: string | React.ReactNode;
    title: string;
    count: number;
};
const SummaryCard = ({ icon, title, count }: TDashboardCard) => {
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            bgcolor={"white"}
            width={"100%"}
            p={2}
            gap={2}
            borderRadius={2}
            boxShadow={1}
        >
            <Box
                sx={{
                    "& img": {
                        width: "20px",
                        height: "20px",
                        mx: "auto",
                    },
                }}
            >
                <Box
                    sx={{
                        backgroundColor: blue[50],
                        color: blue[600],
                        borderRadius: "50%",
                        p: 1,
                    }}
                >
                    {icon}{" "}
                </Box>
            </Box>

            <Stack>
                <Typography color={grey[700]} fontSize={18} fontWeight={600}>
                    {count}
                </Typography>
                <Typography variant="body2" color={grey[600]}>
                    {" "}
                    {title}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default SummaryCard;
