import User from '../models/User.js';

// Fields returned to the client (never the password)
const toUserResponse = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  contact: user.contact,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

// ---------- Logged-in user (self) ----------

// @desc    Get my profile
// @route   GET /api/users/me
export const getMyProfile = async (req, res, next) => {
  try {
    res.json({ success: true, data: toUserResponse(req.user) });
  } catch (error) {
    next(error);
  }
};

// @desc    Update my profile (name, email, contact, or password)
// @route   PUT /api/users/me
// Body: { fullName?, email?, contact?, currentPassword?, newPassword? }
export const updateMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const { fullName, email, contact, currentPassword, newPassword } = req.body;

    if (email && email.toLowerCase() !== user.email) {
      const taken = await User.findOne({ email: email.toLowerCase(), _id: { $ne: user._id } });
      if (taken) {
        res.status(400);
        throw new Error('Email is already in use.');
      }
      user.email = email;
    }

    if (fullName) user.fullName = fullName;
    if (contact) user.contact = contact;

    if (newPassword) {
      if (!currentPassword || !(await user.matchPassword(currentPassword))) {
        res.status(400);
        throw new Error('Current password is incorrect.');
      }
      user.password = newPassword; // pre-save hook hashes it
    }

    const updated = await user.save();
    res.json({ success: true, data: toUserResponse(updated) });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete my account
// @route   DELETE /api/users/me
// Body: { password }
export const deleteMyAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const { password } = req.body;
    if (!password || !(await user.matchPassword(password))) {
      res.status(400);
      throw new Error('Password is required to delete your account.');
    }

    await user.deleteOne();
    res.json({ success: true, message: 'Account deleted.' });
  } catch (error) {
    next(error);
  }
};

// ---------- Admin: manage all users ----------

// @desc    Get all users (Admin)
// @route   GET /api/users?role=customer&page=1&limit=20
export const getUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ fullName: regex }, { email: regex }, { contact: regex }];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      User.countDocuments(filter)
    ]);

    res.json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users.map(toUserResponse)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user (Admin)
// @route   GET /api/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }
    res.json({ success: true, data: toUserResponse(user) });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (Admin) — can change name, email, contact, role
// @route   PUT /api/users/:id
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const { fullName, email, contact, role } = req.body;

    if (email && email.toLowerCase() !== user.email) {
      const taken = await User.findOne({ email: email.toLowerCase(), _id: { $ne: user._id } });
      if (taken) {
        res.status(400);
        throw new Error('Email is already in use.');
      }
      user.email = email;
    }

    if (fullName) user.fullName = fullName;
    if (contact) user.contact = contact;
    if (role) {
      // Stop an admin from demoting themselves and locking everyone out
      if (String(user._id) === String(req.user._id) && role !== 'admin') {
        res.status(400);
        throw new Error('You cannot remove your own admin role.');
      }
      user.role = role;
    }

    const updated = await user.save();
    res.json({ success: true, data: toUserResponse(updated) });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    if (String(req.params.id) === String(req.user._id)) {
      res.status(400);
      throw new Error('You cannot delete your own account from admin panel. Use /api/users/me.');
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }
    res.json({ success: true, message: 'User deleted.' });
  } catch (error) {
    next(error);
  }
};
