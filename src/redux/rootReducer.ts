import { baseApi } from "./api/baseApi";
import { authReducer } from "./slices/authSlice";

import { modalReducer } from "./slices/modalSlice";
import { notificationReducer } from "./slices/notificationSlice";
import { combineReducers } from "@reduxjs/toolkit";



const appReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    modal: modalReducer,
    auth: authReducer,
    notification: notificationReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET_APP") {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
