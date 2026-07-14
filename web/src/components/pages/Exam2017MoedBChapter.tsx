import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Eye, EyeOff as EyeOffIcon } from 'lucide-react';

import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { MCQuestionCard } from '../ui/MCQuestionCard';
import { ExamQuestion } from '../ui/ExamQuestion';
import { ExamSolutionPanel } from '../ui/ExamSolutionPanel';
import { BalanceSheetTable } from '../ui/BalanceSheetTable';
import { CashFlowStatement } from '../ui/CashFlowStatement';
import { JournalEntry } from '../ui/JournalEntry';
import { AmortizationTable } from '../ui/AmortizationTable';
import { FillableCashFlowStatement } from '../ui/FillableCashFlowStatement';
import { FillableEquityChangesStatement } from '../ui/FillableEquityChangesStatement';
import { FillableInvestmentAccountMovement } from '../ui/FillableInvestmentAccountMovement';
import { FillableBondAmortizationSchedule } from '../ui/FillableBondAmortizationSchedule';
import { InsightBlock } from '../ui/FormulaBlock';

import {
  Q1_BALANCE_SHEET_SECTIONS,
  Q1_FOOTNOTES,
  Q1_CASH_FLOW_SECTIONS,
  Q1_CASH_FLOW_TEMPLATE,
  Q1_NON_CASH_OPERATIONS,
  Q2_EVENTS_2016,
  Q2_EQUITY_COLUMNS,
  Q2_EQUITY_TEMPLATE,
  Q3_DATA,
  Q3_INVESTMENT_TEMPLATE,
  Q4_DATA,
  Q4_BOND_TEMPLATE,
} from './exam-2017-data';

/**
 * 2017 Moed B — Accounting B exam.
 *
 * Source: `web/docs/chapter-materials/exams/11-accounting-b-exam-2017-13-7.docx`
 *
 * All 4 questions now have full worked solutions:
 *  - Q1 (cash flow, 33%): balance sheet + footnotes + worked cash flow
 *    statement + 6 MCQs (2 narrative + 4 value-based)
 *  - Q2 (equity, 27%): worked solution with RE derivation, 7 journal
 *    entries, full equity changes statement table, and bonus question
 *  - Q3 (equity method, 20%): original difference breakdown + investment
 *    movement + P&L impact + 15% sale on 1.1.2017
 *  - Q4 (bonds, 20%): proceeds + journal entry + 2017 net interest +
 *    31.12.2021 bond note + 2025 bonus question
 */
