import { baseUrl } from "@/constants/commmon";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";

const GoogleLogin = ({ redirectPath }: { redirectPath?: string | null }) => {
    const LoginWithGoogle = async () => {
        const url = redirectPath
            ? `${baseUrl}/auth/login-with-google?redirect=${redirectPath}`
            : `${baseUrl}/auth/login-with-google`;

        const response = await fetch(url);

        const googleUrl = await response.json();

        window.open(googleUrl, "_self");
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" width="100%" my={0.2}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography
                    sx={{ mx: 2 }}
                    variant="body2"
                    color="textSecondary"
                >
                    OR
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
            </Box>

            <Button
                variant="text"
                fullWidth
                sx={{
                    display: "flex",
                    gap: 0.5,
                    textTransform: "none",
                    fontSize: 17,
                }}
                onClick={LoginWithGoogle}
            >
                Continue with Google
                <Image
                    src="https://www.freepnglogos.com/uploads/google-plus-png-logo/download-google-brand-vector-png-logos-18.png"
                    alt="google"
                    width={14}
                    height={14}
                />
            </Button>
        </Box>
    );
};

export default GoogleLogin;
