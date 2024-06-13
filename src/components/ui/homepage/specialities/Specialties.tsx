import { baseUrl } from "@/constants/commmon";
import { TSpecialty } from "@/types/Specialities";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import ViewAllButton from "./components/ViewAllButton";
import { TUserInfo } from "@/services/actions/auth.services";

const specialties = async ({ userInfo }: { userInfo: TUserInfo }) => {
    const res = await fetch(`${baseUrl}/specialties`, {
        next: { revalidate: 30 },
    });
    const { data: specialities } = await res.json();

    return (
        <Container>
            <Box mt={2} textAlign={"center"}>
                <Box>
                    <Typography variant="h4" fontWeight={600}>
                        Explore Treatments Across Specialties
                    </Typography>
                    <Typography fontSize={18} mt={1}>
                        Experienced Doctors Across All Specialties
                    </Typography>
                </Box>
                <Stack
                    direction={"row"}
                    gap={4}
                    alignItems={"center"}
                    justifyContent="space-between"
                    mt={2}
                >
                    {specialities?.slice(0, 6).map((speciality: TSpecialty) => (
                        <Box
                            key={speciality.id}
                            sx={{
                                flex: 1,
                                width: "150px",
                                backgroundColor: grey[100],
                                p: 4,
                                ":hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: 3,
                                },
                                "& img": {
                                    width: "50px",
                                    height: "50px",
                                    mx: "auto",
                                },
                            }}
                            component={Link}
                            href={`doctors?specialty=${speciality.title}`}
                        >
                            <Image
                                src={speciality?.icon || ""}
                                width={100}
                                height={100}
                                alt="speciality"
                            />

                            <Typography textAlign={"center"} mt={1}>
                                {speciality?.title}
                            </Typography>
                        </Box>
                    ))}
                </Stack>

                <Box mt={2}>
                    <Button href="/doctors" component={Link}>
                        View All
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default specialties;
