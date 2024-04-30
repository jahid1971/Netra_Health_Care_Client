import { baseApi } from "./api/baseApi";
import { authReducer } from "./slices/authSlice";
import { loadingReducer } from "./slices/loadingSlice";
import { modalReducer } from "./slices/modalSlice";

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    modal: modalReducer,
    isLoading: loadingReducer,
    auth: authReducer,
};
