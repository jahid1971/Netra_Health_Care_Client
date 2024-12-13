// features/modal/modalSlice.js
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";

type generalStateProps = {
    searchTerm: string;
    countUnreadMsg: number;
    errorMsg: string;
    errorDetails: any;
};

const initialState: generalStateProps = {
    searchTerm: "",
    countUnreadMsg: 0,
    errorMsg: "",
    errorDetails: {},
};

const generalSlices = createSlice({
    name: "generalSlices",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCountUnread: (state, action) => {
            state.countUnreadMsg = action.payload;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        },
        setErrorDetails: (state, action) => {
            state.errorDetails = action.payload;
        },
    },
});

export const generalReducer = generalSlices.reducer;

export const { setSearchTerm, setCountUnread, setErrorMsg, setErrorDetails } =
    generalSlices.actions;

export const selectSearchTerm = (state: RootState) =>
    state?.generalState?.searchTerm;

export const selectCountUnread = (state: RootState) =>
    state?.generalState?.countUnreadMsg;

export const selectErrorMsg = (state: RootState) =>
    state?.generalState?.errorMsg;

export const selectErrorDetails = (state: RootState) =>
    state?.generalState?.errorDetails;

export const useSelectErrorMsg = () => useAppSelector(selectErrorMsg);
export const useSelectCountUnread = () => useAppSelector(selectCountUnread);
export const useSearchTermSelector = () => useAppSelector(selectSearchTerm);
export const useSelectErrorDetails = () => useAppSelector(selectErrorDetails);
