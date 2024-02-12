import assets from "@/assets";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
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
                        Patient Register
                    </Typography>
                </Stack>
                <form>
                    <Stack spacing={2} mt={2}>
                        <TextField label="Name" />
                        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 2 }}>
                            <TextField label="Email" type="email" />
                            <TextField label="Password" type="password" />
                        </Stack>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 2 }}>
                            <TextField label="Contact Number" />
                            <TextField label="Address" variant="outlined" size="small" />
                        </Stack>
                    </Stack>
                    <Button sx={{ my: 2 }} fullWidth>
                        Register
                    </Button>
                </form>
                <Typography variant="body2" fontWeight={300}>
                    Do you already have an account?
                    <Box component={"span"}  color="primary.main" fontWeight={700}>
                        <Link href="/login"> Login</Link>
                    </Box>
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;
