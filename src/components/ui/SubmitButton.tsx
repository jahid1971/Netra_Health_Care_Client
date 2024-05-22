import { Button, CircularProgress } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSonner, toast } from "sonner";

type SubmitButtonProps = {
    label?: string;
    sx?: any;
    variant?: "contained" | "outlined" | "text";
    isLoading?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
    customSubmit?: (data: any) => void;
};

const SubmitButton = ({
    label = "Submit",
    sx,
    variant = "contained",
    isLoading,
    fullWidth = true,
    customSubmit,
    onClick,
}: SubmitButtonProps) => {
    const { toasts } = useSonner();

    let onSubmit;

    if (customSubmit) {
        const { handleSubmit } = useFormContext();
        
        onSubmit = handleSubmit(async (data: any) => {
            customSubmit(data);
        });
    }

    const loading = toasts.length && toasts[0].type === "loading" ? true : null;

    return (
        <Button
            onClick={onClick ? onClick : customSubmit ? onSubmit : undefined}
            type={onClick ? "button" : "submit"}
            fullWidth={fullWidth}
            disabled={loading || isLoading}
            variant={variant}
            sx={sx}
        >
            {/* {loading || isLoading ? <CircularProgress size={24} color="secondary" /> : label} */}
            {label}
        </Button>
    );
};

export default SubmitButton;
