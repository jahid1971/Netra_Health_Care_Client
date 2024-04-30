import { ReactNode } from "react";

import { getUserInfo } from "@/services/actions/auth.services";
import DashboardDrawer from "./components/DashboardDrawer/DashboardDrawer";

const Layout = ({ children }: { children: ReactNode }) => {
    const userInfo = getUserInfo();
    
    return <DashboardDrawer userInfo={userInfo}> {children}</DashboardDrawer>;
};

export default Layout;
