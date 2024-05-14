import CategoryTabs from "@/components/ui/doctor/CategoryTabs";

import { IDoctor } from "@/types/Doctors";

import DashedLine from "@/components/ui/DashedLine";

import DoctorCard from "@/components/ui/doctor/DoctorCard";
import DoctorCardSkeleton from "@/components/ui/homepage/skeletons/DoctorCardSkeleton";
import { baseUrl } from "@/constants/commmon";

import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Suspense } from "react";

const DoctorPageComponent = async ({
    searchParams,
}: {
    searchParams: {
        specialty?: string;
    };
}) => {
    const data = await fetch(`${baseUrl}/specialty`, {
        next: { revalidate: 30 },
        // cache: "no-cache",
    }).then((res) => res.json());

    const specialties = data?.data;

    const specialty = searchParams?.specialty
        ? specialties?.find(
              (speciality: any) => speciality?.id === searchParams?.specialty
          )
        : specialties?.[0];

    const url = specialty
        ? `${baseUrl}/doctor?specialties=${specialty?.id}`
        : `${baseUrl}/doctor`;

    const res = await fetch(url, {
        // cache: "no-store",
        next: { revalidate: 30 },
    });

    const { data: doctors } = await res.json();

    return (
        <Box px={{ xs: 0, md: 3 }} py={1} bgcolor={grey[100]}>
            <Box
                sx={{
                    position: "sticky",
                    top: 68,
                    zIndex: 1,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <CategoryTabs specialty={specialty?.id} />
            </Box>

            {doctors?.length ? (
                doctors?.map((doctor: IDoctor, index: number) => (
                    <Box key={doctor.id}>
                        <Box my={3}>

                            <Suspense fallback={<DoctorCardSkeleton />}>
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
                        <Typography fontSize={"20px"} fontWeight={800}>
                            {specialty?.title}
                        </Typography>
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default DoctorPageComponent;
