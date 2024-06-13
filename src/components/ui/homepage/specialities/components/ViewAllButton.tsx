"use client";
import { TUserInfo } from "@/services/actions/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";

const ViewAllButton = ({ userInfo }: { userInfo: TUserInfo }) => {
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
