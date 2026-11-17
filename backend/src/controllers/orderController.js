import Order from '../models/Order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { user, items, shippingAddress, totalAmount } = req.body;
    const order = await Order.create({ user, items, shippingAddress, totalAmount });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'fullName email contact');
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
