import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Translator from "./components/Translator";
import Contacts from "./components/Contacts";


function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Translator />
      <Projects />
      <Education />
      <Contacts/>
    </div>
  );
}

export default App;
