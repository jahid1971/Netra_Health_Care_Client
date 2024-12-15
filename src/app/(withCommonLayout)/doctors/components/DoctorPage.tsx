import CategoryTabs from "@/components/ui/doctor/CategoryTabs";

import { IDoctor } from "@/types/Doctors";

import DashedLine from "@/components/ui/DashedLine";

import DoctorCard from "@/components/ui/doctor/DoctorCard";
import DoctorCardSkeleton from "@/components/ui/homepage/skeletons/DoctorCardSkeleton";
import { baseUrl } from "@/constants/commmon";

import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Suspense } from "react";

import SearchBar from "./Searchbar";

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

    // const url = specialty
    //     ? `${baseUrl}/doctor?specialties=${specialty?.id}`
    //     ? (specialty && searchParams?.searchTerm) ? `${baseUrl}/doctor?specialties=${specialty?.id}&searchTerm=${searchParams?.searchTerm}`
    //     : `${baseUrl}/doctor`

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
        <Box
            px={!withDashboardLayout ? { xs: 0, md: 3 } : 0}
            py={!withDashboardLayout ? 3 : 0}
            bgcolor={!withDashboardLayout ? grey[100] : "transparent"}
        >
            <Box
                sx={{
                    position: "sticky",
                    top: 64,
                    zIndex: 10,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <CategoryTabs specialty={specialty?.id} />
            </Box>

            <SearchBar />

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
    );
};

export default DoctorPageComponent;
