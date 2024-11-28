import "./App.css";
import Hero from "./Components/Hero";
import NavBar from "./Components/NavBar";
import Skills from "./Components/Skills";
import About from "./Components/About";
import ScrollProgress from "./Components/ScrollProgress";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Projects from "./Components/Projects";

function App() {
  return (
    <div>
      <ScrollProgress />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
