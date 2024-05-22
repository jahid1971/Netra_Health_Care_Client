import DoctorPageComponent from "@/app/(withCommonLayout)/doctors/components/DoctorPage";

const PatientDoctorsPage = ({
    searchParams,
}: {
    searchParams: {
        specialty?: string;
    };
}) => {
    return (
        <DoctorPageComponent
            searchParams={searchParams}
            withDashboardLayout={true}
        />
    );
};

export default PatientDoctorsPage;
