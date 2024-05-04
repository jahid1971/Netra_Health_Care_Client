"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { useRouter } from "next/navigation";

export default function CategoryTabs() {
    const { data: allSpecialities } = useGetAllSpecialitiesQuery(undefined);

    const initialSpeciality = allSpecialities?.data?.[0]?.title;
 

    const [value, setValue] = React.useState(initialSpeciality);

    const router = useRouter();

    React.useEffect(() => {
        if (initialSpeciality) {
            setValue(initialSpeciality);
        }
    }, [initialSpeciality]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        router.push(`/doctors?specialty=${newValue}`);
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
                    <Tab key={speciality.id} label={speciality.title} value={speciality.title} />
                ))}
            </Tabs>
        </Box>
    );
}
