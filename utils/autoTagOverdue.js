const Loan = require('../models/loan.model');

const autoTagOverdueLoans = async () => {
  try {
    const today = new Date();
    const result = await Loan.updateMany(
      {
        dueDate: { $lt: today },
        status: 'pending'
      },
      { $set: { status: 'overdue' } }
    );

    console.log(`✅ Auto-tagged ${result.modifiedCount} loans as overdue`);
  } catch (err) {
    console.error('❌ Error auto-tagging overdue loans:', err.message);
  }
};

module.exports = autoTagOverdueLoans;
