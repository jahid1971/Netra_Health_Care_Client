import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const DashedLine = ({ my = 2 }: { my?: number }) => {
    return (
        <Box sx={{ borderBottom: "2px dashed", color: grey[500], my: my }} />
    );
};

export default DashedLine;
