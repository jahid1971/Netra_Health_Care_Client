import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>;
};

type TFormProps = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    error?: string;
} & TFormConfig;

const NForm = ({ children, onSubmit, resolver, defaultValues, error }: TFormProps) => {
    const formConfig: TFormConfig = {};

    if (resolver) {
        formConfig["resolver"] = resolver;
    }

    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }

    const methods = useForm(formConfig);
    const { handleSubmit } = methods;

    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            {error && (
                <Typography py={1} my={2} sx={{ backgroundColor: red[50],border:1,borderColor:"red"}}>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleSubmit(submit)}>{children}</form>
        </FormProvider>
    );
};

export default NForm;
