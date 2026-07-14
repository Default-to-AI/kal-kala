/**
 * FillableBondAmortizationSchedule.tsx
 *
 * Interactive bond amortization schedule (straight-line premium) for
 * Q4 of the 2017 exam. The student back-derives the original premium
 * at issuance from the given 31.12.19 balance (20,000), then the
 * full 8-year schedule auto-fills with:
 *   - opening premium balance
 *   - cash interest paid (= 24,500 / year, since interest paid at the
 *     BEGINNING of each year)
 *   - straight-line amortization (= original premium / 8)
 *   - net interest expense (= cash interest − amortization)
 *   - closing premium balance
 *
 * The student also fills 2 secondary cells (corresponding to
 * sub-questions 2 and 3 of Q4):
 *   - 2017 net interest expense (solution 20,500)
 *   - Net bond balance at 31.12.2021 (solution 362,000)
 *
 * After clicking "בדוק", per-cell status icons (✅/❌/—) appear, and
 * a verification row checks the 31.12.2019 closing balance against
 * the given 20,000 target.
 *
 * Per-cell state is persisted to localStorage under
 * `${storageKey}:inputs` so a refresh doesn't wipe the student's work.
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

export interface BondScheduleRow {
  /** Calendar year (2017-2024). */
  year: number;
  /** Hebrew date label (e.g. "31.12.2017"). */
  date: string;
}

export interface FillableBondAmortizationScheduleProps {
  /** Face value of the bond (₪). E.g. 350,000. */
  faceValue: number;
  /** Annual coupon rate (decimal). E.g. 0.07. */
  couponRate: number;
  /** Term in years. E.g. 8. */
  termYears: number;
  /** Schedule rows (one per year). */
  schedule: readonly BondScheduleRow[];
  /** Solution for the original premium at issuance. */
  originalPremiumSolution: number;
  /** Solution for 2017 net interest expense. */
  netInterest2017Solution: number;
  /** Year to ask for the net bond balance in the secondary cell (e.g. 2021 for Q4.3). */
  secondaryCellYear: number;
  /** Solution for the net bond balance (= face + closing premium) at secondaryCellYear. */
  secondaryCellNetBalance: number;
  /** Verification anchor — closing premium balance at this year must equal this value. */
  verifyYear: number;
  verifyBalance: number;
  /** Optional caption above the table. */
  caption?: string;
  /** Optional note at the bottom. */
  footer?: React.ReactNode;
  /** localStorage key prefix for persisting user inputs. */
  storageKey?: string;
}

type CellStatus = 'correct' | 'wrong' | 'skipped';

const STORAGE_PREFIX = 'fillable-bond';

