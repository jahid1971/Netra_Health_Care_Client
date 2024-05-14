

import { RootState } from "@/redux/store";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [] as any;

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            const currentState = current(state); // Get plain JavaScript array
            const isDuplicate = currentState.some(
                (notification :any) => notification.text === action.payload.text
            );

            if (!isDuplicate) state.push(action.payload);
        },
    },
});

export const { setNotification } = notificationSlice.actions;

export const selectNotifications = (state: RootState) => state.notification;

export const notificationReducer = notificationSlice.reducer;
