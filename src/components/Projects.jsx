import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { github } from '../assets';
import { projects, projectsTwo, projectGames } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// Elements reveal themselves once on scroll instead of inheriting the
// section-level variants, which re-hide content on long pages.
const reveal = (delay = 0) => ({
  inherit: false,
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.15 },
  variants: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: 'easeOut' } },
  },
});
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';
import gsIcon from '../assets/galaxysnap-screenshots/icon.webp';
import gsShot1 from '../assets/galaxysnap-screenshots/shot1.webp';
import gsShot2 from '../assets/galaxysnap-screenshots/shot2.webp';
import gsShot3 from '../assets/galaxysnap-screenshots/shot3.webp';
import gsShot4 from '../assets/galaxysnap-screenshots/shot4.webp';
import gsShot5 from '../assets/galaxysnap-screenshots/shot5.webp';
import gsShot6 from '../assets/galaxysnap-screenshots/shot6.webp';
import gsShot7 from '../assets/galaxysnap-screenshots/shot7.webp';
import dmIcon from '../assets/dadomatch-store/icon.webp';
import dmShot1 from '../assets/dadomatch-store/shot1.webp';
import dmShot2 from '../assets/dadomatch-store/shot2.webp';
import dmShot3 from '../assets/dadomatch-store/shot3.webp';
import dmShot4 from '../assets/dadomatch-store/shot4.webp';
import dmShot5 from '../assets/dadomatch-store/shot5.webp';
import dmShot6 from '../assets/dadomatch-store/shot6.webp';
import dmShot7 from '../assets/dadomatch-store/shot7.webp';
import dmShot8 from '../assets/dadomatch-store/shot8.webp';

// Featured apps. Screenshots are the store listing images (captions baked in);
// theme classes are spelled out in full so Tailwind's JIT picks them up.
const featuredApps = [
  {
    key: 'dm',
    name: 'DadoMatch',
    subtitle: 'AI Icebreakers · iOS & Android',
    icon: dmIcon,
    stack: ['Kotlin Multiplatform', 'Compose', 'Generative AI'],
    playStore: 'https://play.google.com/store/apps/details?id=com.chauxdevapps.dadomatch',
    appStore: 'https://apps.apple.com/app/dadomatch/id6761394328',
    landing: '/dadomatch',
    shotSize: { width: 1080, height: 2347 },
    shots: [
      { src: dmShot1, alt: 'Welcome screen: stop overthinking, just roll' },
      { src: dmShot2, alt: 'Pick your vibe for any room' },
      { src: dmShot3, alt: 'Roll once, connect instantly' },
      { src: dmShot4, alt: 'Choose an environment and intensity, then launch' },
      { src: dmShot5, alt: 'AI-generated icebreaker for the moment' },
      { src: dmShot6, alt: 'Rate how the icebreaker went' },
      { src: dmShot7, alt: 'Track your social wins over time' },
      { src: dmShot8, alt: 'Unlock unlimited daily rolls with Pro' },
    ],
    theme: {
      bg: 'from-[#06142a] via-[#0a0a1f] to-[#1d0722]',
      glowA: 'bg-cyan-400/15',
      glowB: 'bg-pink-500/15',
      badge: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
      dot: 'bg-cyan-300',
      check: 'bg-pink-500/20 text-pink-300',
      shotHover: 'hover:ring-pink-400/50',
    },
  },
  {
    key: 'gs',
    name: 'GalaxySnap',
    subtitle: 'Space Explorer · Android',
    icon: gsIcon,
    stack: ['Kotlin', 'Android', 'NASA Open APIs', 'Offline-first'],
    playStore: 'https://play.google.com/store/apps/details?id=com.chauxdev.nasaapp',
    shotSize: { width: 1080, height: 1920 },
    shots: [
      { src: gsShot1, alt: 'Image of the day: a new cosmic wonder every day' },
      { src: gsShot2, alt: 'Asteroids passing Earth today' },
      { src: gsShot3, alt: 'Saved images collection, available offline' },
      { src: gsShot4, alt: "Explore NASA's image library" },
      { src: gsShot5, alt: 'Earth from 1.5 million km' },
      { src: gsShot6, alt: 'Image details with mission data and description' },
      { src: gsShot7, alt: 'Full-resolution zoom' },
    ],
    theme: {
      bg: 'from-[#0d0b2b] via-[#0a0a1f] to-[#050816]',
      glowA: 'bg-violet-600/20',
      glowB: 'bg-sky-500/10',
      badge: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
      dot: 'bg-violet-300',
      check: 'bg-violet-500/20 text-violet-300',
      shotHover: 'hover:ring-violet-400/50',
    },
  },
];

