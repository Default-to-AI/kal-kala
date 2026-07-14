/**
 * FillableEquityChangesStatement.tsx
 *
 * Interactive version of the Statement of Changes in Equity.
 * Mirrors the layout of a real accounting statement: 5 columns (Common
 * Stock, Premium, Warrants, Retained Earnings, Total) and N rows
 * (beginning balance + events + ending balance).
 *
 * The student fills in the non-zero equity components per event; the
 * Total column and ending balance auto-compute live. A "בדוק את
 * התשובה" button compares each cell to a stored `solution` value and
 * marks rows ✅/❌/— (skipped if empty). The final ending RE is also
 * compared to a `targetEndingRE` for a full reconciliation check.
 *
 * Per-row state is persisted to localStorage under `${storageKey}:inputs`
 * so a refresh doesn't wipe the student's work.
 */

import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Search, Info } from 'lucide-react';

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

export type EquityColumnKey =
  | 'commonStock'
  | 'premium'
  | 'warrants'
  | 'retainedEarnings';

export interface EquityColumn {
  key: EquityColumnKey | 'total';
  title: string;
  subtitle?: string;
  /** Marks the auto-computed "Total" column — not editable, not scored. */
  isTotal?: boolean;
}

export interface EquityRow {
  key: string;
  label: string;
  date?: string;
  /** Beginning balance row — non-RE cells are read-only, RE may be editable. */
  isBeginning?: boolean;
  /** Ending balance row — fully auto-computed, read-only. */
  isEnding?: boolean;
  /** Non-equity event shown as read-only informational row (all zeros). */
  isInformational?: boolean;
  /**
   * Per-column solution values. `null` = cell not editable (either
   * not part of this event, or an auto-computed ending cell).
   * `0` = editable, the expected value is zero.
   */
  solution: Record<EquityColumnKey, number | null>;
  /** Target ending RE for the reconciliation check (only on isEnding rows). */
  targetEndingRE?: number;
}

export interface FillableEquityChangesStatementProps {
  columns: readonly EquityColumn[];
  rows: readonly EquityRow[];
  /** localStorage key prefix for persisting user inputs. */
  storageKey?: string;
  /** Optional caption above the table. */
  caption?: string;
  /** Optional note at the bottom. */
  footer?: React.ReactNode;
}

type RowStatus = 'correct' | 'wrong' | 'skipped';

