import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { ExerciseStep } from '../ui/ExerciseStep';
import { JournalEntryTable } from '../ui/JournalEntryTable';
import { MCQuestionCard } from '../ui/MCQuestionCard';
import { InsightBlock, AlertBlock } from '../ui/FormulaBlock';

export function SecuritiesChapter() {
  return (
    <PageLayout>
      <PageHeader
        title="פרק 5: השקעות בניירות ערך סחירים"
        description="נכסים פיננסיים המוחזקים למסחר (FVTPL) – רישום ראשוני, שערוך שווי הוגן, וקבלת דיבידנד."
      />

      <LessonBlock title="1. מהות השקעה בניירות ערך למסחר" variant="definition">
        <p>
          כאשר חברה רוכשת מניות של חברה אחרת (שנחסרות בבורסה) במטרה להפיק רווחים מעליית ערכן ולמכור אותן
          בטווח הקצר, ההשקעה מסווגת כ"נכס פיננסי המוחזק למסחר" (שווי הוגן דרך רווח והפסד - FVTPL).
        </p>
        <InsightBlock>
          <p>
            <strong>💡 שלושה כללי יסוד:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>
              <strong>רישום ראשוני</strong> – בעלות (כמות מניות × מחיר).
            </li>
            <li>
              <strong>מדידה עוקבת</strong> – בכל תאריך חתך, לפי שווי הוגן (מחיר בורסה עדכני). ההפרש →
              רווח והפסד.
            </li>
            <li>
              <strong>דיבידנד שהתקבל</strong> – נרשם כ<strong>הכנסת מימון</strong> ברווח והפסד,{' '}
              <em>בלי לגעת</em> ביתרת נכס ההשקעה.
            </li>
          </ol>
        </InsightBlock>
        <p>
          <strong>רישום ראשוני:</strong> ההשקעה נרשמת לפי העלות שלה (כמות מניות × מחיר המניה).
        </p>
        <p>
          <strong>מדידה עוקבת (שערוך):</strong> בכל תאריך חתך (סוף רבעון או סוף שנה), יש למדוד את ההשקעה לפי
          שוויה ההוגן (מחיר המניה העדכני בבורסה). ההפרש בין השווי ההוגן העדכני לבין הערך הפנקסני נזקף
          ישירות לדוח רווח והפסד כ"הכנסות מימון" (אם הייתה עלייה) או "הוצאות מימון" (אם הייתה ירידה).
        </p>
        <p>
          <strong>קבלת דיבידנד:</strong> כאשר החברה המוחזקת מחלקת דיבידנד, החברה המשקיעה רושמת "הכנסות
          מדיבידנד" (סעיף בדוח רווח והפסד), וזאת{' '}
          <strong>מבלי לשנות את יתרת נכס ההשקעה</strong>.
        </p>
        <AlertBlock>
          <p>
            <strong>⚠️ נקודה קריטית — הבדל בין FVTPL לשיטת השווי המאזני:</strong> בעוד שב-FVTPL דיבידנד
            שמתקבל הוא <strong>הכנסה ברווח והפסד</strong> ולא משנה את ההשקעה, בשיטת השווי המאזני (פרק 6)
            דיבידנד שמתקבל <strong>מקטין</strong> את חשבון ההשקעה (ולא נרשם כהכנסה). ראו פרק 6 להשוואה
            מלאה.
          </p>
        </AlertBlock>
      </LessonBlock>

      <LessonBlock title="תרגיל מודרך 1: חברה א' וב' (רכישה + שערוך רבעוני)">
        <ExerciseStep
          title="תרגיל 3 - שאלה 1"
          question={`חברה א' רכשה ב – 1.1.24 10,000 מניות 1 ₪ ערך נקוב של חברה ב'.
ההשקעה סווגה כנכס פיננסי המוחזק לצורכי מסחר ובכוונת החברה לממשה בזמן הקצר.
חברה א' עורכת דוחות כספיים מדי רבעון בנוסף לדוחות השנתיים.

להלן מחירי המניה בבורסה:
1.1.24: 3 ₪
1.4.24: 4 ₪
1.7.24: 2 ₪
1.10.24: 3 ₪
31.12.24: 5 ₪

ב- 31.12.24 חילקה חברה ב' דיבידנד בסך 7 ₪ למניה.

נדרש:
1. רשמו את פקודות היומן שייזקפו בספרי חברה א' בשנת 2024.
2. הציגו את יתרת ההשקעה במאזן ואת הכנסות/הוצאות המימון ברווח והפסד מדי רבעון.`}
        >
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">חלק 1: פקודות יומן (2024)</h3>

              <div className="space-y-4 mb-6">
                <JournalEntryTable
                  date="1.1.24"
                  description="רכישת ההשקעה: 10,000 מניות × 3 ₪ = 30,000 ₪"
                  lines={[
                    { account: 'השקעה בני״ע (נכס פיננסי למסחר)', debit: 30000, isDebit: true },
                    { account: 'מזומן', credit: 30000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="1.4.24 (תום רבעון ראשון)"
                  description="שערוך: המחיר עלה ל-4 ₪. שווי חדש = 40,000. עליית ערך = 10,000"
                  lines={[
                    { account: 'השקעה בני״ע', debit: 10000, isDebit: true },
                    { account: 'הכנסות מימון (רווח מעליית ערך)', credit: 10000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="1.7.24 (תום רבעון שני)"
                  description="שערוך: המחיר ירד ל-2 ₪. שווי חדש = 20,000. ירידת ערך מהרבעון הקודם = 20,000"
                  lines={[
                    { account: 'הוצאות מימון (הפסד מירידת ערך)', debit: 20000, isDebit: true },
                    { account: 'השקעה בני״ע', credit: 20000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="1.10.24 (תום רבעון שלישי)"
                  description="שערוך: המחיר עלה ל-3 ₪. שווי חדש = 30,000. עליית ערך = 10,000"
                  lines={[
                    { account: 'השקעה בני״ע', debit: 10000, isDebit: true },
                    { account: 'הכנסות מימון', credit: 10000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="31.12.24 (תום רבעון רביעי)"
                  description="שערוך: המחיר עלה ל-5 ₪. שווי חדש = 50,000. עליית ערך = 20,000"
                  lines={[
                    { account: 'השקעה בני״ע', debit: 20000, isDebit: true },
                    { account: 'הכנסות מימון', credit: 20000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="31.12.24"
                  description="קבלת דיבידנד: 10,000 מניות × 7 ₪ = 70,000 ₪"
                  lines={[
                    { account: 'מזומן', debit: 70000, isDebit: true },
                    { account: 'הכנסות מדיבידנד (רווח והפסד)', credit: 70000, isDebit: false },
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">חלק 2: הצגה בדוחות הכספיים מדי רבעון</h3>

              <div className="overflow-x-auto rounded-lg border border-[var(--color-surface-raised)]">
                <table className="w-full text-sm text-[var(--color-text-primary)] bg-[var(--color-surface)] whitespace-nowrap" dir="rtl">
                  <thead className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
                    <tr>
                      <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">תאריך חתך</th>
                      <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">מחיר מניה</th>
                      <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] border-r border-[var(--color-border)]">
                        מאזן: השקעה בני״ע
                      </th>
                      <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                        רווח והפסד: הכנסות (הוצאות) מימון משערוך
                      </th>
                      <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                        רווח והפסד: הכנסות דיבידנד
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-surface-raised)]">
                    <tr className="hover:bg-[var(--color-surface-raised)]/20 transition-colors">
                      <td className="px-4 py-3">1.1.24 (רכישה)</td>
                      <td className="px-4 py-3">3 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--color-surface-raised)] font-bold text-[var(--color-primary)]">
                        30,000
                      </td>
                      <td className="px-4 py-3 text-center">-</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="hover:bg-[var(--color-surface-raised)]/20 transition-colors">
                      <td className="px-4 py-3">1.4.24 (רבעון 1)</td>
                      <td className="px-4 py-3">4 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--color-surface-raised)] font-bold text-[var(--color-primary)]">
                        40,000
                      </td>
                      <td className="px-4 py-3 text-center text-[var(--color-success)]">10,000</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="hover:bg-[var(--color-surface-raised)]/20 transition-colors">
                      <td className="px-4 py-3">1.7.24 (רבעון 2)</td>
                      <td className="px-4 py-3">2 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--color-surface-raised)] font-bold text-[var(--color-primary)]">
                        20,000
                      </td>
                      <td className="px-4 py-3 text-center text-[var(--color-error)]">(20,000)</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="hover:bg-[var(--color-surface-raised)]/20 transition-colors">
                      <td className="px-4 py-3">1.10.24 (רבעון 3)</td>
                      <td className="px-4 py-3">3 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--color-surface-raised)] font-bold text-[var(--color-primary)]">
                        30,000
                      </td>
                      <td className="px-4 py-3 text-center text-[var(--color-success)]">10,000</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="bg-[var(--color-surface-raised)]/40 font-bold">
                      <td className="px-4 py-3">31.12.24 (רבעון 4)</td>
                      <td className="px-4 py-3">5 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--color-surface-raised)] text-[var(--color-primary)]">
                        50,000
                      </td>
                      <td className="px-4 py-3 text-center text-[var(--color-success)]">20,000</td>
                      <td className="px-4 py-3 text-center text-[var(--color-success)]">70,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>

      {/* ── תרגיל חדש: מכירת חלק מההשקעה + רווח/הפסד מומש ──────────── */}
      <LessonBlock title="תרגיל מודרך 2: חברת נגה (מכירה חלקית + רווח מומש)">
        <ExerciseStep
          title="תרגיל בניירות ערך - מכירה חלקית"
          question={`חברת "נגה" רכשה ב-1.7.23 4,000 מניות של חברת "ים" במחיר 12 ₪ למניה (סה"כ 48,000 ₪).
ההשקעה סווגה כ-FVTPL.
ב-31.12.23 מחיר המניה היה 14 ₪.
ב-1.3.24 מכרה נגה 1,000 מניות במחיר 16 ₪ למניה.
ב-31.12.24 מחיר המניה (למניות שנותרו) היה 13 ₪.
במהלך שנת 2024 (ב-1.9.24) שילמה חברת ים דיבידנד של 0.50 ₪ למניה.

נדרש:
1. רשמו את פקודות היומן לשנים 2023 ו-2024.
2. מהו הרווח המומש (שמומש ב-2024 עקב המכירה)?`}
        >
          <div className="space-y-8">
            {/* שנת 2023 */}
            <div className="border border-[var(--color-accent-cobalt)]/30 bg-[var(--color-accent-cobalt)]/5 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b-2 border-[var(--color-accent-cobalt)]/40 pb-2">
                שנת 2023
              </h3>
              <div className="space-y-3 text-sm">
                <JournalEntryTable
                  date="1.7.23"
                  description="רכישת ההשקעה: 4,000 × 12 ₪ = 48,000 ₪"
                  lines={[
                    { account: 'השקעה בני״ע (FVTPL)', debit: 48000, isDebit: true },
                    { account: 'מזומן', credit: 48000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="31.12.23"
                  description="שערוך: מחיר עלה ל-14 ₪. שווי = 56,000 (4,000 × 14). רווח = 8,000"
                  lines={[
                    { account: 'השקעה בני״ע', debit: 8000, isDebit: true },
                    { account: 'הכנסות מימון (רווח משערוך)', credit: 8000, isDebit: false },
                  ]}
                />
              </div>
              <div className="mt-3 bg-[var(--color-background)] border border-[var(--color-accent-cobalt)]/30 p-3 rounded-lg text-sm">
                <strong>יתרת השקעה לסוף 2023:</strong> 56,000 ₪ (4,000 מניות × 14 ₪).
              </div>
            </div>

            {/* שנת 2024 - מכירה חלקית */}
            <div className="border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-success)] mb-4 border-b border-[var(--color-success)]/20 pb-2">
                שנת 2024 — מכירת 1,000 מניות ב-1.3.24
              </h3>
              <p className="text-sm mb-3 text-[var(--text-secondary)]">
                <strong>הכלל:</strong> במכירה חלקית, יש לחשב את <strong>העלות למניה</strong> מהיתרה הפנקסנית
                (אחרי השערוך האחרון). עלות מניה כאן: 56,000 ÷ 4,000 = <strong>14 ₪</strong>.
              </p>
              <InsightBlock>
                <p>
                  <strong>💡 למה לא 12 ₪?</strong> העלות ה"מקורית" הייתה 12 ₪, אבל ב-31.12.23 ביצענו שערוך
                  ל-14 ₪. במכירה חלקית, ה<strong>ערך הפנקסני</strong> האחרון הוא הבסיס (14 ₪ למניה), לא העלות
                  ההיסטורית.
                </p>
              </InsightBlock>
              <JournalEntryTable
                date="1.3.24"
                description="מכירת 1,000 מניות ב-16 ₪. תמורה = 16,000. עלות פנקסנית = 14,000. רווח מומש = 2,000"
                lines={[
                  { account: 'מזומן (1,000 × 16)', debit: 16000, isDebit: true },
                  { account: 'השקעה בני״ע (1,000 × 14)', credit: 14000, isDebit: false },
                  { account: 'הכנסות מימון (רווח מומש)', credit: 2000, isDebit: false },
                ]}
              />
            </div>

            {/* שנת 2024 - דיבידנד + שערוך סוף שנה */}
            <div className="border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-warning)] mb-4 border-b border-[var(--color-warning)]/20 pb-2">
                שנת 2024 — דיבידנד + שערוך סוף שנה
              </h3>
              <AlertBlock>
                <p className="text-sm">
                  <strong>שים לב!</strong> הדיבידנד משולם על כל 4,000 המניות שהיו בזמן ההכרזה — גם אלה שכבר
                  נמכרו. דיבידנד 0.50 ₪ × 4,000 = <strong>2,000 ₪</strong> (התקבל ב-1.9.24).
                </p>
              </AlertBlock>
              <div className="space-y-3 text-sm mt-3">
                <JournalEntryTable
                  date="1.9.24"
                  description="קבלת דיבידנד — נרשם כהכנסה ברווח והפסד, ללא שינוי בהשקעה"
                  lines={[
                    { account: 'מזומן (4,000 × 0.50)', debit: 2000, isDebit: true },
                    { account: 'הכנסות מדיבידנד', credit: 2000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="31.12.24"
                  description="שערוך: 3,000 מניות שנותרו × 13 ₪ = 39,000. יתרת פנקסנית אחרי המכירה = 42,000 (3,000 × 14). ירידה = 3,000"
                  lines={[
                    { account: 'הוצאות מימון (הפסד משערוך)', debit: 3000, isDebit: true },
                    { account: 'השקעה בני״ע', credit: 3000, isDebit: false },
                  ]}
                />
              </div>
              <div className="mt-4 bg-[var(--color-background)] border border-emerald-500/30 p-3 rounded-lg text-sm">
                <strong>יתרת השקעה לסוף 2024:</strong> 39,000 ₪ (3,000 מניות × 13 ₪).
                <br />
                <strong>סך הכנסות מימון מההשקעה בשנת 2024:</strong> רווח מומש 2,000 + דיבידנד 2,000 − הפסד משערוך 3,000 = <strong>1,000 ₪ נטו</strong>.
              </div>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>

      {/* ── MCQ מלכודת: דיבידנד ב-FVTPL ──────────────────────────── */}
      <div className="mb-12">
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-6 pb-2 border-b-2 border-[var(--color-surface-raised)] inline-block">
          בחן את עצמך
        </h2>
        <MCQuestionCard
          id="sec-q1"
          prompt="חברה מחזיקה השקעה במניות סחירות (FVTPL). החברה המוחזקת חילקה דיבידנד של 20,000 ₪. כיצד נרשום את קבלת הדיבידנד?"
          options={[
            {
              label: 'א',
              text: 'חיוב מזומן, זכות השקעה בני"ע (הקטנת ההשקעה ב-20,000)',
            },
            {
              label: 'ב',
              text: 'חיוב מזומן, זכות הכנסות מדיבידנד ברווח והפסד',
              correct: true,
            },
            {
              label: 'ג',
              text: 'אין צורך לרשום — מדובר באירוע מאזני פנימי',
            },
            {
              label: 'ד',
              text: 'חיוב מזומן, זכות הון עצמי (עודפים)',
            },
          ]}
          rationale={
            <>
              ב-FVTPL הדיבידנד נרשם כ<strong>הכנסה ברווח והפסד</strong>, והוא{' '}
              <strong>לא משנה</strong> את יתרת נכס ההשקעה. זה ההבדל העיקרי משיטת השווי המאזני (פרק 6) שבה
              דיבידנד <strong>כן</strong> מקטין את ההשקעה.
            </>
          }
        />
      </div>
    </PageLayout>
  );
}
