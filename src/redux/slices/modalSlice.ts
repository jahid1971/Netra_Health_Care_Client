// features/modal/modalSlice.js
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";

type TModalState = {
    isOpen: boolean;
    modalId?: string;
    modalData?: { action: () => void; title?: string; data?: any };
    childModalOpen: boolean;
    childModalId?: string;
};
const initialState: TModalState = {
    isOpen: false,
    modalId: undefined,
    childModalOpen: false,
    childModalId: undefined,

    modalData: undefined,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.modalId = action.payload.modalId;
            state.modalData = action.payload.modalData;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalId = undefined;
            state.modalData = undefined;
        },

        openChildModal: (state, action) => {
            state.childModalOpen = true;
            state.childModalId = action.payload.modalId;
        },
        closeChildModal: (state) => {
            state.childModalOpen = false;
            state.childModalId = undefined;
        },
    },
});

export const { openModal, closeModal, openChildModal, closeChildModal } =
    modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const selectIsOpen = (state: RootState) => state?.modal?.isOpen;
export const selectChildModalOpen = (state: RootState) =>
    state?.modal?.childModalOpen;

export const selectModalId = (state: RootState) => state?.modal?.modalId;
export const selectModalData = (state: RootState) => state?.modal?.modalData;
export const selectChildModalId = (state: RootState) =>
    state?.modal?.childModalId;

export const useModalOpen = (params: Partial<TModalState>) => {
    const dispatch = useAppDispatch();
    return () => dispatch(openModal(params));
};

export const useModalClose = () => {
    const dispatch = useAppDispatch();
    return () => dispatch(closeModal());
};
