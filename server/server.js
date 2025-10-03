const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user (in production, use DB)
const users = [{ id: 1, username: 'admin', password: bcrypt.hashSync('password', 10) }];

// Routes
// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

// Protected: Stats
app.get('/api/stats', auth, (req, res) => {
  const stats = {
    revenue: 12500,
    users: 245,
    orders: 89,
    growth: 12.5
  };
  res.json(stats);
});

// Protected: Orders
app.get('/api/orders', auth, (req, res) => {
  const orders = [
    { id: 1, customer: 'John Doe', amount: 299, status: 'Shipped', date: '2025-10-01' },
    { id: 2, customer: 'Jane Smith', amount: 150, status: 'Pending', date: '2025-10-02' },
    { id: 3, customer: 'Bob Johnson', amount: 450, status: 'Delivered', date: '2025-10-03' }
  ];
  res.json(orders);
});

// Logout (client-side token removal)
app.post('/api/logout', (req, res) => {
  res.json({ msg: 'Logged out' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});