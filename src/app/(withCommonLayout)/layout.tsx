import Footer from "@/app/(withCommonLayout)/components/shared/Footer";
import Navbar from "@/app/(withCommonLayout)/components/shared/Navbar";
import { getUserInfo } from "@/services/actions/auth.services";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
    const userInfo = getUserInfo();
    return (
        <Box>
            <Navbar userInfo={userInfo} />
            <Box minHeight={"100vh"}> {children}</Box>
            <Footer />
        </Box>
    );
};

export default CommonLayout;
