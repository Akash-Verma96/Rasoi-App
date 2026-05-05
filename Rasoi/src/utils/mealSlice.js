import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalMeals : [],
}

const mealSlice = createSlice({
    name:"meal",
    initialState : initialState,
    reducers: {
        addMeals: (state,action)=>{
            state.totalMeals.push_back(action.payload)
        }
    }
})

export const {addMeals} = mealSlice.actions;
export default mealSlice.reducer;
