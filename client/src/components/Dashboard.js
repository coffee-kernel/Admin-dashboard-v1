import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [statsRes, ordersRes] = await Promise.all([
          axios.get('/api/stats', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setStats(statsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>${stats.revenue}</p>
        </div>
        <div className="stat-card">
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p>{stats.orders}</p>
        </div>
        <div className="stat-card">
          <h3>Growth</h3>
          <p>{stats.growth}%</p>
        </div>
      </div>
      <h2>Recent Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.amount}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;