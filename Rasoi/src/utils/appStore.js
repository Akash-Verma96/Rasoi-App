import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import orderSlice from './orderSlice.js'
import restaurantSlice from './restaurantSlice.js'
import mealSlice from './mealSlice.js'


export default configureStore({
    reducer :{
        user : userSlice,
        order : orderSlice,
        restaurant : restaurantSlice,
        meal: mealSlice,
    },
})