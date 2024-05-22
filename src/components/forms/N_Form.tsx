import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
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
    onSubmit: SubmitHandler<FieldValues>;
    error?: string;
    onlyDirtyFields?: boolean;
} & TFormConfig;

const N_Form = ({
    children,
    onSubmit,
    resolver,
    defaultValues,
    error,
    onlyDirtyFields
}: TFormProps) => {
    const formConfig: TFormConfig = {};

    if (resolver) {
        formConfig["resolver"] = resolver;
    }

    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }

    const methods = useForm(formConfig);

    const { handleSubmit, formState } = methods;

    const { dirtyFields } = formState;

    const submit: SubmitHandler<FieldValues> = (data) => {
        const filteredData = Object.keys(dirtyFields).reduce(
            (acc: Record<string, any>, field) => {
                acc[field] = data[field] === "" ? undefined : data[field];
                return acc;
            },
            {} as Record<string, any>
        );

        onSubmit(onlyDirtyFields ? filteredData : data);
    };

    return (
        <FormProvider {...methods}>
            {error && (
                <Typography
                    py={1}
                    my={2}
                    sx={{
                        backgroundColor: red[50],
                        border: 1,
                        borderColor: "red",
                    }}
                >
                    {error}
                </Typography>
            )}
            <form onSubmit={handleSubmit(submit)}>{children}</form>
        </FormProvider>
    );
};

export default N_Form;