/* ─── Icons (inline SVG, 1.75 stroke) ───────────────────────── */
const Icon = ({ d, className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true">
    {d}
  </svg>
);

const ArrowUpRight = (p) => <Icon {...p} d={<path d="M7 17 17 7M8 7h9v9" />} />;
const ChevronLeft = (p) => <Icon {...p} d={<path d="m15 18-6-6 6-6" />} />;
const ChevronRight = (p) => <Icon {...p} d={<path d="m9 18 6-6-6-6" />} />;
const CloseIcon = (p) => <Icon {...p} d={<path d="M18 6 6 18M6 6l12 12" />} />;
const Check = (p) => <Icon {...p} d={<path d="M20 6 9 17l-5-5" />} />;

const PlayLogo = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#00d7fe" d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1 9.9-9.9v-.2L3.7 1.7z" />
    <path fill="#ffce00" d="m16.9 15.7-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3L17 15.7z" />
    <path fill="#ff3a44" d="M17 15.6 13.6 12.3 3.6 22.3c.4.4 1 .4 1.7.1L17 15.6" />
    <path fill="#48ff48" d="M17 8.9 5.3 2.2c-.7-.4-1.3-.3-1.7.1l10 9.9z" />
  </svg>
);

const AppleLogo = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.37 12.63c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.52ZM14.2 6.17c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21Z" />
  </svg>
);

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary';

/* ─── Link helpers ──────────────────────────────────────────── */
const linkLabel = (url, tr, isGame) => {
  if (url.startsWith('/')) return tr.readMore;
  if (url.includes('apps.apple.com')) return tr.appStore;
  if (url.includes('play.google.com')) return tr.playStore;
  return isGame ? tr.play : tr.live;
};

const platformOf = (project) => {
  const links = [project.demo, project.play_store].filter(Boolean).join(' ');
  const p = [];
  if (links.includes('play.google.com') || links.includes('apk')) p.push('Android');
  if (links.includes('apps.apple.com')) p.push('iOS');
  return p;
};

