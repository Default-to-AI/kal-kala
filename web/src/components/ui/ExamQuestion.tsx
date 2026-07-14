import type { ReactNode } from 'react';
import { FileText } from 'lucide-react';
import { Card } from './Card';

export interface ExamMCQSection {
  /** Short label for the MCQ group, e.g. "MCQ על שאלה 1". */
  label: string;
  /** Array of MCQ card elements (already-shaped MCQuestionCard instances). */
  cards: ReactNode;
  /**
   * When the master toggle is ON, MCQ cards should switch to reveal mode
   * (correct answer highlighted without click). The page passes the
   * `mode="reveal"` prop down. We pre-render the children in both modes
   * controlled by this prop.
   */
}

export interface ExamQuestionProps {
  /** Question number, e.g. 1. */
  number: number;
  /** Hebrew title, e.g. "דוח תזרים מזומנים וניתוח פיננסי". */
  title: string;
  /** Stable id used for tour targeting + local state. */
  id: string;
  /** The question body — Hebrew text, tables, footnotes, the lot. */
  children: ReactNode;
  /** The solution panel (typically an `<ExamSolutionPanel>`). */
  solution: ReactNode;
  /** Optional MCQ block(s) at the bottom of the question. */
  mcqs?: ReactNode;
  /** Optional className on the wrapping `<section>`. Use for `mt-12` between questions. */
  className?: string;
}

/**
 * Question card for an exam page.
 *
 * Renders:
 *   1. Numbered header with title + points badge
 *   2. Question body (the data + the actual question text)
 *   3. Solution panel (per-question + master-toggle aware)
 *   4. Optional MCQ group(s) at the bottom
 *
 * The number is large and tabular (so it doesn't reflow) and the points
 * badge uses brass accent — both signal "exam context" vs. the regular
 * chapter pages.
 */
export function ExamQuestion({
  number,
  title,
  id,
  children,
  solution,
  mcqs,
  className = '',
}: ExamQuestionProps): React.ReactElement {
  return (
    <section
      id={`exam-q-${id}`}
      data-tour={`exam-question-${id}`}
      className={`scroll-mt-32 ${className}`}
    >
      <Card variant="default" className="p-0 overflow-hidden">
        {/* Numbered header */}
        <div className="flex items-stretch gap-0 border-b border-[var(--color-border)] bg-[var(--color-surface-raised)]/30">
          <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-5 border-l border-[var(--color-border)] bg-[var(--color-surface)] min-w-[88px] sm:min-w-[112px]">
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] leading-none">
              שאלה
            </div>
            <div className="t-h1 text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tabular-nums leading-none mt-1">
              {number}
            </div>
          </div>
          <div className="flex-1 px-4 sm:px-5 py-4 sm:py-5 flex items-center min-w-0">
            <h2
              data-toc
              data-toc-target={`exam-q-${id}`}
              className="t-h2 text-lg sm:text-xl font-bold text-[var(--color-text-primary)] leading-tight min-w-0"
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Question body */}
        <div className="p-5 sm:p-6 space-y-5">{children}</div>

        {/* Solution panel */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">{solution}</div>
      </Card>

      {/* MCQs */}
      {mcqs && (
        <div className="mt-6">
          <h3 className="t-h3 text-sm font-bold text-[var(--color-text-secondary)] flex items-center gap-2 mb-3">
            <FileText size={16} aria-hidden="true" />
            שאלות אמריקאיות לחזרה מהירה
          </h3>
          {mcqs}
        </div>
      )}
    </section>
  );
}
