import assets from "@/assets";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const LogInPage = () => {
    return (
        <Container
            sx={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                spacing: 2,
            }}>
            <Box boxShadow={1} maxWidth={600} width={"100%"} textAlign={"center"} p={5}>
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Image src={assets.svgs.logo} alt="logo" />

                    <Typography variant="h6" fontWeight={600}>
                        Login Netra HealthCare
                    </Typography>
                </Stack>
                <form>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 2 }} mt={2}>
                        <TextField label="Email" type="email" />
                        <TextField label="Password" type="password" />
                    </Stack>

                    <Typography textAlign={"right"} variant="body2" mt={1}>
                        Forgot password?
                    </Typography>

                    <Button sx={{ my: 2 }} fullWidth>
                        LOG IN
                    </Button>
                </form>

                <Typography variant="body2" fontWeight={300}>
                    Don&apos;t have an account?
                    <Box component={"span"} color="primary.main" fontWeight={600}>
                        <Link href="/login"> Create an account</Link>
                    </Box>
                </Typography>
            </Box>
        </Container>
    );
};

export default LogInPage;
