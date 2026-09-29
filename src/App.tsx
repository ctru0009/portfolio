import "./App.css";
import About from "./components/about/About";
import Footer from "./components/common/Footer";
import Contact from "./components/contact/Contact";
import { MacWindow, MetaBar } from "./components/mac/MacWindow";
import MenuBar from "./components/mac/MenuBar";
import StatusBar from "./components/mac/StatusBar";
import Projects from "./components/projects/Projects";
import Sidebar from "./components/sidebar/Sidebar";
import Skills from "./components/skills/Skills";
import Work from "./components/works/Work";

function App() {
  return (
    <div>
      <MenuBar />
      <div className="mx-auto max-w-[1120px] px-4 pb-2 pt-6 sm:px-6 min-[800px]:pb-36">
        <main id="home">
          <MacWindow title="congchuongtruong.net — Software Engineer">
            <MetaBar
              left="SOFTWARE ENGINEER — APPLIED AI"
              right="OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES"
            />
            <div className="grid grid-cols-1 min-[800px]:grid-cols-[310px_1fr]">
              <Sidebar />
              <div className="min-w-0">
                <About />
                <Skills />
                <Work />
                <Projects />
                <Contact />
              </div>
            </div>
            <StatusBar
              left="2026 · Cong Chuong Truong"
              right="React · Vite · GitHub Pages — no trackers"
            />
          </MacWindow>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
