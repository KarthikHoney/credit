const Loan = require('../models/loan.model');
const Customer = require('../models/customer.model');

const sendMockSMS = async () => {
  try {
    const today = new Date();

    const overdueLoans = await Loan.find({
      dueDate: { $lt: today },
      status: 'overdue'
    }).populate('customerId', 'name phone');

    overdueLoans.forEach(loan => {
      const customer = loan.customerId;
      console.log(`📱 Sending SMS to ${customer.phone}:`);
      console.log(`Dear ${customer.name}, your payment of ₹${loan.loanAmount} is overdue. Please repay immediately.`);
    });
  } catch (err) {
    console.error('❌ Error sending mock alerts:', err.message);
  }
};

module.exports = sendMockSMS;
