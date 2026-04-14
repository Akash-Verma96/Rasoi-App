import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalMeals : [],
    orders: [],
}

const restaurantSlice = createSlice({
    name : 'restaurant',
    initialState,
    reducers: {
        settotalMeals: (state,action)=>{
            state.totalMeals.push(action.payload);
        },
        addOrders: (state,action) => {
            state.orders.push(action.payload);
        }
    }
})

export const { settotalMeals, addOrders } = restaurantSlice.actions
export default restaurantSlice.reducer
