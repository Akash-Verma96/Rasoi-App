import express from 'express'
import userAuth from '../middlewares/auth.js';
import allowRoles from '../middlewares/allowedRoles.js';
import Order from '../models/order.js';
import Restaurant from '../models/restaurant.js';
import User from '../models/user.js';

const adminRouter = express.Router();

adminRouter.get("/admin",userAuth,allowRoles("admin"),async (req,res)=>{
    try {
        const totalUser = await User.find();

        res.send(totalUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

adminRouter.get("/admin/orders",userAuth,allowRoles("admin"),async (req,res)=>{
    try {
        const totalOrder = await Order.find();

        res.send(totalOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

adminRouter.get("/admin/restaurant",userAuth,allowRoles("admin"),async (req,res)=>{
    try {
        const totalRestaurant = await Restaurant.find();

        res.send(totalRestaurant);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


export default adminRouter;