import { useEffect, useState, type CSSProperties } from 'react';
import Head from 'next/head';
import {
  content,
  CONTACT,
  IMAGES,
  LEGAL_NAME,
  PARTNERS,
  type Lang,
  type SiteContent,
} from '../lib/content';
import { HeroSwoosh, Icon } from '../components/Icons';
import { RequestForm } from '../components/RequestForm';

// The whole page is driven by lib/content.ts: `content[lang]` is the single
// source of copy, and each section below just lays it out with the class
// names styled in styles/globals.css. FR/EN is a piece of React state — the
// static mock-up toggled it with CSS, we render one language at a time.

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const c = content[lang];

  // Restore the visitor's previously chosen language.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ncp_lang');
      if (saved === 'fr' || saved === 'en') setLang(saved);
    } catch {}
  }, []);

  // Reflect the active language on <html> (for accessibility) and remember it.
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    try {
      localStorage.setItem('ncp_lang', lang);
    } catch {}
  }, [lang]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Head>
        <title>{c.meta.title}</title>
        <meta name="description" content={c.meta.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href={IMAGES.logo} />
      </Head>

      <Ticker c={c} />
      <UtilityBar c={c} />
      <Header
        c={c}
        lang={lang}
        onLang={setLang}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={closeMenu}
      />

      <main id="top">
        <Hero c={c} />
        <Doors c={c} />
        <Featured c={c} />
        <Services c={c} />
        <Solutions c={c} lang={lang} />
        <Positioning c={c} />
        <Proof c={c} />
        <Programs c={c} />
        <About c={c} />
        <Articles c={c} />
        <Finance c={c} lang={lang} />
        <Contact c={c} />
      </main>

      <Footer c={c} />
    </>
  );
}

// ---------- Top bars & header ----------

function Ticker({ c }: { c: SiteContent }) {
  const item = (
    <>
      {c.ticker.text} <a href="#financement">{c.ticker.cta} →</a>
    </>
  );
  return (
    <div className="ticker">
      <div className="ticker-track">
        {/* Duplicated once so the marquee scroll loops seamlessly. */}
        <span>
          {item}
          {'       '}
          {item}
        </span>
      </div>
    </div>
  );
}

function UtilityBar({ c }: { c: SiteContent }) {
  return (
    <div className="utility-bar">
      <div className="wrap">
        <div className="utility-links">
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>
        </div>
        <div className="utility-links">
          <span>{c.utilityTagline}</span>
        </div>
      </div>
    </div>
  );
}