export function FillableBondAmortizationSchedule({
  faceValue,
  couponRate,
  termYears,
  schedule,
  originalPremiumSolution,
  netInterest2017Solution,
  secondaryCellYear,
  secondaryCellNetBalance,
  verifyYear,
  verifyBalance,
  caption,
  footer,
  storageKey = STORAGE_PREFIX,
}: FillableBondAmortizationScheduleProps): React.ReactElement {
  const [inputs, setInputs] = useLocalStorageState<Record<string, string>>(
    `${storageKey}:inputs`,
    {},
  );
  const [revealed, setRevealed] = useState(false);

  const origPremium = parseAmount(inputs['originalPremium'] ?? '');
  const cashInterestPerYear = faceValue * couponRate;
  const annualAmort = origPremium !== null ? origPremium / termYears : null;

  // Schedule rows — opening, amort, cash, net interest, closing (per row)
  const computedRows = useMemo(() => {
    let running = origPremium ?? 0;
    return schedule.map((row) => {
      const opening = running;
      const amort = annualAmort ?? 0;
      const closing = Math.max(0, opening - amort);
      const netInterest = cashInterestPerYear - amort;
      running = closing;
      return { ...row, opening, amort, cash: cashInterestPerYear, netInterest, closing };
    });
  }, [schedule, origPremium, annualAmort, cashInterestPerYear]);

  const verifyRow = computedRows.find((r) => r.year === verifyYear);
  const verifyOk =
    verifyRow !== undefined &&
    origPremium !== null &&
    Math.abs(verifyRow.closing - verifyBalance) < 0.01;

  // Look up the secondary cell's date from the schedule by year
  const secondaryCellDate =
    schedule.find((r) => r.year === secondaryCellYear)?.date ?? '';
  // Closing premium at secondaryCellYear (used for the hint text + auto-fill)
  const secondaryCellClosingPremium =
    computedRows.find((r) => r.year === secondaryCellYear)?.closing ?? 0;

  // Per-cell status (only when revealed)
  const cellStatuses = useMemo<Record<string, CellStatus>>(() => {
    if (!revealed) return {};
    const statuses: Record<string, CellStatus> = {};

    // 1) Original premium
    if (origPremium === null) statuses['originalPremium'] = 'skipped';
    else if (origPremium === originalPremiumSolution)
      statuses['originalPremium'] = 'correct';
    else statuses['originalPremium'] = 'wrong';

    // 2) 2017 net interest
    const net2017 = parseAmount(inputs['netInterest2017'] ?? '');
    if (net2017 === null) statuses['netInterest2017'] = 'skipped';
    else if (net2017 === netInterest2017Solution)
      statuses['netInterest2017'] = 'correct';
    else statuses['netInterest2017'] = 'wrong';

    // 3) Secondary cell — net bond balance at secondaryCellYear (= face + closing premium)
    const finalInput = parseAmount(inputs['finalBalance'] ?? '');
    if (finalInput === null) statuses['finalBalance'] = 'skipped';
    else if (finalInput === secondaryCellNetBalance)
      statuses['finalBalance'] = 'correct';
    else statuses['finalBalance'] = 'wrong';

    return statuses;
  }, [revealed, origPremium, inputs, originalPremiumSolution, netInterest2017Solution, secondaryCellNetBalance]);

  const score = useMemo(() => {
    let correct = 0,
      wrong = 0,
      skipped = 0;
    Object.values(cellStatuses).forEach((s) => {
      if (s === 'correct') correct++;
      else if (s === 'wrong') wrong++;
      else skipped++;
    });
    return { correct, wrong, skipped, total: 3 };
  }, [cellStatuses]);

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

      {/* Header summary — given facts */}
      <div className="px-4 py-3 bg-[var(--color-surface-raised)]/20 border-b border-[var(--color-border)] text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 text-[var(--color-text-secondary)]">
        <div>
          <span className="text-[var(--color-text-tertiary)]">ע.נ. מצטבר: </span>
          <span className="t-data tabular-nums font-bold text-[var(--color-text-primary)]">
            {faceValue.toLocaleString('he-IL')}
          </span>
        </div>
        <div>
          <span className="text-[var(--color-text-tertiary)]">ריבית שנתית: </span>
          <span className="t-data tabular-nums font-bold text-[var(--color-text-primary)]">
            {(couponRate * 100).toFixed(0)}% = {formatNIS(cashInterestPerYear)}
          </span>
        </div>
        <div>
          <span className="text-[var(--color-text-tertiary)]">תקופה: </span>
          <span className="t-data tabular-nums font-bold text-[var(--color-text-primary)]">
            {termYears} שנים
          </span>
        </div>
        <div>
          <span className="text-[var(--color-text-tertiary)]">הפחתה: </span>
          <span className="font-bold text-[var(--color-text-primary)]">קו ישר</span>
        </div>
      </div>

      {/* Main editable input — original premium */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-primary)]/5">
        <div className="flex items-end gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="orig-premium-input"
              className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1"
            >
              פרמיה בהנפקה (1.1.2017) — חשב מתוך יתרת הפרמיה ב-31.12.2019
            </label>
            <HeaderInput
              id="orig-premium-input"
              value={inputs['originalPremium'] ?? ''}
              onChange={(v) => setCellInput('originalPremium', v)}
              status={cellStatuses['originalPremium']}
              revealed={revealed}
              solution={originalPremiumSolution}
            />
          </div>
          {origPremium !== null && (
            <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              <div>
                <span className="text-[var(--color-text-tertiary)]">הפחתה שנתית: </span>
                <span className="t-data tabular-nums font-bold text-[var(--color-text-primary)]">
                  {formatNIS(annualAmort ?? 0)}
                </span>
              </div>
              <div>
                <span className="text-[var(--color-text-tertiary)]">הפחתה כוללת (8 שנים): </span>
                <span className="t-data tabular-nums font-bold text-[var(--color-text-primary)]">
                  {formatNIS(origPremium)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                תאריך
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                יתרת פתיחה
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                ריבית במזומן
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                הפחתת פרמיה
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                הוצ׳ מימון נטו
              </th>
              <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                יתרת סגירה
              </th>
            </tr>
          </thead>
          <tbody>
            {computedRows.map((row) => {
              const isVerify = row.year === verifyYear;
              return (
                <tr
                  key={row.year}
                  className={`border-b border-[var(--color-border)]/20 last:border-b-0 transition-colors ${
                    isVerify && revealed
                      ? verifyOk
                        ? 'bg-[var(--color-success)]/8'
                        : origPremium === null
                        ? ''
                        : 'bg-[var(--color-error)]/8'
                      : ''
                  }`}
                >
                  <td
                    className={`px-3 py-2 text-start text-xs whitespace-nowrap ${
                      isVerify
                        ? 'text-[var(--color-primary)] font-bold'
                        : 'text-[var(--color-text-tertiary)]'
                    }`}
                    dir="rtl"
                  >
                    {row.date}
                  </td>
                  <td
                    className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-secondary)]"
                    dir="rtl"
                  >
                    {origPremium === null ? '—' : formatNIS(row.opening)}
                  </td>
                  <td
                    className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-secondary)]"
                    dir="rtl"
                  >
                    {origPremium === null ? '—' : formatNIS(row.cash)}
                  </td>
                  <td
                    className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-error)]"
                    dir="rtl"
                  >
                    {origPremium === null ? '—' : `(${formatNIS(row.amort)})`}
                  </td>
                  <td
                    className="px-3 py-2 text-end t-data tabular-nums font-bold text-[var(--color-text-primary)]"
                    dir="rtl"
                  >
                    {origPremium === null ? '—' : formatNIS(row.netInterest)}
                  </td>
                  <td
                    className={`px-3 py-2 text-end t-data tabular-nums font-bold ${
                      isVerify
                        ? revealed
                          ? verifyOk
                            ? 'text-[var(--color-success)]'
                            : 'text-[var(--color-error)]'
                          : 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text-primary)]'
                    }`}
                    dir="rtl"
                  >
                    {origPremium === null ? '—' : formatNIS(row.closing)}
                    {isVerify && revealed && (
                      <span
                        className={`text-[10px] font-bold ms-2 ${
                          verifyOk
                            ? 'text-[var(--color-success)]'
                            : 'text-[var(--color-error)]'
                        }`}
                      >
                        {verifyOk ? '✅' : `❌ צפוי ${formatNIS(verifyBalance)}`}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* 2017 net interest expense — editable cell mirroring sub-question 2 */}
            <tr className="border-t-2 border-[var(--color-border-strong)]/40 bg-[var(--color-accent-cobalt)]/5">
              <td className="px-3 py-2 text-start text-sm" colSpan={1} dir="rtl">
                <span className="font-bold text-[var(--color-accent-cobalt-strong)]">
                  הוצ׳ מימון נטו ל-2017:
                </span>
              </td>
              <td className="px-3 py-2" colSpan={4} dir="rtl">
                <span className="text-[10px] text-[var(--color-text-tertiary)]">
                  (הקלד את הערך המחושב — 24,500 פחות הפחתת הפרמיה לשנה)
                </span>
              </td>
              <td className="px-3 py-2 w-36" dir="rtl">
                <HeaderInput
                  value={inputs['netInterest2017'] ?? ''}
                  onChange={(v) => setCellInput('netInterest2017', v)}
                  status={cellStatuses['netInterest2017']}
                  revealed={revealed}
                  solution={netInterest2017Solution}
                  small
                />
              </td>
            </tr>

            {/* Net bond balance at secondaryCellYear — editable cell mirroring a sub-question */}
            <tr className="border-t-2 border-[var(--color-border-strong)]/40 bg-[var(--color-accent-cobalt)]/5">
              <td className="px-3 py-2 text-start text-sm" colSpan={1} dir="rtl">
                <span className="font-bold text-[var(--color-accent-cobalt-strong)]">
                  יתרת אג״ח נטו ב-{secondaryCellDate}:
                </span>
              </td>
              <td className="px-3 py-2" colSpan={4} dir="rtl">
                <span className="text-[10px] text-[var(--color-text-tertiary)]">
                  (ע.נ. {faceValue.toLocaleString('he-IL')} + יתרת פרמיה של{' '}
                  {formatNIS(secondaryCellClosingPremium)})
                </span>
              </td>
              <td className="px-3 py-2 w-36" dir="rtl">
                <HeaderInput
                  value={inputs['finalBalance'] ?? ''}
                  onChange={(v) => setCellInput('finalBalance', v)}
                  status={cellStatuses['finalBalance']}
                  revealed={revealed}
                  solution={secondaryCellNetBalance}
                  small
                />
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
              <span
                className={`font-semibold ${
                  verifyOk
                    ? 'text-[var(--color-success)]'
                    : 'text-[var(--color-error)]'
                }`}
              >
                · יתרת {verifyYear}{' '}
                {verifyOk ? 'תואמת ✅' : 'לא תואמת ❌'}
              </span>
            </div>
          ) : (
            <span>
              3 תאים למלא · לוח הסילוקין מתעדכן אוטומטית מתוך הפרמיה בהנפקה
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

function HeaderInput({
  id,
  value,
  onChange,
  status,
  revealed,
  solution,
  small,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  status: CellStatus | undefined;
  revealed: boolean;
  solution: number;
  small?: boolean;
}) {
  const isCorrect = revealed && status === 'correct';
  const isWrong = revealed && status === 'wrong';
  const isSkipped = revealed && status === 'skipped';

  return (
    <div className="flex items-center gap-1.5 justify-end" dir="rtl">
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={revealed}
        placeholder="—"
        dir="ltr"
        aria-label="סכום"
        className={`${
          small ? 'w-24 sm:w-28' : 'w-32 sm:w-40'
        } px-2 py-1 text-sm t-data tabular-nums text-end rounded border transition-colors ${
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
