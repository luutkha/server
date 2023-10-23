const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const fileRoutes = require('./file.route');
const groupRoutes = require('./group.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/files', fileRoutes);
router.use('/groups', groupRoutes);


module.exports = router;
