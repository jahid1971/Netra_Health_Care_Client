import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { modalReducer } from "./slices/modalSlice";
import { authReducer } from "./slices/authSlice";
import { notificationReducer } from "./slices/notificationSlice";
import rootReducer from "./rootReducer";
// ...

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
