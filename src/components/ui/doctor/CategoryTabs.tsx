"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/slices/authSlice";
import { USER_ROLE } from "@/constants/role";
import { setSearchTerm } from "@/redux/slices/generalSlices";

export default function CategoryTabs({ specialty }: { specialty: string }) {
    const user = useAppSelector(selectUser);
    const searchParams = useSearchParams(); // Use useSearchParams instead of props
    const { data: specialties } = useGetAllSpecialitiesQuery(undefined);
    const [value, setValue] = React.useState(specialty);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        dispatch(setSearchTerm(""));

        const searchTerm = searchParams.get("searchTerm");

        setValue(newValue);
        if (user?.role === USER_ROLE.PATIENT) {
            router.push(`/dashboard/patient/doctors?specialty=${newValue}`);
        } else {
            router.push(`/doctors?specialty=${newValue}`);
        }
    };

    // React.useEffect(() => {
    //     const searchTerm = searchParams.get("searchTerm");
    //     if (searchTerm) {
    //         const matchedSpecialty = specialties?.data?.find(
    //             (specialty) =>
    //                 specialty.title.toLowerCase() === searchTerm.toLowerCase()
    //         );

    //         if (matchedSpecialty) {

    //             setValue(matchedSpecialty.id);
    //             if (user?.role === USER_ROLE.PATIENT) {
    //                 router.push(
    //                     `/dashboard/patient/doctors?specialty=${matchedSpecialty.id}`
    //                 );
    //             } else {
    //                 router.push(`/doctors?specialty=${matchedSpecialty.id}`);
    //             }
    //         }
    //     }

    // }, [searchParams, specialties, user, router]);

    React.useEffect(() => {
        const searchTerm = searchParams.get("searchTerm");
        if (!searchTerm && specialty === specialties?.data?.[0]?.id) { //firts specialty as default
            setValue(specialties?.data?.[0]?.id);
        }

        if (searchTerm && specialties?.data) {
            const lowerSearchTerm = searchTerm.toLowerCase();

            const partialMatches = specialties.data
                .filter((specialty) => {
                    const lowerSpecialtyTitle = specialty.title.toLowerCase();
                    return (
                        lowerSpecialtyTitle.includes(lowerSearchTerm) &&
                        lowerSearchTerm.length >= 3
                    );
                })
                .sort((a, b) => {
                    const aIndex = a.title
                        .toLowerCase()
                        .indexOf(lowerSearchTerm);
                    const bIndex = b.title
                        .toLowerCase()
                        .indexOf(lowerSearchTerm);

                    if (aIndex === 0 && bIndex !== 0) return -1;
                    if (bIndex === 0 && aIndex !== 0) return 1;

                    return aIndex - bIndex;
                });

            if (partialMatches.length > 0) {
                // Take the best match (the first one after sorting)
                const bestMatch = partialMatches[0];
                setValue(bestMatch.id);
                if (user?.role === USER_ROLE.PATIENT) {
                    router.push(
                        `/dashboard/patient/doctors?specialty=${bestMatch.id}`
                    );
                } else {
                    router.push(`/doctors?specialty=${bestMatch.id}`);
                }
            }
        }
    }, [searchParams, specialties, user, router, setValue, specialty]);

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                mx: "auto",
                mb: 2,
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                allowScrollButtonsMobile
            >
                {specialties?.data?.map((speciality: any) => (
                    <Tab
                        key={speciality.id}
                        label={speciality.title}
                        value={speciality?.id}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
