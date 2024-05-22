// "use client";
// import * as React from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAppSelector } from "@/redux/hooks";
// import { selectUser } from "@/redux/slices/authSlice";
// import { USER_ROLE } from "@/constants/role";

// export default function CategoryTabs({ specialty }: { specialty: string }) {
//     const user = useAppSelector(selectUser);
//     const { data: specialties } = useGetAllSpecialitiesQuery(undefined);
//     const searchParams = useSearchParams();

//     const [value, setValue] = React.useState(specialty);

//     const router = useRouter();

//     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//         setValue(newValue);
//         if (user?.role === USER_ROLE.PATIENT) {
//             router.push(`/dashboard/patient/doctors?specialty=${newValue}`);
//         } else router.push(`/doctors?specialty=${newValue}`);
//     };

//     React.useEffect(() => {
//         const mathcedSpecialty = specialties?.data?.find(
//             (specialty) => specialty.title === searchParams?.searchTerm
//         );

//         console.log(
//             "mathcedSpecialty--------------------------",
//             searchParams?.searchTerm
//         );

//         if (mathcedSpecialty) handleChange(null, mathcedSpecialty.id);
//     }, [searchParams]);

//     return (
//         <Box
//             sx={{
//                 width: "100%",
//                 bgcolor: "background.paper",
//                 mx: "auto",
//                 mb: 2,
//             }}
//         >
//             <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 aria-label="scrollable auto tabs example"
//                 allowScrollButtonsMobile
//             >
//                 {specialties?.data?.map((speciality: any) => (
//                     <Tab
//                         key={speciality.id}
//                         label={speciality.title}
//                         value={speciality?.id}
//                     />
//                 ))}
//             </Tabs>
//         </Box>
//     );
// }

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

        console.log(
            searchTerm,
            "searchTerm in hanldechange-------------------------------"
        );

        setValue(newValue);
        if (user?.role === USER_ROLE.PATIENT) {
            router.push(`/dashboard/patient/doctors?specialty=${newValue}`);
        } else {
            router.push(`/doctors?specialty=${newValue}`);
        }
    };

    React.useEffect(() => {
        const searchTerm = searchParams.get("searchTerm");
        if (searchTerm) {
            const matchedSpecialty = specialties?.data?.find(
                (specialty) =>
                    specialty.title.toLowerCase() === searchTerm.toLowerCase()
            );

            if (matchedSpecialty) {
                // const params = new URLSearchParams(searchParams.toString());
                // params.set("searchTerm", "")
                // handleChange(null, matchedSpecialty.id);

                setValue(matchedSpecialty.id);
                if (user?.role === USER_ROLE.PATIENT) {
                    router.push(
                        `/dashboard/patient/doctors?specialty=${matchedSpecialty.id}`
                    );
                } else {
                    router.push(`/doctors?specialty=${matchedSpecialty.id}`);
                }
            }
        }
        console.log(searchTerm, "searchParams ________________");
    }, [searchParams, specialties]);

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
