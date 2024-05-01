import { Box, Typography } from "@mui/material";
import Link from "next/link";

const NetraLogo = ({ fontsize }: { fontsize?: number }) => {
    return (
        <Typography
            variant="h5"
            component={Link}
            href="/"
            fontWeight={600}
            fontSize={fontsize ? fontsize : { xs: 20, md: "1.5rem" }}>
            NE
            <Box component="span" color="primary.main">
                TRA{" "}
            </Box>
            HealthCare
        </Typography>
    );
};

export default NetraLogo;