interface HeaderProps {
  c: SiteContent;
  lang: Lang;
  onLang: (lang: Lang) => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

function Header({
  c,
  lang,
  onLang,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
}: HeaderProps) {
  return (
    <header className="site">
      <div className="nav-row">
        <a href="#top" className="brand" onClick={onCloseMenu}>
          <img src={IMAGES.logo} alt="Natal Capital Pro." />
        </a>
        <nav className={menuOpen ? 'links open' : 'links'}>
          {c.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={onCloseMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang-toggle">
            <button
              type="button"
              className={lang === 'fr' ? 'active' : undefined}
              onClick={() => onLang('fr')}
            >
              FR
            </button>
            <button
              type="button"
              className={lang === 'en' ? 'active' : undefined}
              onClick={() => onLang('en')}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Menu"
            onClick={onToggleMenu}
          >
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------- Sections ----------

function Hero({ c }: { c: SiteContent }) {
  return (
    <section className="hero">
      <HeroSwoosh />
      <div className="wrap">
        <h1>
          {c.hero.titleLead}
          <span className="accent">{c.hero.titleAccent}</span>
        </h1>
        <p className="sub">{c.hero.sub}</p>
        <div className="cta-row">
          <a href="#contact" className="btn primary">
            {c.hero.ctaPrimary}
          </a>
          <a href="#services" className="btn ghost">
            {c.hero.ctaGhost}
          </a>
        </div>
      </div>
    </section>
  );
}

function Doors({ c }: { c: SiteContent }) {
  return (
    <section className="doors">
      <div className="wrap">
        <div className="door-grid">
          {c.doors.map((door) => (
            <a key={door.title} href={door.href} className="door-card">
              <Icon name={door.icon} className="door-icon" />
              <h4>{door.title}</h4>
              <p>{door.text}</p>
              <span className="door-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured({ c }: { c: SiteContent }) {
  return (
    <section className="featured">
      <div className="wrap">
        <div className="featured-grid">
          <div>
            <span className="kicker">{c.featured.kicker}</span>
            <h2>{c.featured.title}</h2>
            <p className="desc" style={{ marginTop: 16 }}>
              {c.featured.body}
            </p>
            <div className="cta-row" style={{ marginTop: 26 }}>
              <a href="#programmes" className="btn primary">
                {c.featured.cta}
              </a>
            </div>
          </div>
          <div className="featured-visual">
            <img
              src={IMAGES.featured}
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  kicker,
  title,
  desc,
  kickerStyle,
}: {
  kicker: string;
  title: string;
  desc?: string;
  kickerStyle?: CSSProperties;
}) {
  return (
    <div className="section-head">
      <span className="kicker" style={kickerStyle}>
        {kicker}
      </span>
      <h2>{title}</h2>
      {desc && <p className="desc">{desc}</p>}
    </div>
  );
}

function Services({ c }: { c: SiteContent }) {
  return (
    <section id="services">
      <div className="wrap">
        <SectionHead
          kicker={c.services.kicker}
          title={c.services.title}
          desc={c.services.desc}
        />
        <div className="services-v2">
          {c.services.items.map((service) => (
            <div key={service.title} className="service-card-v2" id={service.id}>
              {service.thumb && (
                <img className="card-thumb" src={service.thumb} alt="" />
              )}
              <Icon name={service.icon} className="service-icon" />
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <a href="#contact" className="service-link">
                {c.services.serviceLink} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions({ c, lang }: { c: SiteContent; lang: Lang }) {
  return (
    <section id="solutions" className="alt">
      <div className="solutions-banner">
        <img src={IMAGES.solutionsBanner} alt="" />
        <div className="solutions-banner-overlay">
          <span>{c.solutions.bannerLabel}</span>
        </div>
      </div>
      <div className="wrap">
        <SectionHead
          kicker={c.solutions.kicker}
          title={c.solutions.title}
          desc={c.solutions.desc}
        />
        <div className="program-grid" style={{ marginBottom: 36 }}>
          {c.solutions.cards.map((card) => (
            <div key={card.title} className="program-card">
              <h3>{card.title}</h3>
              <ul className="program-list">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <RequestForm
          id="solutionForm"
          lang={lang}
          blocks={c.solutions.form.blocks}
          submitLabel={c.solutions.form.submit}
          mail={c.solutions.mail}
          statusCopy={c.formStatus}
          wrapBlocks={false}
          heading={{
            title: c.solutions.form.title,
            note: c.solutions.form.note,
          }}
        />
      </div>
    </section>
  );
}

function Positioning({ c }: { c: SiteContent }) {
  return (
    <section id="positioning" className="positioning">
      <div className="wrap">
        <div className="positioning-grid">
          <div className="positioning-tag">
            <span className="tag-label">{c.positioning.tagLabel}</span>
            <span className="tag-value">{c.positioning.tagValue}</span>
          </div>
          <div className="positioning-text">
            <h2>{c.positioning.title}</h2>
            {c.positioning.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof({ c }: { c: SiteContent }) {
  return (
    <section className="proof">
      <div className="wrap">
        <div className="proof-stats">
          {c.proof.stats.map((stat) => (
            <div key={stat.label} className="proof-stat">
              <Icon name={stat.icon} className="proof-icon" />
              <span className="proof-value">{stat.value}</span>
              <span className="proof-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="proof-partners">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="partner-card">
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs({ c }: { c: SiteContent }) {
  const { renfort, workingCapital } = c.programs;
  return (
    <section id="programmes">
      <div className="wrap">
        <SectionHead
          kicker={c.programs.kicker}
          title={c.programs.title}
          desc={c.programs.desc}
        />

        <div className="renfort-card">
          <div className="renfort-head">
            <span className="program-badge">{renfort.badge}</span>
            <h3 className="renfort-name">{renfort.name}</h3>
            <p className="renfort-tagline">{renfort.tagline}</p>
            <p>{renfort.body}</p>
          </div>
          <ul className="renfort-list">
            {renfort.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="program-terms renfort-terms">
            {renfort.terms.map((term) => (
              <div key={term.title} className="term">
                <p className="term-h">{term.title}</p>
                <p className="term-p">{term.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="wc-card">
          <span className="program-badge">{workingCapital.badge}</span>
          <h3>{workingCapital.title}</h3>
          <p>{workingCapital.body}</p>
          <ul className="program-list">
            {workingCapital.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="cta-row" style={{ marginTop: 36 }}>
          <a href="#financement" className="btn primary">
            {c.programs.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function About({ c }: { c: SiteContent }) {
  return (
    <section id="about" className="alt">
      <div className="wrap">
        <SectionHead kicker={c.about.kicker} title={c.about.title} />
        <div className="about-grid">
          <div className="about-photo">
            <div className="frame"></div>
            <img src={IMAGES.marc} alt={c.about.name} />
            <p className="about-name">{c.about.name}</p>
            <p className="about-role">{c.about.role}</p>
          </div>
          <div>
            <blockquote className="pull">
              {c.about.quote}
              <cite>{c.about.name}</cite>
            </blockquote>
            <div className="about-bio">
              {c.about.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Articles({ c }: { c: SiteContent }) {
  return (
    <section id="articles">
      <div className="wrap">
        <SectionHead kicker={c.articles.kicker} title={c.articles.title} />
        <div className="article-cats">
          {c.articles.categories.map((category) => (
            <div key={category} className="cat-card">
              <h3>{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finance({ c, lang }: { c: SiteContent; lang: Lang }) {
  return (
    <section id="financement" className="alt">
      <div className="wrap">
        <SectionHead
          kicker={c.finance.kicker}
          title={c.finance.title}
          desc={c.finance.desc}
        />
        <RequestForm
          id="financeForm"
          lang={lang}
          blocks={c.finance.blocks}
          submitLabel={c.finance.submit}
          mail={c.finance.mail}
          statusCopy={c.formStatus}
          wrapBlocks
        />
      </div>
    </section>
  );
}

function Contact({ c }: { c: SiteContent }) {
  return (
    <section id="contact" className="contact-band">
      <div className="wrap">
        <SectionHead
          kicker={c.contact.kicker}
          title={c.contact.title}
          desc={c.contact.desc}
          kickerStyle={{ color: '#7FB6E0' }}
        />
        <div className="contact-grid">
          <div className="contact-item">
            <p className="label">{c.contact.phoneLabel}</p>
            <a className="value" href={CONTACT.phoneHref}>
              {CONTACT.phone}
            </a>
          </div>
          <div className="contact-item">
            <p className="label">{c.contact.emailLabel}</p>
            <a className="value" href={CONTACT.emailHref}>
              {CONTACT.email}
            </a>
          </div>
        </div>
        <div className="cta-row" style={{ marginTop: 34 }}>
          <a href={CONTACT.emailHref} className="btn primary">
            {c.contact.ctaEmail}
          </a>
          <a href={CONTACT.phoneHref} className="btn ghost">
            {c.contact.ctaCall}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="site-v2">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <p>{c.footer.tagline}</p>
          </div>
          {c.footer.columns.map((column) => (
            <div key={column.title} className="footer-col">
              <h5>{column.title}</h5>
              {column.links.map((link) => (
                <a key={link.href + link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
              {column.notes?.map((note) => (
                <span
                  key={note}
                  style={{ display: 'block', padding: '5px 0', color: '#889098' }}
                >
                  {note}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>{c.footer.copyright}</span>
          <span>{LEGAL_NAME}</span>
        </div>
      </div>
    </footer>
  );
}
