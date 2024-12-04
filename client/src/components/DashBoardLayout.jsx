// src/components/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/navbars/SideNavbar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout flex">
      <SideNavbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
