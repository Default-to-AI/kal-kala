/**
 * FillableCashFlowStatement.tsx
 *
 * Interactive version of the cash flow statement (indirect method).
 * Lets the student type values into each row; subtotals and the
 * ending-cash reconciliation auto-compute live.
 *
 * A "בדוק את התשובה" button compares each row to a stored `solution`
 * value and marks rows ✅/❌/— (skipped if empty). The final ending
 * cash is compared to a target value for a full reconciliation check.
 *
 * Mirrors the layout of the static `CashFlowStatement` so the visual
 * language is consistent (section colors, subtotal styling, RTL right-
 * aligned labels, left-aligned amounts). The amount cell is replaced
 * with a right-aligned numeric `<input>` so the cursor appears on the
 * right side of the box (Hebrew RTL idiom).
 *
 * Per-row state is persisted to localStorage under `${storageKey}:inputs`
 * so a refresh doesn't wipe the student's work.
 */

import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Search } from 'lucide-react';

import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import type { CashFlowSection, CashFlowRow } from './CashFlowStatement';
import { Button } from './Button';

const NIS_FORMAT = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  maximumFractionDigits: 0,
});

function formatNIS(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '—';
  if (value < 0) {
    return `(${NIS_FORMAT.format(Math.abs(value))})`;
  }
  return NIS_FORMAT.format(value);
}

/**
 * Parse a user-typed amount. Accepts:
 *   "27000"        → 27000
 *   "27,000"       → 27000  (thousands separator)
 *   "-27000"       → -27000
 *   "(27,000)"     → -27000  (accounting parens for negative)
 *   "  27,000 ₪ "  → 27000  (whitespace + currency symbol)
 *   ""             → null
 *   "abc"          → null
 */
function parseAmount(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  const isParensNeg = trimmed.startsWith('(') && trimmed.endsWith(')');
  const inner = isParensNeg ? trimmed.slice(1, -1) : trimmed;
  const cleaned = inner.replace(/[₪,\s]/g, '');
  if (cleaned === '' || cleaned === '-') return null;
  const num = parseFloat(cleaned);
  if (Number.isNaN(num)) return null;
  return isParensNeg ? -Math.abs(num) : num;
}

const SECTION_THEMES: Record<string, { bar: string; text: string }> = {
  'פעילות שוטפת': {
    bar: 'bg-[var(--color-primary)]/15 border-[var(--color-primary)]/30',
    text: 'text-[var(--color-primary)]',
  },
  'פעילות השקעה': {
    bar: 'bg-[var(--color-accent-cobalt)]/15 border-[var(--color-accent-cobalt)]/30',
    text: 'text-[var(--color-accent-cobalt-strong)]',
  },
  'פעילות מימון': {
    bar: 'bg-[var(--color-accent-brass)]/15 border-[var(--color-accent-brass)]/30',
    text: 'text-[var(--color-accent-brass)]',
  },
};

export interface FillableCashFlowStatementProps {
  sections: CashFlowSection[];
  /** Beginning cash balance (given from the balance sheet). */
  beginningCash: number;
  /** Target ending cash for the reconciliation check. */
  targetEndingCash: number;
  /** Optional caption above the table. */
  caption?: string;
  /** Optional note at the bottom. */
  footer?: React.ReactNode;
  /** localStorage key prefix for persisting user inputs. */
  storageKey?: string;
}

type RowStatus = 'correct' | 'wrong' | 'skipped';

