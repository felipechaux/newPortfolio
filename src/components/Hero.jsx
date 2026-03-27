import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { space } from '../assets';
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';

const Hero = () => {
  const { lang } = useLang();
  const tr = pt[lang].hero;

  const stats = [
    { num: '8+', label: tr.statsYears },
    { num: '10+', label: tr.statsApps },
    { num: '3',  label: tr.statsPlatforms },
  ];

  return (
    <>
      {/* Space background + dark overlay */}
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img src={space} alt="space background" className="w-full h-full object-cover" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,8,22,0.88) 0%, rgba(5,8,22,0.70) 100%)',
        }} />
      </div>

      <section className="relative flex items-center w-full h-screen overflow-hidden">
        <div className={`${styles.paddingX} max-w-7xl mx-auto relative z-10 w-full`}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{
              display: 'inline-block', marginBottom: '20px',
              background: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.3)',
              color: '#a78bfa',
              padding: '6px 18px', borderRadius: '100px',
              fontSize: '13px', fontFamily: 'Poppins, sans-serif',
              fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              {tr.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-poppins font-black text-timberWolf"
            style={{ fontSize: 'clamp(44px, 7vw, 86px)', lineHeight: 1.05, marginBottom: '16px' }}
          >
            Hi, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #818cf8, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Felipe Chaux
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-taupe font-poppins"
            style={{ fontSize: 'clamp(17px, 2vw, 24px)', marginBottom: '40px' }}
          >
            {tr.subtitle}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex gap-10 flex-wrap mb-12"
          >
            {stats.map((s) => (
              <div key={s.label} style={{
                paddingRight: '32px',
                borderRight: '1px solid rgba(255,255,255,0.08)',
              }}
                className="last:border-r-0 last:pr-0"
              >
                <p className="font-poppins font-black text-timberWolf" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1 }}>
                  {s.num}
                </p>
                <p className="text-taupe font-poppins text-[14px] mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="#projects"
              className="font-poppins font-semibold text-[15px] hover:opacity-80 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                color: '#fff', padding: '13px 30px', borderRadius: '11px',
                textDecoration: 'none', boxShadow: '0 4px 22px rgba(124,58,237,0.38)',
              }}
            >
              {tr.cta}
            </a>
            <Link
              to="/mentoring"
              className="font-poppins font-semibold text-[15px] hover:border-white/40 transition-colors"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#d4d4d8', padding: '13px 30px', borderRadius: '11px',
                textDecoration: 'none',
              }}
            >
              {tr.ctaMentoring}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-purple-500/40 flex justify-center items-start p-2">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                className="w-3 h-3 rounded-full mb-1"
                style={{ background: '#a78bfa' }}
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
