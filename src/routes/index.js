const router = require('express').Router();

const userRoutes = require('./../modules/users/user.routes');

router.use('/users', userRoutes);

module.exports = router;