import { Container } from "@mui/material";
import DoctorPageComponent from "./components/DoctorPage";
// import DoctorPageComponent from "./components/DoctorPage";


const DoctorsPage = ({
    searchParams,
}: {
    searchParams: {
        specialty?: string;
    };
}) => {
    return (
        <Container>
            <DoctorPageComponent searchParams={searchParams} />
        </Container>
    );
};

export default DoctorsPage;
