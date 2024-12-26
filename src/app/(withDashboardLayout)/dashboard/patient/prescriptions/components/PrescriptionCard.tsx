import N_Modal from "@/components/modals/N_Modal";
import PrescriptionView from "@/components/ui/videoCall/videoSidebarComp/PrescriptionView";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { TPrescription } from "@/types/Prescription";
import { dateFaormatter } from "@/utils/dateFormatter";
import { Box, Button, Stack, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import DownloadIcon from "@mui/icons-material/Download";
import { toPng } from "html-to-image";
import { useCallback, useRef } from "react";
import { domToPng } from "modern-screenshot";

const PrescriptionCard = ({
    serial,
    data,
}: {
    data: TPrescription;
    serial: number;
}) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const downloadPresc = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 100));

            if (ref.current) {
                const dataUrl = await toPng(ref.current, {
                    quality: 1.0,
                    style: {
                        visibility: "visible",
                        position: "absolute",
                        left: "0",
                        top: "0",
                    },
                });

                const link = document.createElement("a");
                link.download = `prescription_Netra_HealthCare.png`;
                link.href = dataUrl;
                link.click();
            }
        } catch (error) {
            console.error("Error generating prescription image:", error);
        }
    };

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "space-between" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={{ xs: 1, md: 0 }}
            py={{ xs: 2, sm: 2.5, md: 3 }}
            px={{ xs: 2, sm: 4, md: 6, lg: 10 }}
            sx={{
                backgroundColor: blue[50],
                borderRadius: { xs: 4, md: 8 },
                boxShadow: 2,
            }}
            position="relative"
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={{ xs: 1, sm: 3, md: 5 }}
                width={{ xs: "100%", md: "auto" }}
            >
                <Typography variant="body1">{serial + 1}.</Typography>
                <Stack sx={{ width: "100%" }}>
                    <Typography
                        fontWeight={600}
                        color={grey[700]}
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                    >
                        Doctor: {data?.doctor?.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        }}
                    >
                        Issued At:{" "}
                        {data?.issuedAt ? dateFaormatter(data.issuedAt) : ""}
                    </Typography>
                </Stack>
            </Stack>

            {/* <Stack
                direction={{ xs: "row", md: "row" }}
                alignItems="center"
                justifyContent={{ xs: "space-between", md: "flex-end" }}
                spacing={{ xs: 1, md: 3 }}
                width={{ xs: "100%", md: "auto" }}
                mt={{ xs: 1, md: 0 }}
            > */}
            <Box
                sx={{
                    cursor: "pointer",
                    transform: {
                        xs: "scale(0.15)",
                        sm: "scale(0.18)",
                        md: "scale(0.2)",
                    },
                    width: "150px",
                    height: "110px",
                    transformOrigin: "0 0",
                    boxShadow: 1,
                    position: { xs: "absolute", sm: "static" },
                    right: { xs: 0, sm: "auto" },
                    top: { xs: 30, sm: "auto" },
                }}
                onClick={() => {
                    dispatch(
                        openModal({
                            modalId: "presView",
                            modalData: {},
                        })
                    );
                }}
            >
                <PrescriptionView />
            </Box>
            {/* </Stack> */}
            <Button
                onClick={downloadPresc}
                startIcon={<DownloadIcon />}
                size="small"
                sx={{
                    whiteSpace: "nowrap",
                    minWidth: { xs: "auto", sm: "120px" },
                }}
            >
                Download
            </Button>

            <N_Modal fullScreen modalId="presView">
                <PrescriptionView data={data} />
            </N_Modal>

            <Box
                sx={{ position: "absolute", top: "-10000px", left: "-10000px" }}
            >
                <Box ref={ref}>
                    <PrescriptionView data={data} />
                </Box>
            </Box>
        </Stack>
    );
};

export default PrescriptionCard;
