import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface dollarValues{
    id:number,
    value:number;
    date:string;
};
const initialState:dollarValues[] = [];

export const dollarSlice  = createSlice({
    name:'dollarValues',
    initialState,
    reducers:{
        setDollarData: (state, action) => {
            return [...action.payload];
        },
        addValue:(state, action) => {
            state.dollarValues.push(action.payload);
        },
        removeValue:(state, action) => {
            return state.filter((dollarVal) => dollarVal.id !== action.payload);
        },
        modifyValue: (state, action) => {
            const { id, value } = action.payload;
            const existingDollarValue = state.find((dollarVal) => dollarVal.id === id);
      
            if (existingDollarValue) {
              existingDollarValue.value = value;
            }
        },
    }
});

export const {setDollarData, addValue, removeValue, modifyValue} = dollarSlice.actions;
export default dollarSlice.reducer   ;