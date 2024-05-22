import DoctorScheduleSlots from "@/app/(withCommonLayout)/doctors/components/DoctorScheduleSlots";
import { IDoctor } from "@/types/Doctors";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import defaultDoctorPhoto from "@/assets/icons/doctor_icon.png";
import { grey } from "@mui/material/colors";

const CheckoutPage = async ({ params }) => {
    const res = await fetchWithAuth(`/doctor/${params.id}`);
    const doctor: IDoctor = res?.data;
    return (
        <Box backgroundColor={"background.paper"} p={4}>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Image
                    src={doctor?.profilePhoto || defaultDoctorPhoto}
                    alt="doctor photo"
                    width={300}
                    height={300}
                    style={{
                        height: "281px",
                        objectFit: "cover",
                    }}
                />
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Typography
                        fontWeight={700}
                        color={grey[600]}
                        fontSize={"18px"}
                    >
                        {doctor?.name}
                    </Typography>
                    <Typography>{doctor?.designation}</Typography>
                    <Typography>{doctor?.qualification}</Typography>
                </Stack>
            </Box>{" "}
            <DoctorScheduleSlots doctorId={params?.id} />
        </Box>
    );
};

export default CheckoutPage;
