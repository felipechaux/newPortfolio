import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import dm_shot_iphone from '../assets/dadomatch-screenshots/iphone-16.png';
import dm_shot_ipad from '../assets/dadomatch-screenshots/ipad-13.png';
import dm_feature from '../assets/projects/dadomatch_feature.png';
import dm_video from '../assets/projects/dadomatch_hero.mp4';
import dm_logo from '../assets/projects/dadomatch_logo.jpg';
import { translations } from '../constants/dadomatchTranslations';

/* ─── Reusable fade-in-up animation ─────────────────────────── */
const FadeUp = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
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
                hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ─── Feature Card ───────────────────────────────────────────── */
const FeatureCard = ({ icon, title, description, delay }) => (
    <FadeUp delay={delay} className="flex-1 min-w-[260px]">
        <div className="dm-feature-card">
            <span className="dm-feature-icon">{icon}</span>
            <h3 className="dm-feature-title">{title}</h3>
            <p className="dm-feature-desc">{description}</p>
        </div>
    </FadeUp>
);

/* ─── Device screenshots ─────────────────────────────────────── */
// Grid columns are sized by each image's aspect ratio (1320×2868 and
// 2064×2752) so both screenshots render at the same height side by side.
const deviceScreenshots = [
    { src: dm_shot_iphone, label: 'iPhone 16', alt: 'DadoMatch on iPhone 16', width: 1320, height: 2868 },
    { src: dm_shot_ipad, label: 'iPad 13', alt: 'DadoMatch on iPad 13', width: 2064, height: 2752 },
];

const DeviceScreenshots = () => (
    <FadeUp delay={0.2} className="dm-devices-grid">
        {deviceScreenshots.map((shot) => (
            <figure key={shot.label} className="dm-device">
                <div className="dm-device-frame">
                    <img
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        className="dm-device-img"
                    />
                </div>
                <figcaption className="dm-device-label">{shot.label}</figcaption>
            </figure>
        ))}
    </FadeUp>
);

/* ─── Store links + platform detection ───────────────────────── */
const STORE_LINKS = {
    ios: 'https://apps.apple.com/app/dadomatch/id6761394328',
    android: 'https://play.google.com/store/apps/details?id=com.chauxdevapps.dadomatch',
};

const detectPlatform = () => {
    if (typeof navigator === 'undefined') return 'desktop';
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) return 'android';
    // iPadOS 13+ reports itself as "Macintosh" — touch support gives it away
    if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
    return 'desktop';
};

const BOT_UA = /bot|crawler|spider|crawling|lighthouse|preview/i;

// Mobile visitors go straight to their store. Crawlers and "?web" keep the landing page.
const getRedirectTarget = () => {
    if (typeof window === 'undefined') return null;
    if (new URLSearchParams(window.location.search).has('web')) return null;
    if (BOT_UA.test(navigator.userAgent || '')) return null;
    const platform = detectPlatform();
    return platform === 'desktop' ? null : platform;
};

const usePlatform = () => {
    // Client-only SPA: detect synchronously so mobile never flashes both buttons
    const [platform] = useState(detectPlatform);
    return platform;
};

const AppleIcon = () => (
    <svg className="dm-store-icon" viewBox="0 0 384 512" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
);

const GooglePlayIcon = () => (
    <svg className="dm-store-icon" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
        <path fill="#00d7fe" d="M47 22c-8 8-12 21-12 37v394c0 16 4 29 12 37l2 2 221-221v-5L49 20z" />
        <path fill="#ffce00" d="m343 345-73-74v-5l73-74 2 1 87 50c25 14 25 37 0 52l-87 49z" />
        <path fill="#ff3a44" d="M345 344 270 269 47 492c8 9 22 10 37 1l261-149" />
        <path fill="#00f076" d="M345 194 84 46c-15-9-29-8-37 1l223 222z" />
    </svg>
);

const STORES = {
    ios: { Icon: AppleIcon, name: 'App Store', labelKey: 'appleLabel' },
    android: { Icon: GooglePlayIcon, name: 'Google Play', labelKey: 'googleLabel' },
};

