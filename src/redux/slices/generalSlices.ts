// features/modal/modalSlice.js
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";

type generalStateProps = {
    searchTerm: string;
    countUnreadMsg: number;
};

const initialState: generalStateProps = {
    searchTerm: "",
    countUnreadMsg: 0,
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
    },
});

export const generalReducer = generalSlices.reducer;

export const { setSearchTerm, setCountUnread } = generalSlices.actions;

export const selectSearchTerm = (state: RootState) =>
    state?.generalState?.searchTerm;

export const useSearchTermSelector = () => useAppSelector(selectSearchTerm);

export const selectCountUnread = (state: RootState) =>
    state?.generalState?.countUnreadMsg;

export const useSelectCountUnread = () => useAppSelector(selectCountUnread);
