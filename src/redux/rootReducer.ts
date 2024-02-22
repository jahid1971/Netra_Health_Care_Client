import { baseApi } from "./api/baseApi";
import { modalReducer } from "./features/modal/modalSlice";

export const reducer ={
    [baseApi.reducerPath]: baseApi.reducer,
    modal: modalReducer
    
}