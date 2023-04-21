import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Detail } from "./pages/detail";
import { Home } from "./pages/home";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};
