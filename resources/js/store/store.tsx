import { configureStore } from "@reduxjs/toolkit";
import dolarSlice from "./dolarValues/dolarSlice";
import dateRangeSlice from "./dateRange/dateRangeSlice";

export const store = configureStore({
    reducer:{
       dolarValues:dolarSlice,
       dateRange:dateRangeSlice
    }
    },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;    