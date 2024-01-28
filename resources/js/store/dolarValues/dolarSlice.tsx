import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DolarValues{
    id:number,
    value:number;
    date:string;
};
const initialState:DolarValues[] = [];

export const dolarSlice  = createSlice({
    name:'dolarValues',
    initialState,
    reducers:{
        setDolarData: (state, action) => {
            return [...action.payload];
        },
        addValue:(state, action) => {
            state.dolarValues.push(action.payload);
        },
        removeValue:(state, action) => {
            return state.filter((dolarVal) => dolarVal.id !== action.payload);
        },
    }
});

export const {setDolarData, addValue, removeValue} = dolarSlice.actions;
export default dolarSlice.reducer   ;