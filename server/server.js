const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../client/middleware/auth');

const app = experess();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const users = [{ id: 1, username: 'admin', password: bcrypt.hashSync('password', 10) }]; // In-memory user storage for demonstration
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcryptjs.compareSync(password, user.password)) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});


// Protected route:Stats
app.get('/api/stats', auth, (req, res) => {
    const stats = { revenue: 10000, users: 150, orders: 75 }; // Example stats data
    res.json(stats);
});

// Protected route: Orders
app.get('/api/orders', auth, (req, res) => {
    const orders = [{ id: 1, item: 'Product 1', quantity: 2 },
        { id: 2, item: 'Product 2', quantity: 1 },
        { id: 3, item: 'Product 3', quantity: 5 }
    ]; // Example orders data
    res.json(orders);
});

// logout client
app.post('/api/logout', (req, res) => {
    // In a real application, you might handle token blacklisting here
    res.json({ msg: 'Logged out successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});