export function FillableEquityChangesStatement({
  columns,
  rows,
  storageKey = 'fillable-equity',
  caption,
  footer,
}: FillableEquityChangesStatementProps): React.ReactElement {
  const [inputs, setInputs] = useLocalStorageState<Record<string, string>>(
    `${storageKey}:inputs`,
    {},
  );
  const [revealed, setRevealed] = useState(false);

  // Flat list of editable cells — every (row, column) where the solution is non-null
  // and the row is not an ending or informational row.
  const editableCells = useMemo(() => {
    const cells: Array<{
      key: string;
      rowKey: string;
      colKey: EquityColumnKey;
      solution: number;
    }> = [];
    rows.forEach((row) => {
      if (row.isEnding || row.isInformational) return;
      (Object.keys(row.solution) as EquityColumnKey[]).forEach((colKey) => {
        const val = row.solution[colKey];
        if (val !== null) {
          cells.push({
            key: `${row.key}-${colKey}`,
            rowKey: row.key,
            colKey,
            solution: val,
          });
        }
      });
    });
    return cells;
  }, [rows]);

  // For each column, compute the running cumulative sum down to each row.
  // The "ending" row is just the running sum at the end (= beginning + sum
  // of all event changes). This is what the JSX reads for ending-balance
  // auto-display and the reconciliation check.
  // Running column totals (cumulative through each row).
  const columnRunningTotals = useMemo(() => {
    const totals: Record<string, Record<string, number>> = {};
    const nonTotalCols = columns.filter((c) => !c.isTotal) as EquityColumn[];
    nonTotalCols.forEach((col) => {
      const colKey = col.key as EquityColumnKey;
      totals[col.key] = {};
      let running = 0;
      rows.forEach((row) => {
        if (row.isBeginning) {
          running = row.solution[colKey] ?? 0;
        } else if (row.isInformational) {
          // no-op
        } else if (row.isEnding) {
          // final value already set; keep running
        } else {
          const inputKey = `${row.key}-${colKey}`;
          const val = parseAmount(inputs[inputKey] ?? '');
          if (val !== null) running += val;
        }
        totals[col.key][row.key] = running;
      });
    });
    return totals;
  }, [rows, columns, inputs]);

  // Ending balance per column (used for display + reconciliation).
  const endingBalances = useMemo(() => {
    const balances: Record<string, number> = {};
    Object.entries(columnRunningTotals).forEach(([colKey, byRow]) => {
      const last = rows[rows.length - 1];
      balances[colKey] = byRow[last.key] ?? 0;
    });
    return balances;
  }, [columnRunningTotals, rows]);

  // Per-row Total column (= sum of the 4 non-total columns for that row).
  const rowTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    rows.forEach((row) => {
      let sum = 0;
      Object.entries(columnRunningTotals).forEach(([_, byRow]) => {
        sum += byRow[row.key] ?? 0;
      });
      totals[row.key] = sum;
    });
    return totals;
  }, [rows, columnRunningTotals]);

  // Reconciliation: ending RE should match the given target.
  const endingRow = rows.find((r) => r.isEnding);
  const targetEndingRE = endingRow?.targetEndingRE;
  const endingRE = endingBalances['retainedEarnings'] ?? 0;
  const reconciliationOk =
    targetEndingRE !== undefined && endingRE === targetEndingRE;

  const rowStatuses = useMemo<Record<string, RowStatus>>(() => {
    if (!revealed) return {};
    const statuses: Record<string, RowStatus> = {};
    editableCells.forEach(({ key, solution }) => {
      const val = parseAmount(inputs[key] ?? '');
      if (val === null) statuses[key] = 'skipped';
      else if (val === solution) statuses[key] = 'correct';
      else statuses[key] = 'wrong';
    });
    return statuses;
  }, [revealed, editableCells, inputs]);

  const score = useMemo(() => {
    let correct = 0,
      wrong = 0,
      skipped = 0;
    Object.values(rowStatuses).forEach((s) => {
      if (s === 'correct') correct++;
      else if (s === 'wrong') wrong++;
      else skipped++;
    });
    return { correct, wrong, skipped, total: editableCells.length };
  }, [rowStatuses, editableCells]);

  const handleCheck = useCallback(() => setRevealed(true), []);

  const handleReset = useCallback(() => {
    setInputs({});
    setRevealed(false);
  }, [setInputs]);

  const setCellInput = useCallback(
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
                אירוע
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider whitespace-nowrap ${
                    col.isTotal
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  <div>{col.title}</div>
                  {col.subtitle && (
                    <div className="text-[10px] font-normal text-[var(--color-text-secondary)] mt-0.5">
                      {col.subtitle}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isBeginning = !!row.isBeginning;
              const isEnding = !!row.isEnding;
              const isInformational = !!row.isInformational;

              if (isInformational) {
                return (
                  <tr
                    key={row.key}
                    className="border-b border-[var(--color-border)]/20 bg-[var(--color-surface-raised)]/30"
                  >
                    <td className="px-3 py-2 text-start text-[var(--color-text-tertiary)]" dir="rtl">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm">{row.label}</span>
                        <Info
                          size={12}
                          className="text-[var(--color-text-tertiary)] shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      {row.date && (
                        <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">
                          {row.date}
                        </div>
                      )}
                    </td>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)] w-24"
                        dir="rtl"
                      >
                        —
                      </td>
                    ))}
                  </tr>
                );
              }

              return (
                <tr
                  key={row.key}
                  className={`border-b border-[var(--color-border)]/20 last:border-b-0 ${
                    isBeginning
                      ? 'bg-[var(--color-primary)]/5 font-bold'
                      : isEnding
                      ? revealed
                        ? reconciliationOk
                          ? 'bg-[var(--color-success)]/10 border-t-2 border-[var(--color-success)]'
                          : 'bg-[var(--color-error)]/10 border-t-2 border-[var(--color-error)]'
                        : 'bg-[var(--color-primary)]/8 border-t-2 border-[var(--color-primary)]/40'
                      : ''
                  }`}
                >
                  <td
                    className={`px-3 py-2 text-start ${
                      isBeginning
                        ? 'text-[var(--color-text-primary)] font-bold'
                        : isEnding
                        ? 'text-[var(--color-primary)] font-extrabold'
                        : 'text-[var(--color-text-secondary)]'
                    }`}
                    dir="rtl"
                  >
                    <div className="text-sm">{row.label}</div>
                    {row.date && (
                      <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">
                        {row.date}
                      </div>
                    )}
                  </td>
                  {columns.map((col) => {
                    // Total column — auto-computed, always read-only
                    if (col.isTotal) {
                      const total = rowTotals[row.key] ?? 0;
                      return (
                        <td
                          key={col.key}
                          className={`px-3 py-2 text-end t-data tabular-nums font-bold w-24 ${
                            isBeginning || isEnding
                              ? 'text-[var(--color-primary)]'
                              : 'text-[var(--color-text-primary)]'
                          }`}
                          dir="rtl"
                        >
                          {total === 0 ? '—' : formatNIS(total)}
                        </td>
                      );
                    }

                    const colKey = col.key as EquityColumnKey;
                    const solution = row.solution[colKey];
                    const isEditable =
                      !isEnding && solution !== null && !isInformational;

                    if (!isEditable) {
                      // Read-only auto-computed cell (ending row, or solution=null)
                      const computedVal =
                        isEnding
                          ? columnRunningTotals[col.key]?.[row.key] ?? 0
                          : 0;
                      return (
                        <td
                          key={col.key}
                          className={`px-3 py-2 text-end t-data tabular-nums w-24 ${
                            isBeginning
                              ? 'text-[var(--color-text-primary)] font-bold'
                              : isEnding
                              ? 'text-[var(--color-primary)] font-extrabold'
                              : 'text-[var(--color-text-tertiary)]'
                          }`}
                          dir="rtl"
                        >
                          {computedVal === 0 ? '—' : formatNIS(computedVal)}
                        </td>
                      );
                    }

                    const cellKey = `${row.key}-${colKey}`;
                    const value = inputs[cellKey] ?? '';
                    const status = rowStatuses[cellKey];
                    return (
                      <td key={col.key} className="px-3 py-1.5 w-24" dir="rtl">
                        <EditableCellInput
                          value={value}
                          onChange={(v) => setCellInput(cellKey, v)}
                          status={status}
                          revealed={revealed}
                          solution={solution!}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Reconciliation row — only shown after check, if targetEndingRE is set */}
            {revealed && targetEndingRE !== undefined && (
              <tr className="border-t border-[var(--color-border)]/30 bg-[var(--color-surface-raised)]/30">
                <td className="px-3 py-2 text-start text-sm" dir="rtl">
                  <span className="text-[var(--color-text-secondary)]">
                    בדיקת התאמה:
                  </span>{' '}
                  <span className="text-[var(--color-text-primary)] font-bold">
                    יתרת עודפים
                  </span>
                </td>
                {columns.map((col) => {
                  if (col.isTotal) {
                    return (
                      <td
                        key={col.key}
                        className="px-3 py-2 text-end t-data tabular-nums w-24 text-[var(--color-text-tertiary)]"
                        dir="rtl"
                      >
                        —
                      </td>
                    );
                  }
                  const colKey = col.key as EquityColumnKey;
                  if (colKey !== 'retainedEarnings') {
                    return (
                      <td
                        key={col.key}
                        className="px-3 py-2 text-end t-data tabular-nums w-24 text-[var(--color-text-tertiary)]"
                        dir="rtl"
                      >
                        —
                      </td>
                    );
                  }
                  return (
                    <td
                      key={col.key}
                      className={`px-3 py-2 text-end t-data tabular-nums font-bold w-24 ${
                        reconciliationOk
                          ? 'text-[var(--color-success)]'
                          : 'text-[var(--color-error)]'
                      }`}
                      dir="rtl"
                    >
                      {reconciliationOk
                        ? `✅ תואמת (${formatNIS(targetEndingRE)})`
                        : `❌ צפוי ${formatNIS(targetEndingRE)}, קיבלת ${formatNIS(endingRE)}`}
                    </td>
                  );
                })}
              </tr>
            )}
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
                ניקוד: {score.correct} / {score.total} תאים נכונים
              </span>
              {score.wrong > 0 && (
                <span className="text-[var(--color-error)] font-semibold">
                  · {score.wrong} שגויים
                </span>
              )}
              {score.skipped > 0 && (
                <span className="text-[var(--color-warning)] font-semibold">
                  · {score.skipped} לא מולאו
                </span>
              )}
              {targetEndingRE !== undefined && (
                <span
                  className={`font-semibold ${
                    reconciliationOk
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-error)]'
                  }`}
                >
                  · יתרת עודפים{' '}
                  {reconciliationOk ? 'תואמת ✅' : 'לא תואמת ❌'}
                </span>
              )}
            </div>
          ) : (
            <span>
              {editableCells.length} תאים למלא · סה״כ השורה והיתרה מתעדכנים אוטומטית
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

function EditableCellInput({
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

  return (
    <div className="flex items-center gap-1 justify-end" dir="rtl">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={revealed}
        placeholder="—"
        dir="ltr"
        aria-label="סכום"
        className={`w-20 sm:w-24 px-1.5 py-0.5 text-sm t-data tabular-nums text-start rounded border transition-colors ${
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
            <CheckCircle2 size={12} className="text-[var(--color-success)]" />
          </motion.span>
        )}
        {isWrong && (
          <motion.span
            key="wrong"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 inline-flex items-center gap-0.5"
            aria-label={`תשובה שגויה. הערך הנכון: ${formatNIS(solution)}`}
          >
            <XCircle size={12} className="text-[var(--color-error)]" />
            <span className="text-[9px] t-data tabular-nums text-[var(--color-error)] font-bold whitespace-nowrap">
              {formatNIS(solution)}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
      {isSkipped && (
        <span className="text-[9px] text-[var(--color-warning)] font-bold shrink-0">
          לא מולא
        </span>
      )}
    </div>
  );
}
