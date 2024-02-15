import { toast } from "sonner";

type WithErrorHandlingFunction = (
    action: () => Promise<any>,
    successMessage: string,
    toastId?: string | undefined,
    action_2?: () => void
) => Promise<void>;

export const tryCatch: WithErrorHandlingFunction = async (
    action,
    successMessage,
    loadingMessage,
    action_2
) => {
    const toastId = (loadingMessage ? toast.loading(`${loadingMessage}...`) : undefined) as
        | string
        | undefined;

    try {
        const res = await action();
        console.log(res, "res in try block");

        if (res?.success || res?.data?.success || res?.data?.data?.success) {
            toast.success(successMessage, { id: toastId });
            if (action_2) action_2();
        } else if (res?.success === false && res?.message)
            toast.error(res?.message, { id: toastId });
        else if (res?.success === false) toast.error("Something went wrong", { id: toastId });

        return res;
    } catch (err: any) {
        console.log(err, " in catch block");
        // err?.data?.message || err?.data?.errorMessage
        //     ? toast.error(err?.data?.message || err?.data?.errorMessage, { id: toastId })
        //     : toast.error("Something went wrong ", { id: toastId });
    }
};
export default tryCatch;
