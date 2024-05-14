import { RootState } from "../store";
import { TUser } from "@/types/global.types";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
    user: null | TUser;
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
// export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state?.auth?.user;

export const selectIsLoading = (state: RootState) => state?.auth?.isLoading;
