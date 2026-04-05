const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get progress
router.get('/progress', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update completed topics
router.post('/progress', auth, async (req, res) => {
    const { topic } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user.completed_topics.includes(topic)) {
            user.completed_topics.push(topic);
            await user.save();
        }
        res.json({ completed_topics: user.completed_topics });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Save custom array
router.post('/arrays', auth, async (req, res) => {
    const { name, data } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.saved_arrays.push({ name, data });
        await user.save();
        res.json({ saved_arrays: user.saved_arrays });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
