import type { ReactNode } from 'react';

export interface CashFlowRow {
  /** Hebrew label for the line. */
  label: string;
  /** Amount. Negative numbers shown in parentheses. */
  amount: number;
  /** Indent the row (sub-item under a section header). */
  indent?: boolean;
  /** Bold: subtotal of a section. */
  bold?: boolean;
  /** Subtotal-style (top border). Use for section totals. */
  isSubtotal?: boolean;
  /**
   * Expected solution value for fillable templates (validated by
   * `FillableCashFlowStatement`). Optional — rows without a solution
   * are not user-editable in fillable mode.
   */
  solution?: number;
}

export interface CashFlowSection {
  /** Section title in Hebrew, e.g. "פעילות שוטפת". */
  title: string;
  /** A subtitle below the section title (e.g. "שיטת הגישה העקיפה"). */
  subtitle?: string;
  /** Section rows. The last row should typically be the subtotal (isSubtotal=true). */
  rows: CashFlowRow[];
}

export interface CashFlowStatementProps {
  sections: CashFlowSection[];
  /** Net change in cash (sum of all section subtotals). */
  netChange: number;
  /** Beginning cash balance. */
  beginningCash: number;
  /** Ending cash balance (= beginning + net change). */
  endingCash: number;
  /** Optional caption above the statement. */
  caption?: string;
  /** Optional note at the bottom (e.g. "ההצגה לפי הגישה העקיפה"). */
  footer?: ReactNode;
}

const NIS_FORMAT = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  maximumFractionDigits: 0,
});

function formatNIS(value: number): string {
  if (value < 0) {
    return `(${NIS_FORMAT.format(Math.abs(value))})`;
  }
  return NIS_FORMAT.format(value);
}

/**
 * Cash flow statement — indirect method layout.
 *
 * Renders 3 colored sections (Operating, Investing, Financing), each with
 * its own tinted header bar, rows, and a subtotal. Bottom panel shows the
 * net change + beginning/ending cash reconciliation.
 *
 * Hebrew RTL: labels right-aligned, numbers left-aligned (matches balance sheet).
 * Numbers use DM Sans via `.t-data` + `tabular-nums`.
 */
export function CashFlowStatement({
  sections,
  netChange,
  beginningCash,
  endingCash,
  caption,
  footer,
}: CashFlowStatementProps): React.ReactElement {
  return (
    <div className="my-4 border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)]">
      {caption && (
        <div className="px-4 py-2 text-xs font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] bg-[var(--color-surface-raised)]/30 text-center">
          {caption}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <tbody>
            {sections.map((section, sIdx) => (
              <SectionGroup
                key={sIdx}
                title={section.title}
                subtitle={section.subtitle}
                rows={section.rows}
              />
            ))}

            {/* Net change */}
            <tr className="border-y-2 border-[var(--color-primary)]/40 bg-[var(--color-primary)]/8">
              <td className="px-3 py-2.5 text-start font-extrabold text-[var(--color-primary)]" colSpan={2}>
                שינוי נטו במזומנים
              </td>
              <td className="px-3 py-2.5 text-start font-extrabold text-[var(--color-primary)] t-data tabular-nums w-32">
                {formatNIS(netChange)}
              </td>
            </tr>

            {/* Beginning + ending cash */}
            <tr className="border-b border-[var(--color-border)]/30">
              <td className="px-3 py-1.5 text-start" colSpan={2}>
                יתרת מזומנים בתחילת השנה
              </td>
              <td className="px-3 py-1.5 text-end t-data tabular-nums text-[var(--color-text-secondary)]">
                {formatNIS(beginningCash)}
              </td>
            </tr>
            <tr className="border-t-2 border-[var(--color-primary)]/40 bg-[var(--color-primary)]/8">
              <td className="px-3 py-2.5 text-start font-extrabold text-[var(--color-primary)]" colSpan={2}>
                יתרת מזומנים בסוף השנה
              </td>
              <td className="px-3 py-2.5 text-start font-extrabold text-[var(--color-primary)] t-data tabular-nums">
                {formatNIS(endingCash)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {footer && (
        <div className="px-4 py-2 text-xs text-[var(--color-text-tertiary)] border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/20 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}

const SECTION_THEMES: Record<string, { bar: string; text: string }> = {
  'פעילות שוטפת': { bar: 'bg-[var(--color-primary)]/15 border-[var(--color-primary)]/30', text: 'text-[var(--color-primary)]' },
  'פעילות השקעה': { bar: 'bg-[var(--color-accent-cobalt)]/15 border-[var(--color-accent-cobalt)]/30', text: 'text-[var(--color-accent-cobalt-strong)]' },
  'פעילות מימון': { bar: 'bg-[var(--color-accent-brass)]/15 border-[var(--color-accent-brass)]/30', text: 'text-[var(--color-accent-brass)]' },
};

function SectionGroup({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle?: string;
  rows: CashFlowRow[];
}) {
  const theme = SECTION_THEMES[title] ?? {
    bar: 'bg-[var(--color-surface-raised)] border-[var(--color-border)]',
    text: 'text-[var(--color-text-primary)]',
  };

  return (
    <>
      <tr className={`${theme.bar} border-y`}>
        <td colSpan={2} className="px-3 py-2 text-start">
          <div className={`text-sm font-bold ${theme.text}`}>{title}</div>
          {subtitle && (
            <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
              {subtitle}
            </div>
          )}
        </td>
        <td className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
          סכום
        </td>
      </tr>
      {rows.map((row, idx) => (
        <tr
          key={idx}
          className={`border-b border-[var(--color-border)]/20 last:border-b-0 ${
            row.isSubtotal ? 'bg-[var(--color-surface-raised)]/30 font-bold border-t border-[var(--color-border-strong)]/30' : ''
          }`}
        >
          <td
            className={`px-3 py-1.5 text-start ${
              row.indent ? 'pl-6' : ''
            } ${row.isSubtotal ? 'font-bold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
            colSpan={2}
          >
            {row.label}
          </td>
          <td
            className={`px-3 py-1.5 text-end t-data tabular-nums ${
              row.isSubtotal ? 'font-bold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {row.amount === 0 ? '—' : formatNIS(row.amount)}
          </td>
        </tr>
      ))}
    </>
  );
}
