import { toast } from "sonner";

type tryCatch = (
    action: () => Promise<any>,
    loadingMessage?: string,
    successMessage?: string,
    successAction?: () => any
) => Promise<void>;

export const tryCatch: tryCatch = async (
    action,
    loadingMessage,
    successMessage,
    successAction
) => {
    const toastId = (
        loadingMessage ? toast.loading(`${loadingMessage}...`) : undefined
    ) as string | undefined;

    try {
        const res = await action();

        console.log(res, "response in try block");

        if (res?.success || res?.data?.success || res?.data?.data?.success) {
            toast.success(successMessage, { id: toastId });

            if (successAction) await successAction();
        } else if (
            (res?.success === false || res?.error) &&
            (res?.message || res?.error?.data?.errorMessages)
        ) {
            console.log(res, "error response in else if block of tryCatch");

            toast.error(
                res?.message ?? res?.error?.data?.errorMessages[0]?.message,
                { id: toastId }
            );
        } else if (res?.success === false || res?.error)
            toast.error("Something went wrong", { id: toastId });

        return res;
    } catch (err: any) {
        console.log(err?.message, "error in catch block");

        err.name === "AppError"
            ? toast.error(err.message, { id: toastId })
            : toast.error("Something went wrong ", { id: toastId });
    }
};
export default tryCatch;
