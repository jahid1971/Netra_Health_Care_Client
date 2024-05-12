import { ReactNode } from "react";

import { getUserInfo } from "@/services/actions/auth.services";

import DashboardLayout from "./components/DashboardLayout";

const Layout = ({ children }: { children: ReactNode }) => {
    const userInfo = getUserInfo();
    
    return <DashboardLayout userInfo={userInfo}> {children}</DashboardLayout>;
};

export default Layout;
