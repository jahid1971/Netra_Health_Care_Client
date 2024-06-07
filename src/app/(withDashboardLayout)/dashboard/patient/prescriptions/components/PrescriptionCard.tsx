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
    console.log(data, "data");
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const downloadPresc = async () => {
        try {
            // Waiting a a bit for React to render the component with data
            await new Promise((resolve) => setTimeout(resolve, 100));

            if (ref.current) {
                const dataUrl = await toPng(ref.current, {
                    quality: 1.0,
                    style: {
                        // Making sure hidden element is temporarily visible for capture
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
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            py={3}
            px={10}
            sx={{ backgroundColor: blue[50], borderRadius: 8, boxShadow: 2 }}
        >
            <Stack direction={"row"} alignItems={"center"} spacing={5}>
                <Typography>{serial + 1}.</Typography>
                <Stack sx={{}}>
                    <Typography fontWeight={600} color={grey[700]}>
                        Doctor: {data?.doctor?.name}
                    </Typography>
                    <Typography>
                        Issued At:{" "}
                        {data?.issuedAt ? dateFaormatter(data.issuedAt) : ""}
                    </Typography>
                </Stack>
            </Stack>

            <Box
                sx={{
                    cursor: "pointer",
                    transform: "scale(0.2)",
                    width: "150px",
                    height: "110px",
                    transformOrigin: "0 0",
                    boxShadow: 1,
                }}
                onClick={() => {
                    dispatch(
                        openModal({
                            modalId: "presView",
                            modalData: {
                                // data: data,
                                // patient: data?.patient,
                                // doctor: data?.doctor,
                            },
                        })
                    );
                }}
            >
                <PrescriptionView />
            </Box>
            <Button onClick={downloadPresc} startIcon={<DownloadIcon />}>
                Download
            </Button>

            <N_Modal fullScreen modalId="presView">
                <PrescriptionView data={data} />
            </N_Modal>

            <Box
                sx={{
                    position: "absolute",
                    top: "-10000px",
                    left: "-10000px",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Box ref={ref}>
                    <PrescriptionView data={data} />
                </Box>
            </Box>
        </Stack>
    );
};

export default PrescriptionCard;
