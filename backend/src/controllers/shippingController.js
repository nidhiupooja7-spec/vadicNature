import axios from 'axios';
import Order from '../models/Order.js';

// Bigship Auth Token Helper
const getBigshipToken = async () => {
  const { data } = await axios.post(`${process.env.BIGSHIP_BASE_URL}/login/user`, {
    user_name: process.env.BIGSHIP_USERNAME,
    password: process.env.BIGSHIP_PASSWORD,
    access_key: process.env.BIGSHIP_ACCESS_KEY
  });
  return data?.data?.token;
};

// @desc    Push Order to Bigship after Payment
// @route   POST /api/shipping/create-shipment
export const createBigshipShipment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404);
      throw new Error('Order not found.');
    }

    const token = await getBigshipToken();

    // Bigship Order Payload
    const shipmentPayload = {
      order_id: order._id.toString(),
      consignee_name: order.shippingAddress.fullName,
      consignee_phone: order.shippingAddress.contact,
      consignee_address: order.shippingAddress.addressLine,
      consignee_city: order.shippingAddress.city,
      consignee_state: order.shippingAddress.state,
      consignee_pincode: order.shippingAddress.pincode,
      payment_mode: 'Prepaid',
      order_amount: order.totalAmount
    };

    const { data } = await axios.post(
      `${process.env.BIGSHIP_BASE_URL}/order/add/single`,
      shipmentPayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    order.shippingInfo = {
      bigshipOrderId: data?.data?.system_order_id || '',
      awbNumber: data?.data?.awb_number || '',
      courierName: data?.data?.courier_name || 'Bigship Logistics',
      trackingStatus: 'Shipment Created'
    };
    await order.save();

    res.json({ success: true, message: 'Shipment created on Bigship!', shippingInfo: order.shippingInfo });
  } catch (error) {
    next(error);
  }
};

// @desc    Track Order via AWB Number
// @route   GET /api/shipping/track/:awb
export const trackBigshipOrder = async (req, res, next) => {
  try {
    const { awb } = req.params;
    const token = await getBigshipToken();

    const { data } = await axios.get(`${process.env.BIGSHIP_BASE_URL}/tracking?awb=${awb}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.json({ success: true, trackingData: data });
  } catch (error) {
    next(error);
  }
};