import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";

const LoadingPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#F4F7FE",
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Loading...
            </Typography>
        </Box>
    );
};

export default LoadingPage;
