import express from 'express'
import userAuth from '../middlewares/auth.js';
import Meal from '../models/meal.js';
import Cart from '../models/cart.js';
import allowRoles from '../middlewares/allowedRoles.js';
import Restaurant from '../models/restaurant.js';
import { getGroqChatCompletion } from '../config/chat.js';


const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth, allowRoles("customer"), async (req,res)=>{
    try {
        const user = req.user;

        res.send(user);


    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

profileRouter.get("/", userAuth, async(req,res) => {
    try {
        const meals = await Meal.find();

        res.send(meals);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

profileRouter.get("/home", userAuth, async(req,res) => {
    try {
        const rest = await Restaurant.find({});

        res.send(rest);
    } catch (error) {
        res.status(500).send(error)
    }
})

profileRouter.get("/mealDetail/:mealId",userAuth,async(req,res)=>{
    try {
        const {mealId} = req.params;

        const meal = await Meal.findById({_id:mealId})
        
        res.send(meal);
    } catch (error) {
        res.send()
    }
})

profileRouter.get("/cart", userAuth, async (req,res)=>{
    const userId = req.user._id
    try {
        const cart = await Cart.findOne({userId}).populate("items.meal");

        res.send(cart)
    } catch (error) {
        res.status(500).send(error.message);
    }
})

profileRouter.post('/chat', userAuth, async (req,res)=>{
    try {

        const userID = req.user._id.toString().substr(2,8);
        const message = req.body.message;

       
        const resultData = await getGroqChatCompletion({userMessage: message,threadId: userID});
        if(!resultData){
           res.send("Something went wrong !!");
           return;
        }
        res.send(resultData);
    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).send(error.message);
    }
})

export default profileRouter