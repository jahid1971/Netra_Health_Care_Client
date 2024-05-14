"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";



const size = {
    width: 400,
    height: 180,
};

const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

export default function DashboardPieChart({ title, data = [] }) {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                borderRadius: 2,
                height: 300,
                display: "flex",
                alignItems: "center",
            }}
        >
            <PieChart
                series={[{ data, innerRadius: 60 }]}
                {...size}
                // slotProps={{ legend: {position:{vertical:"top",horizontal:"right"}  } }}
            
            >
                <PieCenterLabel>{title}</PieCenterLabel>
            </PieChart>
        </Box>
    );
}
