const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const repaymentController = require('../controllers/repayment.controller');

router.post('/repayments', auth, repaymentController.recordRepayment);
router.get('/repayments/:loanId', auth, repaymentController.getRepayments);

module.exports = router;
