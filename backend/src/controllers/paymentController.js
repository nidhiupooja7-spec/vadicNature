import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay API keys are missing in .env file.');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};

export const createPaymentOrder = async (req, res, next) => {
  try {
    const razorpay = getRazorpayInstance();
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `vedic_rcpt_${Date.now()}`
    };
    const rzpOrder = await razorpay.orders.create(options);
    res.json({ success: true, order: rzpOrder });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      await Order.findByIdAndUpdate(dbOrderId, {
        'paymentInfo.razorpayOrderId': razorpay_order_id,
        'paymentInfo.razorpayPaymentId': razorpay_payment_id,
        'paymentInfo.status': 'Paid'
      });
      res.json({ success: true, message: 'Payment verified successfully!' });
    } else {
      res.status(400);
      throw new Error('Invalid payment signature.');
    }
  } catch (error) {
    next(error);
  }
};