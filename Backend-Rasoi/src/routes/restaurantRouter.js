import express from "express";
import userAuth from "../middlewares/auth.js";
import Restaurant from "../models/restaurant.js";
import Meal from "../models/meal.js";
import Order from "../models/order.js";
import allowRoles from "../middlewares/allowedRoles.js";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const restaurantRouter = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

restaurantRouter.post('/upload', upload.single('image'), userAuth, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Convert the file buffer to a Base64 string
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'my_rasoi_app',
      resource_type: 'auto',
    });

    

   const restauranId = req.user._id;
   const {name,price,category,description,image} = req.body;

    // res.send(name);
    const meal = new Meal({
      restaurant: restauranId,
      name,
      price,
      category,
      description,
      image : result.secure_url,
    })

    const newMeal = await meal.save();
    // console.log(result.secure_url);
    res.status(200).json({
      message: 'Upload successful',
      imageUrl: newMeal,
    });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json(error);
  }
});

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
