const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customer.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(authMiddleware); // Protect all routes below

router.post('/', createCustomer);
router.get('/', getCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
