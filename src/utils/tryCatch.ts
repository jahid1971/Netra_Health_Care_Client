import { toast } from "sonner";

type tryCatch = (
    action: () => Promise<any>,
    loadingMessage?: string,
    successMessage?: string,
    action_2?: () => void
) => Promise<void>;

export const tryCatch: tryCatch = async (action, loadingMessage, successMessage, action_2) => {
    const toastId = (loadingMessage ? toast.loading(`${loadingMessage}...`) : undefined) as
        | string
        | undefined;

    try {
        const res = await action();
        console.log(res, "response in try block");

        if (res?.success || res?.data?.success || res?.data?.data?.success) {
            toast.success(successMessage, { id: toastId });
            if (action_2) action_2();
        } else if (
            (res?.success === false || res?.error) &&
            (res?.message || res?.error?.data?.errorMessages)
        ) {
            toast.error(res?.message ?? res?.error?.data?.errorMessages[0]?.message, { id: toastId });
        } else if (res?.success === false || res?.error) toast.error("Something went wrong", { id: toastId });

        return res;
    } catch (err: any) {
        console.log(err, " in catch block");
        // err?.data?.message || err?.data?.errorMessage
        //     ? toast.error(err?.data?.message || err?.data?.errorMessage, { id: toastId })
        //     : toast.error("Something went wrong ", { id: toastId });
    }
};
export default tryCatch;
