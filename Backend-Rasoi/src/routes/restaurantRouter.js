import express from "express";
import userAuth from "../middlewares/auth.js";
import Restaurant from "../models/restaurant.js";
import Meal from "../models/meal.js";
import Order from "../models/order.js";
import allowRoles from "../middlewares/allowedRoles.js";

const restaurantRouter = express.Router();

restaurantRouter.post("/restaurant/Profile", userAuth, async (req, res) => {
  try {
    const owner = req.user._id;

    const { restaurantName, description, address, state, city, pincode } =
      req.body;

    const restaurant = new Restaurant({
      owner,
      restaurantName,
      description,
      address,
      state,
      city,
      pincode,
    });

    const data = await restaurant.save();

    res.status(201).json({
      message: "Restaurant data save successfully !",
      data: data,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

restaurantRouter.get(
  "/restaurant/Dashboard",
  userAuth,
  allowRoles("restaurant"),
  async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await Restaurant.findOne({ owner: userId });

      res.send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
);

restaurantRouter.get("/restaurant/meals", userAuth, async (req, res) => {
  try {
    const owner = req.user._id;

    const rest = await Restaurant.findOne({ owner });

    const restaurant = rest._id;
    const meals = await Meal.find({ restaurant });

    res.send(meals);
  } catch (error) {
    res.status(500).send(error);
  }
});

restaurantRouter.get("/restaurant/orders", userAuth, async (req, res) => {
  try {
    const owner = req.user._id;

    const rest = await Restaurant.findOne({ owner });

    const restaurantId = rest._id;

    const orders = await Order.find({ restaurantId });

    res.send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

restaurantRouter.patch("/restaurant/acceptOrder", userAuth, async (req, res) => {
  try {
    const {_id} = req.body;
    const {status} = req.body;

  

    const order = await Order.findOne({ _id});

    if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

    order.status = status;

    await order.save();

    res.json({
      messgae : "Order Accepted Successfully !"
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default restaurantRouter;
