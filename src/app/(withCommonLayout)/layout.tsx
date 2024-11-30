import Footer from "@/app/(withCommonLayout)/components/shared/Footer";
import Navbar from "@/app/(withCommonLayout)/components/shared/Navbar";
import { getUserInfo, TUserInfo } from "@/services/actions/auth.services";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
    const userInfo = getUserInfo() as TUserInfo;
    return (
        <Box
  
        >
            <Navbar userInfo={userInfo} />{" "}
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100%",
                    position: "relative",
                    maxWidth: "100vw",
                    backgroundColor: "#F4F7FE",
                    paddingTop: "64px",
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default CommonLayout;