export function Exam2017MoedBChapter() {
  // Master toggle is the single source of truth; passed down to every
  // solution panel and MCQ card.
  const [masterOn, setMasterOn] = useState(false);

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title={'מבחן חשבונאות ב׳ — מועד ב׳, תשע״ז'}
          description={'יום ה׳, 13.7.2017 · מרצה: רו"ח עדי ריינהולד · 4 שאלות · 100% מהציון'}
        />

        <LessonBlock title="הנחיות לפתרון המבחן" variant="casual">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              כל שאלה מופיעה בקומפוננטה נפרדת. לפני כל פתרון יש נעילה — נסו לפתור לבד
              ולחצו על <em>הצג פתרון</em> רק אחרי שסיימתם.
            </li>
            <li>
              המתג <strong>הצג את כל הפתרונות</strong> בראש העמוד חושף את כל הפתרונות והופך
              את שאלות האמריקאיות למצב "מפתח תשובות" (תשובה נכונה מודגשת, ללא לחיצה).
            </li>
            <li>
              <strong>חשוב:</strong> בשאלה 1 תרגיל ההצגה לפי <em>הגישה העקיפה</em> בלבד.
              הפתרון המוצג כאן הוא בגישה העקיפה.
            </li>
            <li>
              תזכורת: חישובי ההפרש המקורי בשאלה 3 מתייחסים לרכישה בשיטת השווי המאזני
              (equity method). אל תתבלבלו עם FVTPL מפרק 5.
            </li>
          </ul>
        </LessonBlock>

        <ExamMasterToggleSynced masterOn={masterOn} setMasterOn={setMasterOn} />

        {/* ── Q1: Cash flow + financial analysis ──────────────────────── */}
        <ExamQuestion
          id="q1"
          number={1}
          title="דוח תזרים מזומנים וניתוח פיננסי"
          solution={
            <ExamSolutionPanel
              isMasterOn={masterOn}
              questionId="q1"
              traps={[
                {
                  title: 'התמורה ממכירת רהוט עתידית (מרץ 2018)',
                  body: (
                    <>
                      התמורה של <strong>9,000 ₪</strong> ממכירת הרהוט עוד לא התקבלה ב-2017
                      (היא צפויה במרץ 2018). לכן היא <strong>לא מופיעה בדוח תזרים המזומנים</strong>
                      {' '}כלל — זו פעולה לא-מזומנית (מכירה תמורת חייב), ומופיעה ב
                      <strong>נספח ב׳ — פעולות שלא במזומן</strong> בהמשך. זו הסיבה שאין
                      שורת "שינוי בחייבים" בפעילות השוטפת, למרות ש"חייבים" עלה ב-9,000.
                    </>
                  ),
                },
                {
                  title: 'הכנסות אקוויטי מ"שלווה" הן לא מזומן',
                  body: (
                    <>
                      חברת "שלווה" הרוויחה 88,000 ₪, ואנחנו מכירים 30% = 26,400 ₪ כהכנסת
                      אקוויטי. היא <strong>לא חילקה דיבידנד</strong>, ולכן לא התקבל מזומן.
                      בדוח התזרים מתקזזים את הרווח הזה מהרווח הנקי (אנחנו לא רוצים לספור אותו
                      פעמיים).
                    </>
                  ),
                },
                {
                  title: 'ההפרש המקורי = מוניטין בלבד',
                  body: (
                    <>
                      הערה 1 אומרת במפורש ש<strong>כל ההפרש המקורי מיוחס למוניטין</strong>.
                      זה אומר שאין כאן הפרש שצריך להפחית (אין קרקע/מכונה בשווי הוגן מעל הספרים).
                      השווי ההוגן של "שלווה" = 145,000, ומתוכם 30% × הון עצמי = זהות. אין
                      הפרש מקורי מעבר למוניטין.
                    </>
                  ),
                },
                {
                  title: 'מניות הטבה = ללא תזרים',
                  body: (
                    <>
                      ההנפקה של מניות הטבה (20% מהפרמיה) <strong>לא יוצרת מזומן</strong> — רק
                      מעבירה סכום מ"פרמיה" ל"הון מניות". לכן היא לא מופיעה בפעילות מימון. רק
                      החלק של <em>הנפקה במזומן</em> מופיע.
                    </>
                  ),
                },
              ]}
              insights={[
                {
                  title: 'איך מחשבים רווח נקי מתוך שינוי בעודפים?',
                  body: (
                    <>
                      <InlineFormula
                        left="רווח נקי"
                        right="שינוי בעודפים + דיבידנד שהוכרז"
                      />
                      {' '}כאן: (74,400 − 143,000) + 20,000 = <strong>−48,600</strong> (הפסד).
                      זה לא טעות — החברה הפסידה ב-2017 למרות הכנסת האקוויטי מ"שלווה".
                    </>
                  ),
                },
                {
                  title: 'איך מבדילים בין רהוט שנמכר לרהוט שנרכש?',
                  body: (
                    <>
                      שינוי ב<em>עלות</em> הרהוט: 104,000 − 92,000 = 12,000. מכרנו רהוט בעלות
                      15,000 (ירידה של 15,000), אז רכשנו רהוט בעלות 12,000 + 15,000 ={' '}
                      <strong>27,000</strong>. בדוח התזרים: ירידה של 27,000 במזומן.
                    </>
                  ),
                },
              ]}
            >
              <div className="space-y-6">
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    פתרון — דוח תזרים מזומנים (גישה עקיפה)
                  </h4>
                  <CashFlowStatement
                    sections={Q1_CASH_FLOW_SECTIONS}
                    netChange={-28_000}
                    beginningCash={57_000}
                    endingCash={29_000}
                    caption="שנת 2017 · חברת רוגע בע״מ"
                    footer="הערה: סימון ‹—› מציין תנועה אפסית. ראו נספח ב׳ למטה לפעולות שלא במזומן."
                  />
                  <InsightBlock>
                    <p className="text-sm leading-relaxed">
                      <strong>✅ אומת מול מפתח תשובות (xlsx):</strong> סכום שלושת הסעיפים
                      (<span className="t-data tabular-nums">-69,000 + -27,000 + 68,000</span>)
                      = <strong>-28,000</strong> = שינוי המזומנים בפועל
                      (<span className="t-data tabular-nums">29,000 − 57,000</span>). ההתאמה תואמת.
                    </p>
                  </InsightBlock>

                  <div className="mt-4 border-r-4 border-[var(--color-info)] bg-[var(--color-info-bg)] rounded-md p-4">
                    <div className="flex items-center gap-2 text-[var(--color-accent-cobalt-strong)] font-bold text-sm mb-2">
                      <Info size={16} aria-hidden="true" />
                      נספח ב׳ — פעולות שלא במזומן
                    </div>
                    <p className="text-sm text-[var(--color-text-primary)] mb-2 leading-relaxed">
                      פעולות שאינן כרוכות בתזרים מזומנים אך משפיעות על המאזן (לכן לא נכללות בדוח התזרים):
                    </p>
                    <ul className="text-sm space-y-1.5 list-disc list-inside text-[var(--color-text-primary)]">
                      {Q1_NON_CASH_OPERATIONS.map((op, i) => (
                        <li key={i}>
                          <strong>{op.label}:</strong>{' '}
                          <span className="t-data tabular-nums">
                            {op.amount.toLocaleString('he-IL')} ₪
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ExamSolutionPanel>
          }
          mcqs={
            <div className="space-y-3">
              <MCQuestionCard
                id="q1-mcq-1"
                prompt="ההכנסה מהשקעה בשיטת השווי המאזני בחברת 'שלווה' (30%, רווח נקי 88,000 ₪, ללא דיבידנד) — מה מהבאים נכון?"
                options={[
                  { label: 'א', text: 'מופיעה בפעילות שוטפת במזומן, מכיוון שהיא הכנסה רגילה.' },
                  {
                    label: 'ב',
                    text: 'מופיעה בפעילות שוטפת, אך מתקזזת מהרווח הנקי (לא מזומן).',
                    correct: true,
                  },
                  { label: 'ג', text: 'מופיעה בפעילות השקעה, מכיוון שזו השקעה ארוכת-טווח.' },
                  { label: 'ד', text: 'לא מופיעה כלל בדוח התזרים, מכיוון שהיא לא מזומן.' },
                ]}
                rationale={
                  <p>
                    שיטת השווי המאזני (equity method) מכירה את חלקנו ברווח של החברה המושקעת
                    כהכנסה, אבל <strong>לא כמזומן</strong> — המזומן נשאר אצל החברה המושקעת
                    (או מחולק כדיבידנד, שלא קרה כאן). לכן מתקזזים את הסכום מהרווח הנקי
                    בפעילות שוטפת, ואם היו דיבידנדים — היו מופיעים בפעילות שוטפת כמזומן נכנס.
                  </p>
                }
                mode={masterOn ? 'reveal' : 'interactive'}
              />
              <MCQuestionCard
                id="q1-mcq-2"
                prompt="ב-30.9.2017 רכשה החברה רהוט חדש במזומן. איזה סכום ירד מהמזומן בפעילות השקעה?"
                options={[
                  { label: 'א', text: '12,000 ₪ (שינוי עלות הרהוט במאזן)' },
                  { label: 'ב', text: '15,000 ₪ (עלות הרהוט שנמכר)' },
                  { label: 'ג', text: '27,000 ₪ (עלות הרהוט החדש שנרכש)', correct: true },
                  { label: 'ד', text: '0 — רכישת רהוט היא פעילות שוטפת, לא השקעה.' },
                ]}
                rationale={
                  <p>
                    השינוי הנקי בעלות הרהוט הוא 104,000 − 92,000 = 12,000, אבל הוא כולל גם את
                    הירידה ממכירת הרהוט הישן (15,000). לכן הרכישה החדשה היא 12,000 + 15,000 ={' '}
                    <strong>27,000</strong>. רכישת רכוש קבוע היא פעילות השקעה (לא שוטפת) גם
                    אם נעשתה במזומן.
                  </p>
                }
                mode={masterOn ? 'reveal' : 'interactive'}
              />

              {/* ── Value-based MCQs (verify expected numbers) ──────── */}
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]/50">
                <p className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
                  תרגיל — אימות ערכים (בחר את ההשפעה הנכונה)
                </p>
                <div className="space-y-3">
                  <MCQuestionCard
                    id="q1-mcq-v1"
                    prompt="מהי ההשפעה של הוצאות הפחת (7,000 ₪) על תזרים המזומנים מפעילות שוטפת?"
                    options={[
                      { label: 'א', text: 'חיובי 7,000 ₪ (תוספת למזומן)', correct: true },
                      { label: 'ב', text: 'שלילי 7,000 ₪ (הפחתה מהמזומן)' },
                      { label: 'ג', text: 'חיובי 56,000 ₪' },
                      { label: 'ד', text: '0 — ללא השפעה על המזומן' },
                    ]}
                    rationale={
                      <p>
                        פחת הוא הוצאה <strong>לא-מזומנית</strong>. הוא הופחת מהרווח הנקי אבל לא
                        הוצא מהמזומן. בשיטה העקיפה <strong>מוסיפים אותו בחזרה</strong>{' '}
                        לרווח הנקי — לכן ההשפעה על המזומן היא <strong>חיובית 7,000 ₪</strong>.
                      </p>
                    }
                    mode={masterOn ? 'reveal' : 'interactive'}
                  />
                  <MCQuestionCard
                    id="q1-mcq-v2"
                    prompt="מהי ההשפעה של רווח אקוויטי מ'שלווה' (26,400 ₪) על תזרים המזומנים מפעילות שוטפת?"
                    options={[
                      { label: 'א', text: 'חיובי 26,400 ₪' },
                      { label: 'ב', text: 'שלילי 26,400 ₪ (הפחתה מהרווח הנקי)', correct: true },
                      { label: 'ג', text: '0 — לא מופיע בדוח התזרים' },
                      { label: 'ד', text: 'חיובי 88,000 ₪' },
                    ]}
                    rationale={
                      <p>
                        רווח אקוויטי <strong>כלול ברווח הנקי</strong> אבל ללא תזרים אמיתי
                        (שלווה לא חילקה דיבידנד). בשיטה העקיפה{' '}
                        <strong>מתקזזים אותו</strong> — לכן ההשפעה היא{' '}
                        <strong>שלילית 26,400 ₪</strong> (מבטלת את הרווח הלא-מזומני).
                      </p>
                    }
                    mode={masterOn ? 'reveal' : 'interactive'}
                  />
                  <MCQuestionCard
                    id="q1-mcq-v3"
                    prompt="מהי ההשפעה של נטילת ההלוואה הנוספת (20,000 ₪ ב-31.12.17) על תזרים המזומנים?"
                    options={[
                      { label: 'א', text: 'חיובי 20,000 ₪ (מזומן נכנס)', correct: true },
                      { label: 'ב', text: 'שלילי 20,000 ₪ (מזומן יוצא)' },
                      { label: 'ג', text: '0 — הלוואה לא משפיעה על תזרים' },
                      { label: 'ד', text: 'חיובי 151,000 ₪' },
                    ]}
                    rationale={
                      <p>
                        נטילת הלוואה = <strong>מקור מימון</strong>. החברה קיבלה מזומן — לכן זה
                        מזומן נכנס (תזרים חיובי). ההלוואה מופיעה ב<strong>פעילות מימון</strong>{' '}
                        בדוח התזרים.
                      </p>
                    }
                    mode={masterOn ? 'reveal' : 'interactive'}
                  />
                  <MCQuestionCard
                    id="q1-mcq-v4"
                    prompt="מהי ההשפעה של רכישת הרהוט החדש (27,000 ₪) על תזרים המזומנים?"
                    options={[
                      { label: 'א', text: 'חיובי 27,000 ₪' },
                      { label: 'ב', text: 'שלילי 27,000 ₪ (ירידה במזומן)', correct: true },
                      { label: 'ג', text: '0 — רכוש קבוע לא משפיע על תזרים' },
                      { label: 'ד', text: 'שלילי 12,000 ₪' },
                    ]}
                    rationale={
                      <p>
                        רכישת רכוש קבוע במזומן = <strong>יציאת מזומן</strong>. הסכום הוא
                        27,000 (12,000 שינוי נטי + 15,000 רהוט ישן שנמכר = 27,000 חדש).
                        היא מופיעה ב<strong>פעילות השקעה</strong> עם סימן שלילי.
                      </p>
                    }
                    mode={masterOn ? 'reveal' : 'interactive'}
                  />
                </div>
              </div>
            </div>
          }
        >
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
            להלן יתרותיה המאזניות של חברת "רוגע" בע"מ ליום 31.12.16 וליום 31.12.17,
            ולאחר מכן הערות מנהל החשבונות. על בסיס הנתונים האלה נדרש להציג את
            <strong> דוח תזרים המזומנים לשנת 2017 בשיטה העקיפה</strong>.
          </p>

          <BalanceSheetTable
            caption="מאזן חברת רוגע — 31.12.16 מול 31.12.17 (בש״ח)"
            currentDate="31.12.17"
            priorDate="31.12.16"
            sections={Q1_BALANCE_SHEET_SECTIONS}
            total={{ current: 412_400, prior: 392_000 }}
          />

          <div>
            <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
              הערות
            </h4>
            <ol className="space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {Q1_FOOTNOTES.map((f) => (
                <li key={f.n} className="flex gap-2">
                  <sup className="font-bold text-[var(--color-accent-cobalt)] shrink-0">
                    ({f.n})
                  </sup>
                  <span>{f.body}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-r-4 border-[var(--color-accent-cobalt)] bg-[var(--color-accent-cobalt-bg)] rounded-md p-4">
            <div className="flex items-center gap-2 text-[var(--color-accent-cobalt-strong)] font-bold text-sm mb-1">
              <Info size={16} aria-hidden="true" />
              נדרש
            </div>
            <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
              הציגו דוח תזרים מזומנים ע"פ <strong>הגישה העקיפה</strong> של חברת "רוגע"
              בע"מ לשנה שנסתיימה ב-31.12.2017.
            </p>
          </div>

          <div className="mt-6 border border-dashed border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-lg p-4 sm:p-5">
            <h4 className="t-h3 text-sm font-bold text-[var(--color-primary)] mb-2">
              📝 תבנית ריקה למילוי עצמי
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              נסה למלא את התבנית בעצמך לפני שתציג את הפתרון. יתרת המזומנים
              בתחילת השנה (57,000) ובסוף השנה (29,000) נתונים — חשב את הסעיפים
              האמצעיים ובדוק שהם מתאימים לשינוי של 28,000-.
            </p>
            <FillableCashFlowStatement
              sections={Q1_CASH_FLOW_TEMPLATE}
              beginningCash={57_000}
              targetEndingCash={29_000}
              storageKey="fillable-cf-q1"
              caption="תבנית ריקה — מלא בעצמך"
              footer="טיפ: התחל מהשורה התחתונה (29,000) פחות (57,000) = −28,000. זה סך השינוי שצריך לחלק בין 3 הפעילויות. שים לב: שינוי ב'חייבים' (+9,000) אינו נכלל — זו פעולה לא-מזומנית (מכירת רהוט באשראי), ראה נספח ב׳ בפתרון."
            />
          </div>
        </ExamQuestion>

        {/* ── Q2: Equity (full worked solution) ───────────────────────── */}
        <ExamQuestion
          id="q2"
          number={2}
          title="הון עצמי"
          className="mt-12"
          solution={
            <ExamSolutionPanel
              isMasterOn={masterOn}
              questionId="q2"
              traps={[
                {
                  title: 'הוצאות הנפקה מקטינות את הפרמיה',
                  body: (
                    <>
                      באירוע 1, התמורה הגלובלית היא 120,000 ₪, אך 12,000 ₪ (10%)
                      מוצאים להוצאות הנפקה. לכן הפרמיה נטו היא רק{' '}
                      <strong>8,000 ₪</strong> (120,000 - 100,000 ע.נ. - 12,000
                      הוצאות), לא 20,000 ₪.
                    </>
                  ),
                },
                {
                  title: 'אירועים 4 ו-5 אינם אירועי הון',
                  body: (
                    <>
                      הקמת קרן לשיפוץ ציוד (80,000) ורכישת מניות "יותם" (110,000) אינם
                      משפיעים על ההון העצמי. הם מופיעים בדוח רק כשורות מידע
                      (isInformational), ללא תנועה בהון.
                    </>
                  ),
                },
                {
                  title: 'מניות הטבה: 40% מהפרמיה המקורית',
                  body: (
                    <>
                      באירוע 3, החברה הנפיקה מניות הטבה בשיעור 40% מהפרמיה
                      ה<strong>מקורית</strong> (200,000 ₪ = 80,000 מניות × 2 ₪ ע.נ.).
                      ההעברה: 160,000 ₪ מפרמיה להון מניות. אין תזרים מזומנים — רק
                      העברה פנימית בהון.
                    </>
                  ),
                },
                {
                  title: 'הדיבידנד: 0.20 ₪ למניה, לא 10% מהע.נ.',
                  body: (
                    <>
                      הדיבידנד 10% מחושב על <strong>298,000 מניות</strong> (אחרי כל
                      ההנפקות והמימושים). 10% × 2 ₪ ע.נ. = 0.20 ₪ למניה. 298,000
                      × 0.20 = <strong>59,600 ₪</strong>. טעות נפוצה: לחשב 10% מע.נ.
                      של מניה בודדת ולהתבלבל במספר המניות.
                    </>
                  ),
                },
              ]}
              insights={[
                {
                  title: 'כיצד לגזור את יתרת העודפים ל-1.1.2016?',
                  body: (
                    <>
                      <InlineFormula
                        left="עודפים(1.1.16)"
                        right="עודפים(31.12.16) − רווח נקי + דיבידנד"
                      />
                      {' '}כאן: 205,400 − 215,000 + 59,600 = <strong>50,000</strong>.
                      זו הטכניקה הסטנדרטית לגזירת יתרה פותחת מתוך יתרה סוגרת.
                    </>
                  ),
                },
                {
                  title: 'מימוש אופציות: טיפול בפרמיה',
                  body: (
                    <>
                      כאשר אופציה ממומשת, הסכום ששולם עבורה (5 ₪) עובר מחשבון
                      האופציות לחשבון הפרמיה (הוא היה "פרמיה דחויה" — הופך לפרמיה
                      רגילה). תוספת המימוש (8 ₪) היא מזומן חדש שמתפזר בין פרמיה
                      לע.נ. סה״כ לפרמיה: 40,000 (מאופציות) + 48,000 (מתוספת מימוש)
                      = 88,000. התבנית באתר מציגה את ה<em>נטו</em> אחרי הפחתת
                      40,000 שכבר נכלל בפרמיה באירוע 2.
                    </>
                  ),
                },
                {
                  title: 'שאלת הבונוס: רכישת מניות "יותם" = פעילות השקעה',
                  body: (
                    <>
                      החשב טועה. רכישת מניות אינה "מגדילה את הון החברה" — היא{' '}
                      <strong>מחליפה מזומן בנכס (השקעה)</strong>. בדוח תזרים
                      מזומנים, רכישת ני"ע להשקעה = <strong>פעילות השקעה</strong>,
                      לא פעילות מימון. ההון העצמי אינו משתנה — רק הרכב הנכסים
                      משתנה (מזומן → השקעה).
                    </>
                  ),
                },
                {
                  title: 'מניות הטבה: 40% מהון המניות, לא מהפרמיה',
                  body: (
                    <>
                      תיאור האירוע "40% מהפרמיה" עלול להטעות. 40% מהפרמיה
                      הנוכחית (228,000 אחרי אירוע 1) = 91,200, שבע.נ. 2 ={' '}
                      <strong>45,600 מניות</strong> — לא 80,000. הפירוש הנכון: 40%
                      מ<strong>מספר המניות הרגילות הקיים</strong> (200,000 מניות
                      אחרי אירוע 1) = <strong>80,000 מניות הטבה</strong>. ההעברה:
                      80,000 × 2 ₪ ע.נ. = 160,000 מפרמיה לע.נ. בחשבונאות העברית,
                      "מניות הטבה בשיעור X%" מתייחס בדרך כלל ל<strong>יחס
                      הדילול</strong> (מניות חדשות / מניות קיימות), לא לאחוז
                      מהפרמיה שמנוצל.
                    </>
                  ),
                },
              ]}
            >
              <div className="space-y-6">
                {/* Sub-question 1: RE calculation */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    1. יתרת העודפים ל-1.1.2016
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    גוזרים את יתרת העודפים הפותחת מתוך היתרה הסוגרת (205,400), הרווח
                    הנקי (215,000) והדיבידנד (59,600):
                  </p>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 t-data text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>עודפים(31.12.16)</span>
                      <span className="tabular-nums">205,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>פחות: רווח נקי לשנת 2016</span>
                      <span className="tabular-nums text-[var(--color-error)]">(215,000)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ועוד: דיבידנד שהוכרז</span>
                      <span className="tabular-nums">59,600</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-[var(--color-primary)]/40 pt-1 font-bold text-[var(--color-primary)]">
                      <span>עודפים(1.1.16)</span>
                      <span className="tabular-nums">50,000 ₪</span>
                    </div>
                  </div>
                </div>

                {/* Sub-question 2: Journal entries */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    2. פקודות יומן — אירועי הון עצמי לשנת 2016
                  </h4>
                  <div className="space-y-4">
                    <JournalEntry
                      date="1.2.2016"
                      title="אירוע 1 — הנפקת 50,000 מניות רגילות"
                      description="50,000 מניות × 2 ₪ ע.נ. = 100,000 ₪; תמורה 120,000 ₪; הוצאות הנפקה 12,000 ₪ מקוזזות מהפרמיה"
                      entries={[
                        { account: 'מזומנים', debit: 108_000, isDebit: true },
                        { account: 'הון מניות רגילות', credit: 100_000, isDebit: false },
                        { account: 'פרמיה על מניות', credit: 8_000, isDebit: false },
                      ]}
                      explanation={
                        <>
                          הצגה נטו: מזומן שנכנס בפועל (108,000) = תמורה (120,000)
                          פחות הוצאות הנפקה (12,000). ההוצאות רשומות בנפרד כהוצאה
                          (או כהפחתה ישירה מהפרמיה). הפרמיה נטו: 8,000 ₪.
                        </>
                      }
                    />
                    <JournalEntry
                      date="2.4.2016"
                      title="אירוע 2 — הנפקת 20,000 כתבי אופציה"
                      description="20,000 כתבי אופציה × 5 ₪ = 100,000 ₪"
                      entries={[
                        { account: 'מזומנים', debit: 100_000, isDebit: true },
                        { account: 'כתבי אופציה', credit: 100_000, isDebit: false },
                      ]}
                      explanation={
                        <>
                          כתבי אופציה הם רכיב הון עצמי (לא התחייבות) כי הם ניתנים
                          להמרה למניות רגילות. הסכום ששולם עבורם נחשב "פרמיה דחויה"
                          שתועבר לפרמיה רגילה בעת המימוש.
                        </>
                      }
                    />
                    <JournalEntry
                      date="1.5.2016"
                      title="אירוע 3 — הנפקת מניות הטבה מתוך הפרמיה"
                      description="80,000 מניות הטבה × 2 ₪ ע.נ. = 160,000 ₪ (40% מהפרמיה)"
                      entries={[
                        { account: 'פרמיה על מניות', debit: 160_000, isDebit: true },
                        { account: 'הון מניות רגילות', credit: 160_000, isDebit: false },
                      ]}
                      explanation={
                        <>
                          מניות הטבה = העברה מפרמיה להון מניות. אין תזרים מזומנים.
                          80,000 מניות × 2 ₪ ע.נ. = 160,000 ₪ מועברים מפרמיה לע.נ.
                          יתרת הפרמיה אחרי: 220,000 + 8,000 - 160,000 = 68,000 ₪.
                        </>
                      }
                    />
                    <div className="text-sm text-[var(--color-text-tertiary)] italic border-r-4 border-[var(--color-text-tertiary)]/30 pr-3 py-2">
                      <strong>אירוע 4 (15.6.2016):</strong> הקמת קרן לשיפוץ ציוד
                      (80,000 ₪) — <strong>אינו אירוע הון עצמי</strong>. זהו
                      התחייבות (קרן ייעודית), לא הון. פקודת היומן: Dr. רהוט /
                      Cr. קרן לשיפוץ 80,000.
                    </div>
                    <div className="text-sm text-[var(--color-text-tertiary)] italic border-r-4 border-[var(--color-text-tertiary)]/30 pr-3 py-2">
                      <strong>אירוע 5 (20.8.2016):</strong> רכישת מניות "יותם"
                      (110,000 ₪) — <strong>אינו אירוע הון עצמי</strong>. זוהי
                      השקעה (נכס), לא הון. פקודת היומן: Dr. השקעה במניות / Cr.
                      מזומנים 110,000.
                    </div>
                    <JournalEntry
                      date="2.9.2016"
                      title="אירוע 6 — רכישת מחסן תמורת הנפקת מניות"
                      description="10,000 מניות × 2 ₪ ע.נ. = 20,000 ₪ (הונפקו בע.נ., ללא פרמיה)"
                      entries={[
                        { account: 'מחסן', debit: 20_000, isDebit: true },
                        { account: 'הון מניות רגילות', credit: 20_000, isDebit: false },
                      ]}
                      explanation={
                        <>
                          רכישת נכס קבוע תמורת הנפקת מניות = עסקת non-cash. המחסן
                          מוכר בערך ההוגן (20,000) = ערך המניות שהונפקו. המניות
                          הונפקו בע.נ. (ללא פרמיה) כי שווי המחסן = ע.נ. המניות.
                        </>
                      }
                    />
                    <JournalEntry
                      date="21.10.2016"
                      title="אירוע 7 — מימוש 8,000 כתבי אופציה"
                      description="8,000 אופציות × 8 ₪ תוספת מימוש = 64,000 ₪ מזומן; 16,000 ₪ לע.נ. + 48,000 ₪ לפרמיה"
                      entries={[
                        { account: 'מזומנים', debit: 64_000, isDebit: true },
                        { account: 'הון מניות רגילות', credit: 16_000, isDebit: false },
                        { account: 'פרמיה על מניות', credit: 48_000, isDebit: false },
                      ]}
                      explanation={
                        <>
                          הצגה מקוצרת: מזומן מתוספת מימוש (64,000) = ע.נ. (16,000) +
                          פרמיה נטו (48,000). בהצגה הסטנדרטית היו מועברים גם
                          40,000 מחשבון האופציות לפרמיה (סה״כ פרמיה 88,000) — ראה
                          הערה בסוף הדוח.
                        </>
                      }
                    />
                    <JournalEntry
                      date="31.12.2016"
                      title="אירוע 8 — סגירת רווח נקי לעודפים"
                      description="רווח נקי 215,000 ₪ מועבר מדוח רווח והפסד לעודפים"
                      entries={[
                        { account: 'רווח נקי (סגירת P&L)', debit: 215_000, isDebit: true },
                        { account: 'עודפים - יתרת רווח', credit: 215_000, isDebit: false },
                      ]}
                      explanation={
                        <>
                          בסוף השנה, יתרת דוח רווח והפסד מועברת לעודפים. זהו רישום
                          סגירה פנימי שלא משפיע על סך ההון.
                        </>
                      }
                    />
                    <JournalEntry
                      date="31.12.2016"
                      title="אירוע 9 — הכרזת דיבידנד"
                      description="298,000 מניות × 0.20 ₪ = 59,600 ₪ (ישולם במרץ 2017)"
                      entries={[
                        { account: 'עודפים - יתרת רווח', debit: 59_600, isDebit: true },
                        { account: 'דיבידנד לשלם', credit: 59_600, isDebit: false },
                      ]}
                      explanation={
                        <>
                          הכרזת דיבידנד מקטינה את העודפים ויוצרת התחייבות (דיבידנד
                          לשלם). התשלום בפועל (במרץ 2017) יהיה רישום נפרד: Dr.
                          דיבידנד לשלם / Cr. מזומנים 59,600.
                        </>
                      }
                    />
                  </div>
                </div>

                {/* Sub-question 3: Full equity changes statement */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    3. דוח שינויים בהון עצמי — חברת דן ואלה בע״מ ל-31.12.2016
                  </h4>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden">
                    <table className="w-full text-sm" dir="rtl">
                      <thead>
                        <tr className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">אירוע</th>
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">הון מניות</th>
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">פרמיה</th>
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">כתבי אופציה</th>
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">עודפים</th>
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">סה״כ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[var(--color-border)]/30 bg-[var(--color-primary)]/5 font-bold">
                          <td className="px-3 py-2 text-start">יתרה ליום 1.1.2016</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">300,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">220,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">50,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-primary)]">570,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20">
                          <td className="px-3 py-2 text-start text-xs">1.2.2016 · הנפקת 50,000 מניות</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">100,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">8,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">108,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20">
                          <td className="px-3 py-2 text-start text-xs">2.4.2016 · הנפקת 20,000 אופציות</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">100,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">100,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20">
                          <td className="px-3 py-2 text-start text-xs">1.5.2016 · מניות הטבה (40%)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">160,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-error)]">(160,000)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20 bg-[var(--color-surface-raised)]/30 text-[var(--color-text-tertiary)]">
                          <td className="px-3 py-2 text-start text-xs italic">15.6.2016 · קרן לשיפוץ (לא הון)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20 bg-[var(--color-surface-raised)]/30 text-[var(--color-text-tertiary)]">
                          <td className="px-3 py-2 text-start text-xs italic">20.8.2016 · רכישת מניות "יותם" (לא הון)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">—</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20">
                          <td className="px-3 py-2 text-start text-xs">2.9.2016 · רכישת מחסן תמורת מניות</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">20,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">20,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20">
                          <td className="px-3 py-2 text-start text-xs">21.10.2016 · מימוש 8,000 אופציות</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">16,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">48,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-error)]">(40,000)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">24,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20">
                          <td className="px-3 py-2 text-start text-xs">31.12.2016 · רווח נקי</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">215,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">215,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/20">
                          <td className="px-3 py-2 text-start text-xs">31.12.2016 · דיבידנד 10%</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-text-tertiary)]">—</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-error)]">(59,600)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-error)]">(59,600)</td>
                        </tr>
                        <tr className="border-t-2 border-[var(--color-primary)]/40 bg-[var(--color-primary)]/8 font-bold">
                          <td className="px-3 py-2 text-start text-[var(--color-primary)]">יתרה ליום 31.12.2016</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-primary)]">596,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-primary)]">116,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-primary)]">60,000</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-primary)]">205,400</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-primary)]">977,400</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 bg-[var(--color-info-bg)] border-r-4 border-[var(--color-info)] rounded-md p-3">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      <strong>הערה למימוש אופציות (אירוע 7):</strong> בפקודת היומן
                      הסטנדרטית, הסכום ששולם עבור האופציות (40,000 = 5 × 8,000)
                      מועבר מחשבון האופציות לפרמיה — מה שיוצר סה״כ פרמיה של{' '}
                      <strong>88,000</strong> (40,000 + 48,000) וחיוב{' '}
                      <code className="text-xs px-1 rounded bg-[var(--color-surface-raised)]">כתבי אופציה</code>{' '}
                      ב-40,000. התבנית באתר והטבלה למעלה מציגות את ה<em>נטו</em>{' '}
                      (48,000) ומקזזות את 40,000 האופציות ישירות — שתי ההצגות
                      נכונות, רק ב<em>רמת ההצגה</em> שונה.
                    </p>
                  </div>
                  <InsightBlock>
                    <p className="text-sm">
                      <strong>✅ אומת:</strong> יתרת העודפים הסופית (205,400) תואמת
                      את הנתון בשאלה. סה״כ ההון העצמי: 596,000 + 116,000 + 60,000
                      + 205,400 = <strong>977,400 ₪</strong>.
                    </p>
                  </InsightBlock>
                </div>

                {/* Sub-question 4: Bonus */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    4. שאלת הבונוס: האם רכישת מניות "יותם" = פעילות מימון?
                  </h4>
                  <div className="bg-[var(--color-error)]/5 border-r-4 border-[var(--color-error)] rounded-md p-4 mb-3">
                    <p className="text-sm font-bold text-[var(--color-error)] mb-1">
                      ❌ החשב טועה.
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                      רכישת מניות אינה "מגדילה את הון החברה" — היא{' '}
                      <strong>מחליפה מזומן בנכס (השקעה)</strong>. ההון העצמי אינו
                      משתנה — רק הרכב הנכסים משתנה.
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    בדוח תזרים מזומנים, רכישת ני"ע להשקעה מסווגת כ:
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-[var(--color-text-primary)]">
                    <li>
                      <strong>פעילות השקעה</strong> — אם הכוונה היא השקעה ארוכת-טווח
                      או השפעה מהותית (שיטת השווי המאזני).
                    </li>
                    <li>
                      <strong>פעילות שוטפת</strong> — אם הכוונה היא מסחר (FVTPL).
                    </li>
                  </ul>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-3">
                    בשני המקרים, <strong>לא</strong> פעילות מימון. פעילות מימון
                    כוללת רק עסקאות עם בעלי הון ונושים (הנפקת מניות, נטילת
                    הלוואות, תשלום דיבידנדים, פירעון קרן).
                  </p>
                  <div className="bg-[var(--color-info-bg)] border-r-4 border-[var(--color-info)] rounded-md p-3 mt-3">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      <strong>הערה:</strong> הנהלת החשבונאות הלאומי (הנח"ש) קובעת
                      כי רכישת השקעות בני"ע = פעילות השקעה, ללא קשר למידת
                      ההחזקה. זאת כדי להבחין בין פעולות שוטפות (ייצור ומכירה)
                      לבין פעולות השקעה (רכישת נכסים לטווח ארוך).
                    </p>
                  </div>
                </div>
              </div>
            </ExamSolutionPanel>
          }
        >
          <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
            להלן נתונים על ההון העצמי של חברת "דן ואלה" בע"מ ל-31.12.2015 (בש"ח):
          </p>
          <ul className="text-sm space-y-1 list-none pr-0">
            <li className="flex justify-between border-b border-[var(--color-border)]/40 pb-1">
              <span>הון מניות רגילות (2 ₪ ע.נ)</span>
              <span className="t-data tabular-nums">300,000</span>
            </li>
            <li className="flex justify-between border-b border-[var(--color-border)]/40 pb-1">
              <span>פרמיה על מניות</span>
              <span className="t-data tabular-nums">220,000</span>
            </li>
            <li className="flex justify-between pb-1">
              <span>עודפים</span>
              <span className="t-data tabular-nums text-[var(--color-text-tertiary)]">????</span>
            </li>
          </ul>
          <p className="text-sm font-bold mt-2">נתונים נוספים:</p>
          <ol className="text-sm space-y-1.5 list-decimal list-inside">
            {Q2_EVENTS_2016.map((e, i) => (
              <li key={i}>
                <strong>{e.date}:</strong> {e.desc}
              </li>
            ))}
            <li>
              <strong>בנוסף:</strong> יתרת העודפים ל-31.12.2016 הינה 205,400 ₪.
            </li>
          </ol>
          <p className="text-sm font-bold mt-2">נדרש:</p>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>מהי יתרת העודפים ל-1.1.2016?</li>
            <li>רשמו פקודות יומן לעדכון כל האירועים הקשורים להון העצמי של חברת "דן ואלה" לשנת 2016.</li>
            <li>הציגו דו"ח על השינויים בהון העצמי של חברת "דן ואלה" ל-31.12.2016.</li>
            <li>חשב חברת "דן ואלה" טוען שיש להציג את רכישת המניות של חברת "יותם" בדוח תזרים מזומנים לשנת 2016 כתז"מ מפעילות מימון, מכיוון שרכישה של מניות נוספות מגדילה את הון החברה. האם החשב צודק? הסבירו.</li>
          </ol>

          <div className="mt-6 border border-dashed border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-lg p-4 sm:p-5">
            <h4 className="t-h3 text-sm font-bold text-[var(--color-primary)] mb-2">
              📝 תבנית ריקה למילוי עצמי
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              נסה למלא את התבנית בעצמך לפני שתציג את הפתרון. יתרת העודפים
              בסוף 2016 נתונה (205,400) — חשב את יתרת ההתחלה, עבור על כל אירוע,
              ובדוק שהיתרה הסופית תואמת.
            </p>
            <FillableEquityChangesStatement
              columns={Q2_EQUITY_COLUMNS}
              rows={Q2_EQUITY_TEMPLATE}
              storageKey="fillable-equity-q2"
              caption="דוח שינויים בהון עצמי — חברת דן ואלה בע״מ לשנת 2016"
              footer="טיפ: התחל מחישוב יתרת העודפים ל-1.1.2016: 205,400 + 59,600 (דיבידנד) − 215,000 (רווח) = 50,000. לאחר מכן עבור על כל אירוע וסמן רק את רכיבי ההון שהושפעו. שים לב: אירועים 4 (קרן ציוד) ו-5 (מניות 'יותם') אינם משפיעים על ההון. לסכומים שליליים — הקלד מספר עם מינוס (למשל: -160000) או בסוגריים (160,000)."
            />
          </div>
        </ExamQuestion>

        {/* ── Q3: Equity method (Phase 2 placeholder) ─────────────────── */}
        <ExamQuestion
          id="q3"
          number={3}
          title="השקעות בשיטת שווי מאזני"
          className="mt-12"
          solution={
            <ExamSolutionPanel
              isMasterOn={masterOn}
              questionId="q3"
              traps={[
                {
                  title: 'הפרש מקורי: אל תשכח את התאמות השווי ההוגן!',
                  body: (
                    <>
                      סטודנטים רבים משווים את העלות <strong>284,000</strong> רק ל
                      <strong>40% מההון העצמי הספרתי (184,000)</strong> ומייחסים את כל
                      ההפרש של 100,000 למוניטין. אבל ההון העצמי הספרתי <strong>לא כולל</strong>
                      {' '}את התאמות השווי ההוגן. החישוב הנכון:{' '}
                      <strong>40% × (460,000 + 70,000 + 55,000) = 40% × 585,000 = 234,000</strong>.
                      {' '}הפרש מקורי = 284,000 − 234,000 = <strong>50,000</strong> (מוניטין בלבד).
                    </>
                  ),
                },
                {
                  title: 'תוחלת החיים של המכונה: 4 שנים, לא 9!',
                  body: (
                    <>
                      המכונה נרכשה ב-1.4.2011 עם תוחלת חיים של 9 שנים (עד 31.3.2020). ביום
                      הרכישה שלנו (1.4.2016) <strong>כבר עברו 5 שנים</strong> מהפחת, כך
                      שנותרו רק <strong>4 שנים</strong> (אפריל 2016 עד מרץ 2020). הפחתה
                      שנתית = 28,000 / 4 = 7,000.{' '}
                      <strong>טעות נפוצה:</strong> לחלק ל-9 שנים (3,111 לשנה) במקום 4.
                    </>
                  ),
                },
                {
                  title: 'תזמון 9/12: גם לרווח האקוויטי וגם להפחתה',
                  body: (
                    <>
                      הרכישה הייתה ב-1.4.2016, כך שבשנת 2016 רק 9 חודשים (אפריל-דצמבר)
                      רלוונטיים. לכן: רווח אקוויטי: 40% × 240,000 × <strong>9/12</strong> ={' '}
                      <strong>72,000</strong> (לא 96,000); הפחתת מכונה: 7,000 ×{' '}
                      <strong>9/12</strong> = <strong>5,250</strong> (לא 7,000). הדיבידנד
                      לעומת זאת מוכרז על <strong>כל השנה</strong> (62,000) — לא מתואם ל-9/12.
                    </>
                  ),
                },
                {
                  title: 'הדיבידנד מקטין את ההשקעה, לא עובר דרך הרווח והפסד',
                  body: (
                    <>
                      קבלת דיבידנד (24,800) <strong>מקטינה את יתרת ההשקעה</strong> (זכות
                      בחשבון), אבל <strong>לא נכנסת לדו"ח רווח והפסד</strong>. הסיבה: חלקנו
                      ברווח כבר הוכר ב-72,000 מהרווח הנקי של חרסינות — קבלת הדיבידנד היא
                      רק העברת מזומן, לא הכנסה חדשה.
                    </>
                  ),
                },
              ]}
              insights={[
                {
                  title: 'מוניטין לא מופחת!',
                  body: (
                    <>
                      בשיטת השווי המאזני, <strong>רק התאמות השווי ההוגן מופחתות</strong>
                      (במקרה זה: מכונה). מוניטין <strong>לא מופחת</strong> — הוא רק נבדק
                      לירידת ערך. לכן 50,000 המוניטין נשארים בחשבון ההשקעה לכל אורך
                      תקופת ההחזקה.
                    </>
                  ),
                },
                {
                  title: 'הרווח האקוויטי נטו = חלק ברווח − הפחתה',
                  body: (
                    <>
                      לדו"ח רווח והפסד נכנסים רק שני רכיבים: חלקנו ברווח נקי של חרסינות
                      (72,000) והפחתת ההפרש המקורי (-5,250). ביחד:{' '}
                      <strong>66,750 ₪</strong>. הדיבידנד לא נכלל.
                    </>
                  ),
                },
              ]}
            >
              <div className="space-y-6">
                {/* Sub-question 1: Original difference breakdown */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    1. חישוב הפרש מקורי וייחוסו
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    ביום הרכישה (1.4.2016) — העלות מושווה ל-40% מהשווי ההוגן של נכסי
                    חרסינות (כולל תאמות):
                  </p>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 t-data text-sm">
                    <table className="w-full" dir="rtl">
                      <tbody>
                        <tr className="border-b border-[var(--color-border)]/40">
                          <td className="py-1.5 text-start">עלות הרכישה (40% מ"חרסינות")</td>
                          <td className="py-1.5 text-end tabular-nums font-bold">284,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/40">
                          <td className="py-1.5 text-start">40% × הון עצמי ספרתי (140,000 + 40,000 + 280,000)</td>
                          <td className="py-1.5 text-end tabular-nums">(184,000)</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/40">
                          <td className="py-1.5 text-start">40% × עודף שווי הוגן — מכונה (70,000)</td>
                          <td className="py-1.5 text-end tabular-nums">(28,000)</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/40">
                          <td className="py-1.5 text-start">40% × עודף שווי הוגן — קרקע (55,000)</td>
                          <td className="py-1.5 text-end tabular-nums">(22,000)</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 text-start font-bold text-[var(--color-primary)]">
                            הפרש מקורי = מוניטין
                          </td>
                          <td className="py-1.5 text-end tabular-nums font-bold text-[var(--color-primary)]">
                            50,000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
                    <strong>הערה חשובה:</strong> תוחלת החיים של המכונה — נרכשה 1.4.2011,
                    פחת 9 שנים (עד 31.3.2020). ביום הרכישה שלנו (1.4.2016) נותרו{' '}
                    <strong>4 שנים</strong> (לא 9). הפחתה שנתית: 28,000 / 4 = 7,000.
                  </p>
                </div>

                {/* Sub-question 2: Investment movement */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    2. תנועה בחשבון ההשקעה — שנת 2016
                  </h4>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden">
                    <table className="w-full text-sm" dir="rtl">
                      <thead>
                        <tr className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">תאריך</th>
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">תיאור</th>
                          <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] w-32">חשבון השקעה</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[var(--color-border)]/30 bg-[var(--color-primary)]/5">
                          <td className="px-3 py-2 text-start text-xs">1.4.2016</td>
                          <td className="px-3 py-2 text-start font-bold">רכישת 40% ממניות "חרסינות"</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums font-bold text-[var(--color-primary)]">284,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/30">
                          <td className="px-3 py-2 text-start text-xs text-[var(--color-text-tertiary)]">31.12.2016</td>
                          <td className="px-3 py-2 text-start">חלק ברווח נקי (40% × 240,000 × 9/12)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums">72,000</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/30">
                          <td className="px-3 py-2 text-start text-xs text-[var(--color-text-tertiary)]">31.12.2016</td>
                          <td className="px-3 py-2 text-start">הפחתת עודף שווי הוגן — מכונה (28,000/4 × 9/12)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-error)]">(5,250)</td>
                        </tr>
                        <tr className="border-b border-[var(--color-border)]/30">
                          <td className="px-3 py-2 text-start text-xs text-[var(--color-text-tertiary)]">31.12.2016</td>
                          <td className="px-3 py-2 text-start">דיבידנד שהתקבל (40% × 62,000)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-error)]">(24,800)</td>
                        </tr>
                        <tr className="bg-[var(--color-primary)]/10 border-t-2 border-[var(--color-primary)]/40 font-bold">
                          <td className="px-3 py-2 text-start text-xs">31.12.2016</td>
                          <td className="px-3 py-2 text-start text-[var(--color-primary)]">יתרת סגירה (מחושב)</td>
                          <td className="px-3 py-2 text-end t-data tabular-nums text-[var(--color-primary)]">325,950</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sub-question 3: P&L impact */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    3. רווח/הפסד אקוויטי בדו"ח רווח והפסד
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    רק הרווח האקוויטי (72,000) והפחתת ההפרש המקורי (-5,250) נכנסים
                    לדו"ח רווח והפסד. הדיבידנד לא נכלל.
                  </p>
                  <div className="bg-[var(--color-accent-cobalt)]/5 border-r-4 border-[var(--color-accent-cobalt)] rounded-md p-3">
                    <div className="t-data tabular-nums text-sm flex justify-between">
                      <span>רווח אקוויטי בדו"ח רווח והפסד:</span>
                      <span className="font-bold text-[var(--color-accent-cobalt-strong)]">66,750 ₪</span>
                    </div>
                    <div className="text-xs text-[var(--color-text-tertiary)] mt-1">
                      = 72,000 (חלק ברווח) − 5,250 (הפחתה)
                    </div>
                  </div>
                </div>

                {/* Sub-question 4: 15% sale on 1.1.2017 */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    4. מכירת 15% מהמניות ב-1.1.2017
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    המכירה היא של 15% / 40% = <strong>37.5%</strong> מההשקעה. ההחזקה
                    הנותרת היא 25% — מהווה השפעה מהותית, ולכן{' '}
                    <strong>שיטת השווי המאזני ממשיכה</strong> (לא מעבר ל-FVTPL).
                  </p>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 t-data text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>יתרת ההשקעה המיוחסת ל-15% שנמכרו (325,950 × 37.5%)</span>
                      <span className="tabular-nums font-bold">122,231</span>
                    </div>
                    <div className="flex justify-between">
                      <span>פחת: הפסד הון שנוצר</span>
                      <span className="tabular-nums text-[var(--color-error)]">(22,231)</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-[var(--color-primary)]/40 pt-2 font-bold text-[var(--color-primary)]">
                      <span>תמורה שהתקבלה = 122,231 − 22,231</span>
                      <span className="tabular-nums">100,000 ₪</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
                    <strong>טיפ:</strong> סכום התמורה מעוגל בש"ח שלם. המכירה אינה
                    משנה את שיטת החשבונאות כי נותרה החזקה מהותית (25%).
                  </p>
                </div>
              </div>
            </ExamSolutionPanel>
          }
        >
          <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
            ב-<strong>{Q3_DATA.acquisitionDate}</strong> רכשה חברת "{Q3_DATA.acquirer}"{' '}
            <strong>{Q3_DATA.sharesAcquired.toLocaleString('he-IL')}</strong> מניות מתוך{' '}
            {Q3_DATA.totalShares.toLocaleString('he-IL')} של חברת "{Q3_DATA.acquiree}" בע"מ תמורת{' '}
            <strong>{Q3_DATA.cost.toLocaleString('he-IL')} ₪</strong> (40% מהון).
          </p>
          <p className="text-sm leading-relaxed">
            יתרות ההון העצמי של "{Q3_DATA.acquiree}" בע"מ ל-{Q3_DATA.acquisitionDate} (בש"ח):
          </p>
          <ul className="text-sm space-y-1 list-none">
            <li className="flex justify-between border-b border-[var(--color-border)]/40 pb-1">
              <span>הון מניות</span>
              <span className="t-data tabular-nums">{Q3_DATA.acquireeEquityAtAcquisition.stockCapital.toLocaleString('he-IL')}</span>
            </li>
            <li className="flex justify-between border-b border-[var(--color-border)]/40 pb-1">
              <span>פרמיה</span>
              <span className="t-data tabular-nums">{Q3_DATA.acquireeEquityAtAcquisition.premium.toLocaleString('he-IL')}</span>
            </li>
            <li className="flex justify-between pb-1">
              <span>עודפים</span>
              <span className="t-data tabular-nums">{Q3_DATA.acquireeEquityAtAcquisition.retainedEarnings.toLocaleString('he-IL')}</span>
            </li>
          </ul>
          <p className="text-sm leading-relaxed mt-2">
            נכון ליום הרכישה, בבעלות "{Q3_DATA.acquiree}" מכונה שערכה בשוק גבוה ב-
            <strong>70,000 ₪</strong> מערכה בספרים (מעלותה המופחתת). המכונה נרכשה ב-1.4.2011
            ומופחתת על פני 9 שנים ממועד רכישתה. בנוסף, בבעלותה קרקע שערכה גבוה ב-55,000 ₪ מערכה
            בספרים.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            בשנת 2016 דיווחה "{Q3_DATA.acquiree}" על רווח נקי בסך 240,000 ₪ (מתפלג באופן
            שווה במשך השנה). בנוסף, חילקה דיבידנד לשנת 2016 בסך 62,000 ₪.
          </p>
          <p className="text-sm font-bold mt-3">נדרש:</p>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>הציגו חישוב הפרש מקורי וייחוסו.</li>
            <li>הציגו תנועה בחשבון ההשקעה ב"{Q3_DATA.acquiree}" בספרי "{Q3_DATA.acquirer}" לשנת 2016.</li>
            <li>מהם רווחי/הפסדי אקוויטי שתזקוף "{Q3_DATA.acquirer}" בגין השקעתה לשנת 2016?</li>
            <li>ב-1.1.2017 מכרה "{Q3_DATA.acquirer}" 15% ממניות "{Q3_DATA.acquiree}". כתוצאה ממכירה זו נוצר הפסד הון בסך 22,231 ₪. מהי התמורה שנתקבלה?</li>
          </ol>

          <div className="mt-6 border border-dashed border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-lg p-4 sm:p-5">
            <h4 className="t-h3 text-sm font-bold text-[var(--color-primary)] mb-2">
              📝 תבנית ריקה למילוי עצמי
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              נסה למלא את התבנית בעצמך לפני שתציג את הפתרון. יתרת ההשקעה לאחר
              הרכישה נתונה (284,000) — חשב את 3 התנועות במהלך 2016, ובדוק
              שהיתרה הסופית תואמת.
            </p>
            <FillableInvestmentAccountMovement
              rows={Q3_INVESTMENT_TEMPLATE}
              targetBalance={325_950}
              storageKey="fillable-investment-q3"
              caption="תנועה בחשבון ההשקעה — שיטת השווי המאזני לשנת 2016"
              footer="טיפ: חישוב ההפרש המקורי: 40% × (הון עצמי 460,000 + מכונה 70,000 + קרקע 55,000) = 234,000. הפרש מקורי = 284,000 − 234,000 = 50,000 (כולו מוניטין). הפחתת מכונה: 40% × 70,000 = 28,000 לחלק ל-4 שנים נותרות (2016-2020) = 7,000 לשנה. לשנת 2016 (9 חודשים מאז הרכישה) = 5,250. רווח אקוויטי: 40% × 240,000 × 9/12 = 72,000. דיבידנד: 40% × 62,000 = 24,800. לסכומים שליליים — הקלד מספר עם מינוס או בסוגריים."
            />
          </div>
        </ExamQuestion>

        {/* ── Q4: Liabilities (Phase 2 placeholder) ──────────────────── */}
        <ExamQuestion
          id="q4"
          number={4}
          title="התחייבויות (אג״ח)"
          className="mt-12"
          solution={
            <ExamSolutionPanel
              isMasterOn={masterOn}
              questionId="q4"
              traps={[
                {
                  title: 'הנוסחה לגזירת הפרמיה: 5/8, לא 3/8!',
                  body: (
                    <>
                      אחרי 3 שנים של הפחתה (2017, 2018, 2019), <strong>נותרו 5 שנים</strong>
                      {' '}מתוך 8. לכן: <strong>X × 5/8 = 20,000</strong> →{' '}
                      <strong>X = 32,000</strong>. טעות נפוצה: לכתוב 3/8 (זהו היחס של
                      ההפחתה, לא של היתרה).
                    </>
                  ),
                },
                {
                  title: 'ריבית משולמת בתחילת כל שנה — לא בסוף!',
                  body: (
                    <>
                      הריבית משולמת <strong>ב-1.1.2018 ואילך</strong> (תחילת השנה), לא
                      ב-31.12.2017. לכן תשלום הריבית ב-1.1.2018{' '}
                      <strong>מכסה את שנת 2017</strong> (12 חודשים אחורה). ב-31.12.2017
                      רושמים הוצאת ריבית + חיוב ריבית לשלם. ב-1.1.2018 רושמים רק
                      סגירה של ההתחייבות.
                    </>
                  ),
                },
                {
                  title: 'הפחתת פרמיה = הקטנת הוצאת הריבית',
                  body: (
                    <>
                      כשמנפיקים אג"ח <strong>בפרמיה</strong> (קיבלנו יותר מהערך הנקוב),
                      הריבית האפקטיבית נמוכה מהריבית הנקובה. הפרמיה מופחתת על פני חיי
                      האג"ח, ומקטינה את הוצאת הריבית השנתית: הוצ' מימון נטו = 24,500
                      (ריבית במזומן) − 4,000 (הפחתה) = <strong>20,500</strong>. טעות
                      נפוצה: לחבר במקום לחסר (28,500 במקום 20,500).
                    </>
                  ),
                },
              ]}
              insights={[
                {
                  title: 'הנוסחה ההפוכה: גוזרים את הפרמיה מתוך יתרת סוף תקופה',
                  body: (
                    <>
                      כשנתון יתרת פרמיה בנקודת זמן <em>t</em>, אפשר לגזור את הפרמיה
                      המקורית: <strong>X = יתרה × תקופה / (תקופה − t)</strong>. כאן:{' '}
                      20,000 × 8 / 5 = <strong>32,000</strong>.
                    </>
                  ),
                },
                {
                  title: 'למה ריבית בתחילת השנה? הלוואה סינדיקטית',
                  body: (
                    <>
                      תשלום ריבית בתחילת השנה אופייני ל<strong>הלוואות סינדיקטיות</strong>
                      {' '}ולאג"ח קונצרניות — המלווה מקבל את הריבית על השנה הראשונה
                      מראש כחלק מהפרמיה. זה מסביר מדוע הפרמיה גבוהה יחסית (32,000 /
                      350,000 ≈ <strong>9.1%</strong>).
                    </>
                  ),
                },
              ]}
            >
              <div className="space-y-6">
                {/* Sub-question 1: Proceeds + journal entry */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    1. תמורת ההנפקה + פקודת יומן
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    גוזרים את הפרמיה המקורית מתוך יתרת 31.12.2019 (20,000):
                  </p>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 mb-3 text-sm space-y-1">
                    <div className="t-data flex justify-between">
                      <span>פרמיה מקורית: X − 3(X/8) = 20,000 → X(5/8) = 20,000</span>
                      <span className="tabular-nums font-bold">X = 32,000</span>
                    </div>
                    <div className="t-data flex justify-between border-t border-[var(--color-border)]/30 pt-1">
                      <span>תמורת ההנפקה = 350,000 + 32,000</span>
                      <span className="tabular-nums font-bold text-[var(--color-primary)]">382,000 ₪</span>
                    </div>
                  </div>
                  <JournalEntry
                    date="1.1.2017"
                    title="פקודת יומן — הנפקת אג״ח"
                    description="רישום הנפקה בפרמיה"
                    entries={[
                      { account: 'מזומנים', debit: 382_000, isDebit: true },
                      { account: 'אג״ח לשלם (ע.נ.)', credit: 350_000, isDebit: false },
                      { account: 'פרמיה על אג״ח', credit: 32_000, isDebit: false },
                    ]}
                    explanation={
                      <>
                        המזומן שהתקבל (382,000) מופרד לרכיב ההתחייבות (350,000 = ע.נ.)
                        ולרכיב הפרמיה (32,000). הפרמיה תופחת על פני 8 שנים בשיטת הקו
                        הישר (4,000 לשנה).
                      </>
                    }
                  />
                </div>

                {/* Sub-question 2: 2017 net interest */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    2. הוצאות מימון נטו לשנת 2017
                  </h4>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 mb-3 text-sm">
                    <div className="t-data flex justify-between">
                      <span>ריבית במזומן (350,000 × 7%)</span>
                      <span className="tabular-nums">24,500</span>
                    </div>
                    <div className="t-data flex justify-between">
                      <span>פחות: הפחתת פרמיה (32,000 / 8)</span>
                      <span className="tabular-nums text-[var(--color-error)]">(4,000)</span>
                    </div>
                    <div className="t-data flex justify-between border-t-2 border-[var(--color-primary)]/40 pt-1 font-bold text-[var(--color-primary)]">
                      <span>הוצאות מימון נטו ל-2017</span>
                      <span className="tabular-nums">20,500 ₪</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <JournalEntry
                      date="31.12.2017"
                      title="פקודת יומן — חתך ריבית ל-2017"
                      description="הכרת הוצאת ריבית + הפחתת פרמיה"
                      entries={[
                        { account: 'הוצאות מימון (ריבית)', debit: 20_500, isDebit: true },
                        { account: 'פרמיה על אג״ח', debit: 4_000, isDebit: true },
                        { account: 'ריבית לשלם', credit: 24_500, isDebit: false },
                      ]}
                      explanation={
                        <>
                          ב-31.12.2017 נצברה ריבית של 24,500 (לתשלום ב-1.1.2018).
                          הפרמיה מופחתת ב-4,000 — סכום הריבית הנטו לדו"ח רווח והפסד הוא
                          20,500.
                        </>
                      }
                    />
                    <JournalEntry
                      date="1.1.2018"
                      title="פקודת יומן — תשלום ריבית"
                      description="תשלום הריבית שנצברה ב-2017"
                      entries={[
                        { account: 'ריבית לשלם', debit: 24_500, isDebit: true },
                        { account: 'מזומנים', credit: 24_500, isDebit: false },
                      ]}
                      explanation={
                        <>
                          תשלום מזומן של 24,500 סוגר את ההתחייבות שנצברה ב-2017. שים
                          לב: <strong>אין</strong> רישום לריבית של 2018 ביום זה — זו
                          ריבית שתצבור במהלך 2018 (ושולמה ב-1.1.2019).
                        </>
                      }
                    />
                  </div>
                </div>

                {/* Sub-question 3: 31.12.2021 bond note */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    3. יתרת אג״ח נטו ב-31.12.2021 (סוף שנה 5)
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    אחרי 5 שנות הפחתה:
                  </p>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 mb-3 text-sm space-y-1">
                    <div className="t-data flex justify-between">
                      <span>פרמיה שנותרה: 32,000 − (5 × 4,000)</span>
                      <span className="tabular-nums">12,000</span>
                    </div>
                    <div className="t-data flex justify-between border-t border-[var(--color-border)]/30 pt-1 font-bold text-[var(--color-primary)]">
                      <span>יתרת אג״ח נטו = 350,000 + 12,000</span>
                      <span className="tabular-nums">362,000 ₪</span>
                    </div>
                  </div>
                  <h5 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    ביאור: לוח סילוקין מלא (8 שנים)
                  </h5>
                  <AmortizationTable
                    title="אג״ח — הפחתת פרמיה בקו ישר"
                    type="premium"
                    rows={[
                      { date: '31.12.2017', openingBalance: 32_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 28_000 },
                      { date: '31.12.2018', openingBalance: 28_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 24_000 },
                      { date: '31.12.2019', openingBalance: 24_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 20_000 },
                      { date: '31.12.2020', openingBalance: 20_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 16_000 },
                      { date: '31.12.2021', openingBalance: 16_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 12_000 },
                      { date: '31.12.2022', openingBalance: 12_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 8_000 },
                      { date: '31.12.2023', openingBalance: 8_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 4_000 },
                      { date: '31.12.2024', openingBalance: 4_000, interestExpense: 20_500, cashPaid: 24_500, amortization: 4_000, closingBalance: 0 },
                    ]}
                  />
                  <div className="bg-[var(--color-accent-cobalt)]/5 border-r-4 border-[var(--color-accent-cobalt)] rounded-md p-3 mt-3">
                    <p className="text-sm text-[var(--color-text-primary)] font-bold mb-2">
                      הצגה במאזן ליום 31.12.2021:
                    </p>
                    <div className="t-data tabular-nums text-sm space-y-1">
                      <div className="flex justify-between"><span>אג״ח לשלם (ע.נ.)</span><span>350,000</span></div>
                      <div className="flex justify-between"><span>פחות: פרמיה שטרם הופחתה</span><span>(12,000)</span></div>
                      <div className="flex justify-between border-t-2 border-[var(--color-primary)]/40 pt-1 font-bold text-[var(--color-primary)]"><span>אג״ח נטו</span><span>362,000</span></div>
                    </div>
                  </div>
                </div>

                {/* Sub-question 4: 2025 bonus */}
                <div>
                  <h4 className="t-h3 text-sm font-bold text-[var(--color-text-primary)] mb-2">
                    4. שאלת הבונוס: ריבית ב-2025 — מי צודק?
                  </h4>
                  <div className="bg-[var(--color-success)]/5 border-r-4 border-[var(--color-success)] rounded-md p-4 mb-3">
                    <p className="text-sm font-bold text-[var(--color-success)] mb-1">
                      ✅ החשב (הֲחָשָׁב) צודק.
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                      לפי <strong>עקרון ההתאמה</strong> (matching principle), הוצאת
                      ריבית מוכרת בתקופה שבה עובר הזמן שלה — לא בתקופה שבה היא משולמת
                      במזומן.
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    התשלום ב-1.1.2025 מכסה את 12 החודשים שלפני כן — כלומר את שנת 2024.
                    לכן:
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-[var(--color-text-primary)]">
                    <li>ב-2024: הוצאת ריבית נטו = 20,500 (רגיל, כמו כל שנה)</li>
                    <li>
                      ב-1.1.2025: תשלום מזומן 24,500 + פירעון קרן 350,000 — <strong>אין רישום לריבית חדשה</strong>
                    </li>
                    <li>
                      ב-2025: <strong>אפס הוצאות ריבית</strong> בגין האג"ח
                    </li>
                  </ul>
                  <div className="bg-[var(--color-warning)]/5 border-r-4 border-[var(--color-warning)] rounded-md p-3 mt-3">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      <strong>הערה על הכלכלן:</strong> הכלכלן מתבסס על תזרים מזומנים,
                      לא על בסיס הצבירה. בבסיס צבירה, הריבית השנתית מוכרת במהלך 12
                      החודשים שהיא מצטברת, לא ביום התשלום. התשלום ב-1.1.2025 הוא
                      התחייבות ש<strong>כבר הוכרה ב-2024</strong> — סגירת חשבון,
                      לא הכנסה/הוצאה חדשה.
                    </p>
                  </div>
                </div>
              </div>
            </ExamSolutionPanel>
          }
        >
          <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
            חברת "{Q4_DATA.issuer}" בע"מ עוסקת בשיווק מוצרי טכנולוגיה. לצורך מימון פעילותה,
            הנפיקה החברה ב-<strong>{Q4_DATA.issuanceDate}</strong> {' '}
            <strong>{Q4_DATA.bondsIssued.toLocaleString('he-IL')}</strong> אגרות חוב בנות{' '}
            {Q4_DATA.faceValuePerBond} ₪ ערך נקוב כל אחת, ריבית אג"ח{' '}
            <strong>{(Q4_DATA.couponRate * 100).toFixed(0)}%</strong> לשנה.
          </p>
          <ul className="text-sm space-y-1.5 list-disc list-inside">
            <li>קרן האג"ח תוחזר בתום {Q4_DATA.termYears} שנים (1.1.2025).</li>
            <li>
              הריבית תשולם <strong>{Q4_DATA.interestPaymentTiming}</strong>.
            </li>
            <li>יתרת הפרמיה ליום 31.12.2019 הינה 20,000 ₪.</li>
            <li>ניכיון/פרמיה מופחתים בשיטת הקו הישר.</li>
          </ul>
          <p className="text-sm font-bold mt-3">נדרש:</p>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>מהו סך התמורה שקיבלה החברה ביום ההנפקה? רשמו פקודת יומן.</li>
            <li>מהן הוצאות מימון, נטו שיזקוף בדוח רווח והפסד לשנת 2017? רשמו פקודות יומן.</li>
            <li>מהי יתרת אג"ח, נטו (הציגו ביאור) במאזן ליום 31.12.21?</li>            <li>בישיבת הנהלה טען חשב החברה שבדוח רווח והפסד הצפוי לשנת 2025 לא יזקפו כלל הוצאות ריבית בגין האג"ח מכיוון שהאג"ח נפרעת ב-1.1.2025. הכלכלן טען מנגד שמכיוון שהריבית משולמת במהלך 2025 חייבת החברה להכיר בה כחלק מהוצאות המימון. מי צודק? הרחיבו בהתבסס על כללי חשבונאות מקובלים.</li>
          </ol>

          <div className="mt-6 border border-dashed border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-lg p-4 sm:p-5">
            <h4 className="t-h3 text-sm font-bold text-[var(--color-primary)] mb-2">
              📝 תבנית ריקה למילוי עצמי
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              נסה למלא את התבנית בעצמך לפני שתציג את הפתרון. היתרה ב-31.12.2019
              נתונה (20,000) — חשב את הפרמיה המקורית ממנה, ובדוק שהלוח כולו
              תואם את הנתון.
            </p>
            <FillableBondAmortizationSchedule
              faceValue={Q4_DATA.bondsIssued * Q4_DATA.faceValuePerBond}
              couponRate={Q4_DATA.couponRate}
              termYears={Q4_DATA.termYears}
              schedule={Q4_BOND_TEMPLATE.schedule}
              originalPremiumSolution={Q4_BOND_TEMPLATE.originalPremium.solution}
              netInterest2017Solution={Q4_BOND_TEMPLATE.netInterest2017.solution}
              secondaryCellYear={2021}
              secondaryCellNetBalance={Q4_BOND_TEMPLATE.netBalance2021.solution}
              verifyYear={2019}
              verifyBalance={Q4_BOND_TEMPLATE.verifyBalance2019}
              storageKey="fillable-bond-q4"
              caption="לוח סילוקין — הפחתת פרמיה בשיטת הקו הישר"
              footer="טיפ: גזור את הפרמיה המקורית מתוך יתרת 31.12.2019. רמז: X − 3×(X/8) = 20,000 → X×(5/8) = 20,000 → X = 32,000. הפחתה שנתית = 32,000/8 = 4,000. ריבית שנתית במזומן = 350,000 × 7% = 24,500. הוצ' מימון נטו = 24,500 − 4,000 = 20,500. יתרה ב-31.12.2021 = 350,000 + (32,000 − 5×4,000) = 362,000."
            />
          </div>
        </ExamQuestion>

        {/* ── Back to home ────────────────────────────────────────────── */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowRight size={16} aria-hidden="true" />
            חזרה לעמוד הראשי
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

// ─── Local helpers ─────────────────────────────────────────────────────

/**
 * Local wrapper around the master toggle so that the page's masterOn state
 * is the single source of truth — we render the toggle component but
 * delegate the state to the page.
 */
function ExamMasterToggleSynced({
  masterOn,
  setMasterOn,
}: {
  masterOn: boolean;
  setMasterOn: (v: boolean) => void;
}) {
  return (
    <div
      role="region"
      aria-label="בקרת פתרונות"
      className="sticky top-[57px] z-30 -mx-3 sm:-mx-6 mb-6 px-3 sm:px-6 py-3 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border)]/60 transition-all"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
              masterOn
                ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/40'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
            }`}
            aria-hidden="true"
          >
            {masterOn ? <Eye size={18} /> : <EyeOffIcon size={18} />}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[var(--color-text-primary)] leading-tight">
              הצג את כל הפתרונות
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] leading-tight mt-0.5">
              {masterOn
                ? 'פתרונות ומלכודות גלויים — מצב "מפתח תשובות"'
                : 'נסה לפתור לבד. לחץ "הצג פתרון" בכל שאלה.'}
            </div>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={masterOn}
          aria-label="הצג את כל הפתרונות"
          onClick={() => setMasterOn(!masterOn)}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 ${
            masterOn ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface-raised)]'
          }`}
        >
          <span
            className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200"
            style={{ transform: masterOn ? 'translateX(2.4rem)' : 'translateX(0.25rem)' }}
          />
        </button>
      </div>
    </div>
  );
}

function EyeOn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function InlineFormula({ left, right }: { left: string; right: string }) {
  return (
    <span className="t-data inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--color-accent-cobalt-bg)] border border-[var(--color-accent-cobalt-line)] text-[var(--color-accent-cobalt-strong)] text-sm font-mono">
      <span className="font-bold">{left}</span>
      <span className="opacity-60">=</span>
      <span>{right}</span>
    </span>
  );
}


