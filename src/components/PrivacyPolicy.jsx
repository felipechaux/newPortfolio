import React from 'react';

const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 text-taupe">
    <div className="flex flex-col items-center mb-8">
      <div className="w-32 h-32 mb-4">
        {/* SnapGalaxy SVG Logo */}
        <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#3a3a7c" />
              <stop offset="100%" stopColor="#0a0a23" />
            </radialGradient>
            <linearGradient id="swirlGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b3e0ff" />
              <stop offset="100%" stopColor="#4f8cff" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" rx="110" fill="url(#bgGradient)" />
          {/* Galaxy swirl */}
          <path d="M256 180c-60 0-108 36-108 80s48 80 108 80 108-36 108-80" stroke="url(#swirlGradient)" strokeWidth="18" fill="none" strokeLinecap="round" />
          {/* Central planet */}
          <circle cx="256" cy="260" r="44" fill="#fff" fillOpacity="0.95" />
          {/* Orbit ring */}
          <ellipse cx="256" cy="260" rx="80" ry="24" fill="none" stroke="#ffd700" strokeWidth="6" strokeDasharray="8 10" />
          {/* News signal (RSS arc) */}
          <path d="M320 200a60 60 0 0 1 60 60" stroke="#ffd700" strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="320" cy="260" r="10" fill="#ffd700" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-2">SnapGalaxy Privacy Policy</h1>
      <p className="text-sm text-gray-400">Last updated: August 19, 2025</p>
    </div>
    <section className="mb-6">
      <p>
        Welcome to SnapGalaxy, developed by <strong>ChauxDevApps</strong>. Your privacy is important to us. This Privacy Policy explains how SnapGalaxy handles your information.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">1. Information Collection</h2>
      <p>
        SnapGalaxy does <strong>not</strong> collect, store, or share any personal information from users. The app does not require you to create an account, provide personal details, or share any data.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">2. Data Usage</h2>
      <p>
        SnapGalaxy displays news and media content from the official <a href="https://api.nasa.gov/" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">NASA API</a>. All information shown in the app is publicly available from NASA. We do not track, log, or analyze your activity within the app.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">3. Third-Party Services</h2>
      <p>
        SnapGalaxy uses the NASA API to provide news and media. For more information about NASA's privacy practices, please visit the <a href="https://www.nasa.gov/privacy" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">NASA Privacy Policy</a>.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">4. Children’s Privacy</h2>
      <p>
        SnapGalaxy does not knowingly collect any information from children under the age of 13. If you believe that a child has provided us with personal information, please contact us and we will promptly delete such information.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">5. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at: <strong>felchax@gmail.com</strong>
      </p>
    </section>
    <footer className="text-center text-xs text-gray-400 mt-8">
      © 2025 ChauxDevApps. All rights reserved.
    </footer>
  </div>
);

export default PrivacyPolicy;
