const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../model/user');

// --- PUBLIC ROUTES (No auth needed) ---
// (Your login/register routes go here, typically in a separate auth router)

// --- PROTECTED ROUTES (Auth needed) ---

// 1. **User can view their own profile (Authenticated only)**
router.get('/me', protect, (req, res) => {
    res.json(req.user); // Contains id and role from JWT
});


// 2. **Admin/Moderator can view ALL users (RBAC)**
router.get('/', protect, authorize(['admin', 'moderator']), async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});


// 3. **Admin can delete a user (Highest RBAC)**
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
});

module.exports = router;