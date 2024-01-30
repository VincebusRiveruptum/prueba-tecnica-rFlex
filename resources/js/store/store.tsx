import { configureStore } from "@reduxjs/toolkit";
import dollarSlice from "./dollarValues/dollarSlice";
import dateRangeSlice from "./dateRange/dateRangeSlice";

export const store = configureStore({
    reducer:{
       dollarValues:dollarSlice,
       dateRange:dateRangeSlice
    }
    },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;    