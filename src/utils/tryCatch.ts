import { useAppDispatch } from "@/redux/hooks";
import { setErrorDetails, setErrorMsg } from "@/redux/slices/generalSlices";
import { toast } from "sonner";

type tryCatch = (
    action: () => Promise<any>,
    loadingMessage?: string,
    successMessage?: string,
    successAction?: () => any,
    dispatch?: ReturnType<typeof useAppDispatch>
) => Promise<void>;

export const tryCatch: tryCatch = async (
    action,
    loadingMessage,
    successMessage,
    successAction,
    dispatch
) => {
    const toastId = (
        loadingMessage ? toast.loading(`${loadingMessage}...`) : undefined
    ) as string | undefined;

    try {
        const res = await action();

        console.log(res, "response in try block");

        if (res?.success || res?.data?.success || res?.data?.data?.success) {
            if (successMessage) toast.success(successMessage, { id: toastId });

            if (successAction) await successAction();

            dispatch && dispatch(setErrorMsg(""));
        } else if (
            (res?.success === false || res?.error) &&
            (res?.message || res?.error?.data?.message)
        ) {
            console.log(res, "error response in else if block of tryCatch");

            dispatch &&
                dispatch(
                    setErrorMsg(res?.message || res?.error?.data?.message)
                );

            dispatch &&
                dispatch(setErrorDetails(res?.error?.data?.errorDetails));

            toast.error(res?.message ?? res?.error?.data?.message, {
                id: toastId,
            });
        } else if (res?.success === false || res?.error)
            toast.error("Something went wrong", { id: toastId });

        return res;
    } catch (err: any) {
        console.error(err, "error in catch block");

        err?.type === "AppError"
            ? toast.error(err.message, { id: toastId })
            : toast.error("Something went wrong ", { id: toastId });
    }
};
export default tryCatch;
