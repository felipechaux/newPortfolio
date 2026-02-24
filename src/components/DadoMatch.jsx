import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import dm_screen1 from '../assets/projects/dadomatch_screen1.png';
import dm_screen2 from '../assets/projects/dadomatch_screen2.png';
import dm_screen3 from '../assets/projects/dadomatch_screen3.png';
import dm_screen4 from '../assets/projects/dadomatch_screen4.png';
import dm_screen5 from '../assets/projects/dadomatch_screen5.png';
import dm_feature from '../assets/projects/dadomatch_feature.png';
import dm_video from '../assets/projects/dadomatch_hero.mp4';
/* Note: I'm assuming dadomatch_hero.mp4 will be the filename for the video prepared by the user. 
   If it's different, I'll update it later. */

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

const ScreenshotCarousel = () => {
    const [active, setActive] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActive(p => (p + 1) % screenshots.length), 3200);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="dm-carousel-wrap">
            <div className="dm-carousel-images">
                {screenshots.map((src, i) => (
                    <motion.div
                        key={i}
                        className="dm-carousel-item"
                        animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0.92, zIndex: i === active ? 2 : 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src={src} alt={screenshotCaptions[i]} className="dm-carousel-img" />
                    </motion.div>
                ))}
            </div>
            <div className="dm-carousel-dots">
                {screenshots.map((_, i) => (
                    <button
                        key={i}
                        className={`dm-dot${i === active ? ' dm-dot-active' : ''}`}
                        onClick={() => setActive(i)}
                    />
                ))}
            </div>
            <p className="dm-carousel-caption">{screenshotCaptions[active]}</p>
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
    const { scrollY } = useScroll();

    // MonAI-style scroll transforms + PiP transition
    const scale = useTransform(scrollY, [0, 600], [1, 0.45]);
    const rotateX = useTransform(scrollY, [0, 600], [0, 8]);
    const heroContentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    // PiP (Picture-in-Picture) transforms
    const x = useTransform(scrollY, [0, 600], ["0%", "36%"]);
    const y = useTransform(scrollY, [0, 600], ["0%", "36%"]);
    const radius = useTransform(scrollY, [0, 600], ["24px", "40px"]);
    return (
        <div className="dm-page">

            {/* NAV */}
            <nav className="dm-nav">
                <div
                    className="dm-nav-logo cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    🎲 DadoMatch
                </div>
                <div className="dm-nav-links">
                    <a href="#dm-how">How It Works</a>
                    <a href="#dm-features">Features</a>
                    <a href="#dm-screenshots">Screenshots</a>
                    <a href="https://play.google.com/store/apps/details?id=com.chauxdevapps.dadomatch" target="_blank" rel="noreferrer" className="dm-nav-cta">Download</a>
                </div>
            </nav>

            {/* HERO */}
            <section className="dm-hero">
                <div className="dm-hero-stars" aria-hidden="true" />

                <motion.div style={{ opacity: heroContentOpacity }} className="dm-hero-content">
                    <FadeUp delay={0}>
                        <div className="dm-badge">Social Icebreaker App</div>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <h1 className="dm-hero-title">
                            Less scroll,<br />
                            <span className="dm-gradient-text dm-glow-text">more action.</span>
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p className="dm-hero-subtitle">
                            Pick your environment, choose your intensity, and let AI generate
                            the perfect icebreaker. Roll the dice — spark the conversation.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.3} className="dm-hero-pills">
                        <span className="dm-pill">🎉 Party</span>
                        <span className="dm-pill">❤️ Romantic</span>
                        <span className="dm-pill dm-pill-hot">🌶️ Spicy</span>
                        <span className="dm-pill">☕ Café</span>
                    </FadeUp>
                    <FadeUp delay={0.4} className="dm-hero-ctas">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.chauxdevapps.dadomatch"
                            target="_blank" rel="noreferrer"
                            className="dm-btn dm-btn-primary"
                        >
                            📱 Google Play
                        </a>
                        <a
                            href="https://apps.apple.com/app/dadomatch"
                            target="_blank" rel="noreferrer"
                            className="dm-btn dm-btn-secondary"
                        >
                            App Store
                        </a>
                    </FadeUp>
                </motion.div>

                {/* Empty visual area for flow layout on desktop */}
                <div className="hidden lg:block w-1/2 min-h-[400px]" />
            </section>

            {/* GLOBAL PERSISTENT VIDEO */}
            <div className="dm-video-wrapper-fixed">
                <div className="dm-hero-visual-wrap">
                    <motion.div
                        style={{
                            scale,
                            rotateX,
                            x,
                            y,
                        }}
                        className="dm-hero-visual"
                    >
                        <motion.div
                            style={{ borderRadius: radius }}
                            className="dm-video-frame"
                        >
                            <video
                                src={dm_video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="dm-hero-video"
                                poster={dm_feature}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <section id="dm-how" className="dm-section relative z-10 bg-[#060914]">
                <FadeUp>
                    <p className="dm-section-eyebrow">Simple by design</p>
                    <h2 className="dm-section-title">How It Works</h2>
                </FadeUp>
                <div className="dm-steps">
                    <StepCard num="01" title="Pick an Environment" desc="Gym, Party, Library, Café, Bar — choose the social context that fits." delay={0.1} />
                    <StepCard num="02" title="Set the Intensity" desc="Cringe, Romantic, Direct, Spicy — dial up or down the energy of your icebreaker." delay={0.2} />
                    <StepCard num="03" title="Roll the Dice" desc="Tap LAUNCH. Generative AI crafts a perfect, context-aware opener instantly." delay={0.3} />
                    <StepCard num="04" title="Track your Rizz" desc="Rate each icebreaker 🔥 Top or 💀 Cringe and watch your social score grow." delay={0.4} />
                </div>
            </section>

            {/* FEATURES */}
            <section id="dm-features" className="dm-section dm-section-dark">
                <FadeUp>
                    <p className="dm-section-eyebrow">Everything you need</p>
                    <h2 className="dm-section-title">Features</h2>
                </FadeUp>
                <div className="dm-features-grid">
                    <FeatureCard icon="🤖" title="AI-Powered Icebreakers" description="Generative AI reads the room — every opener is unique and tailored to your chosen environment and intensity." delay={0.1} />
                    <FeatureCard icon="🎲" title="Roll the Dice" description="One tap. Instant magic. No awkward silence, no generic pickup lines — just perfectly timed conversation starters." delay={0.15} />
                    <FeatureCard icon="🌍" title="Any Environment" description="Gym, party, café, library, bar — the app adapts its style to wherever you are in the world." delay={0.2} />
                    <FeatureCard icon="🌶️" title="Adjustable Intensity" description="Keep it light and funny or turn up the heat. You're always in control of the vibe." delay={0.25} />
                    <FeatureCard icon="⭐" title="Favorites" description="Save the lines that worked. Build your own personal collection of top openers." delay={0.3} />
                    <FeatureCard icon="📈" title="Progress Tracking" description="See your social wins. Track which icebreakers landed and improve your Rizz over time." delay={0.35} />
                    <FeatureCard icon="🔐" title="Google & Apple Sign-In" description="Secure, easy login. Your favorites and history follow you across iOS and Android." delay={0.4} />
                    <FeatureCard icon="✨" title="Free & Pro" description="Start free with daily rolls. Go Pro for unlimited launches and exclusive environments." delay={0.45} />
                </div>
            </section>

            {/* SCREENSHOTS */}
            <section id="dm-screenshots" className="dm-section">
                <FadeUp>
                    <p className="dm-section-eyebrow">See it in action</p>
                    <h2 className="dm-section-title">App Screenshots</h2>
                </FadeUp>
                <div className="dm-screenshots-layout">
                    <div className="dm-screenshots-text">
                        <FadeUp delay={0.1}>
                            <h3 className="dm-screenshots-headline">Beautiful neon design,<br />built for connection.</h3>
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <p className="dm-screenshots-body">
                                DadoMatch combines a stunning dark neon aesthetic with powerful AI technology.
                                Every screen is crafted to feel premium and intuitive — because breaking the ice
                                should feel as good as the conversation that follows.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.3}>
                            <ul className="dm-screenshots-list">
                                <li>✦ Kotlin Multiplatform (iOS + Android)</li>
                                <li>✦ Compose Multiplatform UI</li>
                                <li>✦ Generative AI via Gemini</li>
                                <li>✦ Firebase Authentication</li>
                                <li>✦ RevenueCat subscriptions</li>
                            </ul>
                        </FadeUp>
                    </div>
                    <ScreenshotCarousel />
                </div>
            </section>

            {/* TECH STACK */}
            <section className="dm-section dm-section-dark">
                <FadeUp>
                    <p className="dm-section-eyebrow">Under the hood</p>
                    <h2 className="dm-section-title">Tech Stack</h2>
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
                <FadeUp className="dm-cta-content">
                    <h2 className="dm-cta-title">Ready to break the ice?</h2>
                    <p className="dm-cta-sub">Download free. Roll unlimited for 7 days.</p>
                    <div className="dm-cta-buttons">
                        <a href="https://play.google.com/store/apps/details?id=com.chauxdevapps.dadomatch" target="_blank" rel="noreferrer" className="dm-btn dm-btn-primary dm-btn-lg">
                            📱 Get on Google Play
                        </a>
                        <a href="https://apps.apple.com/app/dadomatch" target="_blank" rel="noreferrer" className="dm-btn dm-btn-secondary dm-btn-lg">
                            Download on App Store
                        </a>
                    </div>
                </FadeUp>
            </section>

            {/* FOOTER */}
            <footer className="dm-footer">
                <span>© 2025 DadoMatch · ChauxDevApps</span>
                <span className="dm-footer-sep">·</span>
                <a href="https://github.com/felipechaux" target="_blank" rel="noreferrer">GitHub</a>
                <span className="dm-footer-sep">·</span>
                <a href="mailto:felipechaux@gmail.com">Contact</a>
            </footer>
        </div>
    );
};

export default DadoMatch;
