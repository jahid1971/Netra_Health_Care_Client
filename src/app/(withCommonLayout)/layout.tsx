import Footer from "@/app/(withCommonLayout)/components/shared/Footer";
import Navbar from "@/app/(withCommonLayout)/components/shared/Navbar";
import { getUserInfo } from "@/services/actions/auth.services";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
    const userInfo = getUserInfo();
    return (
        <div>
            <Navbar userInfo={userInfo} />
            <Box> {children}</Box>
            <Footer />
        </div>
    );
};

export default CommonLayout;
