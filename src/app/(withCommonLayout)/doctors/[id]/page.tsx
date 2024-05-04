import DashedLine from "@/components/ui/DashedLine";
import { defaultDoctorPhoto } from "@/constants/authKey";
import { baseUrl } from "@/constants/commmon";
import { Doctor, IDoctor } from "@/types/Doctors";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import DoctorScheduleSlots from "../components/DoctorScheduleSlots";

const DocotorProfilePage = async ({ params }) => {
    const res = await fetch(`${baseUrl}/doctor/${params.id}`).then((res) => res.json());
    const doctor: Doctor = res.data;

    return (
        <Container>
            <Box p={{ xs: 0, md: 3 }} sx={{ bgcolor: grey[100] }}>
                <Box bgcolor={"background.paper"} p={3}>
                    <Box>
                        <Typography variant="h4" fontWeight={700} textAlign="center">
                            Doctor&apos;s Profile Details
                        </Typography>
                        <Typography
                            textAlign="center"
                            mt={2}
                            sx={{
                                width: "70%",
                                margin: "10px auto",
                                display: { xs: "none", sm: "block" },
                            }}
                            variant="h6">
                            Compassionate and dedicated doctor committed to delivering
                            high-quality care. Proficient in diagnosis, treatment, and
                            advocating for comprehensive well-being. Prioritizing
                            patient-centered approaches for optimal health outcomes.
                        </Typography>
                    </Box>

                    <DashedLine />

                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        alignItems={"center"}
                        gap={3}
                        pt={2}>
                        <Box>
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
                        </Box>

                        <Stack>
                            <Typography variant="h6" fontWeight={600}>
                                {doctor?.name}
                            </Typography>

                            <Typography>{doctor?.designation}</Typography>

                            <Typography my={1}>
                                Specialist in{" "}
                                {doctor?.doctorSpecialties?.map((ds) => (
                                    <Chip
                                        key={ds?.specialties?.id}
                                        label={ds?.specialties?.title}
                                        color="primary"
                                        sx={{ mx: 1 }}
                                    />
                                ))}
                            </Typography>

                            <DashedLine />

                            <Typography>Working at</Typography>

                            <Typography>{doctor?.currentWorkingPlace}</Typography>

                            <DashedLine />

                            <Stack direction={"row"}>
                                <Typography fontWeight={600}>Consultation Fee</Typography>
                                <Box ml={2}>
                                    <Typography>
                                        Taka : {doctor?.apointmentFee} (incl. Vat)
                                    </Typography>{" "}
                                    <Typography>Per consultation</Typography>
                                </Box>
                            </Stack>

                        </Stack>
                    </Stack>
                    
                    <Stack direction={"row"} my={3} gap={4}>
                        <InfoBox
                            title="Total Experience"
                            value={`${doctor?.experience}+ Years`}
                        />
                        <InfoBox title="Qualification" value={doctor?.qualification} />
                        <InfoBox title="Average Rating" value={doctor?.averageRating} />
                        <InfoBox title="Contact Number" value={doctor?.contactNumber} />
                    </Stack>

                    <Stack>
                        <DoctorScheduleSlots doctorId={params.id} />
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

const InfoBox = ({ title, value }: any) => {
    return (
        <Box
            sx={{
                background:
                    "linear-gradient(to bottom, rgba(21,134,253,0.3), rgba(255,255,255,1) 100%)",
                width: "100%",
                p: 3,
                "& h6": {
                    color: "primary.main",
                },
                "& p": {
                    color: "secondary.main",
                },
            }}>
            <Typography variant="h6">{title}</Typography>
            <Typography>{value}</Typography>
        </Box>
    );
};

export default DocotorProfilePage;
