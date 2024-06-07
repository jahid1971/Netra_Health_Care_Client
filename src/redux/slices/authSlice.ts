import { RootState } from "../store";

import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { TUser } from "@/types/common";

type TAuthState = {
    user: TUser | null;
    // token: null | string;
    isLoading: boolean;
};

const initialState: TAuthState = {
    user: null,
    // token: null,
    isLoading: true,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // const { user, token } = action.payload;
            state.user = action.payload;
            // state.token = token;
            console.log(action.payload, "action.payload");
        },
        logOut: (state) => {
            state.user = null;
            // state.token = null;
        },

        setIsLoadingFalse: (state) => {
            state.isLoading = false;
        },
        setIsLoadinTrue: (state) => {
            state.isLoading = true;
        },
    },
});

export const { setUser, logOut, setIsLoadinTrue, setIsLoadingFalse } =
    authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectUser = (state: RootState) => state?.auth?.user;

export const selectIsLoading = (state: RootState) => state?.auth?.isLoading;

type SelectUserType = ReturnType<typeof selectUser>;

export const useUserSelector = (): SelectUserType => useAppSelector(selectUser);
