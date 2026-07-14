import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { ExerciseStep } from '../ui/ExerciseStep';
import { JournalEntryTable } from '../ui/JournalEntryTable';
import { InlineMathToken } from '../ui/InlineMathToken';
import { MCQuestionCard } from '../ui/MCQuestionCard';
import { InsightBlock, AlertBlock } from '../ui/FormulaBlock';

export function LoansChapter() {
  return (
    <PageLayout>
      <PageHeader
        title="פרק 3: התחייבויות לטווח ארוך (הלוואות)"
        description="הלוואות בנקאיות, חישוב הוצאות ריבית נצברת (חתך ריבית), והצגה נאותה במאזן כולל סיווג לחלויות שוטפות."
      />

      <LessonBlock title="1. מהות ההלוואות וחתך ריבית" variant="definition">
        <p>
          התחייבויות לטווח ארוך הן התחייבויות שמועד פירעונן עולה על שנה מיום המאזן. כאשר חברה לוקחת
          הלוואה מהבנק, היא מקבלת מזומן ויוצרת התחייבות (קרן ההלוואה). בנוסף, ההלוואה נושאת ריבית שמהווה
          הוצאת מימון.
        </p>
        <InsightBlock>
          <p>
            <strong>💡 עיקרון הצבירה (Accrual):</strong> בחשבונאות, הוצאות ריבית נרשמות{' '}
            <strong>במהלך התקופה שבה הכסף שימש את החברה</strong>, ללא קשר למועד התשלום בפועל במזומן. זה
            שונה מהוצאות במזומן (Cash basis): רישום במזומן מתבצע רק כשהמזומן עובר. בצבירה, אנחנו{' '}
            <em>מקטעים</em> את השנה — מחלקים אותה לחלקים שבהם ההלוואה הייתה פעילה — ורושמים את הריבית
            המתאימה לחלק זה, גם אם לא שילמנו.
          </p>
        </InsightBlock>
      </LessonBlock>

      <LessonBlock title="2. חלויות שוטפות — סיווג מחדש במאזן" variant="formal">
        <p>
          <strong>חתך ריבית:</strong> עקרון ההקבלה והבסיס המצטבר בחשבונאות מחייבים אותנו לרשום הוצאות ריבית על
          פני התקופה שבה הכסף שימש את החברה, ללא קשר למועד התשלום בפועל במזומן. אם חברה משלמת ריבית פעם
          בשנה ב-1 ביולי, הרי שביום המאזן (31.12) החברה חייבת לרשום "הוצאות ריבית" על החציון שהסתיים
          (1.7 עד 31.12) וליצור התחייבות שוטפת שנקראת "ריבית לשלם".
        </p>
        <p>
          <strong>חלויות שוטפות של הלוואות לזמן ארוך:</strong> כאשר מועד פירעון ההלוואה (או חלק ממנה) מגיע
          להיות פחות משנה מיום המאזן, יש להעביר את הסכום שצפוי להיות משולם בשנה הקרובה מהסעיף
          "התחייבויות לזמן ארוך" לסעיף "התחייבויות שוטפות".
        </p>
        <AlertBlock>
          <p>
            <strong>⚠️ מלכודת קלאסית — סיווג נכון ב-31.12:</strong> תלמידים רבים שוכחים להעביר את קרן ההלוואה
            מ"התחייבויות לזמן ארוך" ל"חלויות שוטפות" כשנותרה פחות משנה לפירעון. ההלוואה לא נעלמה —
            היא פשוט עברה קטגוריה. סעיף "התחייבויות לזמן ארוך" חייב להראות <strong>0</strong> בשנה האחרונה לפני
            הפירעון.
          </p>
        </AlertBlock>
      </LessonBlock>

      <LessonBlock title="תרגיל מודרך 1: חברת חגים">
        <ExerciseStep
          title="תרגיל בהלוואות - שאלה 1"
          question={`חברת "חגים" העוסקת בייצור מוצרי קוסמטיקה הוקמה ב - 1.7.2018.
במועד הקמתה נטלה הלוואה מהבנק בסכום של 200,000 ₪.

ההלוואה תפרע בהחזר חד פעמי ב- 1.7.2021 והיא נושאת ריבית פשוטה של 5% שתשולם מדי שנה החל מה - 1.7.2019.

נדרש:
1. רשמו פקודות יומן בדבר ההלוואה של חברת "חגים" בע"מ לשנים 2018-2021.
2. הציגו את הסעיפים הקשורים בהלוואה כפי שיופיעו במאזן ובדו"ח רווח והפסד של חברת "חגים" בע"מ לשנים 2018- 2021.`}
        >
          <div className="space-y-10">
            {/* 2018 */}
            <div className="border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4 border-b border-[var(--color-primary)]/20 pb-2">
                שנת 2018
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                ההלוואה נלקחה ב-1.7.18. ב-31.12.18 יש לרשום הוצאות ריבית על חצי שנה (
                <InlineMathToken math={String.raw`200{,}000 \times 5\% \times \frac{6}{12} = 5{,}000`} />
                ).
              </p>
              <InsightBlock>
                <p>
                  <strong>💡 למה חצי שנה?</strong> ההלוואה נלקחה ב-1.7.18 — רק באמצע השנה. עקרון הצבירה
                  אומר שאנחנו רושמים ריבית רק עבור החלק שבו החברה באמת השתמשה בכסף: 6 חודשים מתוך 12.
                </p>
              </InsightBlock>

              <div className="space-y-4 mb-6 mt-4">
                <JournalEntryTable
                  date="1.7.18"
                  description="קבלת ההלוואה"
                  lines={[
                    { account: 'מזומן', debit: 200000, isDebit: true },
                    { account: 'הלוואה לזמן ארוך', credit: 200000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="31.12.18"
                  description="חתך ריבית (הוצאות נצברות לחצי שנה)"
                  lines={[
                    { account: 'הוצאות ריבית', debit: 5000, isDebit: true },
                    { account: 'ריבית לשלם (התחייבות שוטפת)', credit: 5000, isDebit: false },
                  ]}
                />
              </div>

              <div className="bg-[var(--color-surface)] border border-[var(--color-surface-raised)] rounded-lg p-4">
                <h4 className="font-bold text-[var(--color-text-primary)] mb-2">הצגה בדוחות הכספיים ליום 31.12.18</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">מאזן</h5>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold">התחייבויות שוטפות:</span> ריבית לשלם - 5,000
                      </li>
                      <li>
                        <span className="font-semibold">התחייבויות לזמן ארוך:</span> הלוואה - 200,000
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">דוח רווח והפסד</h5>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold">הוצאות מימון (ריבית):</span> 5,000
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 2019 */}
            <div className="border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4 border-b border-[var(--color-primary)]/20 pb-2">
                שנת 2019
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                ב-1.7.19 משלמים ריבית עבור שנה שלמה (10,000). מחציתה (5,000) היא סגירת ההתחייבות משנת
                2018, ומחציתה הוצאה על חציון ראשון של 2019. ב-31.12.19 שוב עושים חתך ריבית על חציון שני.
              </p>

              <div className="space-y-4 mb-6">
                <JournalEntryTable
                  date="1.7.19"
                  description="תשלום ריבית שנתית במזומן"
                  lines={[
                    { account: 'ריבית לשלם (סגירת התחייבות 2018)', debit: 5000, isDebit: true },
                    { account: 'הוצאות ריבית (עבור 1-6/19)', debit: 5000, isDebit: true },
                    { account: 'מזומן', credit: 10000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="31.12.19"
                  description="חתך ריבית (הוצאות נצברות עבור 7-12/19)"
                  lines={[
                    { account: 'הוצאות ריבית', debit: 5000, isDebit: true },
                    { account: 'ריבית לשלם', credit: 5000, isDebit: false },
                  ]}
                />
              </div>

              <div className="bg-[var(--color-surface)] border border-[var(--color-surface-raised)] rounded-lg p-4">
                <h4 className="font-bold text-[var(--color-text-primary)] mb-2">הצגה בדוחות הכספיים ליום 31.12.19</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">מאזן</h5>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold">התחייבויות שוטפות:</span> ריבית לשלם - 5,000
                      </li>
                      <li>
                        <span className="font-semibold">התחייבויות לזמן ארוך:</span> הלוואה - 200,000
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">דוח רווח והפסד</h5>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold">הוצאות מימון (ריבית):</span> 10,000
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 2020 */}
            <div className="border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[var(--color-warning)] text-[var(--color-background)] text-xs font-bold px-3 py-1 rounded-bl-lg">
                שים לב לשינוי סיווג במאזן!
              </div>
              <h3 className="text-xl font-bold text-[var(--color-warning)] mb-4 border-b border-[var(--color-warning)]/20 pb-2">
                שנת 2020
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                ב-31.12.20, פירעון ההלוואה (1.7.21) קרוב משנה. לכן, כל קרן ההלוואה עוברת לסעיף התחייבויות
                שוטפות ("חלויות שוטפות").
              </p>

              <div className="space-y-4 mb-6">
                <JournalEntryTable
                  date="1.7.20"
                  description="תשלום ריבית שנתית"
                  lines={[
                    { account: 'ריבית לשלם', debit: 5000, isDebit: true },
                    { account: 'הוצאות ריבית', debit: 5000, isDebit: true },
                    { account: 'מזומן', credit: 10000, isDebit: false },
                  ]}
                />
                <JournalEntryTable
                  date="31.12.20"
                  description="חתך ריבית ומיון מחדש של ההלוואה (חלויות שוטפות)"
                  lines={[
                    { account: 'הוצאות ריבית', debit: 5000, isDebit: true },
                    { account: 'ריבית לשלם', credit: 5000, isDebit: false },
                    { account: 'הלוואה לזמן ארוך', debit: 200000, isDebit: true },
                    { account: 'חלויות שוטפות של הלוואות לז.א', credit: 200000, isDebit: false },
                  ]}
                />
              </div>

              <div className="bg-[var(--color-surface)] border border-[var(--color-surface-raised)] rounded-lg p-4">
                <h4 className="font-bold text-[var(--color-text-primary)] mb-2">הצגה בדוחות הכספיים ליום 31.12.20</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">מאזן</h5>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold text-[var(--color-warning)]">התחייבויות שוטפות:</span>
                      </li>
                      <li className="pr-4">- חלויות שוטפות של הלוואות: 200,000</li>
                      <li className="pr-4">- ריבית לשלם: 5,000</li>
                      <li className="mt-2 text-[var(--color-error)]">התחייבויות לזמן ארוך: 0 (אין)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">דוח רווח והפסד</h5>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold">הוצאות מימון (ריבית):</span> 10,000
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 2021 */}
            <div className="border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4 border-b border-[var(--color-primary)]/20 pb-2">
                שנת 2021
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                ב-1.7.21, משלמים את הקרן יחד עם הריבית האחרונה, וההלוואה נפרעת במלואה.
              </p>

              <div className="space-y-4 mb-6">
                <JournalEntryTable
                  date="1.7.21"
                  description="פירעון ההלוואה ותשלום ריבית אחרונה"
                  lines={[
                    { account: 'חלויות שוטפות של הלוואות לז.א', debit: 200000, isDebit: true },
                    { account: 'ריבית לשלם (של 2020)', debit: 5000, isDebit: true },
                    { account: 'הוצאות ריבית (עבור 1-6/21)', debit: 5000, isDebit: true },
                    { account: 'מזומן (סך הכל שולם 210,000)', credit: 210000, isDebit: false },
                  ]}
                />
              </div>

              <div className="bg-[var(--color-surface)] border border-[var(--color-surface-raised)] rounded-lg p-4">
                <h4 className="font-bold text-[var(--color-text-primary)] mb-2">הצגה בדוחות הכספיים ליום 31.12.21</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">מאזן</h5>
                    <ul className="space-y-1">
                      <li className="text-[var(--color-success)]">אין יתרות הלוואה או ריבית.</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--color-text-secondary)] mb-1">דוח רווח והפסד</h5>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold">הוצאות מימון (ריבית):</span> 5,000
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ExerciseStep>
      </LessonBlock>

      {/* ── MCQ — סיווג נכון של קרן הלוואה בשנה האחרונה ───────────── */}
      <div className="mb-12">
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-6 pb-2 border-b-2 border-[var(--color-surface-raised)] inline-block">
          בחן את עצמך
        </h2>
        <MCQuestionCard
          id="loan-q1"
          prompt='חברה נטלה ב-1.1.21 הלוואה של 100,000 ₪ ל-4 שנים בריבית 6% המשולמת ב-31.12 כל שנה. כיצד תוצג ההלוואה במאזן ליום 31.12.23 (כשנה לפני הפירעון)?'
          options={[
            {
              label: 'א',
              text: 'בעמודה "התחייבויות לזמן ארוך" — 100,000 ₪',
            },
            {
              label: 'ב',
              text: 'בעמודה "חלויות שוטפות של הלוואות" — 100,000 ₪, וב"התחייבויות לזמן ארוך" — 0',
              correct: true,
            },
            {
              label: 'ג',
              text: 'מחוץ למאזן (כבר לא רלוונטית)',
            },
            {
              label: 'ד',
              text: 'כהכנסה עתידית — ממתינה לפירעון',
            },
          ]}
          rationale={
            <>
              ב-31.12.23 הפירעון (1.1.25) הוא פחות משנה, ולכן כל הקרן עוברת לסעיף
              <strong> "חלויות שוטפות של הלוואות"</strong>. ההתחייבות לא נעלמה — רק עברה קטגוריה. זה חוק
              שמבטיח שהמאזן יציג תמונה מציאותית של מה שהחברה חייבת לשלם <em>בשנה הקרובה</em>.
            </>
          }
        />
      </div>
    </PageLayout>
  );
}
