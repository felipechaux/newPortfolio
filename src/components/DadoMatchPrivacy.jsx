import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import dm_logo from '../assets/projects/dadomatch_logo.jpg';
import { Link } from 'react-router-dom';

const DadoMatchPrivacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="dm-page min-h-screen">
            <nav className="dm-nav">
                <Link to="/dadomatch" className="dm-nav-logo flex items-center gap-2">
                    <img src={dm_logo} alt="DadoMatch Logo" className="w-8 h-8 rounded-lg object-contain" />
                    <span>DadoMatch</span>
                </Link>
                <div className="dm-nav-links">
                    <Link to="/dadomatch" className="dm-nav-cta">Back to App</Link>
                </div>
            </nav>

            <section className="dm-section max-w-4xl mx-auto text-left items-start px-6 py-12 lg:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <p className="dm-section-eyebrow text-left">Transparency & Security</p>
                    <h1 className="dm-hero-title text-left mb-4">
                        Privacy <span className="dm-gradient-text dm-glow-text">Policy</span>
                    </h1>
                    <p className="dm-hero-subtitle text-left max-w-none mb-12">
                        Last updated: February 24, 2026
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-12 w-full"
                >
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-dm-cyan">01.</span> Introduction
                        </h2>
                        <p className="dm-step-desc text-lg leading-relaxed">
                            Welcome to <strong>DadoMatch</strong>, an application developed by <strong>ChauxDevApps</strong>.
                            We respect your privacy and are committed to protecting any information we may handle.
                            This Privacy Policy explains our practices regarding user and device data for both Android and iOS platforms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-dm-cyan">02.</span> Information Collection
                        </h2>
                        <p className="dm-step-desc text-lg leading-relaxed">
                            DadoMatch uses <strong>Google Sign-In</strong> and <strong>Apple Sign-In</strong> to provide a secure and seamless authentication experience.
                            When you sign in using these services, we receive the following basic profile information:
                        </p>
                        <ul className="dm-screenshots-list mt-6 space-y-3">
                            <li className="flex items-center gap-3 text-dm-text">
                                <span className="text-dm-pink">✦</span> Full Name
                            </li>
                            <li className="flex items-center gap-3 text-dm-text">
                                <span className="text-dm-pink">✦</span> Email Address
                            </li>
                            <li className="flex items-center gap-3 text-dm-text">
                                <span className="text-dm-pink">✦</span> Profile Picture (provided by the SSO provider)
                            </li>
                        </ul>
                        <p className="dm-step-desc mt-6 italic opacity-80">
                            We do <strong>not</strong> collect any other sensitive personal data, location data, or device information
                            beyond what is essential for these authentication services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-dm-cyan">03.</span> Use of Information
                        </h2>
                        <p className="dm-step-desc text-lg leading-relaxed">
                            The information collected via Google and Apple Sign-In is used exclusively for:
                        </p>
                        <ul className="dm-screenshots-list mt-6 space-y-3">
                            <li className="flex items-center gap-3 text-dm-text">
                                <span className="text-dm-cyan">✦</span> Identifying you as a user across your devices (iOS & Android).
                            </li>
                            <li className="flex items-center gap-3 text-dm-text">
                                <span className="text-dm-cyan">✦</span> Enabling core app features such as saving your favorites and roll history.
                            </li>
                            <li className="flex items-center gap-3 text-dm-text">
                                <span className="text-dm-cyan">✦</span> Personalizing your experience within the app (e.g., displaying your name in your profile).
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-dm-cyan">04.</span> Data Sharing & Third Parties
                        </h2>
                        <p className="dm-step-desc text-lg leading-relaxed">
                            We believe in total transparency. <strong>We do not share, sell, or rent</strong> your personal or device data
                            to any third parties for marketing, advertising, or analysis. Your data is securely managed via <strong>Firebase</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-dm-cyan">05.</span> Target Audience & Children
                        </h2>
                        <p className="dm-step-desc text-lg leading-relaxed">
                            DadoMatch is intended for an audience of <strong>18 years of age and older</strong>.
                            We do not knowingly collect personal information from children under the age of 13.
                            If you become aware that a child has provided us with personal data, please contact us and we will remove it immediately.
                        </p>
                    </section>


                    <section className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-dm-cyan">06.</span> Contact Us
                        </h2>
                        <p className="dm-step-desc mb-4">
                            If you have any questions or concerns about this Privacy Policy, please feel free to reach out:
                        </p>
                        <div className="text-dm-text space-y-1">
                            <p><strong>Email:</strong> felchax@gmail.com</p>
                            <p><strong>Developer:</strong> ChauxDevApps</p>
                            <p><strong>Location:</strong> Bogota, Colombia</p>
                        </div>
                    </section>
                </motion.div>
            </section>

            <footer className="dm-footer mt-20">
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
                    <span>© 2026 DadoMatch · ChauxDevApps</span>
                    <div className="flex items-center gap-4">
                        <Link to="/dadomatch" className="hover:text-dm-cyan transition-colors">Home</Link>
                        <span className="dm-footer-sep">·</span>
                        <a href="mailto:felchax@gmail.com" className="hover:text-dm-cyan transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DadoMatchPrivacy;
