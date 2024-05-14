
import { ReactNode } from "react";

import { getUserInfo } from "@/services/actions/auth.services";

import DashboardLayout from "./components/DashboardLayout";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
    const userInfo = getUserInfo();

    if (!userInfo) return redirect("/login");

    return <DashboardLayout >{children}</DashboardLayout>;
};

export default Layout;
