import { Button, Stack } from "@mui/material";
import N_Modal from "./N_Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal, selectModalData } from "@/redux/slices/modalSlice";

const ConfirmationModal = ({ title }: { title?: string }) => {
    const dispatch = useAppDispatch();
    const modalData = useAppSelector(selectModalData);

    return (
        <N_Modal modalId="confirm" title={modalData?.title || title}>
            <Stack
                direction="row"
                justifyContent={"space-between"}
                px={2}
                m={2}
            >
                <Button
                    variant="outlined"
                    onClick={() => dispatch(closeModal())}
                >
                    NO
                </Button>
                <Button
                    onClick={() => {
                        modalData?.action();
                        dispatch(closeModal());
                    }}
                    color="primary"
                >
                    YES
                </Button>
            </Stack>
        </N_Modal>
    );
};

export default ConfirmationModal;
