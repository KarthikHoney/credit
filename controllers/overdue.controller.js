const Loan = require('../models/loan.model');

// @desc Get all overdue loans for current user
// @route GET /api/overdue
// @access Private
exports.getOverdueLoans = async (req, res) => {
  try {
    const today = new Date();

    const overdueLoans = await Loan.find({
      userId: req.user.id,
      dueDate: { $lt: today },
      status: 'pending'  // optionally filter by status
    }).populate('customerId', 'name phone');

    res.json(overdueLoans);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch overdue loans', error: err.message });
  }
};
