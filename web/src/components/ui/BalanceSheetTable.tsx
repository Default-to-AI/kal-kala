import type { ReactNode } from 'react';

export interface BalanceSheetRow {
  /** Hebrew label for the row (e.g. "לקוחות", "מזומנים ושווי מזומנים"). */
  label: string;
  /** Current-period value. Negative numbers shown in parentheses. */
  current: number;
  /** Prior-period value. */
  prior: number;
  /** Indent the row (e.g. for sub-items under a header). */
  indent?: boolean;
  /** Render as a sub-total / total: bold, top border, slightly darker bg. */
  bold?: boolean;
  /** Hide the prior column (some BS items only exist in one period). */
  hidePrior?: boolean;
  /** Optional note superscript (e.g. "1", "2"). */
  note?: string;
  /** Free-form content to render in the label cell (e.g. parenthesized value). */
  labelSuffix?: ReactNode;
}

export interface BalanceSheetSection {
  /** Section title in Hebrew, e.g. "נכסים". */
  title: string;
  rows: BalanceSheetRow[];
}

export interface BalanceSheetTableProps {
  /** Current-period date (right column). */
  currentDate: string;
  /** Prior-period date (left column). */
  priorDate: string;
  sections: BalanceSheetSection[];
  /** Optional grand total row (rendered below all sections). */
  total: { current: number; prior: number; label?: string };
  /** Optional title above the table. */
  caption?: string;
}

const NIS_FORMAT = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  maximumFractionDigits: 0,
});

/** Format a number as ₪ with parentheses for negatives. */
function formatNIS(value: number): string {
  if (value < 0) {
    return `(${NIS_FORMAT.format(Math.abs(value))})`;
  }
  return NIS_FORMAT.format(value);
}

/**
 * 3-column balance sheet table.
 *
 * Layout (RTL — columns flip: label is rightmost, prior is leftmost):
 *   [prior date]  |  [current date]  |  [label]
 *
 *   1. Section header rows span the full width.
 *   2. Item rows show label + current + prior.
 *   3. Indented rows for sub-items.
 *   4. Bold rows for totals (top border).
 *   5. Grand total row at the bottom (separated by thicker border).
 *
 * Numbers use DM Sans (per DESIGN.md) via `.t-data` + `tabular-nums` for clean digit alignment.
 */
export function BalanceSheetTable({
  currentDate,
  priorDate,
  sections,
  total,
  caption,
}: BalanceSheetTableProps): React.ReactElement {
  return (
    <div className="my-4 border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)]">
      {caption && (
        <div className="px-4 py-2 text-xs font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] bg-[var(--color-surface-raised)]/30 text-center">
          {caption}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                פרט
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] border-x border-[var(--color-border)]/50">
                {currentDate}
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                {priorDate}
              </th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, sIdx) => (
              <SectionRows
                key={sIdx}
                title={section.title}
                rows={section.rows}
                isFirst={sIdx === 0}
              />
            ))}
            <tr className="border-t-2 border-[var(--color-primary)]/40 bg-[var(--color-primary)]/8">
              <td className="px-3 py-2.5 text-start font-extrabold text-[var(--color-primary)]">
                {total.label ?? 'סה"כ מאזן'}
              </td>
              <td className="px-3 py-2.5 text-end font-extrabold text-[var(--color-primary)] t-data tabular-nums border-x border-[var(--color-primary)]/20">
                {formatNIS(total.current)}
              </td>
              <td className="px-3 py-2.5 text-end font-extrabold text-[var(--color-primary)] t-data tabular-nums">
                {formatNIS(total.prior)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionRows({
  title,
  rows,
  isFirst,
}: {
  title: string;
  rows: BalanceSheetRow[];
  isFirst: boolean;
}) {
  return (
    <>
      <tr
        className={`bg-[var(--color-accent-cobalt)]/8 ${
          isFirst ? '' : 'border-t border-[var(--color-border)]'
        }`}
      >
        <td colSpan={3} className="px-3 py-2 text-start font-bold text-[var(--color-accent-cobalt-strong)] text-xs uppercase tracking-wider">
          {title}
        </td>
      </tr>
      {rows.map((row, idx) => (
        <tr
          key={idx}
          className={`border-b border-[var(--color-border)]/30 last:border-b-0 ${
            row.bold ? 'bg-[var(--color-surface-raised)]/30 font-bold border-t-2 border-[var(--color-border-strong)]/40' : ''
          }`}
        >
          <td
            className={`px-3 py-1.5 text-start ${
              row.indent ? 'pl-6 text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span>{row.label}</span>
              {row.labelSuffix}
              {row.note && (
                <sup className="text-[10px] font-bold text-[var(--color-accent-cobalt)]">
                  ({row.note})
                </sup>
              )}
            </span>
          </td>
          <td
            className={`px-3 py-1.5 text-end t-data tabular-nums border-x border-[var(--color-border)]/30 ${
              row.bold ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {formatNIS(row.current)}
          </td>
          <td
            className={`px-3 py-1.5 text-end t-data tabular-nums ${
              row.bold ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {row.hidePrior ? '' : formatNIS(row.prior)}
          </td>
        </tr>
      ))}
    </>
  );
}
