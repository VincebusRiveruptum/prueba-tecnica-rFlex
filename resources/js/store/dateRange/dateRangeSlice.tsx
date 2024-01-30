import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

export interface DateRange{
    "start":string,
    "end":string,
};

const initialState = {
    start: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  };

export const dateRange = createSlice({
    name:'dateRange',
    initialState,
    reducers:{
        setStartDate: (state, action) => {
          state.start = action.payload;
        },       
        setEndDate: (state, action) => {
          state.end = action.payload;
        },     
    }
});

export const {setStartDate, setEndDate} = dateRange.actions;
export default dateRange.reducer   ;