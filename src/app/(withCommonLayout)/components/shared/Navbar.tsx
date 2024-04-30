"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { logOutUser } from "@/services/actions/logOutuser";
import { useRouter } from "next/navigation";

const Navbar = ({ userInfo }) => {
    const router = useRouter();
    const handleLogOut = () => logOutUser();

    return (
        <Container>
            <Stack py={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h5" component={Link} href="/" fontWeight={600}>
                    NE
                    <Box component="span" color="primary.main">
                        TRA
                    </Box>{" "}
                    Health Care
                </Typography>

                <Stack direction={"row"} justifyContent={"space-between"} gap={4}>
                    <Typography component={Link} href="/consultation" sx={{ textDecoration: "none" }}>
                        Consultation
                    </Typography>
                    <Typography>Health Plans</Typography>
                    <Typography>Medicine</Typography>
                    <Typography>Diagnostics</Typography>
                    <Typography>NGOs</Typography>
                    {userInfo?.userId && (
                        <Typography component={Link} href="/dashboard">
                            Dashboard
                        </Typography>
                    )}
                </Stack>

                {userInfo?.userId ? (
                    <Button onClick={handleLogOut}>LOG OUT</Button>
                ) : (
                    <Button component={Link} href="/login">
                        Log In
                    </Button>
                )}
            </Stack>
        </Container>
    );
};

export default Navbar;