/* ─── Store badge button ─────────────────────────────────────── */
const StoreButton = ({ store, t, recommended = false }) => {
    const { Icon, name, labelKey } = STORES[store];
    return (
        <a
            href={STORE_LINKS[store]}
            target="_blank"
            rel="noopener noreferrer"
            className={`dm-store-btn ${recommended ? 'dm-store-btn-recommended' : ''}`}
            aria-label={`${t.download.ariaGet.replace('{store}', name)} (${t.download.newTab})`}
        >
            <span className="dm-store-shine" aria-hidden="true" />
            <Icon />
            <span className="dm-store-text">
                <span className="dm-store-label">{t.download[labelKey]}</span>
                <span className="dm-store-name">{name}</span>
            </span>
        </a>
    );
};

/* Mobile: only the store for this device. Desktop: both. */
const visibleStores = (platform) => (platform === 'desktop' ? ['ios', 'android'] : [platform]);

const storeRowVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const storeItemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.21, 0.45, 0.32, 0.9] } },
};

const StoreButtons = ({ platform, t, className = '' }) => {
    const stores = visibleStores(platform);
    const reduceMotion = useReducedMotion();
    return (
        <motion.div
            className={`dm-store-row ${className}`}
            variants={storeRowVariants}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
        >
            {stores.map((store) => (
                <motion.div key={store} variants={storeItemVariants} className="dm-store-item">
                    <StoreButton store={store} t={t} recommended={platform === store} />
                </motion.div>
            ))}
        </motion.div>
    );
};

/* ─── Smart download card ────────────────────────────────────── */
const DownloadCard = ({ platform, t }) => {
    const detected = platform !== 'desktop';
    return (
        <div className="dm-download-card" role="region" aria-labelledby="dm-download-title">
            <img src={dm_logo} alt="" className="dm-download-logo" />
            <h2 id="dm-download-title" className="dm-cta-title">{t.cta.title}</h2>
            <p className="dm-cta-sub">{t.cta.sub}</p>

            <p className="dm-download-detect" aria-live="polite">
                <span className="dm-download-dot" aria-hidden="true" />
                {detected ? t.download.detected[platform] : t.download.desktop}
            </p>

            <StoreButtons platform={platform} t={t} className="dm-store-row-center" />

            <ul className="dm-download-meta">
                {t.download.meta.map((item) => <li key={item}>{item}</li>)}
            </ul>
        </div>
    );
};

/* ─── Step card (How It Works) ───────────────────────────────── */
const StepCard = ({ num, title, desc, delay }) => (
    <FadeUp delay={delay}>
        <div className="dm-step-card">
            <div className="dm-step-num">{num}</div>
            <h3 className="dm-step-title">{title}</h3>
            <p className="dm-step-desc">{desc}</p>
        </div>
    </FadeUp>
);

/* ─── Store redirect screen ──────────────────────────────────── */
const StoreRedirect = ({ platform }) => {
    const t = translations[/^es\b/i.test(navigator.language || '') ? 'es' : 'en'].redirect;
    const store = STORES[platform].name;
    const url = STORE_LINKS[platform];

    useEffect(() => {
        window.location.replace(url);
    }, [url]);

    return (
        <main className="dm-page dm-redirect" aria-busy="true">
            <img src={dm_logo} alt="DadoMatch" className="dm-download-logo" />
            <p className="dm-redirect-title" role="status">{t.opening.replace('{store}', store)}</p>
            <span className="dm-redirect-spinner" aria-hidden="true" />
            <a href={url} className="dm-redirect-link">{t.manual}</a>
            <a href="/dadomatch?web" className="dm-redirect-web">{t.web}</a>
        </main>
    );
};

/* ─── Route entry ────────────────────────────────────────────── */
const DadoMatch = () => {
    const [redirectTo] = useState(getRedirectTarget);
    return redirectTo ? <StoreRedirect platform={redirectTo} /> : <DadoMatchLanding />;
};

