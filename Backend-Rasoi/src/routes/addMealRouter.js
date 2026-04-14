// Isme cart router hai

import express from "express";
import upload from "../middlewares/multer.js";
import Meal from "../models/meal.js";
import userAuth from "../middlewares/auth.js";
import Cart from "../models/cart.js";
import Restaurant from "../models/restaurant.js";

const addMealRouter = express.Router();

addMealRouter.post("/restaurant/addMeal",upload.single("image"),userAuth,async (req, res) => {
    try {
      console.log("File : " ,req.file);

      if (!req.file) {
  return res.status(400).json({ error: "Image missing" });
}

      res.status(200).json({
        imageUrl : req.file.path,
      });
    } catch (error) {
      console.log("Upload Error !", error);
      res.status(500).send("Add meal backend Nahi chal rha hai !");
    }
  },
);

addMealRouter.post("/mealDetail/:mealId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { quantity } = req.body;
    const { mealId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ meal: mealId, quantity: quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.meal.toString() === mealId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ meal: mealId, quantity: quantity });
      }
    }

    await cart.save();

    res.json({
      message: "Meal Added to cart Successfully !",
      data: cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

addMealRouter.delete("/cart/:mealId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const mealId = req.params.mealId;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: {
          items: { meal: mealId },
        },
      },
      { new: true },
    );

    await cart.save();
    res.json({
      messgae: "Meal cleared successfully !",
      data: cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

addMealRouter.patch("/cart/:mealId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const mealId = req.params.mealId;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: {
          items: { meal: mealId },
        },
      },
      { new: true },
    );

    await cart.save();
    res.json({
      messgae: "Meal cleared successfully !",
      data: cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default addMealRouter;
