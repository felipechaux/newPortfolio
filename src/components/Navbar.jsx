import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { astronaut } from '../assets';
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]';

const LangToggle = ({ lang, setLang }) => (
  <div className="flex w-fit gap-0.5 rounded-lg bg-white/[0.07] p-[3px]" role="group" aria-label="Language">
    {['en', 'es'].map((l) => (
      <button
        key={l}
        type="button"
        aria-pressed={lang === l}
        onClick={() => setLang(l)}
        className={`min-h-[32px] rounded-md px-3 font-poppins text-[11px] font-bold tracking-[1px] transition-colors duration-200 ${focusRing} ${
          lang === l
            ? 'bg-gradient-to-br from-violet-600 to-indigo-500 text-white'
            : 'text-taupe hover:text-timberWolf'
        }`}>
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

const MenuIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>
);

// Highlights the nav link of the section currently in view.
const useActiveSection = (ids, enabled) => {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!enabled) return undefined;
    const idOf = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(idOf.get(e.target));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const anchor = document.getElementById(id);
      // SectionWrapper puts the id on a span; observe its section instead.
      const target = anchor?.closest('section') ?? anchor;
      if (target) {
        idOf.set(target, id);
        observer.observe(target);
      }
    });
    return () => observer.disconnect();
  }, [ids, enabled]);
  return active;
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const tr = pt[lang].nav;
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const active = useActiveSection(
    React.useMemo(() => navLinks.map((n) => n.id), []),
    isHome
  );

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const href = (id) => (isHome ? `#${id}` : `/#${id}`);
  const isActive = (id) => active === id;

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-3 border-b border-white/[0.07] bg-[rgba(5,8,22,0.88)] backdrop-blur-[14px]`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className={`flex items-center gap-3 rounded-lg ${focusRing}`}
          onClick={() => window.scrollTo(0, 0)}>
          <img
            src={astronaut}
            alt=""
            className="h-10 w-10 object-contain brightness-0 invert"
          />
          <span className="font-poppins text-[15px] font-semibold tracking-wide text-timberWolf">
            Felipe Chaux
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex list-none items-center gap-8">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={href(nav.id)}
                aria-current={isActive(nav.id) ? 'true' : undefined}
                className={`relative whitespace-nowrap rounded font-poppins text-[14px] font-medium transition-colors duration-200 ${focusRing} ${
                  isActive(nav.id) ? 'text-white' : 'text-taupe hover:text-timberWolf'
                }`}>
                {tr[nav.id] || nav.title}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-violet-400 transition-all duration-300 ${
                    isActive(nav.id) ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/mentoring"
              className={`whitespace-nowrap rounded-lg border border-violet-400/40 bg-violet-500/10 px-4 py-2 font-poppins text-[14px] font-semibold text-violet-200 transition-colors duration-200 hover:bg-violet-500/20 ${focusRing}`}>
              {tr.mentoring}
            </Link>
          </li>
          <li>
            <LangToggle lang={lang} setLang={setLang} />
          </li>
        </ul>

        {/* Mobile */}
        <button
          type="button"
          className={`md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-timberWolf ${focusRing}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}>
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-full z-10 flex h-[calc(100dvh-100%)] flex-col bg-[#050816] px-6 pb-10 pt-8">
          <ul className="flex flex-col gap-2">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={href(nav.id)}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg py-3 font-poppins text-[28px] font-bold transition-colors ${focusRing} ${
                    isActive(nav.id) ? 'text-white' : 'text-taupe'
                  }`}>
                  {tr[nav.id] || nav.title}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/mentoring"
                onClick={() => setOpen(false)}
                className={`block rounded-lg py-3 font-poppins text-[28px] font-bold text-violet-300 ${focusRing}`}>
                {tr.mentoring}
              </Link>
            </li>
          </ul>
          <div className="mt-auto">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