/* ─── Lightbox ──────────────────────────────────────────────── */
const Lightbox = ({ shots, index, onClose, onChange, tr }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % shots.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + shots.length) % shots.length);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, shots.length, onClose, onChange]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={shots[index].alt}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      onClick={onClose}>
      <motion.img
        key={index}
        src={shots[index].src}
        alt={shots[index].alt}
        className="max-h-[88dvh] w-auto rounded-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        ref={closeRef}
        type="button"
        aria-label={tr.close}
        onClick={onClose}
        className={`absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ${focusRing}`}>
        <CloseIcon className="w-5 h-5" />
      </button>
      {[
        { label: tr.prev, dir: -1, Icon: ChevronLeft, pos: 'left-2 sm:left-6' },
        { label: tr.next, dir: 1, Icon: ChevronRight, pos: 'right-2 sm:right-6' },
      ].map(({ label, dir, Icon: I, pos }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={(e) => {
            e.stopPropagation();
            onChange((index + dir + shots.length) % shots.length);
          }}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ${focusRing}`}>
          <I className="w-6 h-6" />
        </button>
      ))}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70 tabular-nums">
        {index + 1} / {shots.length}
      </p>
    </motion.div>
  );
};

/* ─── Featured app ──────────────────────────────────────────── */
const StoreButton = ({ href, logo, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 active:scale-[0.98] ${focusRing}`}>
    {logo}
    {label}
  </a>
);

const FeaturedApp = ({ app, tr, reverse = false }) => {
  const trackRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const copy = tr.featuredApps[app.key];
  const { theme, shotSize } = app;

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <motion.article
      {...reveal(0.05)}
      aria-label={app.name}
      className={`relative mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${theme.bg}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full blur-[120px] ${theme.glowA}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full blur-[120px] ${theme.glowB}`}
      />

      <div
        className={`relative grid gap-10 p-6 sm:p-10 ${
          reverse
            ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'
            : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'
        }`}>
        {/* Copy */}
        <div className={`flex flex-col ${reverse ? 'lg:order-2' : ''}`}>
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${theme.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            {copy.badge}
          </span>

          <div className="mt-6 flex items-center gap-4">
            <img
              src={app.icon}
              alt=""
              width="64"
              height="64"
              className="h-16 w-16 rounded-2xl shadow-lg ring-1 ring-white/10"
            />
            <div>
              <h3 className="font-poppins text-2xl sm:text-3xl font-bold text-white leading-tight">
                {app.name}
              </h3>
              <p className="text-sm text-slate-400">{app.subtitle}</p>
            </div>
          </div>

          <p className="mt-6 text-base leading-relaxed text-slate-300">{copy.tagline}</p>

          <ul className="mt-6 space-y-3">
            {copy.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] text-slate-300">
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${theme.check}`}>
                  <Check className="h-3.5 w-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {app.stack.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {app.appStore && (
              <StoreButton href={app.appStore} logo={<AppleLogo />} label={tr.appStore} />
            )}
            <StoreButton href={app.playStore} logo={<PlayLogo />} label={app.appStore ? tr.playStore : tr.getIt} />
            {app.landing && (
              <Link
                to={app.landing}
                onClick={() => window.scrollTo(0, 0)}
                className={`inline-flex min-h-[48px] items-center gap-1.5 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white/40 ${focusRing}`}>
                {tr.readMore}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <p className="mt-4 text-sm text-slate-400">{copy.meta}</p>
        </div>

        {/* Screenshots carousel */}
        <div className={`relative min-w-0 ${reverse ? 'lg:order-1' : ''}`}>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {tr.screenshots}
            </h4>
            <div className="hidden sm:flex gap-2">
              {[
                { label: tr.prev, dir: -1, I: ChevronLeft },
                { label: tr.next, dir: 1, I: ChevronRight },
              ].map(({ label, dir, I }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => scrollBy(dir)}
                  className={`h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center transition hover:bg-white/15 ${focusRing}`}>
                  <I className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <ul
            ref={trackRef}
            className="gs-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch]">
            {app.shots.map((shot, i) => (
              <li key={shot.alt} className="flex-none snap-start w-[46%] xs:w-[40%] sm:w-[34%] lg:w-[31%]">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={shot.alt}
                  className={`group block w-full overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-200 ${theme.shotHover} ${focusRing}`}>
                  <img
                    src={shot.src}
                    alt=""
                    width={shotSize.width}
                    height={shotSize.height}
                    loading="lazy"
                    style={{ aspectRatio: `${shotSize.width} / ${shotSize.height}` }}
                    className="w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Portal escapes the section's stacking context so the navbar can't cover it */}
      {createPortal(
        <AnimatePresence>
          {lightbox !== null && (
            <Lightbox
              shots={app.shots}
              index={lightbox}
              onClose={closeLightbox}
              onChange={setLightbox}
              tr={tr}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.article>
  );
};

/* ─── Project card ──────────────────────────────────────────── */
const ProjectCard = ({ project, index, tr, isGame = false }) => {
  const navigate = useNavigate();
  const { name, description, image, repo, demo, play_store } = project;
  const platforms = platformOf(project);

  const links = [
    demo && { url: demo, label: linkLabel(demo, tr, isGame) },
    play_store && { url: play_store, label: tr.playStore },
  ].filter(Boolean);

  const open = (url) => {
    if (url.startsWith('/')) {
      navigate(url);
      window.scrollTo(0, 0);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.article
      {...reveal((index % 3) * 0.06)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {platforms.length > 0 && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {platforms.map((p) => (
              <span
                key={p}
                className="rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-poppins text-lg font-semibold text-white">{name}</h4>
        {description && description !== name && (
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{description}</p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {links.map(({ url, label }) => (
            <button
              key={url}
              type="button"
              onClick={() => open(url)}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white/10 px-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-slate-900 ${focusRing}`}>
              {label}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          ))}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tr.code}: ${name}`}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 px-3.5 text-sm font-medium text-slate-300 transition hover:border-white/30 hover:text-white ${focusRing}`}>
              <img src={github} alt="" className="h-4 w-4 object-contain" />
              {tr.code}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const SubHeading = ({ children }) => (
  <motion.h3
    {...reveal()}
    className="mt-20 mb-8 font-poppins text-2xl sm:text-3xl font-bold text-timberWolf">
    {children}
  </motion.h3>
);

/* ─── Section ───────────────────────────────────────────────── */
const Projects = () => {
  const { lang } = useLang();
  const tr = pt[lang].projects;
  const apps = [...projects, ...projectsTwo].filter((p) => !p.featured);

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{tr.sub}</p>
        <h2 className={styles.sectionHeadTextLight}>{tr.title}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 max-w-3xl text-[17px] leading-[28px] text-taupe">
        {tr.desc}
      </motion.p>

      {featuredApps.map((app, i) => (
        <FeaturedApp key={app.key} app={app} tr={tr} reverse={i % 2 === 1} />
      ))}

      <SubHeading>{tr.apps}</SubHeading>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} tr={tr} />
        ))}
      </div>

      <SubHeading>{tr.games}</SubHeading>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projectGames.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} tr={tr} isGame />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Projects, 'projects');
