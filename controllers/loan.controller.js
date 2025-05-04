

const Loan = require('../models/loan.model');

// @desc Create a new credit loan
// @route POST /api/loans
// @access Private (JWT required)
exports.createLoan = async (req, res) => {
  try {
    const {
      customerId,
      itemDescription,
      loanAmount,
      issueDate,
      dueDate,
      frequency,
      interest,
      graceDays
    } = req.body;

    const loan = await Loan.create({
      userId: req.user.id, // From auth middleware
      customerId,
      itemDescription,
      loanAmount,
      issueDate,
      dueDate,
      frequency,
      interest,
      graceDays
    });

    res.status(201).json({ msg: 'Loan created successfully', loan });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create loan', error: err.message });
  }
};

// @desc Get all loans for current user (shopkeeper)
// @route GET /api/loans
// @access Private
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id }).populate('customerId', 'name phone');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch loans', error: err.message });
  }
};
