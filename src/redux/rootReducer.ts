import { baseApi } from "./api/baseApi";
import { authReducer } from "./slices/authSlice";
import { generalReducer } from "./slices/generalSlices";

import { modalReducer } from "./slices/modalSlice";
import { notificationReducer } from "./slices/notificationSlice";
import { combineReducers } from "@reduxjs/toolkit";

const appReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    modal: modalReducer,
    auth: authReducer,
    notification: notificationReducer,
    generalState: generalReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === "RESET_APP") {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
