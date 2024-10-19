// src/components/Dashboard.js
// src/components/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample data
  const data = [
    { name: 'Jan', tasks: 30, completed: 20 },
    { name: 'Feb', tasks: 25, completed: 15 },
    { name: 'Mar', tasks: 35, completed: 25 },
    { name: 'Apr', tasks: 40, completed: 30 },
  ];

  const pieData = [
    { name: 'Completed', value: 70 },
    { name: 'Pending', value: 30 },
  ];

  return (
    <Container fluid>
      <Row>
        {/* Tasks Chart */}
        <Col sm={12} md={6} lg={4}>
          <Card>
            <Card.Body>
              <h5>Tasks Over Time</h5>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
                  <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Bar Chart for Task Stats */}
        <Col sm={12} md={6} lg={4}>
          <Card>
            <Card.Body>
              <h5>Tasks Completed vs Created</h5>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill="#8884d8" />
                  <Bar dataKey="completed" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Pie Chart for Task Breakdown */}
        <Col sm={12} md={6} lg={4}>
          <Card>
            <Card.Body>
              <h5>Task Breakdown</h5>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#82ca9d" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
