// Data-driven form used by both the "Describe your project" (solutions) and
// "Financing request" sections. It renders the field schema from lib/content
// and — the one behaviour kept from the live site rather than the static
// mock-up — submits through Web3Forms, falling back to a prefilled mailto:
// link if that request fails.

import { Fragment, useState } from 'react';
import {
  CONTACT,
  type Field,
  type FieldRow,
  type FormBlock,
  type Lang,
  type MailMeta,
  type SiteContent,
} from '../lib/content';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type StatusCopy = SiteContent['formStatus'];

type MailerState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'ok' }
  | { kind: 'error'; mailto: string };

interface RequestFormProps {
  id: string;
  lang: Lang;
  blocks: FormBlock[];
  submitLabel: string;
  mail: MailMeta;
  statusCopy: StatusCopy;
  /** Wrap each block in its own `.form-block` card (financing form). */
  wrapBlocks: boolean;
  /** When set, the whole form sits inside one titled card (solutions form). */
  heading?: { title: string; note: string };
}

export function RequestForm({
  id,
  lang,
  blocks,
  submitLabel,
  mail,
  statusCopy,
  wrapBlocks,
  heading,
}: RequestFormProps) {
  const { state, handleSubmit } = useMailer(mail);
  const sending = state.kind === 'sending';

  const form = (
    <form
      id={id}
      className="finance-form"
      style={heading ? { marginTop: 4 } : undefined}
      onSubmit={handleSubmit}
      noValidate
    >
      {blocks.map((block, i) => {
        const rows = block.rows.map((row, j) => (
          <FieldRowGroup key={j} row={row} lang={lang} />
        ));
        if (!wrapBlocks) return <Fragment key={i}>{rows}</Fragment>;
        return (
          <div key={i} className="form-block">
            {block.title && <h3>{block.title}</h3>}
            {block.note && <p className="field-note">{block.note}</p>}
            {rows}
          </div>
        );
      })}

      <div className="cta-row">
        <button type="submit" className="btn primary" disabled={sending}>
          {sending ? statusCopy.sending : submitLabel}
        </button>
      </div>

      {state.kind === 'ok' && <p className="form-status">{statusCopy.ok}</p>}
      {state.kind === 'error' && (
        <p className="form-status error">
          {statusCopy.errorPre}
          <a href={state.mailto}>{statusCopy.errorLink}</a>
        </p>
      )}
    </form>
  );

  if (!heading) return form;
  return (
    <div className="form-block">
      <h3>{heading.title}</h3>
      <p className="field-note">{heading.note}</p>
      {form}
    </div>
  );
}

// ---------- Field rendering ----------

const COLS = { 1: 'one', 2: 'two', 3: 'three' } as const;

function FieldRowGroup({ row, lang }: { row: FieldRow; lang: Lang }) {
  return (
    <div className={`field-row ${COLS[row.cols]}`}>
      {row.fields.map((field) => (
        <FieldControl key={field.name} field={field} lang={lang} />
      ))}
    </div>
  );
}

function FieldControl({ field, lang }: { field: Field; lang: Lang }) {
  if (field.type === 'checkbox') {
    return (
      <label className="field checkbox-field">
        <input
          type="checkbox"
          name={field.name}
          value={lang === 'en' ? 'Yes' : 'Oui'}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  return (
    <label className="field">
      <span>{field.label}</span>
      {field.type === 'select' ? (
        <select name={field.name} defaultValue="">
          {field.options?.map((option, i) =>
            i === 0 ? (
              <option key={option} value="">
                {option}
              </option>
            ) : (
              <option key={option}>{option}</option>
            )
          )}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea name={field.name} rows={4} />
      ) : (
        <input type="text" name={field.name} />
      )}
    </label>
  );
}

// ---------- Submission ----------

function useMailer(mail: MailMeta) {
  const [state, setState] = useState<MailerState>({ kind: 'idle' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Ordered list of the filled-in fields (empty ones are skipped).
    const entries: [string, string][] = [];
    new FormData(form).forEach((value, key) => {
      const text = typeof value === 'string' ? value.trim() : '';
      if (text) entries.push([key, text]);
    });

    setState({ kind: 'sending' });
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: mail.subject,
          from_name: 'Site Natal Capital Pro',
          ...Object.fromEntries(entries),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error('web3forms rejected the submission');
      setState({ kind: 'ok' });
      form.reset();
    } catch {
      setState({ kind: 'error', mailto: buildMailto(mail, entries) });
    }
  }

  return { state, handleSubmit };
}

function buildMailto(mail: MailMeta, entries: [string, string][]) {
  const lines = entries.map(([label, value]) => `${label} : ${value}`);
  const body = [mail.intro, lines.join('\n'), mail.reminder]
    .filter(Boolean)
    .join('\n\n');
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    mail.subject
  )}&body=${encodeURIComponent(body)}`;
}
