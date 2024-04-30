import { Button, CircularProgress } from "@mui/material";
import { useSonner, toast } from "sonner";

type SubmitButtonProps = {
    label: string;
    sx?: any;
    variant?: "contained" | "outlined" | "text";
    isLoading?: boolean;
};

const SubmitButton = ({ label, sx, variant = "contained", isLoading }: SubmitButtonProps) => {
    const { toasts } = useSonner();

    const loading = toasts.length && toasts[0].type === "loading" ? true : null;

    return (
        <Button type="submit" fullWidth disabled={loading || isLoading} variant={variant} sx={sx}>
            {/* {loading || isLoading ? <CircularProgress size={24} color="secondary" /> : label} */}
            {label}
        </Button>
    );
};

export default SubmitButton;
