"use client";

import { useGetMyProfileQuery } from "@/redux/api/myProfile";
import { IDoctor } from "@/types/Doctors";
import { Box, Grid, Stack } from "@mui/material";
import Image from "next/image";
import DoctorInfo from "./components/DoctorInfo";

const ProfilePage = () => {
    const { data } = useGetMyProfileQuery({}) as { data?: IDoctor };
    console.log(data, "myProfile");
    return (
        <Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} >
                <Box width={{ sx: "100%", md: "30%" }}>
                    <Image src={data?.profilePhoto ?? ""} width={400} height={300} alt="doctor" />
                </Box>
                <Box width={{ sx: "100%", md: "70%" }} >
                    <DoctorInfo drProfile={data} />
                </Box>
            </Stack>
        </Box>
    );
};

export default ProfilePage;
