const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan.controller');
const auth = require('../middleware/auth');

router.post('/loans', auth, loanController.createLoan);
router.get('/loans', auth, loanController.getLoans);

module.exports = router;