/* ─── Main Page ──────────────────────────────────────────────── */
const DadoMatchLanding = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const videoRef = useRef(null);
    const [language, setLanguage] = useState('en');
    const platform = usePlatform();
    const { scrollY } = useScroll();

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isExpanded]);

    // Sync muted state directly to video element to avoid React render lag during loop
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const t = translations[language];

    // MonAI-style scroll transforms + PiP transition
    const scale = useTransform(scrollY, [0, 600], [1, 0.45]);
    const rotateX = useTransform(scrollY, [0, 600], [0, 8]);

    // PiP (Picture-in-Picture) transforms
    const x = useTransform(scrollY, [0, 600], ["0%", "36%"]);
    const y = useTransform(scrollY, [0, 600], ["0%", "36%"]);
    const radius = useTransform(scrollY, [0, 600], ["24px", "40px"]);
    return (
        <div className="dm-page">

            {/* NAV */}
            <nav className="dm-nav">
                <div
                    className="dm-nav-logo cursor-pointer flex items-center gap-2"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <img src={dm_logo} alt="DadoMatch Logo" className="w-8 h-8 rounded-lg object-contain" />
                    <span>DadoMatch</span>
                </div>
                <div className="dm-nav-links">
                    <a href="#dm-how">{t.nav.how}</a>
                    <a href="#dm-features">{t.nav.features}</a>
                    <a href="#dm-screenshots">{t.nav.screenshots}</a>

                    {/* Language Toggle */}
                    <div className="dm-lang-toggle">
                        <button
                            className={`dm-lang-btn ${language === 'en' ? 'active' : ''}`}
                            onClick={() => setLanguage('en')}
                        >
                            EN
                        </button>
                        <button
                            className={`dm-lang-btn ${language === 'es' ? 'active' : ''}`}
                            onClick={() => setLanguage('es')}
                        >
                            ES
                        </button>
                    </div>

                    {platform === 'desktop' ? (
                        <a href="#dm-download" className="dm-nav-cta">{t.nav.download}</a>
                    ) : (
                        <a href={STORE_LINKS[platform]} target="_blank" rel="noopener noreferrer" className="dm-nav-cta">{t.nav.download}</a>
                    )}
                </div>
            </nav>

            {/* HERO */}
            <section className="dm-hero">
                <div className="dm-hero-stars" aria-hidden="true" />

                <motion.div className="dm-hero-content">
                    <FadeUp delay={0}>
                        <div className="dm-badge">{t.hero.badge}</div>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <h1 className="dm-hero-title">
                            {t.hero.title1}<br />
                            <span className="dm-gradient-text dm-glow-text">{t.hero.title2}</span>
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p className="dm-hero-subtitle">
                            {t.hero.subtitle}
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.3} className="dm-hero-pills">
                        {t.hero.pills.map((pill, i) => (
                            <span key={i} className={`dm-pill ${pill.includes('🌶️') ? 'dm-pill-hot' : ''}`}>{pill}</span>
                        ))}
                    </FadeUp>
                    <FadeUp delay={0.4}>
                        <StoreButtons platform={platform} t={t} className="dm-store-row-hero" />
                    </FadeUp>
                </motion.div>

                {/* Empty visual area for flow layout on desktop */}
                <div className="hidden lg:block w-1/2 min-h-[400px]" />
            </section>

            {/* GLOBAL PERSISTENT VIDEO */}
            <div className={`dm-video-wrapper-fixed ${isExpanded ? 'dm-expanded-active' : ''}`}>
                <div
                    className="dm-hero-visual-wrap"
                    onClick={() => {
                        if (isExpanded) {
                            setIsExpanded(false);
                            setIsMuted(true);
                        }
                    }}
                >
                    <motion.div
                        layout
                        style={{
                            scale: isExpanded ? 1 : scale,
                            rotateX: isExpanded ? 0 : rotateX,
                            x: isExpanded ? 0 : x,
                            y: isExpanded ? 0 : y,
                            width: isExpanded ? "90%" : "50%",
                            maxWidth: isExpanded ? "1200px" : "600px",
                        }}
                        className={`dm-hero-visual ${isExpanded ? 'dm-visual-expanded' : ''}`}
                    >
                        <motion.div
                            layout
                            style={{ borderRadius: isExpanded ? "24px" : radius }}
                            className="dm-video-frame group cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isExpanded) {
                                    setIsExpanded(true);
                                    setIsMuted(false);
                                } else {
                                    setIsMuted(!isMuted);
                                }
                            }}
                        >
                            <video
                                ref={videoRef}
                                src={dm_video}
                                autoPlay
                                loop
                                muted={isMuted}
                                playsInline
                                className="dm-hero-video"
                                poster={dm_feature}
                                onEnded={(e) => {
                                    // Fallback for seamless loop in some browsers
                                    e.target.currentTime = 0;
                                    e.target.play().catch(err => console.log("Loop playback interrupted"));
                                }}
                            />
                            {/* Sound Toggle Overlay */}
                            <button
                                className="dm-sound-toggle"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMuted(!isMuted);
                                }}
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                            >
                                {isMuted ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z" /></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M7 9v6h4l5 5V4l-5 5H7z" /></svg>
                                )}
                            </button>

                            {/* Close Button to minimize */}
                            {isExpanded && (
                                <button
                                    className="dm-close-video"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(false);
                                        setIsMuted(true);
                                    }}
                                    aria-label="Minimize video"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <section id="dm-how" className="dm-section relative z-10 bg-[#060914]">
                <FadeUp>
                    <p className="dm-section-eyebrow">{t.how.eyebrow}</p>
                    <h2 className="dm-section-title">{t.how.title}</h2>
                </FadeUp>
                <div className="dm-steps">
                    {t.how.steps.map((step, i) => (
                        <StepCard key={step.num} num={step.num} title={step.title} desc={step.desc} delay={0.1 * (i + 1)} />
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section id="dm-features" className="dm-section dm-section-dark">
                <FadeUp>
                    <p className="dm-section-eyebrow">{t.features.eyebrow}</p>
                    <h2 className="dm-section-title">{t.features.title}</h2>
                </FadeUp>
                <div className="dm-features-grid">
                    {t.features.list.map((f, i) => (
                        <FeatureCard key={i} icon={f.icon} title={f.title} description={f.desc} delay={0.1 + (i * 0.05)} />
                    ))}
                </div>
            </section>

            {/* SCREENSHOTS */}
            <section id="dm-screenshots" className="dm-section">
                <FadeUp>
                    <p className="dm-section-eyebrow">{t.screenshots.eyebrow}</p>
                    <h2 className="dm-section-title">{t.screenshots.title}</h2>
                </FadeUp>
                <div className="dm-screenshots-layout">
                    <div className="dm-screenshots-text">
                        <FadeUp delay={0.1}>
                            <h3 className="dm-screenshots-headline">{t.screenshots.headline}</h3>
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <p className="dm-screenshots-body">
                                {t.screenshots.body}
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.3}>
                            <ul className="dm-screenshots-list">
                                {t.screenshots.list.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </FadeUp>
                    </div>
                </div>
                <DeviceScreenshots />
            </section>

            {/* TECH STACK */}
            <section className="dm-section dm-section-dark">
                <FadeUp>
                    <p className="dm-section-eyebrow">{t.tech.eyebrow}</p>
                    <h2 className="dm-section-title">{t.tech.title}</h2>
                </FadeUp>
                <FadeUp delay={0.1} className="dm-tech-grid">
                    {[
                        { label: 'Kotlin Multiplatform', emoji: '🟣' },
                        { label: 'Compose Multiplatform', emoji: '🎨' },
                        { label: 'Swift / SwiftUI', emoji: '🍎' },
                        { label: 'Ktor', emoji: '🌐' },
                        { label: 'Koin DI', emoji: '🔧' },
                        { label: 'Firebase', emoji: '🔥' },
                        { label: 'Google Gemini AI', emoji: '🤖' },
                        { label: 'RevenueCat', emoji: '💳' },
                        { label: 'Fastlane', emoji: '🚀' },
                        { label: 'GitHub Actions', emoji: '⚙️' },
                    ].map(t => (
                        <div key={t.label} className="dm-tech-pill">
                            <span>{t.emoji}</span> {t.label}
                        </div>
                    ))}
                </FadeUp>
            </section>

            {/* CTA */}
            <section id="dm-download" className="dm-cta-section">
                <div className="dm-cta-glow" aria-hidden="true" />
                <FadeUp className="dm-cta-content">
                    <DownloadCard platform={platform} t={t} />
                </FadeUp>
            </section>

            {/* FOOTER */}
            <footer className="dm-footer">
                <span>{t.footer.copyright}</span>
                <span className="dm-footer-sep">·</span>
                <a href="https://github.com/felipechaux" target="_blank" rel="noreferrer">GitHub</a>
                <span className="dm-footer-sep">·</span>
                <Link to="/dadomatch/privacy">{t.footer.privacy}</Link>
                <span className="dm-footer-sep">·</span>
                <a href="mailto:felchax@gmail.com">{t.footer.contact}</a>
            </footer>
        </div>
    );
};

export default DadoMatch;
