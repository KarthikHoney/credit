const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const summaryController = require('../controllers/summary.controller');
const overdueController = require('../controllers/overdue.controller');

router.get('/summary', auth, summaryController.getSummary);
router.get('/overdue', auth, overdueController.getOverdueLoans);

module.exports = router;
