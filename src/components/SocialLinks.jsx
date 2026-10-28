import { socialLinks } from '../constants';

const LinkedInLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const GitHubLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z" />
  </svg>
);

const UpworkLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.56 13.25c-1.04 0-2.02-.44-2.9-1.16l.21-1.02.01-.04c.19-1.08.8-2.9 2.68-2.9a2.56 2.56 0 0 1 2.56 2.56 2.57 2.57 0 0 1-2.56 2.56Zm0-7.72c-2.4 0-4.26 1.56-5.02 4.13-1.16-1.74-2.03-3.83-2.54-5.6H8.42v6.76a2.36 2.36 0 0 1-2.36 2.36A2.36 2.36 0 0 1 3.7 10.8V4.06H1.12v6.76a4.93 4.93 0 0 0 4.94 4.97 4.93 4.93 0 0 0 4.93-4.97V9.68c.5 1.04 1.12 2.1 1.86 3.03l-1.58 7.43h2.65l1.15-5.38c1 .64 2.16 1.05 3.49 1.05A5.15 5.15 0 0 0 23.7 10.7a5.16 5.16 0 0 0-5.14-5.17Z" />
  </svg>
);

// Generic briefcase: Freelancer.com's mark doesn't read well at icon size.
const FreelancerLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
  </svg>
);

const links = [
  { key: 'upwork', label: 'Upwork', href: socialLinks.upwork, Logo: UpworkLogo },
  { key: 'freelancer', label: 'Freelancer', href: socialLinks.freelancer, Logo: FreelancerLogo },
  { key: 'linkedin', label: 'LinkedIn', href: socialLinks.linkedin, Logo: LinkedInLogo },
  { key: 'github', label: 'GitHub', href: socialLinks.github, Logo: GitHubLogo },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary';

// `compact` renders 48px icon buttons (hero); otherwise labelled buttons.
const SocialLinks = ({ compact = false, className = '' }) => (
  <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
    {links.map(({ key, label, href, Logo }) => (
      <li key={key}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={compact ? label : undefined}
          className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 font-poppins text-[15px] font-semibold text-timberWolf transition-colors duration-200 hover:border-white/40 hover:text-white ${focusRing} ${
            compact ? 'w-12' : 'px-5'
          }`}>
          <Logo className="h-5 w-5" />
          {!compact && label}
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
