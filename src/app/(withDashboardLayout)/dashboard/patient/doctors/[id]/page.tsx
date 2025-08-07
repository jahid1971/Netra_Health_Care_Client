import DashedLine from "@/components/ui/DashedLine";
import defaultDoctorPhoto from "@/assets/icons/doctor_icon.png";
import { baseUrl } from "@/constants/commmon";
import { IDoctor } from "@/types/Doctors";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";

import { fetchWithAuth } from "@/utils/fetchWithAuth";
import DoctorScheduleSlots from "@/app/(withCommonLayout)/doctors/components/DoctorScheduleSlots";

const DocotorProfilePage = async ({ params, adminView }: any) => {
    const res = await fetchWithAuth(`/doctor/${params.id}`);
    const doctor: IDoctor = res?.data;

    return (
        <Container 
            maxWidth="lg" 
            sx={{ 
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 2, sm: 3 },
                overflow: "hidden" // Prevent horizontal scrolling
            }}
        >
            <Box sx={{ width: "100%" }}>
                <Box 
                    bgcolor={"background.paper"} 
                    p={{ xs: 2, sm: 3 }} 
                    borderRadius={1}
                    sx={{ 
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                        overflow: "hidden" // Prevent content overflow
                    }}
                >
                    <Box sx={{ mb: { xs: 2, md: 3 } }}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            textAlign="center"
                            fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.125rem" }}
                        >
                            Doctor&apos;s Profile Details
                        </Typography>
                    </Box>

                    <DashedLine />

                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "center", md: "flex-start" }}
                        gap={3}
                        pt={2}
                        sx={{ width: "100%" }}
                    >
                        <Box 
                            sx={{ 
                                width: { xs: "100%", sm: "250px", md: "300px" },
                                display: "flex",
                                justifyContent: "center",
                                mb: { xs: 2, md: 0 }
                            }}
                        >
                            <Image
                                src={doctor?.profilePhoto || defaultDoctorPhoto}
                                alt="doctor photo"
                                width={300}
                                height={300}
                                style={{
                                    height: "auto",
                                    width: "100%",
                                    maxHeight: "281px",
                                    maxWidth: "300px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                }}
                                priority
                            />
                        </Box>

                        <Stack spacing={1.5} sx={{ width: "100%" }}>
                            <Typography 
                                variant="h6" 
                                fontWeight={600}
                                fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
                                textAlign={{ xs: "center", md: "left" }}
                            >
                                {doctor?.name}
                            </Typography>

                            <Typography 
                                textAlign={{ xs: "center", md: "left" }}
                                sx={{ mb: { xs: 0.5, md: 0 } }}
                            >
                                {doctor?.designation}
                            </Typography>

                            <Box my={1}>
                                <Typography 
                                    display="inline" 
                                    mr={1}
                                    textAlign={{ xs: "center", md: "left" }}
                                    sx={{ display: { xs: "block", md: "inline" } }}
                                >
                                    Specialist in
                                </Typography>
                                <Box 
                                    display="flex" 
                                    flexWrap="wrap" 
                                    gap={1} 
                                    mt={1}
                                    justifyContent={{ xs: "center", md: "flex-start" }}
                                >
                                    {doctor?.specialties?.map((s) => (
                                        <Chip
                                            key={s?.id}
                                            label={s?.title}
                                            color="primary"
                                            size="small"
                                            sx={{ mb: 1 }}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <DashedLine />

                            <Typography 
                                textAlign={{ xs: "center", md: "left" }}
                                fontWeight={500}
                            >
                                Working at
                            </Typography>

                            <Typography 
                                textAlign={{ xs: "center", md: "left" }}
                                sx={{ wordBreak: "break-word" }}
                            >
                                {doctor?.currentWorkingPlace}
                            </Typography>

                            <DashedLine />

                            <Stack 
                                direction={{ xs: "column", sm: "row" }} 
                                spacing={1}
                                alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
                                justifyContent={{ xs: "center", md: "flex-start" }}
                            >
                                <Typography fontWeight={600}>
                                    Consultation Fee:
                                </Typography>
                                <Box textAlign={{ xs: "center", md: "left" }}>
                                    <Typography>
                                        Taka : {doctor?.apointmentFee} (incl. Vat)
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Per consultation
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Box 
                        sx={{ 
                            display: "grid", 
                            gridTemplateColumns: {
                                // xs: "1fr",
                                xs: "repeat(2, 1fr)",
                                md: "repeat(4, 1fr)"
                            },
                            gap: { xs: 2, md: 3 },
                            my: { xs: 3, md: 4 },
                            width: "100%"
                        }}
                    >
                        <InfoBox
                            title="Total Experience"
                            value={`${doctor?.experience}+ Years`}
                        />
                        <InfoBox
                            title="Qualification"
                            value={doctor?.qualification}
                        />
                        <InfoBox
                            title="Average Rating"
                            value={doctor?.averageRating || "N/A"}
                        />
                        <InfoBox
                            title="Contact Number"
                            value={doctor?.contactNumber}
                        />
                    </Box>

                    <Stack>
                        <DoctorScheduleSlots adminView={adminView} doctorId={params.id} />
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
                p: { xs: 2, sm: 3 },
                borderRadius: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "& h6": {
                    color: "primary.main",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                },
                "& p": {
                    color: "text.primary",
                    wordBreak: "break-word",
                },
                textAlign: { xs: "center", md: "left" },
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.12)"
                }
            }}
        >
            <Typography variant="h6" fontWeight={600}>{title}</Typography>
            <Typography mt={1}>{value || "N/A"}</Typography>
        </Box>
    );
};

export default DocotorProfilePage;
