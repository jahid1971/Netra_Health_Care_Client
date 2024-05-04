import { Button, CircularProgress } from "@mui/material";
import { useSonner, toast } from "sonner";

type SubmitButtonProps = {
    label: string;
    sx?: any;
    variant?: "contained" | "outlined" | "text";
    isLoading?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
};

const SubmitButton = ({
    label,
    sx,
    variant = "contained",
    isLoading,
    fullWidth = true,
    onClick,
}: SubmitButtonProps) => {
    const { toasts } = useSonner();

    const loading = toasts.length && toasts[0].type === "loading" ? true : null;

    return (
        <Button
            onClick={onClick ? onClick : undefined}
            type={onClick ? "button" : "submit"}
            fullWidth={fullWidth}
            disabled={loading || isLoading}
            variant={variant}
            sx={sx}>
            {/* {loading || isLoading ? <CircularProgress size={24} color="secondary" /> : label} */}
            {label}
        </Button>
    );
};

export default SubmitButton;
