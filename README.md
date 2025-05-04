# 📒 CrediKhaata – Loan Tracker for Shopkeepers

CrediKhaata is a RESTful backend API designed to help small shopkeepers (e.g., kirana stores, tailors, hardware stores) digitize their credit tracking process. It allows users to manage customer credit sales, track repayments, generate PDF receipts, and receive overdue payment alerts.

---

## 🚀 Features

### 🔐 User Authentication
- Shopkeeper registration and login with JWT-based authentication.
- All routes are scoped to the authenticated shopkeeper.

### 👥 Customer Management
- Add, edit, and delete customers.
- Fields: `name`, `phone`, `address`, `trustScore (0–10)`, `creditLimit`.

### 💳 Loan (Credit Sale) Management
- Create loans linked to a customer.
- Fields: `customerId`, `description`, `amount`, `issueDate`, `dueDate`, `frequency`, optional `interest%`, and `graceDays`.
- Tracks loan status: `Pending`, `Paid`, or `Overdue`.

### 💰 Repayment Tracking
- Record partial or full repayments.
- Automatically updates loan balance and status.
- Generates downloadable PDF receipts for repayments.

### 📊 Loan Summary & Alerts
- `/summary`: Returns total loaned, total collected, overdue amount, and average repayment time.
- `/overdue`: Lists customers with overdue loans.
- Automatically tags loans as "overdue" using scheduled checks.

### 🔔 Bonus Features
- Mocked SMS/WhatsApp alerts for overdue payments.
- PDF receipt generation using PDFKit.
- Webhook-ready repayment notification endpoint.

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)** for auth
- **PDFKit** for generating receipts
- **node-cron** for auto-overdue tagging
- **dotenv** for config management

---

## 📂 Project Structure

credikhaata/
├── controllers/
│ ├── authController.js
│ ├── customerController.js
│ ├── loanController.js
│ ├── repaymentController.js
├── models/
│ ├── User.js
│ ├── Customer.js
│ ├── Loan.js
│ ├── Repayment.js
├── routes/
│ ├── authRoutes.js
│ ├── customerRoutes.js
│ ├── loanRoutes.js
│ ├── repaymentRoutes.js
├── middlewares/
│ ├── authMiddleware.js
├── receipts/ # stores generated PDF receipts
├── .env.example
├── README.md
├── server.js



---

## ⚙️ Getting Started
## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone 
cd credikhaata
```

## ⚙️ Install Dependencies
npm start

## Setup Environment Variables
cp .env.example .env

📬 **API Endpoints (Protected by JWT**)
🔐 Auth Routes
POST /api/auth/register – Register shopkeeper

POST /api/auth/login – Login and get JWT

👥 Customer Routes
POST /api/customer – Add customer

GET /api/customer – List customers

PUT /api/customer/:id – Edit customer

DELETE /api/customer/:id – Delete customer

💳 Loan Routes
POST /api/loan – Create loan

GET /api/loan – View all active loans

💰 Repayment Routes
POST /api/repayment – Add repayment

GET /api/repayment/:loanId – Repayment history

GET /api/repayment/pdf/:repaymentId – Get PDF receipt

📊 Summary & Alerts
GET /api/summary – Loan summary (total loaned, collected, etc.)

GET /api/overdue – List of overdue loans


🛡️ Notes
Use the JWT token in the Authorization header as:
Bearer <your_token_here>

All routes except /register and /login are protected.

Mock alerts & auto-overdue tagging are scheduled using node-cron.

Thank you.


