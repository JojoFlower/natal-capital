// Inline SVG icons, transcribed exactly from the approved design.
//
// `<Icon name="globe" className="door-icon" />` renders the matching glyph;
// the className drives sizing/colour (see .door-icon / .service-icon in
// styles/globals.css), so the same glyph can be reused at different sizes.

import type { IconName } from '../lib/content';

const PATHS: Record<IconName, React.ReactNode> = {
  services: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </>
  ),
  programs: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="1" />
      <path d="M3 11h18M8 7V5h8v2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
    </>
  ),
  apply: (
    <>
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M9 12h6M9 16h6" />
    </>
  ),
  research: (
    <>
      <path d="M4 19V6a2 2 0 012-2h9l5 5v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
      <path d="M14 4v5h5" />
    </>
  ),
  bank: (
    <>
      <path d="M3 21h18M6 21V10l6-5 6 5v11" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  valuation: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
      <path d="M8 11h6M11 8v6" />
    </>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      {PATHS[name]}
    </svg>
  );
}

/** Decorative curved strokes behind the hero headline. */
export function HeroSwoosh() {
  return (
    <svg
      className="hero-swoosh-bg"
      viewBox="0 0 700 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 420 C 260 420, 430 300, 640 60"
        stroke="#0769B2"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 460 C 260 460, 440 340, 660 100"
        stroke="#0B3B63"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
        opacity={0.6}
      />
    </svg>
  );
}
