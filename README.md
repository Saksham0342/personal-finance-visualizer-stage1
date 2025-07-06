# 💰 Personal Finance Visualizer

A simple, clean and responsive web app to **track personal finances**, view monthly spending via charts, and manage daily transactions.

## 📦 Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB (via Mongoose)
- **Charts**: Recharts

---

## ✅ Features – Stage 1

- Add / Edit / Delete transactions (amount, description, date)
- Transaction list with ₹ formatted values
- Monthly Expenses Bar Chart (grouped by month)
- Basic form validation

---


## 🔧 Setup Instructions (Local)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/personal-finance-visualizer
cd personal-finance-visualizer

# 2. Install dependencies
npm install

# 3. Add environment variable
touch .env.local

# 4. Run the development server
npm run dev