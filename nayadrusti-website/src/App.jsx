import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Pages/Footer/Footer";

import Home from "./Pages/Home/Home";
import AboutCompany from "./Pages/AboutCompany/AboutCompany";
import Services from "./Pages/Services/Services";
import Industry from "./Pages/Industry/Industry";
import Stories from "./Pages/Stories/Stories";
import Clients from "./Pages/Clients/Clients";
import Contact from "./Pages/Contact/Contact";
import { scrollToSection } from "./utils/scrollToSection";
import About from "./Pages/About/About";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollTo");
    if (location.pathname === "/" && sectionId) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => scrollToSection(sectionId), 200); // adjust delay as needed
    }
  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <section id="about">
                <AboutCompany />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="industry">
                <Industry />
              </section>
              <section id="projects">
                <Stories />
              </section>
              <section id="clients">
                <Clients />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
