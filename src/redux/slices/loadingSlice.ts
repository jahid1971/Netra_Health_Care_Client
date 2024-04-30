import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoading: boolean } = {
    isLoading: false,
};

const loadingSlice = createSlice({
    name: "isLoading",
    initialState,
    reducers: {
        setIsLoadingTrue: (state) => {
            state.isLoading = true;
        },
        setIsLoadingFalse: (state) => {
            state.isLoading = false;
        },
    },
});

export const { setIsLoadingTrue, setIsLoadingFalse } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;

export const selectIsLoading = (state: RootState) => state?.isLoading?.isLoading;