export function FillableCashFlowStatement({
  sections,
  beginningCash,
  targetEndingCash,
  caption,
  footer,
  storageKey = 'fillable-cf',
}: FillableCashFlowStatementProps): React.ReactElement {
  const [inputs, setInputs] = useLocalStorageState<Record<string, string>>(
    `${storageKey}:inputs`,
    {},
  );
  const [revealed, setRevealed] = useState(false);

  // Flat list of editable rows (everything except subtotals + rows without a solution)
  const editableRows = useMemo(() => {
    const rows: Array<{
      key: string;
      row: CashFlowRow;
      solution: number;
    }> = [];
    sections.forEach((section, sIdx) => {
      section.rows.forEach((row, rIdx) => {
        if (row.isSubtotal) return;
        if (row.solution === undefined) return;
        rows.push({ key: `${sIdx}-${rIdx}`, row, solution: row.solution });
      });
    });
    return rows;
  }, [sections]);

  /**
   * Key of the last editable input across all sections (e.g. "2-2" for
   * the last financing row). Used to wire Enter on that input to trigger
   * the check, so a student can fill the whole form with the keyboard
   * without ever reaching for the mouse.
   */
  const lastEditableKey = useMemo(() => {
    let lastKey: string | null = null;
    sections.forEach((section, sIdx) => {
      section.rows.forEach((row, rIdx) => {
        if (!row.isSubtotal && row.solution !== undefined) {
          lastKey = `${sIdx}-${rIdx}`;
        }
      });
    });
    return lastKey;
  }, [sections]);

  // Live subtotals: sum every input above the subtotal row in each section
  const computedSubtotals = useMemo(() => {
    const subs: Record<string, number> = {};
    sections.forEach((section, sIdx) => {
      const subIdx = section.rows.findIndex((r) => r.isSubtotal);
      if (subIdx < 0) return;
      let sum = 0;
      for (let i = 0; i < subIdx; i++) {
        const val = parseAmount(inputs[`${sIdx}-${i}`] ?? '');
        if (val !== null) sum += val;
      }
      subs[`${sIdx}-${subIdx}`] = sum;
    });
    return subs;
  }, [sections, inputs]);

  const netChange = useMemo(
    () => Object.values(computedSubtotals).reduce((a, v) => a + v, 0),
    [computedSubtotals],
  );

  const endingCash = beginningCash + netChange;
  const reconciliationOk = endingCash === targetEndingCash;

  const rowStatuses = useMemo<Record<string, RowStatus>>(() => {
    if (!revealed) return {};
    const statuses: Record<string, RowStatus> = {};
    editableRows.forEach(({ key, solution }) => {
      const val = parseAmount(inputs[key] ?? '');
      if (val === null) statuses[key] = 'skipped';
      else if (val === solution) statuses[key] = 'correct';
      else statuses[key] = 'wrong';
    });
    return statuses;
  }, [revealed, editableRows, inputs]);

  const score = useMemo(() => {
    let correct = 0,
      wrong = 0,
      skipped = 0;
    Object.values(rowStatuses).forEach((s) => {
      if (s === 'correct') correct++;
      else if (s === 'wrong') wrong++;
      else skipped++;
    });
    return { correct, wrong, skipped, total: editableRows.length };
  }, [rowStatuses, editableRows]);

  const handleCheck = useCallback(() => setRevealed(true), []);

  const handleReset = useCallback(() => {
    setInputs({});
    setRevealed(false);
  }, [setInputs]);

  const setRowInput = useCallback(
    (key: string, value: string) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [setInputs],
  );

  const hasAnyInput = Object.values(inputs).some((v) => v.trim() !== '');

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
            {sections.map((section, sIdx) => {
              const theme = SECTION_THEMES[section.title] ?? {
                bar: 'bg-[var(--color-surface-raised)] border-[var(--color-border)]',
                text: 'text-[var(--color-text-primary)]',
              };
              return (
                <SectionGroup
                  key={sIdx}
                  section={section}
                  sectionIdx={sIdx}
                  theme={theme}
                  inputs={inputs}
                  setRowInput={setRowInput}
                  computedSubtotals={computedSubtotals}
                  rowStatuses={rowStatuses}
                  revealed={revealed}
                  lastEditableKey={lastEditableKey}
                  onLastInputEnter={handleCheck}
                />
              );
            })}

            {/* Net change row — auto-computed, always read-only */}
            <tr className="border-y-2 border-[var(--color-primary)]/40 bg-[var(--color-primary)]/8">
              <td
                className="px-3 py-2.5 text-start font-extrabold text-[var(--color-primary)]"
                colSpan={2}
              >
                שינוי נטו במזומנים
                <span className="text-[10px] font-normal text-[var(--color-text-tertiary)] ms-2">
                  (מחושב)
                </span>
              </td>
              <td className="px-3 py-2.5 text-end font-extrabold text-[var(--color-primary)] t-data tabular-nums w-40">
                {netChange === 0 ? '—' : formatNIS(netChange)}
              </td>
            </tr>

            {/* Beginning cash — given, read-only */}
            <tr className="border-b border-[var(--color-border)]/30">
              <td className="px-3 py-1.5 text-start" colSpan={2}>
                יתרת מזומנים בתחילת השנה
              </td>
              <td className="px-3 py-1.5 text-end t-data tabular-nums text-[var(--color-text-secondary)] w-40">
                {formatNIS(beginningCash)}
              </td>
            </tr>

            {/* Ending cash — auto-computed, validated against target */}
            <tr
              className={`border-t-2 ${
                revealed
                  ? reconciliationOk
                    ? 'border-[var(--color-success)] bg-[var(--color-success)]/10'
                    : 'border-[var(--color-error)] bg-[var(--color-error)]/10'
                  : 'border-[var(--color-primary)]/40 bg-[var(--color-primary)]/8'
              }`}
            >
              <td
                className="px-3 py-2.5 text-start font-extrabold text-[var(--color-primary)]"
                colSpan={2}
              >
                יתרת מזומנים בסוף השנה
                <span className="text-[10px] font-normal text-[var(--color-text-tertiary)] ms-2">
                  ({formatNIS(beginningCash)} + {formatNIS(netChange)})
                </span>
              </td>
              <td className="px-3 py-2.5 text-end font-extrabold text-[var(--color-primary)] t-data tabular-nums w-40">
                {endingCash === 0 ? '—' : formatNIS(endingCash)}
                {revealed && (
                  <span
                    className={`text-[10px] font-bold ms-2 ${
                      reconciliationOk
                        ? 'text-[var(--color-success)]'
                        : 'text-[var(--color-error)]'
                    }`}
                  >
                    {reconciliationOk
                      ? '✅'
                      : `❌ צפוי ${formatNIS(targetEndingCash)}`}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/30 flex-wrap">
        <div
          className="text-xs text-[var(--color-text-secondary)] min-w-0 flex-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {revealed ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-bold text-[var(--color-text-primary)]">
                ניקוד: {score.correct} / {score.total} נכונות
              </span>
              {score.wrong > 0 && (
                <span className="text-[var(--color-error)] font-semibold">
                  · {score.wrong} שגויות
                </span>
              )}
              {score.skipped > 0 && (
                <span className="text-[var(--color-warning)] font-semibold">
                  · {score.skipped} לא מולאו
                </span>
              )}
              <span
                className={`font-semibold ${
                  reconciliationOk
                    ? 'text-[var(--color-success)]'
                    : 'text-[var(--color-error)]'
                }`}
              >
                · היתרה {reconciliationOk ? 'תואמת ✅' : 'לא תואמת ❌'}
              </span>
            </div>
          ) : (
            <span>
              {editableRows.length} שורות למלא · סכומי הביניים והיתרה מתעדכנים אוטומטית
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Primary action first in DOM so it's the next focusable element
              after the last input — keeps the Tab order Operating → Investing
              → Financing → "בדוק" → "איפוס". RTL flex flips visual order so
              "בדוק" still appears on the left. */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleCheck}
            disabled={revealed}
            leftIcon={<Search size={14} aria-hidden="true" />}
          >
            בדוק את התשובה
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!hasAnyInput && !revealed}
            leftIcon={<RefreshCw size={14} aria-hidden="true" />}
          >
            איפוס
          </Button>
        </div>
      </div>

      {footer && (
        <div className="px-4 py-2 text-xs text-[var(--color-text-tertiary)] border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/20 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}

function SectionGroup({
  section,
  sectionIdx,
  theme,
  inputs,
  setRowInput,
  computedSubtotals,
  rowStatuses,
  revealed,
  lastEditableKey,
  onLastInputEnter,
}: {
  section: CashFlowSection;
  sectionIdx: number;
  theme: { bar: string; text: string };
  inputs: Record<string, string>;
  setRowInput: (key: string, value: string) => void;
  computedSubtotals: Record<string, number>;
  rowStatuses: Record<string, RowStatus>;
  revealed: boolean;
  lastEditableKey: string | null;
  onLastInputEnter: () => void;
}) {
  return (
    <>
      <tr className={`${theme.bar} border-y`}>
        <td colSpan={2} className="px-3 py-2.5 text-start">
          <div className={`text-sm font-bold ${theme.text}`}>{section.title}</div>
          {section.subtitle && (
            <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">
              {section.subtitle}
            </div>
          )}
        </td>
        <td className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] w-40">
          סכום
        </td>
      </tr>
      {section.rows.map((row, rIdx) => {
        const key = `${sectionIdx}-${rIdx}`;

        // Subtotal row — always read-only, auto-computed
        if (row.isSubtotal) {
          const subtotal = computedSubtotals[key] ?? 0;
          return (
            <tr
              key={rIdx}
              className="border-b border-[var(--color-border)]/20 bg-[var(--color-surface-raised)]/30 font-bold border-t border-[var(--color-border-strong)]/30"
            >
              <td
                className="px-3 py-2 text-start font-bold text-[var(--color-text-primary)]"
                colSpan={2}
                dir="rtl"
              >
                {row.label}
                <span className="text-[10px] font-normal text-[var(--color-text-tertiary)] ms-2">
                  (מחושב)
                </span>
              </td>
              <td className="px-3 py-2 text-end t-data tabular-nums font-bold text-[var(--color-text-primary)] w-40" dir="rtl">
                {subtotal === 0 ? '—' : formatNIS(subtotal)}
              </td>
            </tr>
          );
        }

        // Editable row — only if a solution is provided
        if (row.solution === undefined) {
          // Defensive fallback: render as a read-only row (shouldn't happen in fillable mode)
          return (
            <tr
              key={rIdx}
              className="border-b border-[var(--color-border)]/20 last:border-b-0"
            >
              <td
                className={`px-3 py-1.5 text-start ${
                  row.indent ? 'ps-6' : ''
                } text-[var(--color-text-secondary)]`}
                colSpan={2}
              >
                {row.label}
              </td>
              <td className="px-3 py-1.5 text-end t-data tabular-nums text-[var(--color-text-tertiary)] w-40">
                —
              </td>
            </tr>
          );
        }

        const status = rowStatuses[key];
        const value = inputs[key] ?? '';
        return (
          <tr
            key={rIdx}
            className={`border-b border-[var(--color-border)]/20 last:border-b-0 transition-colors ${
              revealed
                ? status === 'correct'
                  ? 'bg-[var(--color-success)]/8'
                  : status === 'wrong'
                  ? 'bg-[var(--color-error)]/8'
                  : status === 'skipped'
                  ? 'bg-[var(--color-surface-raised)]/20'
                  : ''
                : ''
            }`}
          >
            <td
                className={`px-3 py-1.5 text-start ${
                  row.indent ? 'ps-6' : ''
                } text-[var(--color-text-secondary)]`}
                colSpan={2}
                dir="rtl"
              >
              {row.label}
            </td>
            <td className="px-3 py-1.5 w-40" dir="rtl">
              <EditableRowInput
                value={value}
                onChange={(v) => setRowInput(key, v)}
                status={status}
                revealed={revealed}
                solution={row.solution}
                onEnter={key === lastEditableKey ? onLastInputEnter : undefined}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
}

function EditableRowInput({
  value,
  onChange,
  status,
  revealed,
  solution,
  onEnter,
}: {
  value: string;
  onChange: (v: string) => void;
  status: RowStatus | undefined;
  revealed: boolean;
  solution: number;
  /** Called when the user presses Enter inside this input. Only the
   *  last editable row receives this handler (others are undefined). */
  onEnter?: () => void;
}) {
  const isCorrect = revealed && status === 'correct';
  const isWrong = revealed && status === 'wrong';
  const isSkipped = revealed && status === 'skipped';

  // RTL layout: the input is the FIRST flex child so that `justify-end`
  // in RTL flex (inherited from the table) pins it to the far LEFT
  // of the cell. The status icons render AFTER it, sitting between
  // the input and the Hebrew label (which lives in the colSpan=2 cell
  // to the right). Icons animate in via AnimatePresence once the
  // user clicks "בדוק" and the row is graded.
  return (
    <div className="flex items-center gap-1.5 justify-end" dir="rtl">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) {
            e.preventDefault();
            onEnter();
          }
        }}
        disabled={revealed}
        placeholder="—"
        dir="ltr"
        aria-label="סכום"
        className={`w-24 sm:w-28 px-2 py-1 text-sm t-data tabular-nums text-end rounded border transition-colors ${
          isCorrect
            ? 'border-[var(--color-success)]/50 bg-[var(--color-success)]/5 text-[var(--color-text-primary)]'
            : isWrong
            ? 'border-[var(--color-error)]/50 bg-[var(--color-error)]/5 text-[var(--color-text-primary)]'
            : isSkipped
            ? 'border-[var(--color-warning)]/40 bg-[var(--color-warning)]/5 text-[var(--color-text-secondary)]'
            : 'border-[var(--color-border)] bg-[var(--color-background)]/40 text-[var(--color-text-primary)] focus:border-[var(--color-primary)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/30'
        }`}
      />
      <AnimatePresence mode="wait">
        {isCorrect && (
          <motion.span
            key="correct"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
            aria-label="תשובה נכונה"
          >
            <CheckCircle2 size={14} className="text-[var(--color-success)]" />
          </motion.span>
        )}
        {isWrong && (
          <motion.span
            key="wrong"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 inline-flex items-center gap-1"
            aria-label={`תשובה שגויה. הערך הנכון: ${formatNIS(solution)}`}
          >
            <XCircle size={14} className="text-[var(--color-error)]" />
            <span className="text-[10px] t-data tabular-nums text-[var(--color-error)] font-bold whitespace-nowrap">
              {formatNIS(solution)}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
      {isSkipped && (
        <span className="text-[10px] text-[var(--color-warning)] font-bold shrink-0">
          לא מולא
        </span>
      )}
    </div>
  );
}
