import express from "express";
import userAuth from "../middlewares/auth.js";
import razorpayInstance from "../utils/razorpay.js";
import Payment from "../models/payment.js";
import validateWebhookSignature from 'razorpay/dist/utils/razorpay-utils.js';

const paymentRouter = express.Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: false,
      notes: {
        Name: "Akash Kumar",
        Meal: "value2",
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.json({ payment: savedPayment, Key_Id: process.env.RAZORPAY_KEY });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
      const webhookSignature = req.headers('x-razorpay-signature');
      console.log("Webhook Signature:", webhookSignature);

      const isValidSignature = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET);

      if(!isValidSignature) {
          return res.status(400).send("Invalid signature");
      }
      console.log("Valid webhook Signature received");

      // update db 

      const paymentDetail = req.body.payload.payment.entity;

      const payment = await Payment.findOne({ orderId: paymentDetail.order_id });
      if(payment) {
        payment.status = paymentDetail.status;
        await payment.save();
      }

      // update the payment status in frontend



      // Process the successful payment event
      if(req.body.event === "payment.captured") {

      }
      // Process the failed payment event
      if(req.body.event === "payment.failed") {

      }

      // send a response to acknowledge receipt of the webhook
      res.status(200).send("Webhook received");
  } catch (error) {
    res.status(500).send(error.message);
  }
})

export default paymentRouter;
