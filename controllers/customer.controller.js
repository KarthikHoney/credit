

const Customer = require('../models/customer.model');

exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, address, trustScore, creditLimit } = req.body;
    const customer = await Customer.create({
      userId: req.userId,
      name, phone, address, trustScore, creditLimit,
    });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating customer' });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.userId });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching customers' });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating customer' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const result = await Customer.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!result) return res.status(404).json({ msg: 'Customer not found' });
    res.json({ msg: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting customer' });
  }
};
