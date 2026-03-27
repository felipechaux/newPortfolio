import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';
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
import DadoMatchPrivacy from './components/DadoMatchPrivacy';
import Mentoring from './components/Mentoring';

const App = () => {
  return (
    <LanguageProvider>
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
              <div style={{ background: '#050816' }}>
                <About />
              </div>
              <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
                <Tech />
              </div>
              <Projects />
              <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Experience />
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
        <Route
          path="/dadomatch/privacy"
          element={<DadoMatchPrivacy />}
        />
        <Route
          path="/mentoring"
          element={<Mentoring />}
        />
      </Routes>
      <Analytics />
    </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
