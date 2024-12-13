"use client";

import { IDoctor } from "@/types/Doctors";
import { IPatient } from "@/types/Patient";
import { TMedication, TPrescription } from "@/types/Prescription";
import { Box, Stack, Typography } from "@mui/material";
import logo from "@/assets/svgs/logo.png";
import Image from "next/image";
import DashedLine from "../../DashedLine";
import { grey } from "@mui/material/colors";
import NetraLogo from "@/components/NetraLogo";
import Link from "next/link";

const PrescriptionView = ({ data }: { data?: any; ref?: any }) => {
    const prescriptionData = data?.data as TPrescription;
    const medications = data?.medications;
    const patient = data?.patient as IPatient;

    // const patientAge = patient?. ? new Date().getFullYear() - new Date(patient?.dob).getFullYear() : 0;

    const doctor = data?.doctor as IDoctor;

    console.log(data, "data");

    return (
        <Box
            width={"700px"}
            mx={"auto"}
            sx={{ backgroundColor: "secondary.main" }}
            boxShadow={1}
        >
            <Box textAlign={"center"} py={2} component={Link} href={"/"}>
                <NetraLogo />
            </Box>

            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                py={3}
                px={10}
            >
                <Stack>
                    <Typography
                        fontSize={"18px"}
                        fontWeight={600}
                        color={grey[600]}
                    >
                        Dr. {doctor?.name}
                    </Typography>
                    <Typography fontSize={"14px"}>
                        {doctor?.qualification}
                    </Typography>
                    <Typography>{doctor?.designation}</Typography>
                    <Typography>{doctor?.currentWorkingPlace}</Typography>
                </Stack>

                <Box>
                    <Image src={logo} sizes="30px" alt="logo" />
                </Box>
            </Stack>

            <DashedLine my={2} />

            <Box py={3} px={10}>
                <Stack>
                    <Typography fontWeight={600} color={"primary.main"}>
                        PATIENT
                    </Typography>
                    <Typography>Name: {patient?.name} </Typography>
                    <Typography>Age: 40 years </Typography>
                    <Typography>
                        Diagnosis: {prescriptionData?.diagnosis}{" "}
                    </Typography>
                </Stack>

                <Stack>
                    <Typography
                        fontWeight={600}
                        color={"primary.main"}
                        mt={3}
                        mb={1}
                    >
                        MEDICINES
                    </Typography>
                    {medications?.map((medi: TMedication, index: number) => (
                        <Stack key={index} mb={2}>
                            <Typography fontWeight={500}>
                                {medi.name.toUpperCase()}
                            </Typography>

                            <Typography fontSize={"14px"}>
                                DOSAGE:
                                <Typography
                                    component={"span"}
                                    fontSize={"14px"}
                                    ml={4}
                                >
                                    {medi.dosage}
                                </Typography>
                            </Typography>

                            <Typography fontSize={"14px"}>
                                FREQUENCY:
                                <Typography
                                    component={"span"}
                                    fontSize={"14px"}
                                    ml={4}
                                >
                                    {medi.frequency}
                                </Typography>
                            </Typography>
                            <Typography fontSize={"14px"}>
                                DURATION:
                                <Typography
                                    component={"span"}
                                    fontSize={"14px"}
                                    ml={4}
                                >
                                    {medi.duration}
                                </Typography>
                            </Typography>

                            {medi?.instruction && (
                                <Typography fontSize={"14px"}>
                                    INSTRUCTION:{" "}
                                    <Typography
                                        component={"span"}
                                        fontSize={"14px"}
                                        ml={4}
                                    >
                                        {medi.instruction}
                                    </Typography>
                                </Typography>
                            )}
                        </Stack>
                    ))}
                </Stack>

                <Box my={2}>
                    <Typography
                        fontWeight={600}
                        color={"primary.main"}
                        fontSize={"15px"}
                    >
                        RECOMMENDED TEST
                    </Typography>
                    <Typography>
                        {prescriptionData?.recommendedLabTests}{" "}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        fontWeight={600}
                        color={"primary.main"}
                        fontSize={"15px"}
                    >
                        ADVICE{" "}
                    </Typography>
                    <Typography>{prescriptionData?.note} </Typography>
                </Box>
            </Box>

            <Typography
                variant="subtitle2"
                textAlign={"center"}
                py={2}
                color={grey[500]}
                fontSize={"12px"}
            >
                appointment id: {prescriptionData?.appointmentId}
            </Typography>
        </Box>
    );
};

export default PrescriptionView;
