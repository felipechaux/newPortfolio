import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Projects,
} from './components';
import PrivacyPolicy from './components/PrivacyPolicy';
import DadoMatch from './components/DadoMatch';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative z-0">
              <div>
                <Navbar />
                <Hero />
              </div>
              <div className="bg-about bg-cover bg-center bg-no-repeat">
                <About />
              </div>
              <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
                <Tech />
              </div>
              <Projects />
              <div
                className="bg-experience bg-cover bg-center bg-no-repeat 
                  rounded-tl-[150px] rounded-br-[150px]">
                <div
                  className="bg-experienceLight bg-cover bg-center 
                  bg-no-repeat rounded-tl-[150px] rounded-br-[130px]">
                  <Experience />
                </div>
              </div>
              <div className="relative z-0">
                <Contact />
              </div>
            </div>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Navbar />
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/dadomatch"
          element={<DadoMatch />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
