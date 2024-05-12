import { Box, Stack, Typography } from "@mui/material";

import { blue } from "@mui/material/colors";
import React from "react";

type TDashboardCard = {
    icon: string | React.ReactNode;
    title: string;
    count: number;
};
const SummaryCard = ({ icon, title, count }: TDashboardCard) => {
    // console.log(count,"count....................................");
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            bgcolor={"white"}
            width={"100%"}
            p={2}
            gap={2}
            borderRadius={2}
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
                <Typography fontSize={20} fontWeight={600}>
                    {count}
                </Typography>
                <Typography>Total {title}</Typography>
            </Stack>
        </Stack>
    );
};

export default SummaryCard;
