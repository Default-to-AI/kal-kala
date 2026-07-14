import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { StepByStepExercise } from '../ui/StepByStepExercise';
import { JournalEntry } from '../ui/JournalEntry';
import { AmortizationTable } from '../ui/AmortizationTable';
import { InlineMathToken } from '../ui/InlineMathToken';
import { MCQuestionCard } from '../ui/MCQuestionCard';
import { InsightBlock } from '../ui/FormulaBlock';

export function BondsChapter() {
  return (
    <PageLayout>
      <PageHeader
        title="פרק 4: איגרות חוב (אג״ח)"
        description="הנפקת איגרות חוב בפרמיה או בניכיון, והפחתה בשיטת הקו הישר."
      />

      <LessonBlock title="1. מהות איגרות החוב" variant="definition">
        <p>
          איגרת חוב היא תעודת התחייבות שחברה (או ממשלה) מנפיקה לציבור במטרה לגייס הון. רוכש האג"ח בעצם
          נותן הלוואה לחברה. בתמורה, החברה מתחייבת להחזיר את הקרן במועד שנקבע ולשלם ריבית תקופתית (ריבית
          נקובה).
        </p>
        <InsightBlock>
          <p>
            <strong>💡 הרעיון המרכזי:</strong> ה<strong>ריבית הנקובה</strong> (המודפסת על האג"ח) היא הריבית שהחברה
            משלמת. ה<strong>ריבית האפקטיבית בשוק</strong> היא התשואה שמשקיעים דורשים כרגע. אם הריבית הנקובה
            <em>גבוהה</em> מריבית השוק — האג"ח אטרקטיבי, והמשקיעים ישלמו <strong>פרמיה</strong>.
            אם הריבית הנקובה <em>נמוכה</em> מריבית השוק — האג"ח פחות אטרקטיבי, והמשקיעים ידרשו{' '}
            <strong>ניכיון</strong>.
          </p>
        </InsightBlock>
        <div className="my-4 p-4 bg-[var(--color-surface-alt)] rounded-lg">
          <p>
            <strong>הנפקה בפרמיה:</strong> כאשר ריבית השוק <strong>נמוכה</strong> מהריבית הנקובה של האג"ח, המשקיעים
            יהיו מוכנים לשלם יותר עבור האג"ח. התמורה שתתקבל תהיה גבוהה מהערך הנקוב.
          </p>
          <p className="mt-2">
            <strong>הנפקה בניכיון:</strong> כאשר ריבית השוק <strong>גבוהה</strong> מהריבית הנקובה, האג"ח פחות
            אטרקטיבית ולכן תימכר בפחות מהערך הנקוב שלה.
          </p>
        </div>
        <p className="mt-4">
          <strong>הפחתה בשיטת הקו הישר:</strong> הפרמיה או הניכיון מופחתים בסכומים שווים על פני תקופת חיי האג"ח. הפחתת
          פרמיה מקטינה את הוצאות המימון (כי קיבלנו "בונוס" בהתחלה), ואילו הפחתת ניכיון מגדילה את הוצאות המימון.
        </p>
      </LessonBlock>

      <LessonBlock title="2. פרמיה מול ניכיון — מי זה מי?" variant="formal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-[var(--color-success)]/8 border-r-4 border-[var(--color-success)] p-4 rounded-lg">
            <h4 className="font-bold text-[var(--color-success)] mb-2">📈 פרמיה (Premium)</h4>
            <p className="text-sm mb-2">
              המשקיעים שילמו <em>יותר</em> מהע.נ.
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <strong>הפחתה:</strong> מקטינה את יתרת האג"ח → <strong>מקטינה</strong> הוצאות ריבית
            </p>
          </div>
          <div className="bg-[var(--color-error)]/8 border-r-4 border-[var(--color-error)] p-4 rounded-lg">
            <h4 className="font-bold text-[var(--color-error)] mb-2">📉 ניכיון (Discount)</h4>
            <p className="text-sm mb-2">
              המשקיעים שילמו <em>פחות</em> מהע.נ.
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <strong>הפחתה:</strong> מגדילה את יתרת האג"ח → <strong>מגדילה</strong> הוצאות ריבית
            </p>
          </div>
        </div>
        <InsightBlock>
          <p>
            <strong>💡 כלל אצבע:</strong> ריבית ששולמה במזומן (קופון) היא לפי <strong>הריבית הנקובה</strong>.
            ריבית השוק (ריבית שהמשקיע דורש) משתקפת ב<strong>תמורה</strong> שהוא משלם.
          </p>
          <p className="mt-2">
            <strong>נוסחת זיהוי:</strong>
          </p>
          <div className="mt-2 text-center">
            <InlineMathToken
              math={String.raw`\text{תמורה} = \text{קרן} + \text{פרמיה}\;(\text{אם חיובי})\;\;\text{או}\;\;\text{קרן} - \text{ניכיון}\;(\text{אם שלילי})`}
            />
          </div>
        </InsightBlock>
      </LessonBlock>

      <LessonBlock title="לוח סילוקין בשיטת הקו הישר - דוגמה (פרמיה)">
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          נניח אג"ח ע.נ 500,000, שהונפקה בתמורה ל-530,000. ריבית 5% המשולמת שנתית (25,000 ש"ח מזומן לשנה).
          האג"ח ל-10 שנים. הפרמיה 30,000 תופחת בקו ישר (3,000 בשנה), מה שיקטין את הוצאות המימון מ-25,000
          ל-22,000 בשנה.
        </p>
        <AmortizationTable
          title="הפחתת פרמיה: אג״ח ל-10 שנים"
          type="premium"
          rows={[
            { date: '1.1.25', openingBalance: 530000, interestExpense: 0, cashPaid: 0, amortization: 0, closingBalance: 530000 },
            { date: '31.12.25', openingBalance: 530000, interestExpense: 22000, cashPaid: 25000, amortization: 3000, closingBalance: 527000 },
            { date: '31.12.26', openingBalance: 527000, interestExpense: 22000, cashPaid: 25000, amortization: 3000, closingBalance: 524000 },
            { date: '31.12.27', openingBalance: 524000, interestExpense: 22000, cashPaid: 25000, amortization: 3000, closingBalance: 521000 },
            { date: '...', openingBalance: 0, interestExpense: 0, cashPaid: 0, amortization: 0, closingBalance: 0 },
            { date: '31.12.34', openingBalance: 503000, interestExpense: 22000, cashPaid: 25000, amortization: 3000, closingBalance: 500000 },
          ]}
        />
      </LessonBlock>

      <LessonBlock title="תרגיל מודרך 1: חברת שניר (אג״ח בפרמיה + הלוואה)">
        <StepByStepExercise
          questionTitle="נתוני השאלה"
          questionContent={
            <>
              <p>חברת "שניר" בע"מ הוקמה ב- 1.1.25 והיא עוסקת בייצור ריהוט.</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>ב- 1.1.25 הנפיקה החברה 500,000 ע.נ. אגרות חוב.</li>
                <li>ריבית האג"ח: 5% (משולמת פעם בשנה ב-31.12).</li>
                <li>הקרן תוחזר כעבור 10 שנים.</li>
                <li>התמורה שנתקבלה בהנפקה: 530,000 ₪.</li>
                <li>ניכיון/פרמיה מופחתים לפי שיטת הקו הישר.</li>
              </ul>
              <p className="mt-4">
                כמו כן, ב-1.1.25 לקחה הלוואה בסך 200,000 ₪, שתיפרע ב-1.1.32. ריבית ההלוואה: 8% (משולמת חצי
                שנתית ב-30.6 וב-1.1).
              </p>

              <p className="mt-4 font-bold">נדרש:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>רשמו פקודת יומן להנפקת האג"ח ולקבלת ההלוואה ב- 1.1.25.</li>
                <li>מהן הוצאות המימון שיזקפו בדוח רווח והפסד לשנת 2025 ומהו סכום הריבית ששולמה במזומן במהלך השנה?</li>
                <li>האם טענות החשב נכונות? (א. התקבלה פרמיה כי ריבית השוק גבוהה מ-5%. ב. הפחתת פרמיה תגדיל הוצאות מימון).</li>
              </ol>
            </>
          }
          steps={[
            {
              title: 'שלב 1: פקודות יומן ביום ההנפקה (1.1.25)',
              content: <p>כיצד נרשום את קבלת המזומן משתי ההתחייבויות (אג"ח והלוואה)?</p>,
              solution: (
                <div className="space-y-4">
                  <JournalEntry
                    date="1.1.25"
                    description="הנפקת האג״ח בפרמיה (530,000 התקבל עבור 500,000 ע.נ)"
                    entries={[
                      { account: 'מזומן', debit: 530000, isDebit: true },
                      { account: 'אג״ח לשלם (קרן)', credit: 500000, isDebit: false },
                      { account: 'פרמיה על אג״ח', credit: 30000, isDebit: false },
                    ]}
                  />
                  <JournalEntry
                    date="1.1.25"
                    description="קבלת הלוואה לזמן ארוך"
                    entries={[
                      { account: 'מזומן', debit: 200000, isDebit: true },
                      { account: 'הלוואה לזמן ארוך', credit: 200000, isDebit: false },
                    ]}
                  />
                </div>
              ),
            },
            {
              title: 'שלב 2: ריבית במזומן והוצאות מימון (2025)',
              content: (
                <p>
                  עלינו להבחין בין מזומן ששולם לבין ההוצאה החשבונאית שנרשמת בדוח רווח והפסד (על בסיס
                  מצטבר).
                </p>
              ),
              solution: (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 space-y-4">
                  <h4 className="font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">
                    אג״ח
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>
                      <strong>ריבית במזומן לאג״ח:</strong>{' '}
                      <InlineMathToken math={String.raw`500{,}000 \times 5\% = 25{,}000`} /> ₪ (משולמת ב-31.12.25).
                    </li>
                    <li>
                      <strong>הפחתת פרמיה:</strong> 30,000 ₪ חלקי 10 שנים = 3,000 ₪ לשנה. הפחתה{' '}
                      <span className="text-[var(--color-success)] font-bold">מקטינה</span> את הוצאות הריבית.
                    </li>
                    <li>
                      <strong>הוצאות מימון אג״ח:</strong> 25,000 - 3,000 ={' '}
                      <span className="font-bold text-[var(--color-primary)]">22,000 ₪</span>.
                    </li>
                  </ul>

                  <h4 className="font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 mt-4">
                    הלוואה
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>
                      <strong>ריבית במזומן (2025):</strong> ב-30.6.25 משלמים על חצי שנה (
                      <InlineMathToken math={String.raw`200{,}000 \times 8\% \times \frac{6}{12} = 8{,}000`} />
                      ). התשלום הבא ב-1.1.26 לא נכלל ב-2025.
                    </li>
                    <li>
                      <strong>הוצאות מימון (2025):</strong> נצברת ריבית לשנה שלמה ={' '}
                      <InlineMathToken math={String.raw`200{,}000 \times 8\% = 16{,}000`} /> ₪.
                    </li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'שלב 3: טענות החשב',
              content: (
                <p>
                  האם התקבלה פרמיה בגלל שריבית השוק הייתה גבוהה מ-5%? והאם הפחתת פרמיה מגדילה הוצאות?
                </p>
              ),
              solution: (
                <div className="space-y-4">
                  <div className="bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 rounded-lg p-4">
                    <p className="font-bold text-[var(--color-error)] mb-1">טענה א' - שגויה</p>
                    <p className="text-sm">
                      משקיעים משלמים פרמיה (יותר מערך האג"ח) כי ריבית האג"ח <strong>אטרקטיבית</strong> לעומת
                      השוק, כלומר ריבית השוק <strong>נמוכה</strong> מ-5% ולא גבוהה ממנה.
                    </p>
                  </div>
                  <div className="bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 rounded-lg p-4">
                    <p className="font-bold text-[var(--color-error)] mb-1">טענה ב' - שגויה</p>
                    <p className="text-sm">
                      הפחתת פרמיה <strong>מקטינה</strong> את הוצאות המימון (קיבלנו כסף אקסטרה בהתחלה ש"מסבסד"
                      לנו את הריבית שאנו משלמים).
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </LessonBlock>

      <LessonBlock title="תרגיל מודרך 2: חברת דלל (אג״ח ארוך-טווח בפרמיה)">
        <StepByStepExercise
          questionTitle="נתוני השאלה"
          questionContent={
            <>
              <p>
                בתאריך 1.7.22 הנפיקה חברת "דלל" 5,000,000 ע.נ. אג"ח לחמש שנים, הנושאות ריבית נקובה בגובה 10%,
                אשר משולמת כל חצי שנה, בכל 1.1 ו-1.7.
              </p>
              <p className="mt-2">התמורה בהנפקה – 5.5 מיליוני ש"ח. ניכיון/פרמיה מופחתים בשיטת הקו הישר.</p>
              <p className="mt-4 font-bold">נדרש:</p>
              <p>הציגו הצגה מקובלת של כל היתרות הרלוונטיות לאג"ח במאזן החברה ליום 31.12.2024.</p>
            </>
          }
          steps={[
            {
              title: 'שלב 1: חישוב יתרת פרמיה בסוף 2024',
              content: <p>כדי לדעת כמה פרמיה להציג במאזן ל-31.12.24, עלינו לחשב כמה הופחתה מאז ההנפקה (1.7.22).</p>,
              solution: (
                <div className="text-sm space-y-2 bg-[var(--color-surface-alt)] p-4 rounded-lg">
                  <p>
                    <strong>פרמיה מקורית:</strong> 5,500,000 - 5,000,000 = 500,000 ₪
                  </p>
                  <p>
                    <strong>הפחתה שנתית:</strong> 500,000 / 5 שנים = 100,000 ₪ לשנה
                  </p>
                  <p>
                    <strong>זמן שעבר:</strong> מ-1.7.22 עד 31.12.24 הם בדיוק 2.5 שנים.
                  </p>
                  <p>
                    <strong>סך הפחתה:</strong> 2.5 × 100,000 = 250,000 ₪
                  </p>
                  <p className="font-bold border-t border-[var(--color-border)] pt-2 mt-2">
                    יתרת פרמיה במאזן: 500,000 - 250,000 = 250,000 ₪.
                  </p>
                </div>
              ),
            },
            {
              title: 'שלב 2: התחייבויות שוטפות (ריבית לשלם)',
              content: <p>ב-31.12.24 החברה חייבת ריבית על חצי השנה האחרונה, שתשולם רק למחרת ב-1.1.25.</p>,
              solution: (
                <div className="text-sm space-y-2 bg-[var(--color-surface-alt)] p-4 rounded-lg">
                  <p>
                    <strong>ריבית לחצי שנה:</strong>{' '}
                    <InlineMathToken math={String.raw`5{,}000{,}000 \times 10\% \times \frac{6}{12} = 250{,}000`} /> ₪
                  </p>
                  <p>סכום זה יוצג כ"ריבית לשלם" בהתחייבויות שוטפות.</p>
                </div>
              ),
            },
            {
              title: 'שלב 3: הצגת המאזן השלם',
              content: <p>הרכבת המאזן ליום 31.12.24 על בסיס הנתונים שחישבנו.</p>,
              solution: (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
                  <h4 className="font-bold text-[var(--color-text)] mb-4 border-b border-[var(--color-border)] pb-2 text-xl text-center">
                    מאזן ליום 31.12.2024
                  </h4>
                  <div className="grid grid-cols-2 gap-8 text-sm">
                    <div>                       <h5 className="font-bold text-[var(--color-text-primary)] mb-2">התחייבויות שוטפות</h5>
                      <div className="flex justify-between border-b border-[var(--color-border)]/50 pb-1 mb-4">
                        <span>ריבית לשלם:</span>
                        <span className="font-bold">250,000</span>
                      </div>                       <h5 className="font-bold text-[var(--color-text-primary)] mb-2 mt-6">התחייבויות לזמן ארוך</h5>
                      <div className="flex justify-between mb-1">
                        <span>אג״ח לשלם (קרן):</span>
                        <span>5,000,000</span>
                      </div>
                      <div className="flex justify-between border-b border-[var(--color-border)] pb-1 mb-2">
                        <span>עודף: פרמיה על אג״ח:</span>
                        <span>250,000</span>
                      </div>
                      <div className="flex justify-between font-bold text-[var(--color-primary)]">
                        <span>ערך פנקסני אג״ח:</span>
                        <span>5,250,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </LessonBlock>

      {/* ── תרגיל חדש: אג"ח בניכיון ───────────────────────────── */}
      <LessonBlock title="תרגיל מודרך 3: חברת ארזים (אג״ח בניכיון — מקרה הפוך!)">
        <StepByStepExercise
          questionTitle="נתוני השאלה"
          questionContent={
            <>
              <p>ב-1.1.24 הנפיקה חברת "ארזים" 4,000,000 ע.נ. אג"ח ל-5 שנים.</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>ריבית נקובה: <strong>5%</strong> שנתית (משולמת ב-31.12 כל שנה).</li>
                <li>ריבית השוק במועד ההנפקה: <strong>8%</strong>.</li>
                <li>התמורה בפועל שהתקבלה: <strong>3,540,000 ₪</strong> (נמוך מהע.נ → <strong>ניכיון</strong>).</li>
                <li>הניכיון מופחת בשיטת הקו הישר.</li>
              </ul>
              <p className="mt-4 font-bold">נדרש:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>רשמו פקודת יומן להנפקה ב-1.1.24.</li>
                <li>חשבו את הוצאות המימון לשנת 2024.</li>
                <li>הציגו לוח סילוקין שנתי.</li>
                <li>הציגו את המאזן הרלוונטי ל-31.12.24.</li>
              </ol>
            </>
          }
          steps={[
            {
              title: 'שלב 1: זיהוי — למה ניכיון?',
              content: (
                <>
                  <p>"למה" תמורה נמוכה מע.נ? הסיבה היא שריבית השוק (8%) <strong>גבוהה</strong> מהריבית הנקובה (5%).</p>
                  <p>
                    המשקיעים דורשים תשואה של 8% בשוק, אבל האג"ח שלנו משלם רק 5% — לכן הם לא יסכימו לשלם את
                    הע.נ (4,000,000), אלא ידרשו הנחה.
                  </p>
                  <InsightBlock>
                    <p>
                      <strong>💡 לזכור:</strong> ניכיון = ההפרש שמשקיעים דורשים כדי "לפצות" את עצמם על כך
                      שהאג"ח משלם פחות מהשוק. הניכיון כאן: 4,000,000 − 3,540,000 = <strong>460,000 ₪</strong>.
                    </p>
                  </InsightBlock>
                </>
              ),
              solution: (
                <JournalEntry
                  date="1.1.24"
                  description="הנפקת אג״ח בניכיון (תמורה 3,540,000 עבור 4,000,000 ע.נ)"
                  entries={[
                    { account: 'מזומן', debit: 3540000, isDebit: true },
                    { account: 'ניכיון על אג״ח', debit: 460000, isDebit: true },
                    { account: 'אג״ח לשלם (קרן)', credit: 4000000, isDebit: false },
                  ]}
                />
              ),
            },
            {
              title: 'שלב 2: חישוב הוצאות מימון 2024',
              content: <p>הניכיון מופחת בקו ישר לאורך 5 שנים. בניכיון — ההפחתה <strong>מגדילה</strong> את הוצאות הריבית (בניגוד לפרמיה).</p>,
              solution: (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>ריבית במזומן (4,000,000 × 5%):</span>
                    <span className="font-bold">200,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>הפחתת ניכיון (460,000 / 5):</span>
                    <span className="font-bold text-[var(--color-error)]">+92,000</span>
                  </div>
                  <div className="flex justify-between border-t border-[var(--color-border)] pt-2 mt-2 font-bold text-[var(--color-primary)]">
                    <span>הוצאות מימון לשנת 2024:</span>
                    <span>292,000</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                    שים לב: ההוצאות גבוהות מהמזומן, כי הניכיון הוא "פיצוי" שהחברה צריכה להעביר לריבית על
                    פני חיי האג"ח.
                  </p>
                </div>
              ),
            },
            {
              title: 'שלב 3: לוח סילוקין (5 שנים, הצגת שנים 24-26)',
              content: (
                <p>
                  זהו לוח ניכיון — שים לב שה<strong>יתרה גדלה</strong> כל שנה (בניגוד לפרמיה שבה היא קטנה).
                </p>
              ),
              solution: (
                <AmortizationTable
                  title="הפחתת ניכיון: אג״ח ל-5 שנים"
                  type="discount"
                  rows={[
                    { date: '1.1.24', openingBalance: 3540000, interestExpense: 0, cashPaid: 0, amortization: 0, closingBalance: 3540000 },
                    { date: '31.12.24', openingBalance: 3540000, interestExpense: 292000, cashPaid: 200000, amortization: 92000, closingBalance: 3632000 },
                    { date: '31.12.25', openingBalance: 3632000, interestExpense: 292000, cashPaid: 200000, amortization: 92000, closingBalance: 3724000 },
                    { date: '31.12.26', openingBalance: 3724000, interestExpense: 292000, cashPaid: 200000, amortization: 92000, closingBalance: 3816000 },
                    { date: '...', openingBalance: 0, interestExpense: 0, cashPaid: 0, amortization: 0, closingBalance: 0 },
                    { date: '31.12.28', openingBalance: 3908000, interestExpense: 292000, cashPaid: 200000, amortization: 92000, closingBalance: 4000000 },
                  ]}
                />
              ),
            },
            {
              title: 'שלב 4: המאזן ל-31.12.24',
              content: <p>בסוף שנה ראשונה, ניכיון שהופחת = 92,000, יתרת ניכיון = 368,000. ריבית שנצברה ב-31.12.24 = 200,000 שתשולם ב-31.12.25 (אם כי לפי הנתון, שילמנו השנה — אז יתרת ריבית לשלם = 0).</p>,
              solution: (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 text-sm">
                  <h4 className="font-bold text-[var(--color-text)] mb-4 border-b border-[var(--color-border)] pb-2 text-xl text-center">
                    מאזן ליום 31.12.24
                  </h4>
                  <div>                     <h5 className="font-bold text-[var(--color-text-primary)] mb-2">התחייבויות לזמן ארוך</h5>
                    <div className="flex justify-between mb-1">
                      <span>אג״ח לשלם (קרן):</span>
                      <span>4,000,000</span>
                    </div>
                    <div className="flex justify-between mb-1 text-[var(--color-error)]">
                      <span>עודף: ניכיון על אג״ח (פחות הפחתה שנצברה):</span>
                      <span>(368,000)</span>
                    </div>
                    <div className="flex justify-between font-bold text-[var(--color-primary)] border-t border-[var(--color-border)] pt-2 mt-2">
                      <span>ערך פנקסני אג״ח:</span>
                      <span>3,632,000</span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-3 text-center">
                      שים לב: הערך הפנקסני <strong>גדל</strong> עם הזמן (מ-3,540,000 ל-3,632,000) — בניגוד
                      לפרמיה שבה הוא קטן אל הע.נ.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </LessonBlock>

      {/* ── MCQ מלכודת: כיוון ההפחתה ─────────────────────────── */}
      <div className="mb-12">
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-6 pb-2 border-b-2 border-[var(--color-surface-raised)] inline-block">
          בחן את עצמך
        </h2>
        <MCQuestionCard
          id="bond-q1"
          prompt='חברה הנפיקה אג"ח בפרמיה של 50,000 ₪ ל-10 שנים. כיצד הפחתת הפרמיה משפיעה על הוצאות הריבית בכל שנה?'
          options={[
            { label: 'א', text: 'הוצאות הריבית גדלות ב-5,000 ₪ בשנה' },
            {
              label: 'ב',
              text: 'הוצאות הריבית קטנות ב-5,000 ₪ בשנה',
              correct: true,
            },
            { label: 'ג', text: 'אין השפעה על הוצאות הריבית' },
            { label: 'ד', text: 'זה תלוי בריבית השוק' },
          ]}
          rationale={
            <>
              הפרמיה היא בעצם "בונוס" שקיבלנו בהתחלה על הפער בין ריבית השוק לריבית הנקובה. ככל שהשנים
              עוברות, "נהנים" מהבונוס — ולכן <strong>מפחיתים</strong> בהדרגה מהוצאות הריבית. במקרה
              הניכיון, ההיגיון <em>הפוך</em>: הניכיון הוא "הנחה" שנתנו למשקיעים, וצריך להחזיר אותה דרך
              הוצאות ריבית גבוהות יותר.
            </>
          }
        />
      </div>
    </PageLayout>
  );
}
