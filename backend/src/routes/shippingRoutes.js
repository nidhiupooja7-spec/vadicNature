import express from 'express';
import { createBigshipShipment, trackBigshipOrder } from '../controllers/shippingController.js';

const router = express.Router();
router.post('/create-shipment', createBigshipShipment);
router.get('/track/:awb', trackBigshipOrder);
export default router;