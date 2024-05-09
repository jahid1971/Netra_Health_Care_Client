"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { useRouter } from "next/navigation";

export default function CategoryTabs({specialty}: {specialty: string}) {
    const { data: specialties } = useGetAllSpecialitiesQuery(undefined);

    const [value, setValue] = React.useState(specialty);

    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(`/doctors?specialty=${newValue}`);
    };
    console.log(specialties?.data, "specialties");
    
    
    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper", mx: "auto", my: 2 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                allowScrollButtonsMobile>
                {specialties?.data?.map((speciality: any) => (
                    <Tab key={speciality.id} label={speciality.title} value={speciality.title} />
                ))}
            </Tabs>
        </Box>
    );
}
