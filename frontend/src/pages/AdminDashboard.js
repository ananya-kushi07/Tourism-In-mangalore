import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
