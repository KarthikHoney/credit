const mongoose =  require('mongoose');

const repaymentSchema = new mongoose.Schema(
    {
        loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
        amount: { type: Number, required: true },
        paymentDate: { type: Date, default: Date.now },
        paymentMethod: { type: String, enum: ['cash', 'bank', 'mobile'], default: 'cash' }
      }
)

module.exports =  mongoose.model('Repayment', repaymentSchema);
