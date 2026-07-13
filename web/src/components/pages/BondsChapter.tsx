import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { StepByStepExercise } from '../ui/StepByStepExercise';
import { JournalEntry } from '../ui/JournalEntry';
import { AmortizationTable } from '../ui/AmortizationTable';
import { InlineMathToken } from '../ui/InlineMathToken';

export function BondsChapter() {
  return (
    <PageLayout>
      <PageHeader 
        title="פרק 4: איגרות חוב (אג״ח)" 
        description="הנפקת איגרות חוב בפרמיה או בניכיון, והפחתה בשיטת הקו הישר."
      />

      <LessonBlock title="1. מהות איגרות החוב">
        <p>
          איגרת חוב היא תעודת התחייבות שחברה (או ממשלה) מנפיקה לציבור במטרה לגייס הון. 
          רוכש האג"ח בעצם נותן הלוואה לחברה. בתמורה, החברה מתחייבת להחזיר את הקרן במועד שנקבע 
          ולשלם ריבית תקופתית (ריבית נקובה).
        </p>
        <div className="my-4 p-4 bg-[var(--color-surface-alt)] rounded-lg">
          <p>
            <strong>הנפקה בפרמיה:</strong> כאשר ריבית השוק <strong>נמוכה</strong> מהריבית הנקובה של האג"ח, 
            המשקיעים יהיו מוכנים לשלם יותר עבור האג"ח. התמורה שתתקבל תהיה גבוהה מהערך הנקוב.
          </p>
          <p className="mt-2">
            <strong>הנפקה בניכיון:</strong> כאשר ריבית השוק <strong>גבוהה</strong> מהריבית הנקובה, 
            האג"ח פחות אטרקטיבית ולכן תימכר בפחות מהערך הנקוב שלה.
          </p>
        </div>
        <p>
          <strong>הפחתה בשיטת הקו הישר:</strong> הפרמיה או הניכיון מופחתים בסכומים שווים על פני תקופת חיי האג"ח. 
          הפחתת פרמיה מקטינה את הוצאות המימון (כי קיבלנו "בונוס" בהתחלה), ואילו הפחתת ניכיון מגדילה את הוצאות המימון.
        </p>
      </LessonBlock>

      <LessonBlock title="לוח סילוקין בשיטת הקו הישר - דוגמה">
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          נניח אג"ח ע.נ 500,000, שהונפקה בתמורה ל-530,000. ריבית 5% המשולמת שנתית (25,000 ש"ח מזומן לשנה). האג"ח ל-10 שנים. 
          הפרמיה 30,000 תופחת בקו ישר (3,000 בשנה), מה שיקטין את הוצאות המימון מ-25,000 ל-22,000 בשנה.
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

      <LessonBlock title="תרגיל מודרך 1: חברת שניר">
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
                כמו כן, ב-1.1.25 לקחה הלוואה בסך 200,000 ₪, שתיפרע ב-1.1.32. ריבית ההלוואה: 8% (משולמת חצי שנתית ב-30.6 וב-1.1).
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
              title: "שלב 1: פקודות יומן ביום ההנפקה (1.1.25)",
              content: <p>כיצד נרשום את קבלת המזומן משתי ההתחייבויות (אג"ח והלוואה)?</p>,
              solution: (
                <div className="space-y-4">
                  <JournalEntry 
                    date="1.1.25"
                    description="הנפקת האג״ח בפרמיה (530,000 התקבל עבור 500,000 ע.נ)"
                    entries={[
                      { account: "מזומן", debit: 530000, isDebit: true },
                      { account: "אג״ח לשלם (קרן)", credit: 500000, isDebit: false },
                      { account: "פרמיה על אג״ח", credit: 30000, isDebit: false }
                    ]}
                  />
                  <JournalEntry 
                    date="1.1.25"
                    description="קבלת הלוואה לזמן ארוך"
                    entries={[
                      { account: "מזומן", debit: 200000, isDebit: true },
                      { account: "הלוואה לזמן ארוך", credit: 200000, isDebit: false }
                    ]}
                  />
                </div>
              )
            },
            {
              title: "שלב 2: ריבית במזומן והוצאות מימון (2025)",
              content: <p>עלינו להבחין בין מזומן ששולם לבין ההוצאה החשבונאית שנרשמת בדוח רווח והפסד (על בסיס מצטבר).</p>,
              solution: (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 space-y-4">
                  <h4 className="font-bold text-[var(--color-primary)] border-b border-[var(--color-border)] pb-2">אג״ח</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>ריבית במזומן לאג״ח:</strong> <InlineMathToken math={String.raw`500{,}000 \times 5\% = 25{,}000`} /> ₪ (משולמת ב-31.12.25).</li>
                    <li><strong>הפחתת פרמיה:</strong> 30,000 ₪ חלקי 10 שנים = 3,000 ₪ לשנה. הפחתה <span className="text-[var(--color-success)] font-bold">מקטינה</span> את הוצאות הריבית.</li>
                    <li><strong>הוצאות מימון אג״ח:</strong> 25,000 - 3,000 = <span className="font-bold text-[var(--color-primary)]">22,000 ₪</span>.</li>
                  </ul>
                  
                  <h4 className="font-bold text-[var(--color-primary)] border-b border-[var(--color-border)] pb-2 mt-4">הלוואה</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>ריבית במזומן (2025):</strong> ב-30.6.25 משלמים על חצי שנה (<InlineMathToken math={String.raw`200{,}000 \times 8\% \times \frac{6}{12} = 8{,}000`} />). התשלום הבא ב-1.1.26 לא נכלל ב-2025.</li>
                    <li><strong>הוצאות מימון (2025):</strong> נצברת ריבית לשנה שלמה = <InlineMathToken math={String.raw`200{,}000 \times 8\% = 16{,}000`} /> ₪.</li>
                  </ul>
                </div>
              )
            },
            {
              title: "שלב 3: טענות החשב",
              content: <p>האם התקבלה פרמיה בגלל שריבית השוק הייתה גבוהה מ-5%? והאם הפחתת פרמיה מגדילה הוצאות?</p>,
              solution: (
                <div className="space-y-4">
                  <div className="bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 rounded-lg p-4">
                    <p className="font-bold text-[var(--color-danger)] mb-1">טענה א' - שגויה</p>
                    <p className="text-sm">משקיעים משלמים פרמיה (יותר מערך האג"ח) כי ריבית האג"ח <strong>אטרקטיבית</strong> לעומת השוק, כלומר ריבית השוק <strong>נמוכה</strong> מ-5% ולא גבוהה ממנה.</p>
                  </div>
                  <div className="bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 rounded-lg p-4">
                    <p className="font-bold text-[var(--color-danger)] mb-1">טענה ב' - שגויה</p>
                    <p className="text-sm">הפחתת פרמיה <strong>מקטינה</strong> את הוצאות המימון (קיבלנו כסף אקסטרה בהתחלה ש"מסבסד" לנו את הריבית שאנו משלמים).</p>
                  </div>
                </div>
              )
            }
          ]}
        />
      </LessonBlock>
      
      <LessonBlock title="תרגיל מודרך 2: חברת דלל">
        <StepByStepExercise 
          questionTitle="נתוני השאלה"
          questionContent={
            <>
              <p>בתאריך 1.7.22 הנפיקה חברת "דלל" 5,000,000 ע.נ. אג"ח לחמש שנים, הנושאות ריבית נקובה בגובה 10%, אשר משולמת כל חצי שנה, בכל 1.1 ו-1.7.</p>
              <p className="mt-2">התמורה בהנפקה – 5.5 מיליוני ש"ח. ניכיון/פרמיה מופחתים בשיטת הקו הישר.</p>
              <p className="mt-4 font-bold">נדרש:</p>
              <p>הציגו הצגה מקובלת של כל היתרות הרלוונטיות לאג"ח במאזן החברה ליום 31.12.2024.</p>
            </>
          }
          steps={[
            {
              title: "שלב 1: חישוב יתרת פרמיה בסוף 2024",
              content: <p>כדי לדעת כמה פרמיה להציג במאזן ל-31.12.24, עלינו לחשב כמה הופחתה מאז ההנפקה (1.7.22).</p>,
              solution: (
                <div className="text-sm space-y-2 bg-[var(--color-surface-alt)] p-4 rounded-lg">
                  <p><strong>פרמיה מקורית:</strong> 5,500,000 - 5,000,000 = 500,000 ₪</p>
                  <p><strong>הפחתה שנתית:</strong> 500,000 / 5 שנים = 100,000 ₪ לשנה</p>
                  <p><strong>זמן שעבר:</strong> מ-1.7.22 עד 31.12.24 הם בדיוק 2.5 שנים.</p>
                  <p><strong>סך הפחתה:</strong> 2.5 × 100,000 = 250,000 ₪</p>
                  <p className="font-bold border-t border-[var(--color-border)] pt-2 mt-2">
                    יתרת פרמיה במאזן: 500,000 - 250,000 = 250,000 ₪.
                  </p>
                </div>
              )
            },
            {
              title: "שלב 2: התחייבויות שוטפות (ריבית לשלם)",
              content: <p>ב-31.12.24 החברה חייבת ריבית על חצי השנה האחרונה, שתשולם רק למחרת ב-1.1.25.</p>,
              solution: (
                <div className="text-sm space-y-2 bg-[var(--color-surface-alt)] p-4 rounded-lg">
                  <p><strong>ריבית לחצי שנה:</strong> <InlineMathToken math={String.raw`5{,}000{,}000 \times 10\% \times \frac{6}{12} = 250{,}000`} /> ₪</p>
                  <p>סכום זה יוצג כ"ריבית לשלם" בהתחייבויות שוטפות.</p>
                </div>
              )
            },
            {
              title: "שלב 3: הצגת המאזן השלם",
              content: <p>הרכבת המאזן ליום 31.12.24 על בסיס הנתונים שחישבנו.</p>,
              solution: (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
                  <h4 className="font-bold text-[var(--color-text)] mb-4 border-b border-[var(--color-border)] pb-2 text-xl text-center">
                    מאזן ליום 31.12.2024
                  </h4>
                  <div className="grid grid-cols-2 gap-8 text-sm">
                    <div>
                      <h5 className="font-bold text-[var(--color-primary)] mb-2">התחייבויות שוטפות</h5>
                      <div className="flex justify-between border-b border-[var(--color-border)]/50 pb-1 mb-4">
                        <span>ריבית לשלם:</span>
                        <span className="font-bold">250,000</span>
                      </div>
                      
                      <h5 className="font-bold text-[var(--color-primary)] mb-2 mt-6">התחייבויות לזמן ארוך</h5>
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
              )
            }
          ]}
        />
      </LessonBlock>
    </PageLayout>
  );
}
