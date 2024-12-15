import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StationDetails from "./pages/StationsDetail";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stations/:id" element={<StationDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
