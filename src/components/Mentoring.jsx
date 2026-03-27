import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { astronaut } from '../assets';
import felipeImg from '../assets/personal/felipe.png';

/* ─── Translations ───────────────────────────────────────────── */
const t = {
  en: {
    nav: {
      back: '← Portfolio',
      cta: 'Book a Free Call',
    },
    hero: {
      badge: 'Senior Mobile Developer · Android · Flutter · KMP',
      intro: "Hi, I'm",
      name: 'Felipe Chaux',
      title1: 'Stop guessing.',
      title2: 'Start shipping.',
      subtitle: "I've spent 8 years building native Android apps with Kotlin and cross-platform apps with Flutter and Kotlin Multiplatform — from Disney Parks to fintech platforms with millions of users. Now I help junior mobile developers skip the confusion and learn the way professionals actually build.",
      ctaPrimary: 'Book a Free Intro Call →',
      ctaSecondary: 'See what I offer',
    },
    forWhom: {
      eyebrow: 'Is this for you?',
      title: "This is for the developer who's",
      highlight: 'tired of going in circles.',
      items: [
        { icon: '😵', text: "You've watched 20 tutorials but still don't know how to structure a real app" },
        { icon: '📱', text: "You're writing Kotlin or Flutter but your architecture falls apart when the app grows" },
        { icon: '🤔', text: "You're torn between native Android, Flutter, and KMP — and don't know which to bet on" },
        { icon: '🚀', text: 'You want to break into mobile dev or make the leap from junior to mid/senior' },
        { icon: '🤖', text: "You use AI tools to write code but deep down you're not sure what it's actually doing — or why" },
      ],
    },
    offerings: {
      eyebrow: 'What I offer',
      title: 'Four ways to work together.',
      items: [
        {
          icon: '🎯',
          title: '1:1 Mentoring Sessions',
          desc: 'Weekly 60-min video calls. We review your code, map your learning path, and tackle real architecture decisions — no generic advice, just what applies to your situation.',
        },
        {
          icon: '🔍',
          title: 'Code Reviews',
          desc: "Submit your project and get the kind of feedback you'd receive in a senior dev PR review. I'll tell you what's production-ready and what would block a merge at a real company.",
        },
        {
          icon: '🧭',
          title: 'Career Guidance',
          desc: "Portfolio review, interview prep, and a strategy for landing your first or next mobile dev role. I'll share what actually gets you hired, based on 8+ years in the industry.",
        },
        {
          icon: '👥',
          title: 'Cohort Program',
          desc: 'Small groups of 4–6 developers going through Android + KMP fundamentals together over 8 structured weeks. Learn better with peers, stay accountable, pay less.',
        },
      ],
    },
    credentials: {
      eyebrow: 'Why learn from me',
      title: "I've built the apps",
      highlight: "you're trying to build.",
      subtitle: "I don't teach from slides. I teach from 8 years of real production code, real deadlines, and real teams across multiple countries and industries.",
      items: [
        {
          icon: '🏰',
          title: 'Shipped for Disney Parks',
          desc: "I built features in the PlayDisney app used by millions of visitors at Disney Parks across the USA. I'll show you what production-grade code looks like at that scale — and how to write it.",
        },
        {
          icon: '🛡️',
          title: 'Insurance & Public Safety Apps',
          desc: 'Built the Kanguro Insurance app (pet & health insurance for the Latino community in the USA, iOS + Android with KMP) and the ACTPOL app for the Police of Curaçao — a license plate detection system used by real officers in the field. Apps where bugs have real consequences.',
        },
        {
          icon: '💳',
          title: 'Fintech & E-commerce at Scale',
          desc: "Developed and maintained TodoPago (digital wallet, Argentina), Credibanco Smartpost, and the Easy.cl retail app for one of Chile's largest chains. Real transactions, real users, real pressure.",
        },
        {
          icon: '☕',
          title: 'Consumer Apps People Use Every Day',
          desc: "Built the Tostao' app — one of Colombia's most popular coffee chains — and the Horneo delivery app from scratch. These aren't side projects; they're apps people open every morning.",
        },
        {
          icon: '🔗',
          title: 'Kotlin Multiplatform in Production',
          desc: 'I architected a KMP integration achieving 30% code sharing across iOS and Android, distributed as a Swift Package — not a tutorial project, a live production system with real users.',
        },
        {
          icon: '🌍',
          title: '8 Years Across the Full Mobile Stack',
          desc: 'Kotlin, Swift, Flutter. Android, iOS, cross-platform. Fintech, insurance, e-commerce, gaming, public safety. Teams in Colombia, Chile, Argentina, and Australia. I teach from experience, not from slides.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What colleagues say.',
      subtitle: "Real recommendations from engineers and managers I've worked with.",
      contexts: {
        sameTeam: 'Worked on the same team',
        managed: 'Managed Felipe directly',
        flutter: 'Collaborated on a Flutter project',
      },
    },
    cta: {
      title: 'Ready to stop watching tutorials\nand start building real apps?',
      subtitle: "The intro call is 100% free. 15 minutes. We talk about where you are, where you want to go, and whether we're a good fit.",
      button: 'Book My Free Intro Call →',
    },
    footer: {
      text: '© 2026 Felipe Chaux · Senior Mobile Developer ·',
      link: 'Back to Portfolio',
    },
  },
  es: {
    nav: {
      back: '← Portafolio',
      cta: 'Reservar llamada gratis',
    },
    hero: {
      badge: 'Desarrollador Mobile Senior · Android · Flutter · KMP',
      intro: 'Hola, soy',
      name: 'Felipe Chaux',
      title1: 'Deja de adivinar.',
      title2: 'Empieza a lanzar.',
      subtitle: 'Llevo 8 años construyendo apps nativas para Android con Kotlin y apps multiplataforma con Flutter y Kotlin Multiplatform — desde Disney Parks hasta plataformas fintech con millones de usuarios. Ahora ayudo a desarrolladores junior a saltarse la confusión y aprender como lo hacen los profesionales.',
      ctaPrimary: 'Reservar llamada gratuita →',
      ctaSecondary: 'Ver qué ofrezco',
    },
    forWhom: {
      eyebrow: '¿Es esto para ti?',
      title: 'Esto es para el desarrollador que está',
      highlight: 'cansado de dar vueltas en círculos.',
      items: [
        { icon: '😵', text: 'Has visto 20 tutoriales pero aún no sabes cómo estructurar una app real' },
        { icon: '📱', text: 'Escribes Kotlin o Flutter pero tu arquitectura se cae cuando la app crece' },
        { icon: '🤔', text: 'Dudas entre Android nativo, Flutter y KMP — y no sabes en cuál apostar' },
        { icon: '🚀', text: 'Quieres entrar al mundo mobile o dar el salto de junior a mid/senior' },
        { icon: '🤖', text: 'Usas IA para escribir código pero en el fondo no sabes bien qué está haciendo — ni por qué' },
      ],
    },
    offerings: {
      eyebrow: 'Qué ofrezco',
      title: 'Cuatro formas de trabajar juntos.',
      items: [
        {
          icon: '🎯',
          title: 'Sesiones 1:1 de Mentoría',
          desc: 'Videollamadas semanales de 60 min. Revisamos tu código, trazamos tu ruta de aprendizaje y tomamos decisiones reales de arquitectura — sin consejos genéricos, solo lo que aplica a tu situación.',
        },
        {
          icon: '🔍',
          title: 'Revisiones de Código',
          desc: 'Envía tu proyecto y recibe el mismo feedback que obtendrías en una revisión de PR de un desarrollador senior. Te diré qué está listo para producción y qué bloquearía un merge en una empresa real.',
        },
        {
          icon: '🧭',
          title: 'Orientación de Carrera',
          desc: 'Revisión de portafolio, preparación para entrevistas y estrategia para conseguir tu primer o próximo empleo como mobile dev. Te comparto lo que realmente funciona, basado en 8+ años de industria.',
        },
        {
          icon: '👥',
          title: 'Programa en Cohorte',
          desc: 'Grupos pequeños de 4–6 desarrolladores trabajando juntos los fundamentos de Android + KMP durante 8 semanas estructuradas. Aprende mejor con compañeros, mantente responsable y paga menos.',
        },
      ],
    },
    credentials: {
      eyebrow: 'Por qué aprender conmigo',
      title: 'He construido las apps',
      highlight: 'que tú estás intentando construir.',
      subtitle: 'No enseño desde diapositivas. Enseño desde 8 años de código real en producción, fechas límite reales y equipos reales en múltiples países e industrias.',
      items: [
        {
          icon: '🏰',
          title: 'Publicado para Disney Parks',
          desc: 'Construí funcionalidades en la app PlayDisney usada por millones de visitantes en Disney Parks de EE.UU. Te mostraré cómo se ve el código de producción a esa escala — y cómo escribirlo.',
        },
        {
          icon: '🛡️',
          title: 'Apps de Seguros y Seguridad Pública',
          desc: 'Desarrollé la app Kanguro Insurance (seguros de mascotas y salud para la comunidad latina en EE.UU., iOS + Android con KMP) y la app ACTPOL para la Policía de Curazao — sistema de detección de placas usado por oficiales reales en campo. Apps donde los bugs tienen consecuencias reales.',
        },
        {
          icon: '💳',
          title: 'Fintech y E-commerce a Escala',
          desc: 'Desarrollé y mantuve TodoPago (billetera digital, Argentina), Credibanco Smartpost y la app de Easy.cl para una de las cadenas más grandes de Chile. Transacciones reales, usuarios reales, presión real.',
        },
        {
          icon: '☕',
          title: 'Apps de Consumo que la Gente Usa Cada Día',
          desc: "Construí la app de Tostao' — una de las cadenas de café más populares de Colombia — y la app de Horneo desde cero. No son proyectos secundarios; son apps que la gente abre cada mañana.",
        },
        {
          icon: '🔗',
          title: 'Kotlin Multiplatform en Producción',
          desc: 'Arquitecté una integración KMP que logró 30% de código compartido entre iOS y Android, distribuida como Swift Package — no un proyecto de tutorial, sino un sistema real con usuarios reales.',
        },
        {
          icon: '🌍',
          title: '8 Años en Todo el Stack Mobile',
          desc: 'Kotlin, Swift, Flutter. Android, iOS, multiplataforma. Fintech, seguros, e-commerce, gaming, seguridad pública. Equipos en Colombia, Chile, Argentina y Australia. Enseño desde la experiencia, no desde diapositivas.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonios',
      title: 'Lo que dicen mis colegas.',
      subtitle: 'Recomendaciones reales de ingenieros y managers con quienes he trabajado.',
      contexts: {
        sameTeam: 'Trabajaron en el mismo equipo',
        managed: 'Fue manager directo de Felipe',
        flutter: 'Colaboraron en un proyecto Flutter',
      },
    },
    cta: {
      title: '¿Listo para dejar de ver tutoriales\ny empezar a construir apps reales?',
      subtitle: 'La llamada introductoria es 100% gratuita. 15 minutos. Hablamos de dónde estás, adónde quieres llegar y si encajamos bien.',
      button: 'Reservar mi llamada gratuita →',
    },
    footer: {
      text: '© 2026 Felipe Chaux · Desarrollador Mobile Senior ·',
      link: 'Volver al Portafolio',
    },
  },
};

/* ─── Testimonials data (quotes stay in English — they're authentic) ── */
const testimonials = [
  {
    quote: "Felipe has been a standout developer, delivering high-quality results across native iOS and Android. He played a pivotal role in accelerating our roadmap by championing Kotlin Multiplatform, which significantly streamlined our development and logic-sharing. He combines technical expertise with a proactive, problem-solving mindset — highly receptive to feedback, turning it into immediate improvements.",
    name: 'Yesid Sanabria',
    role: 'Sr Software Engineer · Angular, React, .Net, Azure',
    contextKey: 'sameTeam',
  },
  {
    quote: "Felipe joined thanks to his pretty unique ability in the market to develop both native iOS and Android apps at the same time. Over time, he gradually introduced Kotlin Multiplatform successfully to write shared logic in a reusable way, further reducing the cost of developing new features. His attention to detail is a great strength that helps native apps really shine.",
    name: 'Georg Hartmann',
    role: 'Head of Product & Technology · Startups, LLMs',
    contextKey: 'managed',
  },
  {
    quote: "Felipe is a mobile developer with strong technical skills and a solid focus on delivering functional, user-centered solutions. He has shown commitment, proactivity, and excellent teamwork abilities. His collaborative attitude and willingness to take on new challenges make him a valuable member of any development team.",
    name: 'Keiler Guardo Herrera',
    role: 'Software Engineer · Flutter, Node.js, Co-founder @Keppli',
    contextKey: 'sameTeam',
  },
  {
    quote: "Working with Felipe on our Flutter mobile app project has been a great experience. His deep understanding of Flutter's capabilities and his meticulous attention to detail have significantly contributed to our app's features. Felipe consistently delivers high-quality code and brings innovative solutions to the table.",
    name: 'Reynel Francisco Cáceres',
    role: 'Senior BI Engineer · Globant',
    contextKey: 'flutter',
  },
  {
    quote: "Excellent committed professional with great ability to solve problems under pressure.",
    name: 'Daniel Quiroz Toledo',
    role: 'Senior iOS Developer · Cencosud',
    contextKey: 'sameTeam',
  },
];

/* ─── Animation util ─────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
        visible: {
          opacity: 1, y: 0, filter: 'blur(0px)',
          transition: { duration: 0.7, delay, ease: [0.21, 0.45, 0.32, 0.9] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Calendly popup ─────────────────────────────────────────── */
const CALENDLY_URL = 'https://calendly.com/felchax/30min';

const openCalendly = (e) => {
  e.preventDefault();
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }
};

/* ─── Sub-components ─────────────────────────────────────────── */
const OfferingCard = ({ icon, title, desc, delay }) => (
  <FadeUp delay={delay} className="flex-1 min-w-[260px] max-w-[320px]">
    <div
      className="hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 h-full"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '16px',
        padding: '32px 28px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ fontSize: '2.4rem' }}>{icon}</span>
      <h3 className="text-timberWolf font-bold text-[19px] font-poppins">{title}</h3>
      <p className="text-taupe text-[15px] font-poppins leading-relaxed">{desc}</p>
    </div>
  </FadeUp>
);

const CredentialCard = ({ icon, title, desc, delay }) => (
  <FadeUp delay={delay}>
    <div
      className="flex gap-5 items-start"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(99,102,241,0.04) 100%)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: '16px',
        padding: '28px',
      }}
    >
      <span style={{ fontSize: '2rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <h3 className="text-timberWolf font-bold text-[18px] font-poppins mb-2">{title}</h3>
        <p className="text-taupe text-[15px] font-poppins leading-relaxed">{desc}</p>
      </div>
    </div>
  </FadeUp>
);

const TestimonialCard = ({ quote, name, role, contextKey, contexts, delay }) => (
  <FadeUp delay={delay} className="flex-1 min-w-[280px]">
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
      }}
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: '#a78bfa', fontSize: '16px' }}>★</span>
        ))}
      </div>
      <p className="text-taupe font-poppins text-[15px] italic leading-relaxed flex-1">
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.15))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', flexShrink: 0,
          }}
        >
          👤
        </div>
        <div>
          <p className="text-timberWolf font-poppins font-semibold text-[14px]">{name}</p>
          <p className="text-taupe font-poppins text-[12px]">{role}</p>
          <p className="font-poppins text-[11px]" style={{ color: '#7c3aed', marginTop: '2px' }}>
            LinkedIn · {contexts[contextKey]}
          </p>
        </div>
      </div>
    </div>
  </FadeUp>
);

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
          padding: '5px 13px',
          borderRadius: '6px',
          fontSize: '12px',
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

