/**
 * FillableInvestmentAccountMovement.tsx
 *
 * Interactive T-account-style table for the equity-method investment
 * account (Q3 of the 2017 exam). Shows the 2016 movement of the
 * investment in "חרסינות":
 *
 *   1.4.2016  acquisition (GIVEN — 284,000)
 *   ─         share in net income (STUDENT FILLS — 72,000)
 *   ─         amortization of FV excess on machine (STUDENT FILLS — -5,250)
 *   ─         dividend received (STUDENT FILLS — -24,800)
 *   31.12.2016 ending balance (AUTO-COMPUTED — verified against 325,950)
 *
 * The ending balance is the running total of beginning + all movements.
 * After clicking "בדוק", the per-cell status icons (✅/❌/—) appear,
 * and the ending row turns green if it matches the target balance or
 * red otherwise.
 *
 * Per-row state is persisted to localStorage under `${storageKey}:inputs`
 * so a refresh doesn't wipe the student's work.
 */

import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Search } from 'lucide-react';

import { useLocalStorageState } from '../../hooks/useLocalStorageState';
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

export interface InvestmentRow {
  key: string;
  /** Hebrew description of the movement. */
  label: string;
  /** Hebrew date (e.g. "1.4.2016"). Omitted for the ending row. */
  date?: string;
  /** Beginning-of-year row — read-only, GIVEN. */
  isBeginning?: boolean;
  /** End-of-year row — auto-computed, validated against `targetBalance`. */
  isEnding?: boolean;
  /** Solution for the editable movement (or beginning balance). Not required for ending rows. */
  solution?: number;
}

export interface FillableInvestmentAccountMovementProps {
  rows: readonly InvestmentRow[];
  /** Target ending balance for the reconciliation check (only on isEnding rows). */
  targetBalance: number;
  /** Optional caption above the table. */
  caption?: string;
  /** Optional note at the bottom. */
  footer?: React.ReactNode;
  /** localStorage key prefix for persisting user inputs. */
  storageKey?: string;
}

type RowStatus = 'correct' | 'wrong' | 'skipped';

