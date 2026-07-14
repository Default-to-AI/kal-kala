import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, AlertTriangle, Lightbulb, Check } from 'lucide-react';
import { Button } from './Button';

export interface ExamTrap {
  /** Hebrew label / heading for the trap. */
  title: string;
  /** Trap explanation. */
  body: ReactNode;
}

export interface ExamSolutionPanelProps {
  /** The solution body (steps, calculations, journal entries, etc.). */
  children: ReactNode;
  /** When true, the master "show all solutions" toggle is ON. Solution is forced visible. */
  isMasterOn: boolean;
  /** Optional traps to highlight when the solution is visible. */
  traps?: ExamTrap[];
  /** Optional things worth attention (insight blocks). */
  insights?: ExamTrap[];
  /** Optional per-question local override. If null, panel manages its own state. */
  forceVisible?: boolean;
  /** Stable id used to default the local-storage-less local state. */
  questionId: string;
}

/**
 * Solution panel for a single exam question.
 *
 * Visibility logic:
 *   visible = isMasterOn || forceVisible || localRevealed
 *
 * When hidden, shows a "הצג פתרון" button (primary CTA).
 * When visible, shows the solution body, traps (AlertBlock), and insights.
 *
 * Per-question state is in-memory only (component state) so refreshing the
 * page resets the local reveals. The master toggle persists via localStorage.
 */
export function ExamSolutionPanel({
  children,
  isMasterOn,
  traps = [],
  insights = [],
  forceVisible,
  questionId,
}: ExamSolutionPanelProps): React.ReactElement {
  const [localRevealed, setLocalRevealed] = useState(false);

  const visible = Boolean(isMasterOn || forceVisible || localRevealed);

  if (!visible) {
    return (
      <div
        data-tour={`exam-solution-locked-${questionId}`}
        className="mt-4 border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/40 rounded-xl p-6 flex flex-col items-center text-center gap-3"
      >
        <div className="flex items-center gap-2 text-[var(--color-text-tertiary)]">
          <Lock size={16} aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            פתרון מוסתר
          </span>
        </div>
        <p className="t-casual text-sm text-[var(--color-text-secondary)] max-w-md">
          נסה לפתור את השאלה לבד קודם. כשתהיה מוכן, לחץ על הכפתור למטה כדי לחשוף את הפתרון המלא, כולל מלכודות.
        </p>
        <Button
          onClick={() => setLocalRevealed(true)}
          variant="primary"
          size="sm"
        >
          הצג פתרון לשאלה זו
        </Button>
      </div>
    );
  }

  return (
    <div
      data-tour={`exam-solution-${questionId}`}
      className="mt-4 border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-xl overflow-hidden"
    >
      {/* Header strip */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-[var(--color-primary)]/10 border-b border-[var(--color-primary)]/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center">
            <Check size={16} aria-hidden="true" />
          </div>
          <span className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider">
            פתרון
          </span>
          {isMasterOn && (
            <span className="text-xs text-[var(--color-text-tertiary)] hidden sm:inline">
              (מוצג דרך המתג הראשי)
            </span>
          )}
        </div>
        {!isMasterOn && (
          <button
            type="button"
            onClick={() => setLocalRevealed(false)}
            className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            הסתר פתרון
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Solution body */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Traps */}
        {traps.length > 0 && (
          <div className="space-y-3">
            <h4 className="t-h3 text-sm flex items-center gap-2 text-[var(--color-error)] border-t border-[var(--color-error)]/20 pt-4">
              <AlertTriangle size={16} aria-hidden="true" />
              מלכודות ודברים שכדאי לשים לב
            </h4>
            {traps.map((trap, i) => (
              <div
                key={i}
                className="border-r-4 border-[var(--color-error)] bg-[var(--color-error)]/8 rounded-md p-3 sm:p-4"
              >
                <div className="text-sm font-bold text-[var(--color-error)] mb-1">
                  ⚠️ {trap.title}
                </div>
                <div className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                  {trap.body}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <div className="space-y-3">
            <h4 className="t-h3 text-sm flex items-center gap-2 text-[var(--color-accent-cobalt)] border-t border-[var(--color-accent-cobalt)]/20 pt-4">
              <Lightbulb size={16} aria-hidden="true" />
              דברים שכדאי לזכור
            </h4>
            {insights.map((insight, i) => (
              <div
                key={i}
                className="border-r-4 border-[var(--color-accent-cobalt)] bg-[var(--color-accent-cobalt-bg)] rounded-md p-3 sm:p-4"
              >
                <div className="text-sm font-bold text-[var(--color-accent-cobalt-strong)] mb-1">
                  💡 {insight.title}
                </div>
                <div className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                  {insight.body}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isMasterOn && (
          <div className="flex justify-center pt-2 border-t border-[var(--color-border)]/30">
            <button
              type="button"
              onClick={() => setLocalRevealed(false)}
              className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1"
            >
              <ChevronDown size={14} className="rotate-180" aria-hidden="true" />
              הסתר פתרון
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
