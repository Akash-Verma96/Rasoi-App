import express from "express";
import userAuth from "../middlewares/auth.js";
import razorpayInstance from "../utils/razorpay.js";
import Payment from "../models/payment.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { name, phone } = req.body;

    const order = await razorpayInstance.orders.create({
      amount: 5000,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: false,
      notes: {
        Name: name,
        Phone: phone,
      },
    });

    // Save OrderID to database
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    // save payment here

    const savedPayment = await payment.save();

    res.json({ ...savedPayment.toJSON(), KeyId: process.env.RAZORPAY_KEY });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("Webhook Called");
    const webhookSignature = req.get("X-Razorpay-Signature");
    console.log("Webhook Signature", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      console.log("INvalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    console.log("Valid Webhook Signature");

    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default paymentRouter;
