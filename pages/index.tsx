import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { content, type Lang, type FormField } from '../lib/content';

// Shared button styles.
const BTN =
  'inline-block px-[26px] py-[13px] text-[15px] font-medium rounded-[2px] transition-colors';
const btnPrimary = `${BTN} bg-blue text-white hover:bg-[#085d94]`;
const btnGhost = `${BTN} border border-white/40 text-white hover:border-white`;

// Shared form-control styles.
const fieldWrap = 'flex flex-col gap-[7px] text-[.86rem] text-grey';
const fieldControl =
  'font-sans text-[.96rem] text-ink border-0 border-b border-line bg-transparent px-[2px] py-2 outline-none rounded-none focus:border-b-blue';

// Maps a row's column count to its responsive grid.
const colClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2 max-[700px]:grid-cols-1',
  3: 'grid-cols-3 max-[700px]:grid-cols-1',
};

function Field({ field }: { field: FormField }) {
  const dataLabel = field.dataLabel || field.label;

  if (field.type === 'checkbox') {
    return (
      <label className="flex flex-row items-center gap-[10px] text-[.92rem] text-ink">
        <input
          type="checkbox"
          data-label={dataLabel}
          data-checkbox="true"
          className="h-4 w-4"
        />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label className={fieldWrap}>
        <span>{field.label}</span>
        <select data-label={dataLabel} defaultValue="" className={fieldControl}>
          <option value="">{field.placeholder}</option>
          {field.options?.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className={fieldWrap}>
        <span>{field.label}</span>
        <textarea
          rows={4}
          data-label={dataLabel}
          className="font-sans text-[.96rem] text-ink bg-transparent outline-none resize-y border border-line p-[10px] rounded-none focus:border-b-blue"
        />
      </label>
    );
  }

  return (
    <label className={fieldWrap}>
      <span>{field.label}</span>
      <input type="text" data-label={dataLabel} className={fieldControl} />
    </label>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Restore the language chosen on a previous visit.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('ncp_lang');
    } catch (e) {}
    if (saved === 'fr' || saved === 'en') setLang(saved);
  }, []);

  // Keep <html lang>/<html data-lang> and storage in sync with the toggle.
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    try {
      localStorage.setItem('ncp_lang', lang);
    } catch (e) {}
  }, [lang]);

  const t = content[lang];

  function closeMenu() {
    setMenuOpen(false);
  }

  // Collects the form values keyed by their human-readable label.
  function collectFields(form: HTMLFormElement) {
    const data: Record<string, string> = {};
    form.querySelectorAll('input, select, textarea').forEach((node) => {
      const el = node as HTMLInputElement;
      const label = el.getAttribute('data-label');
      if (!label) return;
      if (el.getAttribute('data-checkbox') === 'true') {
        data[label] = el.checked ? 'Oui' : 'Non';
        return;
      }
      const val = el.value ? el.value.trim() : '';
      if (val) data[label] = val;
    });
    return data;
  }

  // Fallback: open the visitor's mail client with the request pre-filled.
  function sendByMail() {
    const form = formRef.current;
    if (!form) return;
    const data = collectFields(form);
    const lines = Object.entries(data).map(([k, v]) => k + ' : ' + v);
    const body =
      t.finance.mailIntro + '\n\n' + lines.join('\n') + '\n\n' + t.finance.mailReminder;
    window.location.href =
      'mailto:' +
      t.contact.email +
      '?subject=' +
      encodeURIComponent(t.finance.mailSubject) +
      '&body=' +
      encodeURIComponent(body);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: t.finance.mailSubject,
          from_name: 'Site Natal Capital Pro',
          ...collectFields(form),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <header className="sticky top-0 z-40 border-b border-line bg-[rgba(255,255,255,0.96)] backdrop-blur-[6px] [padding-top:env(safe-area-inset-top,0px)]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-5 px-7 py-[14px]">
          <a href="#top" className="flex items-center gap-[10px]" onClick={closeMenu}>
            <img src="/logo.png" alt="Natal Capital Pro." className="h-10 w-auto" />
          </a>
          <nav
            id="navLinks"
            className={`flex items-center gap-[30px] max-[820px]:fixed max-[820px]:inset-x-0 max-[820px]:top-[65px] max-[820px]:bottom-auto max-[820px]:flex-col max-[820px]:items-start max-[820px]:gap-0 max-[820px]:border-b max-[820px]:border-line max-[820px]:bg-white max-[820px]:transition-all max-[820px]:duration-[180ms] ${
              menuOpen
                ? 'max-[820px]:translate-y-0 max-[820px]:opacity-100 max-[820px]:pointer-events-auto'
                : 'max-[820px]:-translate-y-2 max-[820px]:opacity-0 max-[820px]:pointer-events-none'
            }`}
          >
            {t.nav.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                onClick={closeMenu}
                className="relative py-1 text-[15px] text-ink hover:text-blue max-[820px]:w-full max-[820px]:border-t max-[820px]:border-line max-[820px]:px-7 max-[820px]:py-[14px]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-[18px]">
            <div className="flex overflow-hidden rounded-[3px] border border-line text-[13px]">
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`cursor-pointer border-0 px-3 py-[7px] font-medium ${
                  lang === 'fr' ? 'bg-navy text-white' : 'bg-white text-grey'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`cursor-pointer border-0 px-3 py-[7px] font-medium ${
                  lang === 'en' ? 'bg-navy text-white' : 'bg-white text-grey'
                }`}
              >
                EN
              </button>
            </div>
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="hidden cursor-pointer border-0 bg-transparent p-[6px] max-[820px]:block"
            >
              <span className="relative block h-[2px] w-[22px] bg-ink before:absolute before:-top-[7px] before:block before:h-[2px] before:w-[22px] before:bg-ink before:content-[''] after:absolute after:top-[7px] after:block after:h-[2px] after:w-[22px] after:bg-ink after:content-['']" />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-navy pb-[110px] pt-[92px] text-white">
          <svg
            className="absolute right-[-8%] top-[-10%] z-[1] w-[78%] max-w-[900px] opacity-50"
            viewBox="0 0 700 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 420 C 260 420, 430 300, 640 60"
              stroke="#0769B2"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M40 460 C 260 460, 440 340, 660 100"
              stroke="#0B3B63"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
          <div className="relative z-[2] mx-auto max-w-[1120px] px-7">
            <h1 className="max-w-[15ch] text-[clamp(2.1rem,4.6vw,3.4rem)] text-white">
              {t.hero.title}
            </h1>
            <p className="mt-[22px] max-w-[46ch] text-[1.08rem] text-[#C9D8E6]">
              {t.hero.sub}
            </p>
            <div className="mt-[38px] flex flex-wrap gap-4">
              <a href="#contact" className={btnPrimary}>
                {t.hero.ctaPrimary}
              </a>
              <a href="#services" className={btnGhost}>
                {t.hero.ctaGhost}
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Positioning ---------- */}
        <section id="positioning" className="bg-ink py-[76px] text-white">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="grid grid-cols-[220px_1fr] items-start gap-[50px] max-[760px]:grid-cols-1 max-[760px]:gap-[26px]">
              <div className="flex flex-col gap-[6px] border-t-2 border-blue pt-[6px]">
                <span className="text-[.8rem] text-[#8FA6BE]">
                  {t.positioning.sectorLabel}
                </span>
                <span className="font-serif text-[1.1rem] text-white">
                  {t.positioning.sectorValue}
                </span>
              </div>
              <div>
                <h2 className="mb-[22px] max-w-[22ch] text-[clamp(1.5rem,2.6vw,2.05rem)] text-white">
                  {t.positioning.h2}
                </h2>
                {t.positioning.paragraphs.map((p, i) => (
                  <p key={i} className="mb-4 max-w-[62ch] text-base text-[#C7D2DC]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="py-[84px]">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="mb-[52px] max-w-[58ch]">
              <span className="mb-[10px] block text-[14px] font-semibold text-blue">
                {t.services.kicker}
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)]">{t.services.h2}</h2>
              <p className="mt-4 text-[1.02rem] text-grey">{t.services.desc}</p>
            </div>

            <div className="grid grid-cols-2 border-t border-line max-[720px]:grid-cols-1">
              {t.services.items.map((s, i) => {
                const leftCol = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`border-b border-line py-[30px] ${
                      leftCol
                        ? 'border-r border-line pl-0 pr-[30px] max-[720px]:border-r-0 max-[720px]:pr-0'
                        : 'pl-[30px] max-[720px]:pl-0'
                    }`}
                  >
                    <h3 className="mb-[10px] text-[1.18rem]">{s.h}</h3>
                    <p className="text-[.98rem] text-grey">{s.p}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 border border-l-[3px] border-line border-l-blue bg-pale px-8 py-[30px]">
              <span className="mb-[14px] inline-block rounded-[2px] border border-blue px-[10px] py-[3px] text-[.74rem] text-blue">
                {t.services.feature.tag}
              </span>
              <h3 className="mb-[10px] text-[1.18rem]">{t.services.feature.h}</h3>
              <p className="max-w-[72ch] text-[.98rem] text-grey">{t.services.feature.p}</p>
            </div>
          </div>
        </section>

        {/* ---------- Programs ---------- */}
        <section id="programmes" className="py-[84px]">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="mb-[52px] max-w-[58ch]">
              <span className="mb-[10px] block text-[14px] font-semibold text-blue">
                {t.programs.kicker}
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)]">{t.programs.h2}</h2>
              <p className="mt-4 text-[1.02rem] text-grey">{t.programs.desc}</p>
            </div>

            <div className="mb-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
              {t.programs.cards.map((card, i) => (
                <div key={i} className="border border-line bg-white px-[26px] py-[28px]">
                  <span className="mb-4 inline-block rounded-[2px] border border-blue px-[9px] py-[3px] text-[.74rem] text-blue">
                    {t.programs.badge}
                  </span>
                  <h3 className="mb-[14px] text-[1.08rem]">{card.h}</h3>
                  <ul className="m-0 list-none p-0">
                    {card.items.map((li, j) => (
                      <li
                        key={j}
                        className="relative border-t border-line py-[9px] pl-4 text-[.92rem] text-grey before:absolute before:left-0 before:top-[17px] before:h-px before:w-[6px] before:bg-blue before:content-['']"
                      >
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 border-l border-t border-line max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
              {t.programs.terms.map((term, i) => (
                <div key={i} className="border-b border-r border-line px-[22px] py-6">
                  <p className="mb-2 font-serif text-base text-ink">{term.h}</p>
                  <p className="text-[.84rem] text-grey">{term.p}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#financement" className={btnPrimary}>
                {t.programs.cta}
              </a>
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="bg-pale py-[84px]">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="mb-[52px] max-w-[58ch]">
              <span className="mb-[10px] block text-[14px] font-semibold text-blue">
                {t.about.kicker}
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)]">{t.about.h2}</h2>
            </div>

            <div className="grid grid-cols-[300px_1fr] items-start gap-[56px] max-[760px]:grid-cols-1">
              <div className="relative max-[760px]:max-w-[260px]">
                <div className="absolute bottom-[-14px] left-[14px] right-[-14px] top-[14px] z-[-1] border border-blue" />
                <img
                  src="/marc-nguesson.jpg"
                  alt={t.about.name}
                  className="w-full rounded-[2px] [filter:grayscale(12%)]"
                />
                <p className="mt-[18px] font-serif text-[1.15rem] font-semibold">
                  {t.about.name}
                </p>
                <p className="mt-[2px] text-[.92rem] text-grey">{t.about.role}</p>
              </div>
              <div>
                <blockquote className="mb-[30px] mt-0 border-l-[3px] border-blue pl-[22px] font-serif text-[1.28rem] italic leading-[1.5] text-navy">
                  {t.about.quote}
                  <cite className="mt-[14px] block text-[.9rem] not-italic text-grey">
                    {t.about.quoteCite}
                  </cite>
                </blockquote>
                <div>
                  {t.about.bio.map((p, i) => (
                    <p key={i} className="mb-4 text-[1.02rem] text-[#2A2F35]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Articles ---------- */}
        <section id="articles" className="py-[84px]">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="mb-[52px] max-w-[58ch]">
              <span className="mb-[10px] block text-[14px] font-semibold text-blue">
                {t.articles.kicker}
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)]">{t.articles.h2}</h2>
              <p className="mt-4 text-[1.02rem] text-grey">{t.articles.desc}</p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-[760px]:grid-cols-1">
              {t.articles.cards.map((card, i) => (
                <div key={i} className="border border-line bg-white px-[26px] py-[30px]">
                  <h3 className="mb-3 text-[1.05rem]">{card.h}</h3>
                  <p className="text-[.9rem] text-grey">{card.status}</p>
                  <span className="mt-[18px] inline-block rounded-[2px] border border-blue px-[10px] py-1 text-[.78rem] text-blue">
                    {card.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Financing form ---------- */}
        <section id="financement" className="bg-pale py-[84px]">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="mb-[52px] max-w-[58ch]">
              <span className="mb-[10px] block text-[14px] font-semibold text-blue">
                {t.finance.kicker}
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)]">{t.finance.h2}</h2>
              <p className="mt-4 text-[1.02rem] text-grey">{t.finance.desc}</p>
            </div>

            <form ref={formRef} className="mt-[10px]" onSubmit={handleSubmit}>
              {t.finance.blocks.map((block, bi) => (
                <div
                  key={bi}
                  className="mb-6 border border-line bg-white px-8 pb-2 pt-8 max-[700px]:px-[22px] max-[700px]:pb-[6px] max-[700px]:pt-[26px]"
                >
                  {block.title && <h3 className="mb-1 text-[1.05rem]">{block.title}</h3>}
                  {block.note && (
                    <p className="mb-[18px] text-[.86rem] text-grey">{block.note}</p>
                  )}
                  {block.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`mb-[22px] grid gap-5 ${colClass[row.cols]}`}
                    >
                      {row.fields.map((field, fi) => (
                        <Field field={field} key={fi} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              <div className="mb-[30px] border-l-[3px] border-blue bg-white px-5 py-[14px] text-[.92rem] text-grey">
                <p>{t.finance.attachNote}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className={`${btnPrimary} disabled:opacity-60`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t.finance.sending : t.finance.submit}
                </button>
              </div>

              {status === 'ok' && (
                <p
                  role="status"
                  className="mt-4 border-l-[3px] border-blue bg-white px-5 py-[14px] text-[.95rem] text-ink"
                >
                  {t.finance.successMsg}
                </p>
              )}

              {status === 'error' && (
                <p
                  role="alert"
                  className="mt-4 border-l-[3px] border-[#c0392b] bg-white px-5 py-[14px] text-[.95rem] text-ink"
                >
                  {t.finance.errorMsg}{' '}
                  <button
                    type="button"
                    onClick={sendByMail}
                    className="text-blue underline underline-offset-2"
                  >
                    {t.finance.errorMailLink}
                  </button>
                </p>
              )}
            </form>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="bg-navy py-[84px] text-white">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="mb-[52px] max-w-[58ch]">
              <span className="mb-[10px] block text-[14px] font-semibold text-[#7FB6E0]">
                {t.contact.kicker}
              </span>
              <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] text-white">{t.contact.h2}</h2>
              <p className="mt-4 text-[1.02rem] text-[#C9D8E6]">{t.contact.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-[30px] max-[640px]:grid-cols-1">
              <div className="rounded-[2px] border border-white/[0.18] p-[26px]">
                <p className="mb-2 text-[.82rem] text-[#9FB6CC]">{t.contact.phoneLabel}</p>
                <a
                  className="font-serif text-[1.2rem] hover:text-blue"
                  href={t.contact.phoneHref}
                >
                  {t.contact.phone}
                </a>
              </div>
              <div className="rounded-[2px] border border-white/[0.18] p-[26px]">
                <p className="mb-2 text-[.82rem] text-[#9FB6CC]">{t.contact.emailLabel}</p>
                <a
                  className="font-serif text-[1.2rem] hover:text-blue"
                  href={`mailto:${t.contact.email}`}
                >
                  {t.contact.email}
                </a>
              </div>
            </div>
            <div className="mt-[34px] flex flex-wrap gap-4">
              <a href={`mailto:${t.contact.email}`} className={btnPrimary}>
                {t.contact.ctaPrimary}
              </a>
              <a href={t.contact.phoneHref} className={btnGhost}>
                {t.contact.ctaGhost}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line pt-[46px] [padding-bottom:calc(46px+env(safe-area-inset-bottom,0px))]">
        <div className="mx-auto max-w-[1120px] px-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <img src="/logo.png" alt="Natal Capital Pro." className="h-[30px]" />
            <div className="flex flex-wrap gap-6 text-[.92rem] text-grey">
              {t.footer.links.map((item) => (
                <a key={item.href + item.label} href={item.href} className="hover:text-blue">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-7 text-[.82rem] text-grey">{t.footer.copyright}</p>
        </div>
      </footer>
    </>
  );
}
