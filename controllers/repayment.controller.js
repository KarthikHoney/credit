

const Repayment = require('../models/repayment.model');
const Loan = require('../models/loan.model');
const generatePDFReceipt = require('../utils/receiptGenerator');
const Customer = require('../models/customer.model');

// After repayment is created:
const customer = await Customer.findById(loan.customerId);
generatePDFReceipt(repayment, customer, `receipts/receipt-${repayment._id}.pdf`);


// @desc Record a repayment against a loan
// @route POST /api/repayments
// @access Private
exports.recordRepayment = async (req, res) => {
  try {
    const { loanId, amount } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan || loan.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Loan not found or unauthorized' });
    }

    // Save repayment
    const repayment = await Repayment.create({ loanId, amount });

    // [Optional] Logic to update loan status or total paid — you can add this later

    res.status(201).json({ msg: 'Repayment recorded', repayment });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to record repayment', error: err.message });
  }
};

// @desc Get all repayments for a loan
// @route GET /api/repayments/:loanId
// @access Private
exports.getRepayments = async (req, res) => {
  try {
    const loanId = req.params.loanId;

    const loan = await Loan.findById(loanId);
    if (!loan || loan.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Loan not found or unauthorized' });
    }

    const repayments = await Repayment.find({ loanId });
    res.json(repayments);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch repayments', error: err.message });
  }
};
