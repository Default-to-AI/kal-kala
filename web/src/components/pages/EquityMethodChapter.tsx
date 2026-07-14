import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { ExerciseStep } from '../ui/ExerciseStep';
import { JournalEntryTable } from '../ui/JournalEntryTable';
import { MCQuestionCard } from '../ui/MCQuestionCard';
import { InsightBlock, AlertBlock, FormulaBlock } from '../ui/FormulaBlock';
import { InlineMathToken } from '../ui/InlineMathToken';

export function EquityMethodChapter() {
  return (
    <PageLayout>
      <PageHeader
        title="פרק 6: השקעה בחברה כלולה (שיטת השווי המאזני)"
        description="טיפול חשבונאי בהשקעות המקנות השפעה מהותית (20%-50%), חישוב הפרש מקורי, רווחי אקוויטי ויתרת ההשקעה."
      />

      <LessonBlock title="1. שיטת השווי המאזני (Equity Method)" variant="definition">
        <p>
          כאשר חברה (המשקיעה) רוכשת מניות של חברה אחרת (המוחזקת) בשיעור המקנה לה{' '}
          <strong>השפעה מהותית</strong> (לרוב בין 20% ל-50%), ההשקעה מטופלת לפי{' '}
          <strong>שיטת השווי המאזני</strong> (אקוויטי).
        </p>
        <p>
          בשיטה זו, ההשקעה נרשמת תחילה לפי העלות, ולאחר מכן מתעדכנת בהתאם לחלקה של המשקיעה
          בשינויים בהון העצמי של המוחזקת:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4 text-[var(--color-text-primary)] text-sm">
          <li>
            <strong>רווח/הפסד של המוחזקת:</strong> המשקיעה רושמת כ"רווחי אקוויטי" (או הפסדי אקוויטי)
            ברווח והפסד, ומגדילה (או מקטינה) את חשבון ההשקעה במאזן.
          </li>
          <li>
            <strong>דיבידנד שחילקה המוחזקת:</strong> המשקיעה מקבלת מזומן ומקטינה את חשבון ההשקעה.
            דיבידנד אינו מהווה הכנסה (כדי למנוע כפילות עם רווחי האקוויטי).
          </li>
        </ul>

        <h4 className="font-bold mt-6 mb-2 text-[var(--color-text-primary)]">חישוב הפרש מקורי (עודף עלות)</h4>
        <p>
          ההפרש בין עלות ההשקעה לבין חלקה של המשקיעה בשווי הפנקסני (ההון העצמי) של המוחזקת. הפרש זה מיוחס
          לנכסים והתחייבויות ששווים ההוגן שונה מערכם הפנקסני (למשל מלאי, רכוש קבוע) והיתרה היא{' '}
          <strong>מוניטין</strong>. את ההפרש המיוחס לנכסים יש להפחית לאורך חייהם, והפחתה זו מקטינה את רווחי
          האקוויטי.
        </p>

        <FormulaBlock label="נוסחת ההפרש המקורי">
          <div className="text-base">
            <InlineMathToken
              math={String.raw`\text{עודף עלות} = \text{עלות ההשקעה} - (\% \times \text{שווי פנקסני של ההון במועד הרכישה})`}
            />
          </div>
        </FormulaBlock>

        <InsightBlock>
          <p>
            <strong>💡 למה מוניטין?</strong> אם שילמנו יותר מהחלק שלנו בהון העצמי הפנקסני, ההפרש משקף דברים
            "בלתי-נראים" — מוניטין (Goodwill), סימן מסחרי, יחסי לקוחות. זה לא נכס שמופחת, אלא נבדק
            לירידת ערך בכל תאריך חתך.
          </p>
        </InsightBlock>

        <AlertBlock>
          <p>
            <strong>⚠️ הבדל מהותי מ-FVTPL — טיפול בדיבידנד:</strong>
          </p>
          <table className="w-full text-sm mt-3 border border-[var(--color-warning)]/30 rounded-lg overflow-hidden" dir="rtl">
            <thead className="bg-[var(--color-warning)]/15 border-b-2 border-[var(--color-warning)]/40">
              <tr>
                <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">שיטה</th>
                <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">דיבידנד שהתקבל</th>
                <th className="px-3 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">יתרת ההשקעה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-warning)]/20">
              <tr>
                <td className="px-3 py-2 font-bold">FVTPL (פרק 5)</td>
                <td className="px-3 py-2">הכנסת המימון ברווח והפסד</td>
                <td className="px-3 py-2">ללא שינוי</td>
              </tr>
              <tr className="bg-[var(--color-error)]/5">
                <td className="px-3 py-2 font-bold">שווי מאזני (פרק 6)</td>
                <td className="px-3 py-2">לא נרשם כהכנסה</td>
                <td className="px-3 py-2 font-bold">מוקטן</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs">
            <strong>למה?</strong> בשווי מאזני, רווחי המוחזקת כבר נכללו ברווחי האקוויטי שלנו כשהיא הרוויחה.
            דיבידנד הוא רק "העברה" של אותם רווחים בחזרה — רישום פעמיים היה כפילות.
          </p>
        </AlertBlock>
      </LessonBlock>

      <LessonBlock title="תרגיל מודרך 1: חברת ברצלונה ומדריד">
        <ExerciseStep
          title="תרגיל באקוויטי - שאלות 2-3"
          question={`ב-1.1.24 רכשה חברת ברצלונה 40% מהון המניות של חברת מדריד בע"מ תמורת 110,000 ₪.

להלן ההון העצמי של חברת "מדריד" ליום 1.1.24:
הון מניות: 30,000
פרמיה: 20,000
יתרת רווח: 150,000
סה"כ הון עצמי: 200,000

נתונים נוספים ליום הרכישה ולשנת 2024:
1. שווי השוק של המלאי היה גבוה ב- 10,000 ₪ מהשווי במאזן. המלאי נמכר במהלך שנת 2024.
2. שווי השוק של הרכוש הקבוע היה גבוה ב- 20,000 מהשווי במאזן. הרכוש הקבוע מופחת למשך 4 שנים בקו ישר.
3. רווחי חברת "מדריד" לשנת 2024 הסתכמו ב- 100,000 ₪.
4. במהלך שנת 2024 חברת "מדריד" הכריזה וחילקה דיבידנד בסך 50,000 ₪.

נדרש:
1. חשבו את ההפרש המקורי וייחסו אותו לנכסים ולמוניטין.
2. חשבו את רווחי האקוויטי שתרשום ברצלונה לשנת 2024.
3. חשבו את יתרת חשבון ההשקעה במדריד ליום 31.12.24 ואת פקודות היומן לשנה זו.`}
        >
          <div className="space-y-8">
            {/* Part 1: Original Difference */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b-2 border-[var(--color-accent-cobalt)]/40 pb-2">
                שלב 1: חישוב הפרש מקורי ומוניטין
              </h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-surface-alt)] rounded-lg p-5 text-sm text-[var(--color-text)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">חישוב ההפרש המקורי (עודף עלות):</h4>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>עלות ההשקעה:</span> <span>110,000</span>
                      </li>
                      <li className="flex justify-between text-[var(--color-text-secondary)]">
                        <span>פחות: חלקנו בהון (40% × 200,000):</span> <span>(80,000)</span>
                      </li>
                      <li className="flex justify-between font-bold border-t border-[var(--color-surface-alt)] pt-1 mt-1">
                        <span>הפרש מקורי:</span> <span>30,000</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">ייחוס ההפרש המקורי (לפי 40%):</h4>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>למלאי (40% × 10,000):</span> <span>(4,000)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>לרכוש קבוע (40% × 20,000):</span> <span>(8,000)</span>
                      </li>
                      <li className="flex justify-between font-bold text-[var(--color-text-primary)] border-t border-[var(--color-surface-alt)] pt-1 mt-1">
                        <span>מוניטין (שארית):</span> <span>18,000</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Equity Profits */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b-2 border-[var(--color-accent-cobalt)]/40 pb-2">
                שלב 2: רווחי אקוויטי לשנת 2024
              </h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-surface-alt)] rounded-lg p-5 text-sm text-[var(--color-text)]">
                <p className="mb-4">
                  רווחי אקוויטי מורכבים מחלקנו ברווח הנקי של המוחזקת, בניכוי הפחתת עודפי העלות (ההפרש המקורי
                  שיוחס לנכסים). כאשר נכס נמכר או מופחת, אנו מפחיתים את עודף העלות המיוחס לו מתוך רווחי
                  האקוויטי.
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>חלקנו ברווחי מדריד מפעילות (40% × 100,000):</span> <span>40,000</span>
                  </li>
                  <li className="flex justify-between text-[var(--color-error)]">
                    <span>פחות: הפחתת עודף מלאי (המלאי נמכר השנה ולכן מופחת במלואו):</span>{' '}
                    <span>(4,000)</span>
                  </li>
                  <li className="flex justify-between text-[var(--color-error)]">
                    <span>פחות: הפחתת עודף רכוש קבוע (8,000 חלקי 4 שנים):</span> <span>(2,000)</span>
                  </li>
                  <li className="flex justify-between font-bold text-[var(--color-success)] border-t border-[var(--color-surface-alt)] pt-2 mt-2 text-base">
                    <span>סה״כ רווחי אקוויטי שיירשמו בדו״ח רווח והפסד:</span> <span>34,000</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Part 3: T-Account and Journal Entries */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b-2 border-[var(--color-accent-cobalt)]/40 pb-2">
                שלב 3: יתרת חשבון ההשקעה ל-31.12.24
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--color-surface)] border border-[var(--color-surface-alt)] rounded-lg p-5 flex flex-col justify-center items-center">
                  <h4 className="font-bold mb-4">כרטיס (T-Account) השקעה במדריד</h4>
                  <div className="w-full max-w-xs border-t-2 border-[var(--color-text)] relative mt-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 font-bold text-sm bg-[var(--color-surface)] px-2">
                      חובה (+)
                    </div>
                    <div className="w-px h-48 bg-[var(--color-text)] absolute left-1/2 top-0"></div>
                    <div className="grid grid-cols-2 text-sm pt-2">
                      <div className="pr-4 text-right space-y-2">
                        <div>עלות ההשקעה: 110,000</div>
                        <div className="text-[var(--color-success)]">רווחי אקוויטי: 34,000</div>
                      </div>
                      <div className="pl-4 text-left space-y-2">
                        <div className="text-[var(--color-error)]">
                          דיבידנד: (20,000)
                          <br />
                          <span className="text-xs text-[var(--color-text-muted)]">(40% × 50k)</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-dashed border-[var(--color-text-muted)] mt-16 pt-2 text-center font-bold text-lg text-[var(--color-text-primary)]">
                      יתרת סגירה: 124,000 ₪
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <JournalEntryTable
                    date="1.1.24"
                    description="רכישת ההשקעה"
                    lines={[
                      { account: 'השקעה בחברה כלולה', debit: 110000, isDebit: true },
                      { account: 'מזומן', credit: 110000, isDebit: false },
                    ]}
                  />
                  <JournalEntryTable
                    date="31.12.24"
                    description="רישום חלקה של ברצלונה ברווחי אקוויטי"
                    lines={[
                      { account: 'השקעה בחברה כלולה', debit: 34000, isDebit: true },
                      { account: 'רווחי אקוויטי (רווח והפסד)', credit: 34000, isDebit: false },
                    ]}
                  />
                  <JournalEntryTable
                    date="31.12.24"
                    description="קבלת דיבידנד במזומן (מקטין השקעה)"
                    lines={[
                      { account: 'מזומן (40% מ-50k)', debit: 20000, isDebit: true },
                      { account: 'השקעה בחברה כלולה', credit: 20000, isDebit: false },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>

      {/* ── תרגיל חדש: מכירה חלקית של ההשקעה ──────────────────── */}
      <LessonBlock title="תרגיל מודרך 2: חברת שוהרצקי (מכירת חלק מההשקעה)">
        <ExerciseStep
          title="תרגיל באקוויטי - מכירה חלקית"
          question={`ב-1.1.22 רכשה חברת "שוהרצקי" 30% מהון מניות של חברת "מיצרי" תמורת 250,000 ₪.
ההון העצמי של מיצרי ביום הרכישה היה 700,000 ₪. כל ההפרש המקורי יוחס למוניטין.
במהלך שנת 2022 רשמה מיצרי רווח נקי של 120,000 ₪ וחילקה דיבידנד של 60,000 ₪.
ב-1.4.23 מכרה שוהרצקי מחצית מההחזקה שלה (כלומר 15%) תמורת 180,000 ₪.
בשאר 2023 רשמה מיצרי רווח נקי של 90,000 ₪ וחילקה דיבידנד של 40,000 ₪.

נדרש:
1. יתרת השקעה ל-31.12.22 (אחרי שנת 2022).
2. פקודת יומן למכירה ב-1.4.23 + חישוב רווח/הפסד מהמכירה.
3. יתרת השקעה ל-31.12.23 (חצי מההחזקה המקורית, המעבר ל-FVTPL).`}
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b-2 border-[var(--color-accent-cobalt)]/40 pb-2">
                שלב 1: יתרת השקעה ל-31.12.22
              </h3>
              <p className="text-sm mb-3">
                ההפרש המקורי: 250,000 − (30% × 700,000 = 210,000) = 40,000. כל הסכום מוניטין (אין הפחתה).
              </p>
              <div className="overflow-x-auto rounded-lg border border-[var(--color-surface-alt)] text-sm">
                <table className="w-full" dir="rtl">
                  <tbody className="divide-y divide-[var(--color-surface-alt)]">
                    <tr><td className="px-3 py-2">עלות השקעה (1.1.22)</td><td className="px-3 py-2 font-mono">+250,000</td><td className="px-3 py-2 font-mono">250,000</td></tr>
                    <tr><td className="px-3 py-2">רווחי אקוויטי 2022 (30% × 120,000)</td><td className="px-3 py-2 font-mono text-[var(--color-success)]">+36,000</td><td className="px-3 py-2 font-mono">286,000</td></tr>
                    <tr><td className="px-3 py-2">דיבידנד 2022 (30% × 60,000)</td><td className="px-3 py-2 font-mono text-[var(--color-error)]">−18,000</td><td className="px-3 py-2 font-mono">268,000</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 bg-[var(--color-accent-cobalt)]/10 border border-[var(--color-accent-cobalt)]/30 p-3 rounded-lg text-sm">
                <strong>יתרת השקעה ל-31.12.22:</strong> 268,000 ₪.
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b-2 border-[var(--color-accent-cobalt)]/40 pb-2">
                שלב 2: מכירת מחצית מההחזקה (15%) ב-1.4.23
              </h3>
              <InsightBlock>
                <p>
                  <strong>💡 הכלל במכירה חלקית:</strong> העלות היא לפי <strong>החלק היחסי</strong> מהיתרה
                  הפנקסנית. כאן מכרנו 15% מתוך 30% המקוריים = <strong>50% מההשקעה</strong>. עלות המכירה:
                  268,000 × 50% = <strong>134,000 ₪</strong>.
                </p>
              </InsightBlock>
              <JournalEntryTable
                date="1.4.23"
                description="מכירת 15% תמורת 180,000. עלות = 268,000 × 50% = 134,000. רווח מהמכירה = 46,000"
                lines={[
                  { account: 'מזומן', debit: 180000, isDebit: true },
                  { account: 'השקעה בחברה כלולה (50% מ-268,000)', credit: 134000, isDebit: false },
                  { account: 'הכנסות מימון (רווח ממכירת השקעה)', credit: 46000, isDebit: false },
                ]}
              />
              <AlertBlock>
                <p className="text-sm">
                  <strong>⚠️ שים לב:</strong> כשמוכרים חלק מההחזקה כך ש<strong>מאבדים השפעה מהותית</strong>,
                  יתרת ההחזקה נותרת ב<strong>שווי הוגן (FVTPL)</strong> — לא בשווי מאזני! בשלב הבא נראה איך
                  זה משפיע.
                </p>
              </AlertBlock>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b-2 border-[var(--color-accent-cobalt)]/40 pb-2">
                שלב 3: יתרת השקעה ל-31.12.23 — מעבר ל-FVTPL
              </h3>
              <p className="text-sm mb-3">
                לאחר המכירה, שוהרצקי מחזיקה רק 15% → <strong>אין השפעה מהותית</strong>. על פי הכלל,
                יתרת ההשקעה (134,000) נרשמת ל<strong>שווי הוגן (FVTPL)</strong> ביום המעבר, ומעתה היא
                עוברת לטיפול לפי פרק 5.
              </p>
              <div className="overflow-x-auto rounded-lg border border-[var(--color-surface-alt)] text-sm">
                <table className="w-full" dir="rtl">
                  <tbody className="divide-y divide-[var(--color-surface-alt)]">
                    <tr><td className="px-3 py-2">יתרה אחרי מכירה (1.4.23)</td><td className="px-3 py-2 font-mono">134,000</td></tr>
                    <tr><td className="px-3 py-2">מעבר ל-FVTPL (שווי הוגן זהה לע.פ)</td><td className="px-3 py-2 font-mono">—</td></tr>
                    <tr className="bg-[var(--color-accent-cobalt)]/10"><td className="px-3 py-2 font-bold">יתרת השקעה ל-31.12.23 (FVTPL)</td><td className="px-3 py-2 font-mono font-bold">134,000</td></tr>
                  </tbody>
                </table>
              </div>
              <InsightBlock>
                <p>
                  <strong>💡 רווחי מיצרי לתקופה (אפריל-דצמבר 2023):</strong> היו 75,000 ₪ (3/4 מ-90,000 משוערד).
                  רווחי האקוויטי ברבעון הראשון של 2023 (לפני המכירה) = 30% × 30,000 (משוערד לרבעון) ={' '}
                  <strong>9,000 ₪</strong>. רק חלק זה נרשם ברווח והפסד; השאר משתקף ביתרת ההחזקה ל-FVTPL.
                </p>
              </InsightBlock>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>

      {/* ── MCQ מלכודת: דיבידנד בשווי מאזני ─────────────────────── */}
      <div className="mb-12">
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-6 pb-2 border-b-2 border-[var(--color-surface-raised)] inline-block">
          בחן את עצמך
        </h2>
        <MCQuestionCard
          id="em-q1"
          prompt={'חברת "המשקיעה" מחזיקה 30% מהון של חברת "המוחזקת" בשיטת השווי המאזני. המוחזקת חילקה דיבידנד של 50,000 ₪. כיצד נרשום את קבלת הדיבידנד (15,000 ₪)?'}
          options={[
            {
              label: 'א',
              text: 'חיוב מזומן, זכות הכנסות מדיבידנד ברווח והפסד',
            },
            {
              label: 'ב',
              text: 'חיוב מזומן, זכות השקעה בחברה כלולה (הקטנת ההשקעה)',
              correct: true,
            },
            {
              label: 'ג',
              text: 'חיוב מזומן, חיוב השקעה בחברה כלולה',
            },
            {
              label: 'ד',
              text: 'אין צורך לרשום — רק משנים את רווחי האקוויטי',
            },
          ]}
          rationale={
            <>
              בשווי מאזני, דיבידנד הוא <strong>לא הכנסה</strong> — הוא רק "החזר" של חלק מרווחי האקוויטי שכבר
              נרשמו. רישום הכנסה + תשלום במזומן היה <strong>כפילות</strong> של אותו רווח. הפתרון: חיוב מזומן,
              זכות ההשקעה — שמקטין את יתרת ההחזקה.
            </>
          }
        />
      </div>
    </PageLayout>
  );
}
