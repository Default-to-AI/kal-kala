import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { ExerciseStep } from '../ui/ExerciseStep';

export function CashFlowChapter() {
  return (
    <PageLayout>
      <PageHeader 
        title="פרק 7: דוח תזרים מזומנים" 
        description="מעבר מבסיס צבירה לבסיס מזומן – סיווג לפעילות שוטפת, השקעה ומימון."
      />

      <LessonBlock title="1. מבנה דוח תזרים מזומנים">
        <p>
          דוח תזרים המזומנים מסביר את השינוי ביתרת המזומנים של החברה בין תחילת השנה לסופה. 
          הוא מסווג את תנועות המזומן לשלוש פעילויות מרכזיות:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-4">
          <div className="bg-[var(--surface)] border-t-4 border-[var(--accent)] rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-lg text-[var(--accent)] mb-2">1. פעילות שוטפת</h4>
            <p className="text-sm text-[var(--text-muted)]">
              הפעילות העסקית הרגילה. מחושבת בגישה העקיפה: מתחילים מהרווח הנקי ומתאמים סעיפים שאינם במזומן (כמו פחת והפחתות) ושינויים בהון החוזר (לקוחות, מלאי, ספקים).
            </p>
          </div>
          <div className="bg-[var(--surface)] border-t-4 border-emerald-400 rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-lg text-emerald-400 mb-2">2. פעילות השקעה</h4>
            <p className="text-sm text-[var(--text-muted)]">
              תשתיות לטווח ארוך. קנייה ומכירה של רכוש קבוע (מכונות, ריהוט), נכסים בלתי מוחשיים, והשקעות בניירות ערך לזמן ארוך.
            </p>
          </div>
          <div className="bg-[var(--surface)] border-t-4 border-purple-400 rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-lg text-purple-400 mb-2">3. פעילות מימון</h4>
            <p className="text-sm text-[var(--text-muted)]">
              מקורות המימון של החברה. הנפקת מניות (קבלת מזומן מבעלי מניות), לקיחת/פירעון הלוואות, ותשלום דיבידנד במזומן לבעלי המניות.
            </p>
          </div>
        </div>
      </LessonBlock>

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
            <div className="border border-[var(--surface-alt)] bg-[var(--surface)]/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--accent)] mb-4">1. שינוי בסעיף לקוחות (הון חוזר)</h3>
              <p className="text-sm text-[var(--text)] mb-4">
                לקוחות מייצגים מכירות שטרם נגבו במזומן. כאשר יתרת הלקוחות <strong>גדלה</strong> (מ-124,000 ל-155,000), 
                המשמעות היא שהיו לנו מכירות שנרשמו ברווח הנקי, אבל לא התקבל עבורן מזומן השנה.
              </p>
              <div className="bg-[var(--bg)] border border-rose-500/30 p-4 rounded-lg flex items-center gap-4">
                <div className="text-3xl">📉</div>
                <div>
                  <p className="font-bold text-rose-400">התאמה לפעילות שוטפת:</p>
                  <p className="text-sm">גידול בלקוחות מהווה תזרים שלילי (הקטנה של הרווח). יש להפחית מהרווח הנקי <span className="font-bold">31,000 ₪</span>.</p>
                </div>
              </div>
            </div>

            {/* Question 2: Depreciation */}
            <div className="border border-[var(--surface-alt)] bg-[var(--surface)]/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">2. חישוב פחת והשפעתו (שחזור כרטיס)</h3>
              <p className="text-sm text-[var(--text)] mb-4">
                כדי למצוא את הוצאות הפחת של השנה (שנמצאות ברווח והפסד ואינן במזומן), נשחזר את כרטיס "פחת נצבר ריהוט".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--bg)] border border-[var(--surface-alt)] p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">כרטיס פחת נצבר ריהוט (זכות)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><span>יתרת פתיחה 2021:</span> <span>35,000</span></li>
                    <li className="flex justify-between text-rose-400"><span>פחות: גריעת פחת של נכס שנמכר:</span> <span>(32,000)</span></li>
                    <li className="flex justify-between text-emerald-400 font-bold border-b border-[var(--surface-alt)] pb-2"><span>פלוס: הוצאות פחת השנה (הנעלם):</span> <span>+ X</span></li>
                    <li className="flex justify-between font-bold pt-1"><span>יתרת סגירה 2022:</span> <span>51,000</span></li>
                  </ul>
                  <div className="mt-4 pt-2 border-t border-dashed border-[var(--surface-alt)] font-bold text-center">
                    X = 48,000 ₪
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-[var(--bg)] border border-emerald-500/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="text-3xl">📈</div>
                    <div>
                      <p className="font-bold text-emerald-400">התאמה לפעילות שוטפת:</p>
                      <p className="text-sm">הוצאות פחת הקטינו את הרווח אך אינן דורשות מזומן. לכן, יש לבטלן ולהוסיף לרווח הנקי <span className="font-bold">48,000 ₪</span>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question 3: Dividends */}
            <div className="border border-[var(--surface-alt)] bg-[var(--surface)]/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-4">3. תשלום דיבידנד במזומן (שחזור כרטיס)</h3>
              <p className="text-sm text-[var(--text)] mb-4">
                הכרזה על דיבידנד יוצרת התחייבות, אך בתזרים המזומנים מעניין אותנו רק מה <strong>שולם בפועל במזומן</strong>. 
                נשחזר את כרטיס "דיבידנד לשלם".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--bg)] border border-[var(--surface-alt)] p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">כרטיס דיבידנד לשלם (התחייבות)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><span>יתרת פתיחה 2021:</span> <span>9,000</span></li>
                    <li className="flex justify-between text-purple-400"><span>פלוס: הכרזה על דיבידנד חדש:</span> <span>+ 26,000</span></li>
                    <li className="flex justify-between text-rose-400 font-bold border-b border-[var(--surface-alt)] pb-2"><span>פחות: דיבידנד ששולם במזומן (הנעלם):</span> <span>- X</span></li>
                    <li className="flex justify-between font-bold pt-1"><span>יתרת סגירה 2022:</span> <span>16,000</span></li>
                  </ul>
                  <div className="mt-4 pt-2 border-t border-dashed border-[var(--surface-alt)] font-bold text-center">
                    X = 19,000 ₪
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-[var(--bg)] border border-purple-500/30 p-4 rounded-lg flex items-center gap-4">
                    <div className="text-3xl">🏦</div>
                    <div>
                      <p className="font-bold text-purple-400">פעילות מימון:</p>
                      <p className="text-sm">תשלום דיבידנד במזומן לבעלי מניות מוצג כזרם שלילי בסך <span className="font-bold">(19,000) ₪</span> תחת <strong>תזרים מפעילות מימון</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </ExerciseStep>
      </LessonBlock>
    </PageLayout>
  );
}
