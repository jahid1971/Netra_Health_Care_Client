// import * as React from "react";
// import Button from "@mui/material/Button";
// import { styled, SxProps } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
// import { TOpenState } from "@/types/common";
// import { grey } from "@mui/material/colors";
// import { TransitionProps } from "@mui/material/transitions";
// import { Slide } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import {
//     closeModal,
//     selectChildModalId,
//     selectChildModalOpen,
//     selectIsOpen,
//     selectModalId,
// } from "@/redux/slices/modalSlice";

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & {
//         children: React.ReactElement;
//     },
//     ref: React.Ref<unknown>
// ) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     "& .MuiDialogContent-root": {
//         padding: theme.spacing(2),
//     },
//     "& .MuiDialogActions-root": {
//         padding: theme.spacing(1),
//     },
// }));

// type TModalProps = {
//     modalId?: string;
//     title?: string;
//     children: React.ReactNode;
//     fullScreen?: boolean;
// } & TOpenState;

// export default function N_Modal({
//     title = "",
//     modalId,
//     childModalId,
//     children,
//     fullScreen = false,
// }: TModalProps) {
//     const isOpen = useAppSelector(selectIsOpen);
//     const currentModalId = useAppSelector(selectModalId);
//     const childModalOpen = useAppSelector(selectChildModalOpen);
//     const currentChildModalId = useAppSelector(selectChildModalId);
//     const dispatch = useAppDispatch();

//     const handleClose = () => dispatch(closeModal());

//     return (
//         <React.Fragment>
//             <BootstrapDialog
//                 fullScreen={fullScreen}
//                 TransitionComponent={fullScreen ? Transition : undefined}
//                 onClose={handleClose}
//                 aria-labelledby="customized-dialog-title"
//                 open={
//                     (isOpen && modalId === currentModalId) ||
//                     (childModalOpen && modalId === childModalId)
//                 }
//             >
//                 <DialogTitle
//                     sx={{ textAlign: "center", mt: 3 }}
//                     id="customized-dialog-title"
//                 >
//                     {title}
//                 </DialogTitle>
//                 <IconButton
//                     aria-label="close"
//                     onClick={handleClose}
//                     sx={{
//                         position: "absolute",
//                         right: 8,
//                         top: 8,
//                         color: grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <DialogContent dividers={!!title}>{children}</DialogContent>
//             </BootstrapDialog>
//         </React.Fragment>
//     );
// }


import * as React from "react";
import Button from "@mui/material/Button";
import { styled, SxProps } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TOpenState } from "@/types/common";
import { grey } from "@mui/material/colors";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    closeChildModal,
    closeModal,
    selectChildModalId,
    selectChildModalOpen,
    selectIsOpen,
    selectModalId,
} from "@/redux/slices/modalSlice";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

type TModalProps = {
    modalId?: string;
    title?: string;
    children: React.ReactNode;
    fullScreen?: boolean;
} & TOpenState;

export default function N_Modal({
    title = "",
    modalId,
    children,
    fullScreen = false,
}: TModalProps) {
    const isOpen = useAppSelector(selectIsOpen);
    const currentModalId = useAppSelector(selectModalId);
    const childModalOpen = useAppSelector(selectChildModalOpen);
    const childModalId = useAppSelector(selectChildModalId);
    const dispatch = useAppDispatch();



    const handleClose = () => {
        modalId === childModalId && dispatch(closeChildModal());
        modalId === currentModalId && dispatch(closeModal());
        
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                fullScreen={fullScreen}
                TransitionComponent={fullScreen ? Transition : undefined}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={
                    (isOpen && modalId === currentModalId) ||
                    (childModalOpen && modalId === childModalId)
                }
            >
                <DialogTitle
                    sx={{ textAlign: "center", mt: 3 }}
                    id="customized-dialog-title"
                >
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers={!!title}>{children}</DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}
