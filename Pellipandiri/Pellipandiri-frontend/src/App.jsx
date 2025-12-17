import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Services from "./Pages/Services/Services";
import Gallery from "./Pages/Gallery/Gallery";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Pages/Footer/Footer";

import LoginSignup from "./Pages/LoginSignup/LoginSignup"; // 👈 NEW
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

// 🔥 Renamed to avoid conflict
const MainLayout = () => {
  return (
    <>
      <div className="headerContainer">
        <Header />
        <section id="home">
          <Home />
        </section>
      </div>

      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Login / Signup page WITHOUT header/footer */}
      <Route path="/auth" element={<LoginSignup />} />

      {/* Main website with header/footer */}
      <Route path="/" element={<MainLayout />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
};

export default App;
