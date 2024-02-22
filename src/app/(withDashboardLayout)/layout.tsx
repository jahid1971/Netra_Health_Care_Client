"use client";
import DashboardDrawer from "@/components/dashboard/DashboardDrawer/DashboardDrawer";
import { isLoggedIn } from "@/services/actions/auth.services";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    if (!isLoggedIn()) {
        return router.push("/login");
    }

    return <DashboardDrawer> {children}</DashboardDrawer>;
};

export default Layout;