export function FillableInvestmentAccountMovement({
  rows,
  targetBalance,
  caption,
  footer,
  storageKey = 'fillable-investment',
}: FillableInvestmentAccountMovementProps): React.ReactElement {
  const [inputs, setInputs] = useLocalStorageState<Record<string, string>>(
    `${storageKey}:inputs`,
    {},
  );
  const [revealed, setRevealed] = useState(false);

  // Editable rows = the movements (not beginning, not ending).
  const editableRows = useMemo(
    () => rows.filter((r) => !r.isBeginning && !r.isEnding),
    [rows],
  );

  const beginningRow = rows.find((r) => r.isBeginning);
  const endingRow = rows.find((r) => r.isEnding);

  // Live ending balance = beginning + sum of all movement inputs.
  const computedEnding = useMemo(() => {
    let total = beginningRow?.solution ?? 0;
    editableRows.forEach((r) => {
      const val = parseAmount(inputs[r.key] ?? '');
      if (val !== null && r.solution !== undefined) total += val;
    });
    return total;
  }, [beginningRow, editableRows, inputs]);

  const reconciliationOk = computedEnding === targetBalance;

  // Per-editable-row status (only when revealed).
  const rowStatuses = useMemo<Record<string, RowStatus>>(() => {
    if (!revealed) return {};
    const statuses: Record<string, RowStatus> = {};
    editableRows.forEach((r) => {
      const val = parseAmount(inputs[r.key] ?? '');
      if (val === null) statuses[r.key] = 'skipped';
      else if (r.solution === undefined) statuses[r.key] = 'wrong';
      else if (val === r.solution) statuses[r.key] = 'correct';
      else statuses[r.key] = 'wrong';
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
          <thead>
            <tr className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                תאריך
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                תיאור
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] w-40">
                חשבון השקעה
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isBeginning = !!row.isBeginning;
              const isEnding = !!row.isEnding;

              if (isBeginning) {
                return (
                  <tr
                    key={row.key}
                    className="border-b border-[var(--color-border)]/20 bg-[var(--color-primary)]/8"
                  >
                    <td
                      className="px-3 py-2 text-start text-xs text-[var(--color-text-secondary)] whitespace-nowrap"
                      dir="rtl"
                    >
                      {row.date}
                    </td>
                    <td
                      className="px-3 py-2 text-start text-sm font-bold text-[var(--color-text-primary)]"
                      dir="rtl"
                    >
                      {row.label}
                    </td>
                    <td
                      className="px-3 py-2 text-end t-data tabular-nums font-bold text-[var(--color-primary)] w-40"
                      dir="rtl"
                    >
                      {formatNIS(row.solution ?? 0)}
                    </td>
                  </tr>
                );
              }

              if (isEnding) {
                return (
                  <tr
                    key={row.key}
                    className={`border-t-2 ${
                      revealed
                        ? reconciliationOk
                          ? 'border-[var(--color-success)] bg-[var(--color-success)]/10'
                          : 'border-[var(--color-error)] bg-[var(--color-error)]/10'
                        : 'border-[var(--color-primary)]/40 bg-[var(--color-primary)]/8'
                    }`}
                  >
                    <td
                      className="px-3 py-2.5 text-start text-xs text-[var(--color-text-secondary)]"
                      dir="rtl"
                    >
                      31.12.2016
                    </td>
                    <td
                      className="px-3 py-2.5 text-start text-sm font-extrabold text-[var(--color-primary)]"
                      dir="rtl"
                    >
                      {row.label}
                      <span className="text-[10px] font-normal text-[var(--color-text-tertiary)] ms-2">
                        (מחושב)
                      </span>
                    </td>
                    <td
                      className="px-3 py-2.5 text-end t-data tabular-nums font-extrabold text-[var(--color-primary)] w-40"
                      dir="rtl"
                    >
                      {computedEnding === 0 ? '—' : formatNIS(computedEnding)}
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
                            : `❌ צפוי ${formatNIS(targetBalance)}`}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              }

              // Editable movement row
              const status = rowStatuses[row.key];
              const value = inputs[row.key] ?? '';
              const rowSolution = row.solution ?? 0;
              return (
                <tr
                  key={row.key}
                  className={`border-b border-[var(--color-border)]/20 transition-colors ${
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
                    className="px-3 py-2 text-start text-xs text-[var(--color-text-tertiary)] whitespace-nowrap"
                    dir="rtl"
                  >
                    {row.date}
                  </td>
                  <td
                    className="px-3 py-2 text-start text-sm text-[var(--color-text-secondary)]"
                    dir="rtl"
                  >
                    {row.label}
                  </td>
                  <td className="px-3 py-1.5 w-40" dir="rtl">
                    <EditableMovementInput
                      value={value}
                      onChange={(v) => setRowInput(row.key, v)}
                      status={status}
                      revealed={revealed}
                      solution={rowSolution}
                    />
                  </td>
                </tr>
              );
            })}
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
                ניקוד: {score.correct} / {score.total} תנועות נכונות
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
                · יתרה {reconciliationOk ? 'תואמת ✅' : 'לא תואמת ❌'}
              </span>
            </div>
          ) : (
            <span>
              {editableRows.length} תנועות למלא · יתרת הסגירה מתעדכנת אוטומטית
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
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

function EditableMovementInput({
  value,
  onChange,
  status,
  revealed,
  solution,
}: {
  value: string;
  onChange: (v: string) => void;
  status: RowStatus | undefined;
  revealed: boolean;
  solution: number;
}) {
  const isCorrect = revealed && status === 'correct';
  const isWrong = revealed && status === 'wrong';
  const isSkipped = revealed && status === 'skipped';

  // RTL layout: input is the FIRST flex child so `justify-end` in RTL
  // flex pins it to the far LEFT. Status icons render AFTER it, sitting
  // between the input and the Hebrew label.
  return (
    <div className="flex items-center gap-1.5 justify-end" dir="rtl">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={revealed}
        placeholder="—"
        dir="ltr"
        aria-label="תנועה בחשבון ההשקעה"
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
