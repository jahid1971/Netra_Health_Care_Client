import { useAppDispatch } from "@/redux/hooks";
import {
    selectErrorMsg,
    setErrorDetails,
    setErrorMsg,
    useSelectErrorDetails,
    useSelectErrorMsg,
} from "@/redux/slices/generalSlices";
import { debounce } from "@/utils/generalUtils";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";

type TFormConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>;
};

type TFormProps = {
    children: React.ReactNode;
    onSubmit?: (data: FieldValues, context: { reset: () => void }) => void;
    error?: string;
    onlyDirtyFields?: boolean;
    handleFieldChange?: (field: string, value: any) => void;
    query?: any;
} & TFormConfig;

const N_Form = ({
    children,
    onSubmit,
    resolver,
    defaultValues,
    error,
    onlyDirtyFields,
    handleFieldChange,
    query,
}: TFormProps) => {
    const dispatch = useAppDispatch();
    const formConfig: TFormConfig = {};

    const errorMessage = useSelectErrorMsg();

    if (resolver) {
        formConfig["resolver"] = resolver;
    }

    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }

    const methods = useForm(formConfig);

    const {
        handleSubmit,
        watch,
        formState,
        getValues,
        setValue,
        setError,
        clearErrors,
        reset,
    } = methods;

    const { dirtyFields } = formState;

    const submit: SubmitHandler<FieldValues> = (data) => {
        //for update only changed fields --------------------------
        const changedValues = Object.keys(dirtyFields).reduce(
            (acc: Record<string, any>, field) => {
                acc[field] = data[field] === "" ? undefined : data[field];
                return acc;
            },
            {} as Record<string, any>
        );

        const nonEmptyValues = Object.keys(data).reduce(
            (acc: Record<string, any>, field) => {
                acc[field] =
                    (typeof data[field] === "string" &&
                        data[field].trim() === "") ||
                    data[field] === null ||
                    (Array.isArray(data[field]) && data[field].length === 0)
                        ? undefined
                        : data[field];
                return acc;
            },
            {} as Record<string, any>
        );

        onSubmit &&
            onSubmit(onlyDirtyFields ? changedValues : nonEmptyValues, {
                reset,
            });
    };

    const debouncedHandleFieldChange = handleFieldChange
        ? debounce((name: string, value: any) => {
              handleFieldChange(name, value);
          }, 500)
        : undefined;

    useEffect(() => {
        if (debouncedHandleFieldChange) {
            const subscription = watch((value, { name }) => {
                // if (name && value["onFieldChange"] === true) {
                if (name && handleFieldChange) {
                    debouncedHandleFieldChange(name, value[name]);
                }
            });

            return () => subscription.unsubscribe();
        }
    }, [watch, debouncedHandleFieldChange, handleFieldChange]);

    // Reset all fields to null when query is empty----------------------------
    const resetFieldsToNull = () => {
        const currentValues = getValues();
        Object.keys(currentValues).forEach((field) => {
            setValue(field, null);
        });
    };

    useEffect(() => {
        if (query) {
            const { page, limit, ...newQuery } = query;
            if (Object.keys(newQuery).length === 0) resetFieldsToNull();
        }
    }, [query, setValue, getValues]); //eslint-disable-line

    //server error handling --------------------

    const errorDetails = useSelectErrorDetails();

    useEffect(() => {
        if (errorDetails?.issues) {
            clearErrors();
            errorDetails?.issues?.forEach((issue: any) => {
                if (issue.path) {
                    const fieldName = issue?.path;
                    setError(fieldName, {
                        type: "server",
                        message: issue.message,
                    });
                }
            });
        }
    }, [errorDetails, setError, clearErrors]);

    useEffect(() => {
        return () => {
            dispatch(setErrorMsg("")); // Clear error message on unmount
            dispatch(setErrorDetails({}));
        };
    }, [dispatch]);


    return (
        <FormProvider {...methods}>
            {(error || errorMessage) && (
                <Typography
                    py={1}
                    my={2}
                    sx={{
                        backgroundColor: red[50],
                        border: 1,
                        borderColor: "red",
                    }}
                    textAlign={"center"}
                >
                    {errorMessage}
                </Typography>
            )}
            <form onSubmit={handleSubmit(submit)}>{children}</form>
        </FormProvider>
    );
};

export default N_Form;
