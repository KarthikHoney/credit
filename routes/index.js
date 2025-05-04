const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/customer', require('./customer.routes'));
router.use('/loan', require('./loan.routes'));
router.use('/repayment', require('./repayment.routes'));
router.use('/', require('./summary.routes'));

module.exports = router;
