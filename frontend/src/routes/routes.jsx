// Ce fichier est généré automatiquement
import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About/index.jsx";
import Discover from "../pages/Discover/index.jsx";
import Home from "../pages/Home/index.jsx";
import Registration from "../pages/Registration/index.jsx";

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/about" element={<About />} />
  <Route path="/discover" element={<Discover />} />
  <Route path="/home" element={<Home />} />
  <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}
