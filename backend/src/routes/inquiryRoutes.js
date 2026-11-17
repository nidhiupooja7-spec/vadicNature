import express from 'express';
import {
  submitBulkOrder,
  submitCollaboration,
  listBulkOrders,
  getBulkOrderById,
  updateBulkOrderStatus,
  deleteBulkOrder,
  listCollaborations,
  getCollaborationById,
  updateCollaborationStatus,
  deleteCollaboration
} from '../controllers/inquiryController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ----- Public: website forms -----
router.post('/bulk-order', submitBulkOrder);
router.post('/collaboration', submitCollaboration);

// ----- Admin: bulk orders -----
router.route('/bulk-order').get(protect, adminOnly, listBulkOrders);
router
  .route('/bulk-order/:id')
  .get(protect, adminOnly, getBulkOrderById)
  .patch(protect, adminOnly, updateBulkOrderStatus)
  .delete(protect, adminOnly, deleteBulkOrder);

// ----- Admin: collaborations -----
router.route('/collaboration').get(protect, adminOnly, listCollaborations);
router
  .route('/collaboration/:id')
  .get(protect, adminOnly, getCollaborationById)
  .patch(protect, adminOnly, updateCollaborationStatus)
  .delete(protect, adminOnly, deleteCollaboration);

export default router;
