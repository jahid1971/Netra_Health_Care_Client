"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";

export default function CategoryTabs() {
    const [value, setValue] = React.useState(0);
    const { data: allSpecialities } = useGetAllSpecialitiesQuery(undefined);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper", mx: "auto", my: 2 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                allowScrollButtonsMobile>
                {allSpecialities?.data?.map((speciality: any) => (
                    <Tab key={speciality.id} label={speciality.title} />
                ))}
            </Tabs>
        </Box>
    );
}
