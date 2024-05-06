import { authKey, refreshKey } from "@/constants/authKey";
import { deleteCookies } from "./cookies";
import { toast } from "sonner";


export const logOutUser = (router?: any, { toastFalse = false } = {}) => {
    deleteCookies([authKey, refreshKey]);

    if (router) router.refresh();
    
    !toastFalse && toast.success("Successfully logged out");
};
