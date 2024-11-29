import { Box } from "@mui/material";
import DocotorProfilePage from "../../../patient/doctors/[id]/page";

const DoctorDetailsPage = ({ params }: any) => {
    return (
        <Box>
            <DocotorProfilePage params={params} adminView={true} />
        </Box>
    );
};

export default DoctorDetailsPage;
