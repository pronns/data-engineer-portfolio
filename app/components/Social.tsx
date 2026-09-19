import { siGithub, siMedium } from "simple-icons";
import { site } from "../data";

// LinkedIn isn't in Simple Icons, so this is a plain "in" glyph.
const LINKEDIN_PATH =
  "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.55 4.77 5.87v5.98h-4v-5.3c0-1.27-.02-2.9-1.84-2.9-1.84 0-2.12 1.38-2.12 2.8v5.4h-4V9.75Z";

const links = [
  { label: "LinkedIn", href: site.socials.linkedin, path: LINKEDIN_PATH },
  { label: "GitHub", href: site.socials.github, path: siGithub.path },
  { label: "Medium", href: site.socials.medium, path: siMedium.path },
];

export default function Social({ className = "" }: { className?: string }) {
  return (
    <ul className={`social ${className}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${l.label} (opens in a new tab)`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d={l.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
