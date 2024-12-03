import "./App.css";
import Hero from "./components/hero/Hero";
import NavBar from "./components/common/NavBar";
import Skills from "./components/skills/Skills";
import About from "./components/about/About";
import ScrollProgress from "./components/common/ScrollProgress";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/Footer";
import Projects from "./components/projects/Projects";

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
