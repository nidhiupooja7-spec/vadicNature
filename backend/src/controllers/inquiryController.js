import BulkOrder from '../models/BulkOrder.js';
import Collaboration from '../models/Collaboration.js';

// ---------- Public: submit forms ----------

// @desc    Submit Bulk Order Form
// @route   POST /api/inquiries/bulk-order
export const submitBulkOrder = async (req, res, next) => {
  try {
    const { name, email, phone, country, companyName, orderQuantity, purpose, message } = req.body;

    if (!name || !email || !phone || !country || !companyName || !orderQuantity || !purpose) {
      res.status(400);
      throw new Error('Please fill in all required fields for bulk order.');
    }

    const bulkOrder = await BulkOrder.create({
      name,
      email,
      phone,
      country,
      companyName,
      orderQuantity,
      purpose,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Bulk order inquiry submitted successfully. We will get back to you shortly!',
      data: bulkOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit Influencer Collaboration Form
// @route   POST /api/inquiries/collaboration
export const submitCollaboration = async (req, res, next) => {
  try {
    const { name, email, phone, socialMediaHandles, stateCity, message } = req.body;

    if (!name || !email || !phone || !socialMediaHandles || !stateCity || !message) {
      res.status(400);
      throw new Error('Please fill in all required fields for collaboration.');
    }

    const collaboration = await Collaboration.create({
      name,
      email,
      phone,
      socialMediaHandles,
      stateCity,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your interest in collaborating with Vedic Nature. Please fill out the form below and we will get back to you shortly!!',
      data: collaboration
    });
  } catch (error) {
    next(error);
  }
};

// ---------- Admin: manage inquiries ----------

// Builds list / get / update-status / delete handlers for a given model
const buildAdminHandlers = (Model, statusValues, label) => {
  // @desc    List inquiries (Admin)
  // @query   status, search, page, limit
  const list = async (req, res, next) => {
    try {
      const { status, search } = req.query;
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);

      const filter = {};
      if (status) filter.status = status;
      if (search) {
        const regex = new RegExp(search.trim(), 'i');
        filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
      }

      const [items, total] = await Promise.all([
        Model.find(filter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit),
        Model.countDocuments(filter)
      ]);

      res.json({
        success: true,
        count: items.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: items
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc    Get one inquiry (Admin)
  const getOne = async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error(`${label} inquiry not found.`);
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  // @desc    Update inquiry status (Admin)
  // @body    { status }
  const updateStatus = async (req, res, next) => {
    try {
      const { status } = req.body;
      if (!status || !statusValues.includes(status)) {
        res.status(400);
        throw new Error(`Status must be one of: ${statusValues.join(', ')}.`);
      }

      const item = await Model.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
      if (!item) {
        res.status(404);
        throw new Error(`${label} inquiry not found.`);
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  // @desc    Delete inquiry (Admin)
  const remove = async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error(`${label} inquiry not found.`);
      }
      res.json({ success: true, message: `${label} inquiry deleted.` });
    } catch (error) {
      next(error);
    }
  };

  return { list, getOne, updateStatus, remove };
};

const bulkHandlers = buildAdminHandlers(
  BulkOrder,
  ['Pending', 'Contacted', 'Closed'],
  'Bulk order'
);

const collabHandlers = buildAdminHandlers(
  Collaboration,
  ['New', 'Reviewed', 'Approved'],
  'Collaboration'
);

export const listBulkOrders = bulkHandlers.list;
export const getBulkOrderById = bulkHandlers.getOne;
export const updateBulkOrderStatus = bulkHandlers.updateStatus;
export const deleteBulkOrder = bulkHandlers.remove;

export const listCollaborations = collabHandlers.list;
export const getCollaborationById = collabHandlers.getOne;
export const updateCollaborationStatus = collabHandlers.updateStatus;
export const deleteCollaboration = collabHandlers.remove;
