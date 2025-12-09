import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span>Shane Anne Cosay</span>
      </div>
      <div className="navbar-right">
        <a href="#about" onClick={() => handleScroll("about")}>About</a>
        <a href="#projects" onClick={() => handleScroll("projects")}>Projects</a>
        <a href="#education" onClick={() => handleScroll("education")}>Education</a>
      </div>
    </nav>
  );
};

export default Navbar;
