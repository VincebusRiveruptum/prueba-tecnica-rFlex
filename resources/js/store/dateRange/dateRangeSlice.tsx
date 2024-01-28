import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DateRange{
    "start":string,
    "end":string,
};

const initialState = {
    start: getPrevCurrentDate(),
    end: getCurrentDate(),
  };
  
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  function getPrevCurrentDate() {
    const currentDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

export const dateRange = createSlice({
    name:'dateRange',
    initialState,
    reducers:{
        setDateRange: (state, action) => {
            return [...action.payload];
        },        
    }
});

export const {setDateRange} = dateRange.actions;
export default dateRange.reducer   ;