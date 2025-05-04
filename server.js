const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const cron = require('node-cron');
const autoTagOverdueLoans = require('./utils/autoTagOverdue');
const sendMockSMS = require('./utils/notifyOverdue');




// Run every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('🔁 Running auto-tag job...');
  await autoTagOverdueLoans();
});


cron.schedule('0 3 * * *', async () => {
  console.log('📤 Sending overdue alerts...');
  await sendMockSMS();
});




dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);



// Connect DB
mongoose.connect("mongodb://localhost:27017/creditkidha")
  .then(() => app.listen(process.env.PORT || 5000, () =>
    console.log('Server running',process.env.PORT)))
  .catch(err => console.error(err));
