import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const DashedLine = () => {
    return <Box sx={{ borderBottom: "2px dashed", color: grey[500], my:2 }} />;
};

export default DashedLine;