/* ─── Page ───────────────────────────────────────────────────── */
const Mentoring = () => {
  const [lang, setLang] = useState('es');
  const tr = t[lang];

  useEffect(() => {
    document.title = 'Felipe Chaux | Mobile Dev Mentoring — Android, Flutter & KMP';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Learn Android (Kotlin), Flutter, and Kotlin Multiplatform from a Senior Mobile Developer with 8+ years shipping production apps. 1:1 mentoring, code reviews, and career guidance.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://chauxdev.co/mentoring');
    return () => {
      document.title = 'Felipe Chaux | Senior Mobile Developer — Android, Flutter & KMP';
      if (desc) desc.setAttribute('content', 'Senior Mobile Developer with 8+ years shipping Android (Kotlin), Flutter, and Kotlin Multiplatform apps. Built for Disney Parks, fintech platforms, and more.');
      if (canonical) canonical.setAttribute('href', 'https://chauxdev.co/');
    };
  }, []);

  return (
    <div style={{ background: '#050816', minHeight: '100vh', color: '#e6e6e9' }}>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(5,8,22,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '0 2rem',
          height: '70px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src={astronaut}
            alt="logo"
            style={{ width: 38, height: 38, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
          <span
            className="hidden sm:inline"
            style={{
              color: '#d4d4d8', fontFamily: 'Mova, sans-serif',
              fontSize: '16px', letterSpacing: '3px',
            }}
          >
            🄵🄴🄻🄸🄿🄴
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <LangToggle lang={lang} setLang={setLang} />
          <Link
            to="/"
            className="text-taupe hover:text-timberWolf transition-colors font-poppins text-[14px] hidden sm:block"
          >
            {tr.nav.back}
          </Link>
          <a
            href="#" onClick={openCalendly}
            className="hover:opacity-90 transition-opacity"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
              color: '#fff', padding: '9px 20px', borderRadius: '9px',
              fontSize: '13px', fontFamily: 'Poppins, sans-serif',
              fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            {tr.nav.cta}
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: '130px', paddingBottom: '80px',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '5%', left: '30%', transform: 'translateX(-50%)',
            width: '700px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className={`${styles.paddingX} max-w-6xl mx-auto relative z-10`}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <FadeUp>
                <span
                  style={{
                    display: 'inline-block', marginBottom: '24px',
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px solid rgba(124,58,237,0.28)',
                    color: '#a78bfa',
                    padding: '7px 20px', borderRadius: '100px',
                    fontSize: '12px', fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                  }}
                >
                  {tr.hero.badge}
                </span>
              </FadeUp>
              <FadeUp delay={0.08}>
                <p className="font-poppins text-taupe text-[17px] mb-1">
                  {tr.hero.intro}{' '}
                  <span
                    className="font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {tr.hero.name}
                  </span>
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1
                  className="font-poppins font-black"
                  style={{ fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: 1.1, marginBottom: '24px' }}
                >
                  {tr.hero.title1}<br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #a78bfa, #818cf8, #60a5fa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {tr.hero.title2}
                  </span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p
                  className="font-poppins text-taupe"
                  style={{ fontSize: 'clamp(15px, 1.6vw, 19px)', lineHeight: 1.75, marginBottom: '36px' }}
                >
                  {tr.hero.subtitle}
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                  <a
                    href="#" onClick={openCalendly}
                    className="hover:-translate-y-0.5 transition-transform"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                      color: '#fff', padding: '15px 36px', borderRadius: '13px',
                      fontSize: '16px', fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700, textDecoration: 'none',
                      boxShadow: '0 4px 28px rgba(124,58,237,0.38)',
                    }}
                  >
                    {tr.hero.ctaPrimary}
                  </a>
                  <a
                    href="#offerings"
                    className="hover:border-white/40 transition-colors"
                    style={{
                      display: 'inline-block',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: '#d4d4d8', padding: '15px 36px', borderRadius: '13px',
                      fontSize: '16px', fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    {tr.hero.ctaSecondary}
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Photo */}
            <FadeUp delay={0.2} className="flex-shrink-0">
              <div style={{ position: 'relative' }}>
                {/* Purple glow behind image */}
                <div style={{
                  position: 'absolute', inset: '-2px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #7c3aed55, #6366f133, #060a1400)',
                  zIndex: 0,
                }} />
                <img
                  src={felipeImg}
                  alt="Felipe Chaux — Senior Mobile Developer"
                  loading="eager"
                  decoding="async"
                  width={440}
                  height={370}
                  style={{
                    width: 'clamp(280px, 38vw, 440px)',
                    height: 'auto',
                    borderRadius: '22px',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ─────────────────────────────── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className={`${styles.paddingX} max-w-5xl mx-auto`}>
          <FadeUp>
            <p className="text-taupe uppercase tracking-widest text-[12px] font-semibold font-poppins mb-3">
              {tr.forWhom.eyebrow}
            </p>
            <h2
              className="font-poppins font-black text-timberWolf"
              style={{ fontSize: 'clamp(26px, 4vw, 46px)', marginBottom: '48px', lineHeight: 1.2 }}
            >
              {tr.forWhom.title}<br />
              <span style={{ color: '#a78bfa' }}>{tr.forWhom.highlight}</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tr.forWhom.items.map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px', padding: '22px 26px',
                    display: 'flex', gap: '16px', alignItems: 'flex-start',
                  }}
                >
                  <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{item.icon}</span>
                  <p className="text-timberWolf font-poppins text-[15px] leading-relaxed">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFERINGS ───────────────────────────────────── */}
      <section
        id="offerings"
        style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className={`${styles.paddingX} max-w-6xl mx-auto`}>
          <FadeUp>
            <p className="text-taupe uppercase tracking-widest text-[12px] font-semibold font-poppins mb-3">
              {tr.offerings.eyebrow}
            </p>
            <h2
              className="font-poppins font-black text-timberWolf"
              style={{ fontSize: 'clamp(26px, 4vw, 46px)', marginBottom: '48px' }}
            >
              {tr.offerings.title}
            </h2>
          </FadeUp>
          <div className="flex flex-wrap gap-6">
            {tr.offerings.items.map((o, i) => (
              <OfferingCard key={i} {...o} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ─────────────────────────────────── */}
      <section
        style={{
          padding: '80px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.012)',
        }}
      >
        <div className={`${styles.paddingX} max-w-5xl mx-auto`}>
          <FadeUp>
            <p className="text-taupe uppercase tracking-widest text-[12px] font-semibold font-poppins mb-3">
              {tr.credentials.eyebrow}
            </p>
            <h2
              className="font-poppins font-black text-timberWolf"
              style={{ fontSize: 'clamp(26px, 4vw, 46px)', marginBottom: '16px', lineHeight: 1.2 }}
            >
              {tr.credentials.title}<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {tr.credentials.highlight}
              </span>
            </h2>
            <p
              className="text-taupe font-poppins text-[16px] leading-relaxed mb-12"
              style={{ maxWidth: '560px' }}
            >
              {tr.credentials.subtitle}
            </p>
          </FadeUp>
          <div className="flex flex-col gap-5">
            {tr.credentials.items.map((c, i) => (
              <CredentialCard key={i} {...c} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className={`${styles.paddingX} max-w-5xl mx-auto`}>
          <FadeUp>
            <p className="text-taupe uppercase tracking-widest text-[12px] font-semibold font-poppins mb-3">
              {tr.testimonials.eyebrow}
            </p>
            <h2
              className="font-poppins font-black text-timberWolf"
              style={{ fontSize: 'clamp(26px, 4vw, 46px)', marginBottom: '12px' }}
            >
              {tr.testimonials.title}
            </h2>
            <p className="text-taupe font-poppins text-[15px] mb-12">
              {tr.testimonials.subtitle}
            </p>
          </FadeUp>
          <div className="flex flex-wrap gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.name}
                {...t}
                contexts={tr.testimonials.contexts}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section
        style={{
          padding: '110px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className={`${styles.paddingX} max-w-4xl mx-auto text-center relative z-10`}>
          <FadeUp>
            <h2
              className="font-poppins font-black text-timberWolf"
              style={{ fontSize: 'clamp(28px, 5vw, 56px)', marginBottom: '20px', lineHeight: 1.2 }}
            >
              {tr.cta.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
              ))}
            </h2>
            <p
              className="text-taupe font-poppins text-[17px] leading-relaxed"
              style={{ maxWidth: '500px', margin: '0 auto 44px' }}
            >
              {tr.cta.subtitle}
            </p>
            <a
              href="#" onClick={openCalendly}
              className="hover:-translate-y-0.5 transition-transform inline-block"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                color: '#fff', padding: '17px 44px', borderRadius: '14px',
                fontSize: '18px', fontFamily: 'Poppins, sans-serif',
                fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 4px 40px rgba(124,58,237,0.42)',
              }}
            >
              {tr.cta.button}
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer
        style={{
          padding: '28px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
        }}
      >
        <p className="text-taupe font-poppins text-[14px]">
          {tr.footer.text}{' '}
          <Link to="/" className="hover:text-timberWolf transition-colors">
            {tr.footer.link}
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Mentoring;
