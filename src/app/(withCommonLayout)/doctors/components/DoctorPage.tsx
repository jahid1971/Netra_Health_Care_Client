import CategoryTabs from "@/components/ui/doctor/CategoryTabs";
import { IDoctor } from "@/types/Doctors";
import DashedLine from "@/components/ui/DashedLine";
import DoctorCard from "@/components/ui/doctor/DoctorCard";
import DoctorCardSkeleton from "@/components/ui/homepage/skeletons/DoctorCardSkeleton";
import { baseUrl } from "@/constants/commmon";
import { Box, Typography } from "@mui/material";
import { Suspense } from "react";
import DoctorPageClientWrapper from "./DoctorPageClientWrapper";

const DoctorPageComponent = async ({
    searchParams,
    withDashboardLayout,
}: {
    searchParams: {
        specialty?: string;
        searchTerm?: string;
    };
    withDashboardLayout?: boolean;
}) => {
    const data = await fetch(`${baseUrl}/specialty`, {
        next: { revalidate: 5 },
        // cache: "no-cache",
    }).then((res) => res.json());

    const specialties = data?.data;

    const specialty = searchParams?.specialty
        ? specialties?.find(
              (speciality: any) => speciality?.id === searchParams?.specialty
          )
        : specialties?.[0];

    let url;

    if (searchParams?.searchTerm) {
        url = `${baseUrl}/doctor?searchTerm=${searchParams.searchTerm}`;
    } else if (specialty) {
        url = `${baseUrl}/doctor?specialties=${specialty?.id}`;
    } else {
        url = `${baseUrl}/doctor`;
    }

    const res = await fetch(url, {
        // cache: "no-store",
        next: { revalidate: 5 },
    });

    const { data: doctors } = await res.json();

    return (
        <DoctorPageClientWrapper withDashboardLayout={withDashboardLayout}>
            <CategoryTabs specialty={specialty?.id} />
            
            <Box mt={4}>
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
                            No Doctor found for{" "}
                            {!searchParams?.searchTerm && "SPECIALIST in "}
                            <Typography fontSize={"20px"} fontWeight={800}>
                                {searchParams?.searchTerm || specialty?.title}
                            </Typography>
                        </Typography>
                    </Box>
                )}
            </Box>
        </DoctorPageClientWrapper>
    );
};

export default DoctorPageComponent;
