import { Box, Button, Stack, Typography } from "@mui/material";
import N_Modal from "./N_Modal";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal, selectModalData } from "@/redux/slices/modalSlice";

type ConfirmationModalProps = {
    title?: string;
    modalId?: string;
};

const ConfirmationModal = ({ 
    title = "Are you sure?", 
    modalId = "confirm" 
}: ConfirmationModalProps) => {
    const dispatch = useAppDispatch();
    const modalData = useAppSelector(selectModalData);

    const handleConfirm = () => {
        if (modalData?.action) {
            modalData.action();
        }
        dispatch(closeModal());
    };

    return (
        <N_Modal modalId={modalId}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={2}
                p={3}
            >
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: "orange",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <HelpOutlineIcon sx={{ color: "white" }} />
                </Box>
                <Typography variant="h6" align="center">
                    {title}
                </Typography>

                <Stack
                    spacing={2}
                    justifyContent={"center"}
                    direction={"row"}
                    mt={2}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => dispatch(closeModal())}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Box>
        </N_Modal>
    );
};

export default ConfirmationModal;
