// features/modal/modalSlice.js
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TModalState = {
    isOpen: boolean;
    modalId?: string;
    modalData?: undefined,
};
const initialState: TModalState = {
    isOpen: false,
    modalId: undefined,
    modalData: undefined,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state,action) => {
            state.isOpen = true;
            state.modalId = action.payload.modalId;
            state.modalData = action.payload.modalData;
            console.log("modalData in modalSlice", state.isOpen)
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalId = undefined;
            state.modalData = undefined;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const selectIsOpen = (state: RootState) => state?.modal?.isOpen;
export const selectModalId = (state: RootState) => state?.modal?.modalId;
export const selectModalData = (state: RootState) => state?.modal?.modalData;
