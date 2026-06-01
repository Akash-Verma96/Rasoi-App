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

// paymentRouter.post(
//   "/payment/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     try {
//       console.log("Webhook Called");
//       const webhookSignature = req.headers["x-razorpay-signature"];
//       console.log("Webhook Signature", webhookSignature);

//       console.log("Body:", req.body);
//       console.log("Signature:", req.headers["X-Razorpay-Signature"]);
//       // console.log("Secret:", process.env.RAZORPAY_WEBHOOK_SECRET);

//       const isValidSignature = validateWebhookSignature(
//         JSON.stringify(req.body),
//         webhookSignature,
//         process.env.RAZORPAY_WEBHOOK_SECRET,
//       );

//       if (!isValidSignature) {
//         return res.status(400).send("Invalid signature");
//       }

//       console.log("Valid webhook Signature received");

//       // update database with payment status

//       const paymentDetails = req.body.payload.payment.entity;

//       const payment = await Payment.findOne({
//         orderId: paymentDetails.order_id,
//       });
//       payment.status = paymentDetails.status;
//       await payment.save();

//       // update the payment status in frontend

//       // Process the successful payment event
//       if (req.body.event === "payment.captured") {
//       }
//       // Process the failed payment event
//       if (req.body.event === "payment.failed") {
//       }

//       // send a response to acknowledge receipt of the webhook
//       return res.status(200).json({ msg: "Webhook received successfully" });
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   },
// );

paymentRouter.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      console.log("🔥 Webhook Called");

      const signature = req.headers["x-razorpay-signature"];

      if (!signature) {
        console.log("No Razorpay signature header found");
        return res.status(400).json({
          success: false,
          message: "Missing x-razorpay-signature header",
        });
      }

      console.log("Signature:", signature); // not working
      console.log("Headers:", req.headers);
      console.log("Body is Buffer:", Buffer.isBuffer(req.body));

      const rawBody = req.body.toString();

      const isValidSignature = validateWebhookSignature(
        rawBody,
        signature,
        process.env.RAZORPAY_WEBHOOK_SECRET,
      );

      if (!isValidSignature) {
        console.log("Invalid Signature");
        return res.status(400).send("Invalid signature");
      }

      console.log("Valid webhook signature");

      const payload = JSON.parse(rawBody);

      const paymentDetails = payload.payload.payment.entity;

      const payment = await Payment.findOne({
        orderId: paymentDetails.order_id,
      });

      if (payment) {
        payment.status = paymentDetails.status;
        await payment.save();
      }

      if (payload.event === "payment.captured") {
        console.log("💰 Payment Captured");
      }

      if (payload.event === "payment.failed") {
        console.log("❌ Payment Failed");
      }

      return res.status(200).json({
        success: true,
        message: "Webhook received successfully",
      });
    } catch (error) {
      console.error("Webhook Error:", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

export default paymentRouter;
