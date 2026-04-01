import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import orderSlice from './orderSlice.js'


export default configureStore({
    reducer :{
        user : userSlice,
        order : orderSlice,
    },
})