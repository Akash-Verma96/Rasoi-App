import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    address: [],
    paymentMethod: "",
    itemsPrice: 0,
    deliveryCharge: 0,
    totalPrice: 0,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addItems: (state,action)=>{
            state.items.push(action.payload);
        },
        setAddress: (state,action) => {
            state.address.push(action.payload);
        },
        setPaymentMethod: (state,action)=>{
            state.paymentMethod = action.payload;
        },
        setItemsPrice: (state,action)=>{
            state.itemsPrice = action.payload;
        },
        setDeliveryCharge: (state,action)=>{
            state.deliveryCharge = action.payload
        },
        setTotalPrice: (state,action)=>{
            state.totalPrice = action.payload
        }
    }
})

export const {addItems,setAddress,setPaymentMethod,setItemsPrice,setDeliveryCharge,setTotalPrice} = orderSlice.actions;

export default orderSlice.reducer;