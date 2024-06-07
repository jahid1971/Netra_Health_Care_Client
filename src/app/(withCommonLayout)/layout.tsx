import Footer from "@/app/(withCommonLayout)/components/shared/Footer";
import Navbar from "@/app/(withCommonLayout)/components/shared/Navbar";
import { getUserInfo, TUserInfo } from "@/services/actions/auth.services";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
    const userInfo = getUserInfo() as TUserInfo
    return (
        <Box>
            <Navbar userInfo={userInfo} />
            <Box minHeight={"100vh"}> {children}</Box>
            <Footer />
        </Box>
    );
};

export default CommonLayout;
