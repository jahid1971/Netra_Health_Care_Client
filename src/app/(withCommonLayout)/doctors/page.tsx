import CategoryTabs from "@/components/ui/doctor/CategoryTabs";
import DoctorCard from "@/components/ui/doctor/DoctorCard";
import { baseUrl } from "@/constants/commmon";
import { Doctor, IDoctor } from "@/types/Doctors";
import { Box, Container } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const doctorPage = async ({ searchParams }) => {
    const res = await fetch(`${baseUrl}/doctor?specialties=${searchParams?.specialty}`, {
        next: { revalidate: 10 },
    });
    const { data: doctors } = await res.json();

    return (
        <Container sx={{ backgroundColor: grey[100] }}>
            <Box px={{ xs: 0, md: 3 }} py={1} bgcolor={grey[100]}>
                <Box
                    sx={{
                        position: "sticky",
                        top: 68,
                        zIndex: 1,
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}>
                    <CategoryTabs />
                </Box>

                {doctors?.map((doctor: Doctor, index: number) => (
                    <Box>
                        <Box my={3}>
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        </Box>

                        {index < doctors.length - 1 && (
                            <Box
                                sx={{
                                    borderBottom: "2px dashed",
                                    color: grey[500],
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default doctorPage;
