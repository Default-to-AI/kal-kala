import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { ExerciseStep } from '../ui/ExerciseStep';
import { MCQuestionCard } from '../ui/MCQuestionCard';
import { InsightBlock, AlertBlock } from '../ui/FormulaBlock';

export function CashFlowChapter() {
  return (
    <PageLayout>
      <PageHeader
        title="פרק 7: דוח תזרים מזומנים"
        description="מעבר מבסיס צבירה לבסיס מזומן – סיווג לפעילות שוטפת, השקעה ומימון."
      />

      <LessonBlock title="1. מבנה דוח תזרים מזומנים" variant="definition">
        <p>
          דוח תזרים המזומנים מסביר את השינוי ביתרת המזומנים של החברה בין תחילת השנה לסופה. הוא מסווג את
          תנועות המזומן לשלוש פעילויות מרכזיות:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-4">
          <div className="bg-[var(--color-surface)] border-t-4 border-[var(--color-accent-cobalt)] rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">
              1. פעילות שוטפת
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              הפעילות העסקית הרגילה. מחושבת בגישה העקיפה: מתחילים מהרווח הנקי ומתאמים סעיפים שאינם במזומן
              (כמו פחת והפחתות) ושינויים בהון החוזר (לקוחות, מלאי, ספקים).
            </p>
          </div>
          <div className="bg-[var(--color-surface)] border-t-4 border-[var(--color-success)] rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-lg text-[var(--color-success)] mb-2">2. פעילות השקעה</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              תשתיות לטווח ארוך. קנייה ומכירה של רכוש קבוע (מכונות, ריהוט), נכסים בלתי מוחשיים, והשקעות בניירות
              ערך לזמן ארוך.
            </p>
          </div>
          <div className="bg-[var(--color-surface)] border-t-4 border-purple-400 rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-lg text-purple-400 mb-2">3. פעילות מימון</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              מקורות המימון של החברה. הנפקת מניות (קבלת מזומן מבעלי מניות), לקיחת/פירעון הלוואות, ותשלום
              דיבידנד במזומן לבעלי המניות.
            </p>
          </div>
        </div>

        <InsightBlock>
          <p>
            <strong>💡 כלל סיווג מהיר:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>
              <strong>תקבול/תשלום מפעילות רגילה?</strong> → שוטפת
            </li>
            <li>
              <strong>קנייה/מכירה של נכס ארוך-טווח?</strong> → השקעה
            </li>
            <li>
              <strong>קשור למבנה ההון (מניות/הלוואות/דיבידנד)?</strong> → מימון
            </li>
          </ul>
          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            <strong>⚠️ מלכודת קלאסית:</strong> תשלום דיבידנד שלנו = פעילות מימון. קבלת דיבידנד מהשקעה =
            פעילות שוטפת (או השקעה, לפי הסיווג).
          </p>
        </InsightBlock>

        <h4 className="font-bold mt-6 mb-2 text-[var(--color-text-primary)]">
          שיטת הדוח (גישה עקיפה — ברירת המחדל לרוב החברות):
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-[var(--color-text)]">
          <li>
            <strong>רווח (הפסד) נקי</strong> — נקודת מוצא.
          </li>
          <li>
            <strong>תיקונים לסעיפים לא-מזומניים</strong>:
            <ul className="list-disc list-inside pr-6 mt-1 text-sm">
              <li>
                פחת והפחתות → <strong>מוסיפים בחזרה</strong> (הקטינו רווח בלי להוציא מזומן).
              </li>
              <li>רווח/הפסד ממכירת נכס → מוסיפים הפסד / מורידים רווח (לראות רק מזומן).</li>
            </ul>
          </li>
          <li>
            <strong>שינויים בהון החוזר</strong>:
            <ul className="list-disc list-inside pr-6 mt-1 text-sm">
              <li>גידול בלקוחות → <strong>מורידים</strong> (מכירות שלא נגבו).</li>
              <li>גידול במלאי → <strong>מורידים</strong> (קנינו אך לא מכרנו).</li>
              <li>גידול בספקים → <strong>מוסיפים</strong> (קנינו אך לא שילמנו).</li>
            </ul>
          </li>
        </ol>
      </LessonBlock>

      {/* ── תרגיל חדש: דוח תזרים מלא בגישה העקיפה ───────────── */}
      <LessonBlock title="תרגיל מודרך: חברת צמאים לחופש">
        <ExerciseStep
          title="ניתוח השפעות על התזרים משחזור כרטיסים"
          question={`לפניך נתונים מתוך מאזני חברת "צמאים לחופש" לשנים 2021 ו-2022:

לקוחות: 124,000 (ב-2021) ➔ 155,000 (ב-2022)
ריהוט (פחת נצבר): (35,000) (ב-2021) ➔ (51,000) (ב-2022)
דיבידנד לשלם: 9,000 (ב-2021) ➔ 16,000 (ב-2022)

מידע נוסף ל-2022:
1. נמכר ריהוט שעלותו 50,000 ₪ ויתרת הפחת שנצבר בגינו הייתה 32,000 ₪.
2. החברה הכריזה על דיבידנד בסך 26,000 ₪.

נדרש:
1. מהי ההשפעה של השינוי בלקוחות על פעילות שוטפת?
2. מהי הוצאת הפחת לשנת 2022 וכיצד היא מוצגת בתזרים?
3. מהו סכום הדיבידנד ששולם במזומן וכיצד הוא מוצג בתזרים?`}
        >
          <div className="space-y-8">
            {/* Question 1: Customers */}
            <div className="border border-[var(--color-surface-raised)] bg-[var(--color-surface)]/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                1. שינוי בסעיף לקוחות (הון חוזר)
              </h3>
              <p className="text-sm text-[var(--color-text-primary)] mb-4">
                לקוחות מייצגים מכירות שטרם נגבו במזומן. כאשר יתרת הלקוחות <strong>גדלה</strong>
                (מ-124,000 ל-155,000), המשמעות היא שהיו לנו מכירות שנרשמו ברווח הנקי, אבל לא התקבל עבורן מזומן
                השנה.
              </p>
              <div className="bg-[var(--color-background)] border border-[var(--color-error)]/30 p-4 rounded-lg flex items-center gap-4">
                <div className="text-3xl">📉</div>
                <div>
                  <p className="font-bold text-[var(--color-error)]">התאמה לפעילות שוטפת:</p>
                  <p className="text-sm">
                    גידול בלקוחות מהווה תזרים שלילי (הקטנה של הרווח). יש להפחית מהרווח הנקי{' '}
                    <span className="font-bold">31,000 ₪</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Question 2: Depreciation */}
            <div className="border border-[var(--color-surface-raised)] bg-[var(--color-surface)]/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-success)] mb-4">
                2. חישוב פחת והשפעתו (שחזור כרטיס)
              </h3>
              <p className="text-sm text-[var(--color-text-primary)] mb-4">
                כדי למצוא את הוצאות הפחת של השנה (שנמצאות ברווח והפסד ואינן במזומן), נשחזר את כרטיס "פחת נצבר
                ריהוט".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--color-background)] border border-[var(--color-surface-raised)] p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">כרטיס פחת נצבר ריהוט (זכות)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>יתרת פתיחה 2021:</span> <span>35,000</span>
                    </li>
                    <li className="flex justify-between text-[var(--color-error)]">
                      <span>פחות: גריעת פחת של נכס שנמכר:</span> <span>(32,000)</span>
                    </li>
                    <li className="flex justify-between text-[var(--color-success)] font-bold border-b border-[var(--color-surface-raised)] pb-2">
                      <span>פלוס: הוצאות פחת השנה (הנעלם):</span> <span>+ X</span>
                    </li>
                    <li className="flex justify-between font-bold pt-1">
                      <span>יתרת סגירה 2022:</span> <span>51,000</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-2 border-t border-dashed border-[var(--color-surface-raised)] font-bold text-center">
                    X = 48,000 ₪
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-[var(--color-background)] border border-[var(--color-success)]/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="text-3xl">📈</div>
                    <div>
                      <p className="font-bold text-[var(--color-success)]">התאמה לפעילות שוטפת:</p>
                      <p className="text-sm">
                        הוצאות פחת הקטינו את הרווח אך אינן דורשות מזומן. לכן, יש לבטלן ולהוסיף לרווח הנקי{' '}
                        <span className="font-bold">48,000 ₪</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question 3: Dividends */}
            <div className="border border-[var(--color-surface-raised)] bg-[var(--color-surface)]/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-4">
                3. תשלום דיבידנד במזומן (שחזור כרטיס)
              </h3>
              <p className="text-sm text-[var(--color-text-primary)] mb-4">
                הכרזה על דיבידנד יוצרת התחייבות, אך בתזרים המזומנים מעניין אותנו רק מה{' '}
                <strong>שולם בפועל במזומן</strong>. נשחזר את כרטיס "דיבידנד לשלם".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--color-background)] border border-[var(--color-surface-raised)] p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">כרטיס דיבידנד לשלם (התחייבות)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>יתרת פתיחה 2021:</span> <span>9,000</span>
                    </li>
                    <li className="flex justify-between text-purple-400">
                      <span>פלוס: הכרזה על דיבידנד חדש:</span> <span>+ 26,000</span>
                    </li>
                    <li className="flex justify-between text-[var(--color-error)] font-bold border-b border-[var(--color-surface-raised)] pb-2">
                      <span>פחות: דיבידנד ששולם במזומן (הנעלם):</span> <span>- X</span>
                    </li>
                    <li className="flex justify-between font-bold pt-1">
                      <span>יתרת סגירה 2022:</span> <span>16,000</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-2 border-t border-dashed border-[var(--color-surface-raised)] font-bold text-center">
                    X = 19,000 ₪
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-[var(--color-background)] border border-purple-500/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="text-3xl">🏦</div>
                    <div>
                      <p className="font-bold text-purple-400">פעילות מימון:</p>
                      <p className="text-sm">
                        תשלום דיבידנד במזומן לבעלי מניות מוצג כזרם שלילי בסך{' '}
                        <span className="font-bold">(19,000) ₪</span> תחת{' '}
                        <strong>תזרים מפעילות מימון</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>

      {/* ── תרגיל חדש: בניית דוח תזרים מלא ─────────────────────── */}
      <LessonBlock title="תרגיל מודרך 2: חברת חמדה (דוח תזרים מלא בגישה העקיפה)">
        <ExerciseStep
          title="הרכבת דוח תזרים מזומנים שלם"
          question={`
נתוני חברת "חמדה" לשנת 2024:
1. רווח נקי לשנה: 60,000 ₪.
2. הוצאות פחת שנרשמו במהלך השנה: 25,000 ₪ (כולן מהמפעל).
3. נמכר ציוד בעלות 40,000 ₪ תמורת 35,000 ₪ במזומן (יתרת פחת שנצבר בגינו עד למועד המכירה: 15,000 ₪).
4. חתכים ממאזני החברה:
   - לקוחות: 80,000 (1.1.24) ➔ 95,000 (31.12.24)
   - מלאי: 50,000 (1.1.24) ➔ 40,000 (31.12.24)
   - ספקים: 30,000 (1.1.24) ➔ 42,000 (31.12.24)
5. נלקחה הלוואה חדשה בסך 80,000 ₪ במזומן במהלך השנה.
6. שולם דיבידנד במזומן בסך 20,000 ₪ במהלך השנה.

נדרש:
הציגו את דוח תזרים המזומנים בגישה העקיפה לשנת 2024.
`}
        >
          <div className="space-y-6">
            <AlertBlock>
              <p className="text-sm">
                <strong>⚠️ לפני שמתחילים:</strong> הרווח הנקי (60,000) כולל בתוכו גם את <strong>הרווח</strong> ממכירת הציוד.
                עלות הציוד שנמכר הייתה 40,000, הפחת שנצבר בגינו עד למועד המכירה הוא 15,000, ולכן ערכו הפנקסני = 25,000.
                מכרנו אותו ב-35,000 — כלומר <strong>רווח של 10,000 ₪</strong> שנכלל ברווח הנקי!
                רווח כזה אינו מזומן מפעילות שוטפת, ולכן יש ל<strong>נטרל אותו</strong> (להוריד) בדוח התזרים.
              </p>
            </AlertBlock>

            {/* Step 1: Shurat achila */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-primary)]/40 pb-2">
                שלב 1: תיקונים לסעיפים לא-מזומניים
              </h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 text-sm space-y-3">
                <div className="flex justify-between border-b border-[var(--color-border)]/30 pb-2">
                  <span className="font-bold">רווח נקי</span>
                  <span className="font-bold">60,000</span>
                </div>
                <div className="flex justify-between text-[var(--color-success)]">
                  <span>+ פחת (לא-מזומני, מוסיפים בחזרה לרווח)</span>
                  <span className="font-bold">25,000</span>
                </div>
                <div className="flex justify-between text-[var(--color-success)]">
                  <span>− רווח ממכירת ציוד (נטרול רכיב לא-מזומני שכלול ברווח הנקי)</span>
                  <span className="font-bold">(10,000)</span>
                </div>
                <div className="flex justify-between text-[var(--color-success)]">
                  <span className="font-bold underline">+ פחת</span>
                  <span className="font-bold text-[var(--color-text-muted)]">— (אין בתרגיל)</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                  💡 חישוב הרווח מהמכירה: ערך פנקסני = 40,000 (עלות מקורית) − 15,000 (פחת שנצבר) = 25,000. תמורה שהתקבלה = 35,000.
                  <strong>רווח</strong> = 35,000 − 25,000 = <strong>10,000</strong> ₪, אשר נכלל ברווח הנקי אך אינו מזומן מפעילות שוטפת — לכן <strong>מורידים</strong> אותו.
                </p>
              </div>
            </div>

            {/* Step 2: Working capital */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-primary)]/40 pb-2">
                שלב 2: שינויים בהון החוזר (נכסים שוטפים והתחייבויות שוטפות)
              </h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 text-sm space-y-3">
                <div className="flex justify-between">
                  <span>לקוחות: עלייה מ-80,000 ל-95,000 → המשמעות: מכרנו אך לא גבינו</span>
                  <span className="font-bold text-[var(--color-error)]">(15,000)</span>
                </div>
                <div className="flex justify-between">
                  <span>מלאי: ירידה מ-50,000 ל-40,000 → מכרנו בלי לקנות (מקור מזומן!)</span>
                  <span className="font-bold text-[var(--color-success)]">10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>ספקים: עלייה מ-30,000 ל-42,000 → קנינו בלי לשלם (חסכנו מזומן)</span>
                  <span className="font-bold text-[var(--color-success)]">12,000</span>
                </div>
              </div>
            </div>

            {/* Step 3: Final report */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-success)] mb-4 border-b border-[var(--color-success)]/20 pb-2">
                שלב 3: הרכבת הדוח
              </h3>
              <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] shadow-md">
                <table className="w-full text-sm bg-[var(--color-surface)]" dir="rtl">
                  <thead className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
                    <tr>
                      <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">דוח תזרים מזומנים — שנת 2024</th>
                      <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] w-1/4">₪</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]/40">
                    <tr><td className="px-4 py-2 font-semibold" colSpan={2}>פעילות שוטפת:</td></tr>
                    <tr>
                      <td className="px-6 py-2">רווח נקי</td>
                      <td className="px-4 py-2 text-left font-mono">60,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 pl-10 text-[var(--color-text-secondary)]">+ פחת</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-success)]">25,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 pl-10 text-[var(--color-text-secondary)]">− רווח ממכירת ציוד</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-error)]">(10,000)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 pl-10 text-[var(--color-text-secondary)]">− גידול בלקוחות</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-error)]">(15,000)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 pl-10 text-[var(--color-text-secondary)]">+ ירידה במלאי</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-success)]">10,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 pl-10 text-[var(--color-text-secondary)]">+ גידול בספקים</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-success)]">12,000</td>
                    </tr>
                    <tr className="bg-[var(--color-surface-alt)] font-bold">
                      <td className="px-4 py-2">סך תזרים מפעילות שוטפת</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-primary)]">82,000</td>
                    </tr>
                    <tr><td className="px-4 py-2 font-semibold" colSpan={2}>פעילות השקעה:</td></tr>
                    <tr>
                      <td className="px-6 py-2">תמורה ממכירת ציוד</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-success)]">35,000</td>
                    </tr>
                    <tr className="bg-[var(--color-surface-alt)] font-bold">
                      <td className="px-4 py-2">סך תזרים מפעילות השקעה</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-primary)]">35,000</td>
                    </tr>
                    <tr><td className="px-4 py-2 font-semibold" colSpan={2}>פעילות מימון:</td></tr>
                    <tr>
                      <td className="px-6 py-2">+ קבלת הלוואה</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-success)]">80,000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2">− תשלום דיבידנד</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-error)]">(20,000)</td>
                    </tr>
                    <tr className="bg-[var(--color-surface-alt)] font-bold">
                      <td className="px-4 py-2">סך תזרים מפעילות מימון</td>
                      <td className="px-4 py-2 text-left font-mono text-[var(--color-primary)]">60,000</td>
                    </tr>
                    <tr className="bg-[var(--color-primary)]/10 border-t-2 border-[var(--color-primary)] font-bold text-base">
                      <td className="px-4 py-3">עלייה נטו במזומנים לשנת 2024</td>
                      <td className="px-4 py-3 text-left font-mono text-[var(--color-primary)]">177,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>

      {/* ── MCQ מלכודת: לאן הולך פחת בגישה העקיפה ───────────── */}
      <div className="mb-12">
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-6 pb-2 border-b-2 border-[var(--color-surface-raised)] inline-block">
          בחן את עצמך
        </h2>
        <MCQuestionCard
          id="cf-q1"
          prompt="בדוח תזרים מזומנים בגישה העקיפה, היכן מופיעות הוצאות פחת?"
          options={[
            {
              label: 'א',
              text: 'בסעיף פעילות שוטפת — מוסיפים לרווח הנקי',
              correct: true,
            },
            {
              label: 'ב',
              text: 'בסעיף פעילות השקעה — מופחתים מהרווח',
            },
            {
              label: 'ג',
              text: 'בסעיף פעילות מימון — מופחתים מהרווח',
            },
            {
              label: 'ד',
              text: 'לא מופיעות בתזרים מזומנים בכלל',
            },
          ]}
          rationale={
            <>
              פחת הוצאה ש<strong>לא דורשת מזומן</strong>, אך היא הקטינה את הרווח הנקי. כדי שהדוח יראה את
              תזרים המזומן <em>האמיתי</em>, צריך <strong>לבטל</strong> את ההשפעה שלה על הרווח →{' '}
              <strong>להוסיף</strong> בחזרה בסעיף פעילות שוטפת.
            </>
          }
        />
      </div>

      {/* ── MCQ נוסף: סיווג קבלת דיבידנד ──────────────────── */}
      <div className="mb-12">
        <MCQuestionCard
          id="cf-q2"
          prompt={'חברת "המשקיעה" מחזיקה מניות בחברה אחרת (FVTPL) וקיבלה דיבידנד במזומן. היכן מופיע תזרים המזומן של קבלת הדיבידנד בדוח התזרים?'}
          options={[
            { label: 'א', text: 'בפעילות מימון' },
            {
              label: 'ב',
              text: 'בפעילות שוטפת',
              correct: true,
            },
            { label: 'ג', text: 'בפעילות השקעה' },
            { label: 'ד', text: 'לא מופיע כלל כי מדובר ברווח' },
          ]}
          rationale={
            <>
              קבלת דיבידנד מ<strong>השקעה</strong> (גם אם היא FVTPL) נחשבת ל<strong>תזרים שוטף</strong> — זו
              הכנסה שוטפת מהשקעת כספים, בדומה לריבית שמתקבלת. לעומת זאת, <strong>תשלום</strong> דיבידנד שלנו
              הוא פעילות <strong>מימון</strong>.
            </>
          }
        />
      </div>
    </PageLayout>
  );
}
