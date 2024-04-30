import { authKey, refreshKey } from "@/constants/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./cookies";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const logOutUser = ({ toastFalse = false } = {}) => {
    deleteCookies([authKey, refreshKey]);
    // router.push("/")
    !toastFalse && toast.success("Successfully logged out");
};
