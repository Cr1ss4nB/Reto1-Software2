import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';
import OrderDashboard from './OrderDashboard';

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-area">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders/*" element={<OrderDashboard />} />
            <Route path="" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
