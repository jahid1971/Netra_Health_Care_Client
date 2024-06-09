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
                backgroundColor: "#f0f0f0",
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
