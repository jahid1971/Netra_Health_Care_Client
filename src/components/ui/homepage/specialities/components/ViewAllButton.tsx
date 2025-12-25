"use client";
import { TUserInfo } from "@/services/actions/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";

const ViewAllButton = () => {
    return (
        <Button
            variant="outlined"
            sx={{ mt: 4 }}
            href={`/doctors`}
            component={Link}
        >
            View all
        </Button>
    );
};

export default ViewAllButton;
