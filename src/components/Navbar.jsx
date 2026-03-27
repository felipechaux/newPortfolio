import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu, astronaut } from '../assets';
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';

const LangToggle = ({ lang, setLang }) => (
  <div
    style={{
      display: 'flex',
      background: 'rgba(255,255,255,0.07)',
      borderRadius: '8px',
      padding: '3px',
      gap: '2px',
    }}
  >
    {['en', 'es'].map((l) => (
      <button
        key={l}
        onClick={() => setLang(l)}
        style={{
          padding: '4px 11px',
          borderRadius: '6px',
          fontSize: '11px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          letterSpacing: '1px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: lang === l ? 'linear-gradient(135deg, #7c3aed, #6366f1)' : 'transparent',
          color: lang === l ? '#fff' : '#9999a1',
        }}
      >
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const { lang, setLang } = useLang();
  const tr = pt[lang].nav;

  const location = typeof window !== 'undefined' ? window.location : { pathname: '/' };
  const currentPath = location.pathname;

  const navLabels = {
    about: tr.about,
    projects: tr.projects,
    skills: tr.skills,
    work: tr.work,
    contact: tr.contact,
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-2 fixed top-0 z-20 xxs:h-[12vh]`}
      style={{
        background: 'rgba(5,8,22,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => { setActive(''); window.scrollTo(0, 0); }}>
          <img
            src={astronaut}
            alt="logo"
            className="sm:w-[46px] sm:h-[46px] w-[40px] h-[40px] object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <h2 style={{ color: '#d4d4d8', fontFamily: 'Mova, sans-serif', letterSpacing: '3px', fontSize: '16px' }}>
            🄵🄴🄻🄸🄿🄴
          </h2>
        </Link>

        {/* Desktop nav */}
        <ul className="list-none hidden sm:flex flex-row gap-10 mt-2 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? 'text-timberWolf' : 'text-taupe'
                } hover:text-timberWolf text-[17px] font-medium font-mova
                uppercase tracking-[3px] cursor-pointer nav-links transition-colors`}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{navLabels[nav.id] || nav.title}</a>
            </li>
          ))}
          {/* Mentoring link */}
          <li className="cursor-pointer">
            <Link
              to="/mentoring"
              className="font-mova text-[17px] font-medium uppercase tracking-[3px] transition-opacity hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {tr.mentoring}
            </Link>
          </li>
          {currentPath !== '/' && (
            <li className="text-taupe hover:text-timberWolf text-[17px] font-medium font-mova uppercase tracking-[3px] cursor-pointer nav-links transition-colors">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          )}
          <li>
            <LangToggle lang={lang} setLang={setLang} />
          </li>
        </ul>

        {/* Mobile menu */}
        <div className="sm:hidden flex flex-1 w-screen justify-end items-center">
          {toggle ? (
            <div
              className={`p-6 absolute top-0 left-0 w-screen h-[100vh] z-10 menu ${toggle ? 'menu-open' : 'menu-close'}`}
              style={{ background: 'rgba(5,8,22,0.98)' }}
            >
              <div className="flex justify-between items-center">
                <LangToggle lang={lang} setLang={setLang} />
                <img src={close} alt="close" className="w-[22px] h-[22px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)} />
              </div>
              <ul className="list-none flex flex-col items-start justify-end mt-[10rem] -ml-[35px]">
                {navLinks.map((nav) => (
                  <li
                    id={nav.id}
                    key={nav.id}
                    className={`${active === nav.title ? 'text-timberWolf' : 'text-taupe'
                      } text-[88px] font-bold font-arenq uppercase tracking-[1px] cursor-pointer`}
                    onClick={() => { setToggle(!toggle); setActive(nav.title); }}>
                    <a href={`#${nav.id}`}>{navLabels[nav.id] || nav.title}</a>
                  </li>
                ))}
                <li className="text-[88px] font-bold font-arenq uppercase tracking-[1px] cursor-pointer">
                  <Link
                    to="/mentoring"
                    onClick={() => setToggle(false)}
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {tr.mentoring}
                  </Link>
                </li>
                {currentPath !== '/' && (
                  <li className="text-taupe hover:text-timberWolf text-[44px] font-bold font-arenq uppercase tracking-[1px] cursor-pointer mt-8">
                    <Link to="/privacy-policy" onClick={() => setToggle(false)}>Privacy Policy</Link>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <img src={menu} alt="menu" className="w-[34px] h-[34px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
