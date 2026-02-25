import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import dm_screen1 from '../assets/projects/dadomatch_screen1.png';
import dm_screen2 from '../assets/projects/dadomatch_screen2.png';
import dm_screen3 from '../assets/projects/dadomatch_screen3.png';
import dm_screen4 from '../assets/projects/dadomatch_screen4.png';
import dm_screen5 from '../assets/projects/dadomatch_screen5.png';
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

/* ─── Screenshot Carousel ────────────────────────────────────── */
const screenshots = [dm_screen1, dm_screen2, dm_screen3, dm_screen4, dm_screen5];
const screenshotCaptions = [
    'Welcome to DadoMatch',
    'Choose your environment & intensity',
    'Instant AI icebreaker',
    'Feedback that improves your Rizz',
    'Track your social progress',
];

const ScreenshotCarousel = ({ language }) => {
    const [active, setActive] = useState(0);
    const captions = translations[language].screenshots.captions;

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % 5);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dm-carousel-wrap">
            <div className="dm-carousel-images">
                {[dm_screen1, dm_screen2, dm_screen3, dm_screen4, dm_screen5].map((img, i) => (
                    <motion.div
                        key={i}
                        className="dm-carousel-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                            opacity: active === i ? 1 : 0,
                            x: active === i ? 0 : 20,
                            scale: active === i ? 1 : 0.95
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <img src={img} alt={`Screen ${i + 1}`} className="dm-carousel-img" />
                    </motion.div>
                ))}
            </div>
            <div className="dm-carousel-dots">
                {[0, 1, 2, 3, 4].map((i) => (
                    <button
                        key={i}
                        className={`dm-dot ${active === i ? 'dm-dot-active' : ''}`}
                        onClick={() => setActive(i)}
                    />
                ))}
            </div>
            <p className="dm-carousel-caption">{captions[active]}</p>
        </div>
    );
};

/* ─── Early Access Form ───────────────────────────── */
const EarlyAccessForm = ({ t }) => {
    const [form, setForm] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // 1. Send Internal Notification to Felipe
        const notificationPromise = emailjs.send(
            'service_r77g6uq',
            'template_8mtok6j',
            {
                from_name: form.name,
                to_name: 'Felipe',
                from_email: form.email,
                to_email: 'felchax@gmail.com',
                message: `NEW EARLY ACCESS SIGNUP: ${form.name} (${form.email}) has joined the list for DadoMatch Android.`,
            },
            'q3RoWKQusixcwHgIq'
        );

        // 2. Send Welcome Email to the User (ChauxDevApps)
        const welcomePromise = emailjs.send(
            'service_r77g6uq',
            'template_ij2yy2f', // New premium HTML template
            {
                to_name: form.name,
                to_email: form.email,
                from_name: 'ChauxDevApps',
            },
            'q3RoWKQusixcwHgIq'
        );

        Promise.all([notificationPromise, welcomePromise])
            .then(() => {
                setLoading(false);
                setStatus('success');
                setForm({ name: '', email: '' });
            })
            .catch((error) => {
                setLoading(false);
                setStatus('error');
                console.error(error);
            });
    };

    return (
        <div className="dm-ea-form-wrap">
            <div className="mb-4 text-left">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{t.cta.form.title}</h3>
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 font-bold uppercase tracking-wider">
                        Android
                    </span>
                </div>
                <p className="text-sm text-white/50">{t.cta.form.subtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="dm-ea-form">
                <div className="dm-ea-inputs">
                    <input
                        required
                        type="text"
                        placeholder={t.cta.form.placeholderName}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="dm-ea-input"
                    />
                    <input
                        required
                        type="email"
                        placeholder={t.cta.form.placeholderEmail}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="dm-ea-input"
                    />
                </div>
                <button type="submit" disabled={loading} className="dm-ea-submit">
                    {loading ? t.cta.form.submitting : t.cta.form.submit}
                </button>
            </form>
            {status === 'success' && <p className="dm-ea-message success">{t.cta.form.success}</p>}
            {status === 'error' && <p className="dm-ea-message error">{t.cta.form.error}</p>}
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

/* ─── Main Page ──────────────────────────────────────────────── */
const DadoMatch = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const videoRef = useRef(null);
    const [language, setLanguage] = useState('en');
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

                    <a href="#dm-cta" className="dm-nav-cta">{t.nav.download}</a>
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
                        <EarlyAccessForm t={t} />
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
                    <ScreenshotCarousel language={language} />
                </div>
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
            <section className="dm-cta-section">
                <div className="dm-cta-glow" aria-hidden="true" />
                <FadeUp className="dm-cta-content" id="dm-cta">
                    <h2 className="dm-cta-title">{t.cta.title}</h2>
                    <p className="dm-cta-sub">{t.cta.sub}</p>

                    <EarlyAccessForm t={t} />
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
