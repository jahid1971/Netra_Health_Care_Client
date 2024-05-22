// features/modal/modalSlice.js
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";

type generalStateProps = {
    searchTerm: string;
};

const initialState: generalStateProps = {
    searchTerm: "",
};

const generalSlices = createSlice({
    name: "generalSlices",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
    },
});

export const generalReducer = generalSlices.reducer;

export const  { setSearchTerm } = generalSlices.actions;

export const selectSearchTerm = (state: RootState) =>
    state?.generalState?.searchTerm;

export const useSearchTermSelector = () => useAppSelector(selectSearchTerm);
