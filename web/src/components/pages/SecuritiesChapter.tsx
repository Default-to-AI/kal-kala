import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { ExerciseStep } from '../ui/ExerciseStep';
import { JournalEntryTable } from '../ui/JournalEntryTable';

export function SecuritiesChapter() {
  return (
    <PageLayout>
      <PageHeader 
        title="פרק 5: השקעות בניירות ערך סחירים" 
        description="נכסים פיננסיים המוחזקים למסחר (FVTPL) – רישום ראשוני, שערוך שווי הוגן, וקבלת דיבידנד."
      />

      <LessonBlock title="1. מהות השקעה בניירות ערך למסחר">
        <p>
          כאשר חברה רוכשת מניות של חברה אחרת (שנחסרות בבורסה) במטרה להפיק רווחים מעליית ערכן ולמכור אותן בטווח הקצר, 
          ההשקעה מסווגת כ"נכס פיננסי המוחזק למסחר" (שווי הוגן דרך רווח והפסד - FVTPL).
        </p>
        <p>
          <strong>רישום ראשוני:</strong> ההשקעה נרשמת לפי העלות שלה (כמות מניות × מחיר המניה).
        </p>
        <p>
          <strong>מדידה עוקבת (שערוך):</strong> בכל תאריך חתך (סוף רבעון או סוף שנה), יש למדוד את ההשקעה 
          לפי שוויה ההוגן (מחיר המניה העדכני בבורסה). ההפרש בין השווי ההוגן העדכני לבין הערך הפנקסני 
          נזקף ישירות לדוח רווח והפסד כ"הכנסות מימון" (אם הייתה עלייה) או "הוצאות מימון" (אם הייתה ירידה).
        </p>
        <p>
          <strong>קבלת דיבידנד:</strong> כאשר החברה המוחזקת מחלקת דיבידנד, החברה המשקיעה רושמת 
          "הכנסות מדיבידנד" (סעיף בדוח רווח והפסד), וזאת מבלי לשנות את יתרת נכס ההשקעה.
        </p>
      </LessonBlock>

      <LessonBlock title="תרגיל מודרך 1: חברה א' וב'">
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
              <h3 className="text-lg font-bold text-[var(--text)] mb-4">חלק 1: פקודות יומן (2024)</h3>
              
              <div className="space-y-4 mb-6">
                <JournalEntryTable 
                  date="1.1.24"
                  description="רכישת ההשקעה: 10,000 מניות × 3 ₪ = 30,000 ₪"
                  lines={[
                    { account: "השקעה בני״ע (נכס פיננסי למסחר)", debit: 30000, isDebit: true },
                    { account: "מזומן", credit: 30000, isDebit: false },
                  ]}
                />
                <JournalEntryTable 
                  date="1.4.24 (תום רבעון ראשון)"
                  description="שערוך: המחיר עלה ל-4 ₪. שווי חדש = 40,000. עליית ערך = 10,000"
                  lines={[
                    { account: "השקעה בני״ע", debit: 10000, isDebit: true },
                    { account: "הכנסות מימון (רווח מעליית ערך)", credit: 10000, isDebit: false },
                  ]}
                />
                <JournalEntryTable 
                  date="1.7.24 (תום רבעון שני)"
                  description="שערוך: המחיר ירד ל-2 ₪. שווי חדש = 20,000. ירידת ערך מהרבעון הקודם = 20,000"
                  lines={[
                    { account: "הוצאות מימון (הפסד מירידת ערך)", debit: 20000, isDebit: true },
                    { account: "השקעה בני״ע", credit: 20000, isDebit: false },
                  ]}
                />
                <JournalEntryTable 
                  date="1.10.24 (תום רבעון שלישי)"
                  description="שערוך: המחיר עלה ל-3 ₪. שווי חדש = 30,000. עליית ערך = 10,000"
                  lines={[
                    { account: "השקעה בני״ע", debit: 10000, isDebit: true },
                    { account: "הכנסות מימון", credit: 10000, isDebit: false },
                  ]}
                />
                <JournalEntryTable 
                  date="31.12.24 (תום רבעון רביעי)"
                  description="שערוך: המחיר עלה ל-5 ₪. שווי חדש = 50,000. עליית ערך = 20,000"
                  lines={[
                    { account: "השקעה בני״ע", debit: 20000, isDebit: true },
                    { account: "הכנסות מימון", credit: 20000, isDebit: false },
                  ]}
                />
                <JournalEntryTable 
                  date="31.12.24"
                  description="קבלת דיבידנד: 10,000 מניות × 7 ₪ = 70,000 ₪"
                  lines={[
                    { account: "מזומן", debit: 70000, isDebit: true },
                    { account: "הכנסות מדיבידנד (רווח והפסד)", credit: 70000, isDebit: false },
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-4">חלק 2: הצגה בדוחות הכספיים מדי רבעון</h3>
              
              <div className="overflow-x-auto rounded-lg border border-[var(--surface-alt)]">
                <table className="w-full text-sm text-right text-[var(--text)] bg-[var(--surface)] whitespace-nowrap">
                  <thead className="bg-[var(--bg)] border-b border-[var(--surface-alt)]">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-[var(--text-muted)]">תאריך חתך</th>
                      <th className="px-4 py-3 font-semibold text-[var(--text-muted)]">מחיר מניה</th>
                      <th className="px-4 py-3 font-semibold text-[var(--accent)] text-center border-r border-[var(--surface-alt)]">מאזן: השקעה בני״ע</th>
                      <th className="px-4 py-3 font-semibold text-[var(--text-muted)] text-center">רווח והפסד: הכנסות (הוצאות) מימון משערוך</th>
                      <th className="px-4 py-3 font-semibold text-[var(--text-muted)] text-center">רווח והפסד: הכנסות דיבידנד</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--surface-alt)]">
                    <tr className="hover:bg-[var(--surface-alt)]/20 transition-colors">
                      <td className="px-4 py-3">1.1.24 (רכישה)</td>
                      <td className="px-4 py-3">3 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--surface-alt)] font-bold text-[var(--accent)]">30,000</td>
                      <td className="px-4 py-3 text-center">-</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="hover:bg-[var(--surface-alt)]/20 transition-colors">
                      <td className="px-4 py-3">1.4.24 (רבעון 1)</td>
                      <td className="px-4 py-3">4 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--surface-alt)] font-bold text-[var(--accent)]">40,000</td>
                      <td className="px-4 py-3 text-center text-emerald-400">10,000</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="hover:bg-[var(--surface-alt)]/20 transition-colors">
                      <td className="px-4 py-3">1.7.24 (רבעון 2)</td>
                      <td className="px-4 py-3">2 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--surface-alt)] font-bold text-[var(--accent)]">20,000</td>
                      <td className="px-4 py-3 text-center text-rose-400">(20,000)</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="hover:bg-[var(--surface-alt)]/20 transition-colors">
                      <td className="px-4 py-3">1.10.24 (רבעון 3)</td>
                      <td className="px-4 py-3">3 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--surface-alt)] font-bold text-[var(--accent)]">30,000</td>
                      <td className="px-4 py-3 text-center text-emerald-400">10,000</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="bg-[var(--surface-alt)]/40 font-bold">
                      <td className="px-4 py-3">31.12.24 (רבעון 4)</td>
                      <td className="px-4 py-3">5 ₪</td>
                      <td className="px-4 py-3 text-center border-r border-[var(--surface-alt)] text-[var(--accent)]">50,000</td>
                      <td className="px-4 py-3 text-center text-emerald-400">20,000</td>
                      <td className="px-4 py-3 text-center text-emerald-400">70,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>
    </PageLayout>
  );
}
