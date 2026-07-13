import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { StepByStepExercise } from '../ui/StepByStepExercise';
import { JournalEntry } from '../ui/JournalEntry';

export function ChangesInEquityChapter() {
  return (
    <PageLayout>
      <PageHeader 
        title="פרק 2: דוח על שינויים בהון העצמי" 
        description="תרגול מקיף בהכנת דוח על השינויים בהון העצמי: פקודות יומן, תנועות בהון, מניות הטבה ודיבידנד."
      />

      <LessonBlock title="תרגיל מודרך 1: חברת אבי">
        <StepByStepExercise 
          questionTitle="נתוני השאלה"
          questionContent={
            <>
              <p>חברת "אבי" הוקמה ביום ה- 1.1.24.</p>
              <p>ביום הקמתה הנפיקה 20,000 מניות רגילות בנות 2 ₪ ע.נקוב כל אחת תמורת 100,000 ₪.</p>
              <p>כמו כן הנפיקה 10,000 מניות בכורה בנות 4 ₪ ע.נקוב כל אחת תמורת ערכן הנקוב.</p>
              <p>במהלך השנה הרוויחה החברה 150,000 ₪.</p>
              <p>ב - 30.6.24 חילקה החברה מניות הטבה בשיעור של 30% לכל בעלי המניות מתוך הפרמיה.</p>
              <p>ב- 31.12.24 חילקה החברה דיבידנד בסך 80,000 ₪ במזומן.</p>
              <br/>
              <strong>נדרש:</strong>
              <ol className="list-decimal list-inside">
                <li>רשמו פקודות יומן לשנת 2024.</li>
                <li>הציגו דוח על השינויים בהון העצמי לשנת 2024.</li>
              </ol>
            </>
          }
          steps={[
            {
              title: "שלב 1: הנפקת מניות הקמה",
              content: <p>יש לרשום את הקמת החברה ב-1.1.24, כולל הנפקת מניות רגילות ומניות בכורה.</p>,
              solution: (
                <div className="space-y-4">
                  <JournalEntry 
                    date="1.1.24"
                    description="הנפקת מניות רגילות"
                    entries={[
                      { account: "מזומן", debit: 100000, isDebit: true },
                      { account: "הון מניות רגילות (20,000 × 2)", credit: 40000, isDebit: false },
                      { account: "פרמיה", credit: 60000, isDebit: false }
                    ]}
                  />
                  <JournalEntry 
                    date="1.1.24"
                    description="הנפקת מניות בכורה"
                    entries={[
                      { account: "מזומן", debit: 40000, isDebit: true },
                      { account: "הון מניות בכורה (10,000 × 4)", credit: 40000, isDebit: false }
                    ]}
                  />
                </div>
              )
            },
            {
              title: "שלב 2: סגירת רווח נקי",
              content: <p>במהלך השנה הרוויחה החברה 150,000 ₪. כיצד נסגור רווח זה בסוף השנה?</p>,
              solution: (
                <JournalEntry 
                  date="31.12.24"
                  description="סגירת רווח נקי לעודפים"
                  entries={[
                    { account: "דו''ח רווח והפסד", debit: 150000, isDebit: true },
                    { account: "עודפים", credit: 150000, isDebit: false }
                  ]}
                />
              )
            },
            {
              title: "שלב 3: מניות הטבה",
              content: <p>ב-30.6.24 החברה חילקה 30% מניות הטבה <strong>לכל בעלי המניות</strong> מתוך <strong>הפרמיה</strong>.</p>,
              solution: (
                <JournalEntry 
                  date="30.6.24"
                  description="מניות הטבה (30% על הון רגילות 40,000 ועל הון בכורה 40,000)"
                  entries={[
                    { account: "פרמיה", debit: 24000, isDebit: true },
                    { account: "הון מניות רגילות", credit: 12000, isDebit: false },
                    { account: "הון מניות בכורה", credit: 12000, isDebit: false }
                  ]}
                />
              )
            },
            {
              title: "שלב 4: חלוקת דיבידנד",
              content: <p>ב-31.12.24 החברה חילקה דיבידנד של 80,000 ₪ במזומן.</p>,
              solution: (
                <JournalEntry 
                  date="31.12.24"
                  description="דיבידנד ששולם במזומן מתוך העודפים"
                  entries={[
                    { account: "עודפים", debit: 80000, isDebit: true },
                    { account: "מזומן", credit: 80000, isDebit: false }
                  ]}
                />
              )
            },
            {
              title: "שלב 5: דוח על השינויים בהון העצמי",
              content: <p>בואו נרכז את כל הפעולות שביצענו במהלך שנת 2024 לתוך דוח אחד המסכם את תנועות ההון העצמי של החברה.</p>,
              solution: (
                <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] shadow-sm">
                  <table className="accounting-table whitespace-nowrap min-w-full">
                    <thead className="bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
                      <tr>
                        <th className="text-right px-4 py-3">תיאור</th>
                        <th className="text-center px-4 py-3">הון רגילות</th>
                        <th className="text-center px-4 py-3">הון בכורה</th>
                        <th className="text-center px-4 py-3">פרמיה</th>
                        <th className="text-center px-4 py-3">עודפים</th>
                        <th className="text-center px-4 py-3 text-[var(--color-primary)] font-bold">סך הון עצמי</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[var(--color-surface)]">
                      <tr>
                        <td className="px-4 py-3">יתרה ל- 1.1.24</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">-</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">הנפקת מניות רגילות</td>
                        <td className="text-center px-4 py-3">40,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3">60,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">100,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">הנפקת מניות בכורה</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3">40,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">40,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">רווח נקי לשנה</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-success)]">150,000</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">150,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">מניות הטבה (30%)</td>
                        <td className="text-center px-4 py-3 text-[var(--color-success)]">12,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-success)]">12,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-danger)]">(24,000)</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">-</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">דיבידנד במזומן</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-danger)]">(80,000)</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-danger)]">(80,000)</td>
                      </tr>
                      <tr className="bg-[var(--color-surface-raised)] border-t-2 border-[var(--color-border)]">
                        <td className="px-4 py-3 font-bold">יתרה ל- 31.12.24</td>
                        <td className="text-center px-4 py-3 font-bold">52,000</td>
                        <td className="text-center px-4 py-3 font-bold">52,000</td>
                        <td className="text-center px-4 py-3 font-bold">36,000</td>
                        <td className="text-center px-4 py-3 font-bold">70,000</td>
                        <td className="text-center px-4 py-3 font-bold text-[var(--color-primary)]">210,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            }
          ]}
        />
      </LessonBlock>
      
      <LessonBlock title="תרגיל מודרך 2: חברת שניר">
        <StepByStepExercise 
          questionTitle="נתוני השאלה"
          questionContent={
            <div className="space-y-4">
              <p>חברת "שניר" בע"מ הוקמה ביום 1/1/19. להלן הרכב ההון העצמי של החברה ליום 31/12/24:</p>
              <ul className="list-disc list-inside bg-[var(--color-surface-alt)] p-4 rounded-lg">
                <li>הון מניות רגילות 2 ₪ ע"נ: 500,000 ₪</li>
                <li>הון מניות בכורה: 200,000 ₪</li>
                <li>פרמיה על מניות רגילות: 300,000 ₪</li>
                <li>עודפים: 1,800,000 ₪</li>
                <li className="font-bold border-t border-[var(--color-border)] mt-2 pt-2">סך הון עצמי: 2,800,000 ₪</li>
              </ul>
              
              <p><strong>נתונים נוספים:</strong></p>
              <ol className="list-decimal list-inside space-y-2">
                <li>המניות הנתונות לעיל הונפקו ביום הקמת החברה.</li>
                <li>ב– 1.2.25 הנפיקה החברה 180,000 ₪ ע.נ הון מניות רגילות בפרמיה של 20%. בעקבות כך, נוצרו לחברה הוצאות ההנפקה בסך 10% מהתמורה. הוצאות ההנפקה מקוזזות מתוך קרן הון - פרמיה.</li>
                <li>ב- 1.5.25 חולקו מניות הטבה בשיעור של 50% לבעלי המניות הרגילות. מניות ההטבה מונפקות מתוך העודפים.</li>
                <li>במהלך שנת 2025 הפסידה החברה סך של 800,000 ₪.</li>
                <li>ב- 30.11.25 החליטה הנהלת החברה להקים קרן לחידוש ציוד בסך 100,000 ₪.</li>
                <li>ב- 31.12.25 הכריזה החברה על חלוקת דיבידנד בסך 85,000 ₪. תשלום הדיבידנד יתבצע ב -1.2.26.</li>
              </ol>
              <br/>
              <strong>נדרש:</strong>
              <ol className="list-decimal list-inside">
                <li>רשמו פקודות יומן לשנת 2025.</li>
                <li>הציגו דוח על השינויים בהון העצמי לשנת 2025.</li>
              </ol>
            </div>
          }
          steps={[
            {
              title: "שלב 1: הנפקת מניות רגילות והוצאות הנפקה (1.2.25)",
              content: <p>יש לרשום את הנפקת המניות ולקזז את הוצאות ההנפקה מהפרמיה שנוצרה.</p>,
              solution: (
                <div className="space-y-4">
                  <JournalEntry 
                    date="1.2.25"
                    description="הנפקת 180,000 ע.נ בפרמיה של 20%"
                    explanation="התמורה: 180,000 * 1.2 = 216,000. הוצאות הנפקה = 10% * 216,000 = 21,600. נטו במזומן: 194,400."
                    entries={[
                      { account: "מזומן", debit: 194400, isDebit: true },
                      { account: "הוצאות הנפקה", debit: 21600, isDebit: true },
                      { account: "הון מניות רגילות", credit: 180000, isDebit: false },
                      { account: "פרמיה", credit: 36000, isDebit: false }
                    ]}
                  />
                  <JournalEntry 
                    date="1.2.25"
                    description="קיזוז הוצאות הנפקה מפרמיה"
                    entries={[
                      { account: "פרמיה", debit: 21600, isDebit: true },
                      { account: "הוצאות הנפקה", credit: 21600, isDebit: false }
                    ]}
                  />
                </div>
              )
            },
            {
              title: "שלב 2: חלוקת מניות הטבה מעודפים (1.5.25)",
              content: <p>מניות הטבה של 50% יחולקו לבעלי מניות רגילות מתוך העודפים.</p>,
              solution: (
                <JournalEntry 
                  date="1.5.25"
                  description="הון מניות רגילות קיים = 500,000 + 180,000 = 680,000. חלוקה של 50% = 340,000."
                  entries={[
                    { account: "עודפים", debit: 340000, isDebit: true },
                    { account: "הון מניות רגילות", credit: 340000, isDebit: false }
                  ]}
                />
              )
            },
            {
              title: "שלב 3: הפסד נקי (2025)",
              content: <p>במהלך השנה החברה הפסידה 800,000 ₪. כיצד רושמים הפסד זה בעודפים?</p>,
              solution: (
                <JournalEntry 
                  date="31.12.25"
                  description="סגירת הפסד נקי לעודפים"
                  entries={[
                    { account: "עודפים", debit: 800000, isDebit: true },
                    { account: "דו''ח רווח והפסד (הפסד נקי)", credit: 800000, isDebit: false }
                  ]}
                />
              )
            },
            {
              title: "שלב 4: קרן לחידוש ציוד (30.11.25)",
              content: <p>הקמת קרן לחידוש ציוד בסך 100,000 ₪ מתוך העודפים.</p>,
              solution: (
                <JournalEntry 
                  date="30.11.25"
                  description="העברה לקרן לחידוש ציוד מעודפים"
                  entries={[
                    { account: "עודפים", debit: 100000, isDebit: true },
                    { account: "קרן לחידוש ציוד", credit: 100000, isDebit: false }
                  ]}
                />
              )
            },
            {
              title: "שלב 5: הכרזה על דיבידנד (31.12.25)",
              content: <p>הוכרז דיבידנד בסך 85,000 ₪ שישולם בשנה הבאה (1.2.26). האם רושמים במזומן או כהתחייבות?</p>,
              solution: (
                <JournalEntry 
                  date="31.12.25"
                  description="הכרזה על דיבידנד שישולם בעתיד רושמים כהתחייבות (זכאים לדיבידנד)."
                  entries={[
                    { account: "עודפים", debit: 85000, isDebit: true },
                    { account: "זכאים לדיבידנד", credit: 85000, isDebit: false }
                  ]}
                />
              )
            },
            {
              title: "שלב 6: דוח על השינויים בהון העצמי",
              content: <p>בואו נרכז את כל הפעולות לדוח אחד מלא לשנת 2025.</p>,
              solution: (
                <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] shadow-sm">
                  <table className="accounting-table whitespace-nowrap min-w-full">
                    <thead className="bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
                      <tr>
                        <th className="text-right px-4 py-3">תיאור</th>
                        <th className="text-center px-4 py-3">הון רגילות</th>
                        <th className="text-center px-4 py-3">הון בכורה</th>
                        <th className="text-center px-4 py-3">פרמיה</th>
                        <th className="text-center px-4 py-3">קרן לחידוש ציוד</th>
                        <th className="text-center px-4 py-3">עודפים</th>
                        <th className="text-center px-4 py-3 text-[var(--color-primary)] font-bold">סך הון עצמי</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[var(--color-surface)] text-sm sm:text-base">
                      <tr>
                        <td className="px-4 py-3">יתרה ל- 31.12.24</td>
                        <td className="text-center px-4 py-3">500,000</td>
                        <td className="text-center px-4 py-3">200,000</td>
                        <td className="text-center px-4 py-3">300,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3">1,800,000</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">2,800,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">הנפקת מניות (נטו)</td>
                        <td className="text-center px-4 py-3 text-[var(--color-success)]">180,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-success)]">14,400</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">194,400</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">מניות הטבה (50%)</td>
                        <td className="text-center px-4 py-3 text-[var(--color-success)]">340,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-danger)]">(340,000)</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">-</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">הפסד נקי לשנה</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-danger)]">(800,000)</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-danger)]">(800,000)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">קרן לחידוש ציוד</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-success)]">100,000</td>
                        <td className="text-center px-4 py-3 text-[var(--color-danger)]">(100,000)</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-primary)]">-</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-t border-[var(--color-border)]/30">הכרזה על דיבידנד</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-text-secondary)]">-</td>
                        <td className="text-center px-4 py-3 text-[var(--color-danger)]">(85,000)</td>
                        <td className="text-center px-4 py-3 font-semibold text-[var(--color-danger)]">(85,000)</td>
                      </tr>
                      <tr className="bg-[var(--color-surface-raised)] border-t-2 border-[var(--color-border)]">
                        <td className="px-4 py-3 font-bold">יתרה ל- 31.12.25</td>
                        <td className="text-center px-4 py-3 font-bold">1,020,000</td>
                        <td className="text-center px-4 py-3 font-bold">200,000</td>
                        <td className="text-center px-4 py-3 font-bold">314,400</td>
                        <td className="text-center px-4 py-3 font-bold">100,000</td>
                        <td className="text-center px-4 py-3 font-bold">475,000</td>
                        <td className="text-center px-4 py-3 font-bold text-[var(--color-primary)]">2,109,400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            }
          ]}
        />
      </LessonBlock>
    </PageLayout>
  );
}
