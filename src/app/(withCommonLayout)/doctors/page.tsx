

import DashedLine from "@/components/ui/DashedLine";
import CategoryTabs from "@/components/ui/doctor/CategoryTabs";
import DoctorCard from "@/components/ui/doctor/DoctorCard";
import DoctorCardSkeleton from "@/components/ui/homepage/skeletons/DoctorCardSkeleton";
import { baseUrl } from "@/constants/commmon";
import { Doctor } from "@/types/Doctors";
import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Suspense } from "react";

const doctorPage = async ({
    searchParams,
}: {
    searchParams: {
        specialty?: string;
    };
}) => {
    const specialties = !searchParams?.specialty
        ? await fetch(`${baseUrl}/specialties`, {
              next: { revalidate: 60 },
          }).then((res) => res.json())
        : null;

    const specialty =
        searchParams?.specialty || specialties?.data?.[0]?.title || "";

    const url = specialty
        ? `${baseUrl}/doctor?specialties=${specialty}`
        : `${baseUrl}/doctor`;

    const res = await fetch(url, {
        next: { revalidate: 30 },
    });

    const { data: doctors } = await res.json();

    return (
        <Container>
            <Box px={{ xs: 0, md: 3 }} py={1} bgcolor={grey[100]}>
                <Box
                    sx={{
                        position: "sticky",
                        top: 68,
                        zIndex: 1,
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <CategoryTabs specialty={specialty} />
                </Box>

                {doctors?.length ? (
                    doctors?.map((doctor: Doctor, index: number) => (
                        <Box>
                            <Box key={doctor.id} my={3}>
                                <Suspense
                                    key={doctor.id}
                                    fallback={<DoctorCardSkeleton />}
                                >
                                    <DoctorCard doctor={doctor} />
                                </Suspense>
                            </Box>
                            {index !== doctors.length - 1 && <DashedLine />}
                        </Box>
                    ))
                ) : (
                    <Box my={10} textAlign={"center"}>
                        <Typography variant="h6" color={"primary.main"}>
                            No doctor found for specialist in{" "}
                            <Typography variant="h5">{specialty}</Typography>
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default doctorPage;
