import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";

const NetraLogo = ({ fontsize }: { fontsize?: number }) => {
    return (
        <Typography
            fontWeight={600}
            color={grey[800]}
            fontSize={fontsize ? fontsize : { xs: 20, md: "1.5rem" }}
        >
            NE
            <Typography
                color="primary.main"
                component="span"
                fontWeight={600}
                fontSize={fontsize ? fontsize : { xs: 20, md: "1.5rem" }}
            >
                TRA{" "}
            </Typography>
            HealthCare
        </Typography>
    );
};

export default NetraLogo;
