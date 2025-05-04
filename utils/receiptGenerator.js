const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDFReceipt = (repayment, customer, filePath) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text('CrediKhaata - Payment Receipt', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Customer: ${customer.name}`);
  doc.text(`Phone: ${customer.phone}`);
  doc.text(`Amount Paid: ₹${repayment.amount}`);
  doc.text(`Date: ${new Date(repayment.date).toLocaleDateString()}`);

  doc.end();
};

module.exports = generatePDFReceipt;
