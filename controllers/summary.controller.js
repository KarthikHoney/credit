const Loan = require('../models/loan.model');
const Repayment = require('../models/repayment.model');
const mongoose = require('mongoose');

// @desc Get loan summary for current user
// @route GET /api/summary
// @access Private
exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalLoaned = await Loan.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$loanAmount' } } }
    ]);

    const totalCollected = await Repayment.aggregate([
      {
        $lookup: {
          from: 'loans',
          localField: 'loanId',
          foreignField: '_id',
          as: 'loan'
        }
      },
      { $unwind: '$loan' },
      { $match: { 'loan.userId': new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalLoanAmount = totalLoaned[0]?.total || 0;
    const totalRepaidAmount = totalCollected[0]?.total || 0;
    const overdueAmount = totalLoanAmount - totalRepaidAmount;

    res.json({
      totalLoaned: totalLoanAmount,
      totalCollected: totalRepaidAmount,
      overdueAmount
    });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to get summary', error: err.message });
  }
};
