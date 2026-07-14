import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { Flashcards } from '../ui/Flashcards';
import { MCQuestionCard } from '../ui/MCQuestionCard';
import { StepByStepExercise } from '../ui/StepByStepExercise';
import { JournalEntry } from '../ui/JournalEntry';
import { InsightBlock } from '../ui/FormulaBlock';
import { InlineMathToken } from '../ui/InlineMathToken';

export function EquityChapter() {
  return (
    <PageLayout>
      <PageHeader
        title="פרק 1: מרכיבי ההון העצמי"
        description="מהות ההון העצמי, מניות רגילות מול מניות בכורה, חלוקת דיבידנד, מניות הטבה, והדוח על השינויים בהון."
      />

      {/* ── 1. עקרונות יסוד ────────────────────────────────────── */}
      <LessonBlock title="מהות ההון העצמי" variant="definition">
        <p className="mb-4">
          ההון העצמי (<span className="font-semibold">Equity</span>) מייצג את זכויות הבעלים בנכסי החברה לאחר ניכוי כל
          התחייבויותיה. הוא נגזר מ<strong>משוואת המאזן</strong>:
        </p>
        <div className="my-4 flex justify-center">
          <div className="rounded-xl border border-[var(--color-accent-cobalt)]/40 bg-[var(--color-accent-cobalt-bg)] px-6 py-4 text-center">
            <InlineMathToken
              math={String.raw`\text{נכסים}\; (A) = \text{התחייבויות}\; (L) + \text{הון עצמי}\; (E)`}
            />
          </div>
        </div>
        <p className="mb-4">
          חברה יכולה לגייס הון במספר דרכים: <strong>הון מניות</strong> (הנפקת מניות לציבור), או <strong>הון שנוצר
          מפעילות</strong> (עודפים — רווחים שלא חולקו). ככל שהיחס בין חוב להון עצמי נמוך יותר, החברה נחשבת ליציבה
          יותר מבחינה פיננסית — אך גם עלולה לפספס הזדמנויות צמיחה שמימון בחוב היה מאפשר.
        </p>
        <InsightBlock>
          <p>
            <strong>💡 דרך לזכור:</strong> ההון העצמי הוא בעצם ה"כרית" של החברה. אם החברה תיסגר ותמכור את כל
            הנכסים כדי לשלם את כל החובות, מה שיישאר יחולק לבעלי ההון העצמי. זו הסיבה ש<strong>בעלי המניות</strong>{' '}
            נמצאים תמיד אחרונים בתור.
          </p>
        </InsightBlock>
      </LessonBlock>

      {/* ── 2. סוגי מניות ────────────────────────────────────── */}
      <LessonBlock title="סוגי מניות ופרמיה" variant="formal">
        <p className="mb-4">
          <strong>הון מניות רגילות (Common Stock):</strong> הבעלים האמיתיים של החברה. מקנה זכות הצבעה באסיפה
          הכללית, זכות לרווחים (דיבידנד) וזכות שיורית לנכסי החברה בפירוק.
        </p>
        <p className="mb-4">
          <strong>הון מניות בכורה (Preferred Stock):</strong> סוג של יצור כלאיים בין הלוואה להון. אין זכות הצבעה,
          אך יש <strong>קדימות</strong> בקבלת דיבידנד ובפירוק. הדיבידנד לרוב <strong>קבוע מראש</strong>, ולכן המניה
          דומה יותר לאג"ח מאשר למניה רגילה.
        </p>
        <p className="mb-4">
          <strong>פרמיה (Premium):</strong> הסכום העודף שהתקבל בהנפקה <strong>מעל לערך הנקוב</strong> של המניה.
          הערך הנקוב (ע.נ) הוא הסכום הנומינלי שנקבע מראש; הפרמיה היא מה שמשקיעים מוכנים לשלם <em>מעבר לכך</em>.
          הפרמיה מופרדת מהע.נ ונרשמת בסעיף <strong>"פרמיה"</strong> בהון העצמי.
        </p>
        <p>
          <strong>עודפים (Retained Earnings):</strong> רווחי החברה ש<strong>לא חולקו</strong> כדיבידנד. בכל פעם
          שהחברה מסיימת שנה ברווח, הרווח הנקי "נופל" לעודפים; בכל פעם שמחולק דיבידנד — העודפים יורדים.
        </p>
      </LessonBlock>

      {/* ── 3. פעולות בהון העצמי ──────────────────────────────── */}
      <LessonBlock title="פעולות בהון העצמי" variant="casual">
        <p className="mb-4">
          <strong>הנפקת מניות:</strong> כאשר חברה מנפיקה מניות מעל הערך הנקוב, הערך הנקוב נרשם בסעיף "הון מניות"
          וההפרש נרשם בסעיף "פרמיה".
        </p>
        <p className="mb-4">
          <strong>מניות הטבה (Bonus Shares):</strong> חלוקת מניות חינם לבעלי המניות הקיימים. זוהי בעצם העברת סכומים
          מסעיפי הון אחרים (כמו עודפים או פרמיה) לסעיף הון המניות.{' '}
          <strong className="text-[var(--color-primary)]">אין שינוי בסך ההון העצמי.</strong>
        </p>
        <p className="mb-4">
          <strong>דיבידנד (Dividend):</strong> חלוקת רווחי החברה לבעלי מניותיה.{' '}
          <strong className="text-[var(--color-error)]">מקטין</strong> את סעיף ה"עודפים" ואת סך ההון העצמי.
          הכרזה על דיבידנד יוצרת התחייבות מיידית (זכאים לדיבידנד), גם אם התשלום בפועל יתבצע רק בשנה הבאה.
        </p>
        <p>
          <strong>קרנות (Reserves):</strong> העברות מהעודפים לסעיפי הון ייעודיים (למשל: קרן לחידוש ציוד, קרן למחקר
          ופיתוח). גם כאן סך ההון העצמי לא משתנה — רק ה<em>הרכב</em> שלו.
        </p>
      </LessonBlock>

      {/* ── 4. ה-MCQ הראשון — מלכודת ע.נ vs פרמיה ─────────────── */}
      <div className="mb-12">
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-6 pb-2 border-b-2 border-[var(--color-surface-raised)] inline-block">
          בחן את עצמך
        </h2>
        <MCQuestionCard
          id="eq-q1"
          prompt="חברה הנפיקה 1,000 מניות בע.נ של 5 ₪ תמורת 7,000 ₪. כיצד יחולק הסכום בהון העצמי?"
          options={[
            {
              label: 'א',
              text: 'הון מניות — 7,000; פרמיה — 0',
            },
            {
              label: 'ב',
              text: 'הון מניות — 5,000 (1,000 × 5); פרמיה — 2,000',
              correct: true,
            },
            {
              label: 'ג',
              text: 'הון מניות — 2,000; פרמיה — 5,000',
            },
            {
              label: 'ד',
              text: 'כל הסכום נרשם כעודפים',
            },
          ]}
          rationale={
            <>
              הערך הנקוב נרשם תמיד בסעיף <strong>"הון מניות"</strong> = 1,000 × 5 = 5,000. ההפרש בין התמורה
              הכוללת לע.נ נרשם בסעיף <strong>"פרמיה"</strong>. כאן: 7,000 − 5,000 = 2,000. שים לב — חילוף בין
              הסעיפים הוא מלכודת קלאסית.
            </>
          }
        />
      </div>

      {/* ── 5. תרגיל מודרך ────────────────────────────────────── */}
      <LessonBlock title="תרגיל מודרך: חברת דלתון (הנפקה + הטבה + דיבידנד)">
        <StepByStepExercise
          questionTitle="נתוני השאלה"
          questionContent={
            <>
              <p>
                חברת <strong>"דלתון"</strong> הוקמה ב-1.7.25. ביום ההקמה הנפיקה 5,000 מניות רגילות בעלות ע.נ של
                10 ₪ למניה, תמורת 70,000 ₪.
              </p>
              <p>במהלך שנת 2025 הרוויחה החברה 40,000 ₪.</p>
              <p>
                ב-31.12.25 החליטה החברה:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>לחלק מניות הטבה בשיעור 20% מתוך הפרמיה.</li>
                <li>להכריז על דיבידנד בסך 15,000 ₪ במזומן.</li>
              </ul>
              <p className="mt-3">
                <strong>נדרש:</strong> רשמו את פקודות היומן לשנת 2025.
              </p>
            </>
          }
          steps={[
            {
              title: 'שלב 1: זיהוי הרכב התמורה מההנפקה',
              content: (
                <p>
                  לפני שרושמים פקודת יומן, עלינו לחשב כמה מהתמורה שייך לע.נ וכמה לפרמיה. תזכורת:{' '}
                  <InlineMathToken
                    math={String.raw`\text{פרמיה} = \text{תמורה כוללת} - \text{ע}."\text{נ מוכפל במספר מניות}`}
                  />
                </p>
              ),
              solution: (
                <div className="bg-[var(--color-surface-alt)] p-4 rounded-lg text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>הון מניות (5,000 × 10):</span>
                    <span className="font-bold">50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>פרמיה (70,000 − 50,000):</span>
                    <span className="font-bold">20,000</span>
                  </div>
                </div>
              ),
            },
            {
              title: 'שלב 2: פקודת יומן להנפקה + סגירת רווח',
              content: <p>כעת נרשום את שתי הפקודות: הנפקה (1.7.25) וסגירת הרווח הנקי (31.12.25).</p>,
              solution: (
                <div className="space-y-4">
                  <JournalEntry
                    date="1.7.25"
                    description="הנפקת מניות רגילות מעל ע.נ"
                    entries={[
                      { account: 'מזומן', debit: 70000, isDebit: true },
                      {
                        account: 'הון מניות רגילות (5,000 × 10)',
                        credit: 50000,
                        isDebit: false,
                      },
                      { account: 'פרמיה', credit: 20000, isDebit: false },
                    ]}
                  />
                  <JournalEntry
                    date="31.12.25"
                    description="סגירת רווח נקי"
                    entries={[
                      { account: "דו''ח רווח והפסד", debit: 40000, isDebit: true },
                      { account: 'עודפים', credit: 40000, isDebit: false },
                    ]}
                  />
                </div>
              ),
            },
            {
              title: 'שלב 3: מניות הטבה — 20% מהפרמיה',
              content: (
                <p>
                  שים לב: מניות הטבה {<strong>לא משנות</strong>} את סך ההון העצמי. הן רק מעבירות סכום מסעיף
                  "פרמיה" לסעיף "הון מניות".
                </p>
              ),
              solution: (
                <JournalEntry
                  date="31.12.25"
                  description="מניות הטבה — 20% מתוך 20,000 הפרמיה"
                  entries={[
                    { account: 'פרמיה', debit: 4000, isDebit: true },
                    { account: 'הון מניות רגילות', credit: 4000, isDebit: false },
                  ]}
                />
              ),
            },
            {
              title: 'שלב 4: דיבידנד — הפעם מקטין את ההון!',
              content: (
                <p>
                  דיבידנד שמוכרז ומשולם במזומן <strong>מקטין</strong> את ההון העצמי. חשבון העודפים הוא הראשון
                  שיורד.
                </p>
              ),
              solution: (
                <JournalEntry
                  date="31.12.25"
                  description="דיבידנד במזומן לבעלי מניות"
                  entries={[
                    { account: 'עודפים', debit: 15000, isDebit: true },
                    { account: 'מזומן', credit: 15000, isDebit: false },
                  ]}
                />
              ),
            },
          ]}
        />
      </LessonBlock>

      {/* ── 6. MCQ שני — מלכודת מניות הטבה ─────────────────────── */}
      <div className="mb-12">
        <MCQuestionCard
          id="eq-q2"
          prompt="חברה חילקה מניות הטבה בשיעור 50% על בסיס 100,000 ₪ הון עצמי. בכמה עלה סך ההון העצמי כתוצאה מההטבה?"
          options={[
            {
              label: 'א',
              text: 'עלה ב-50,000 ₪ (50% מ-100,000)',
            },
            {
              label: 'ב',
              text: 'עלה ב-100,000 ₪',
            },
            {
              label: 'ג',
              text: 'לא השתנה כלל',
              correct: true,
            },
            {
              label: 'ד',
              text: 'ירד ב-50,000 ₪',
            },
          ]}
          rationale={
            <>
              מניות הטבה הן <strong>חלוקה מחדש</strong> של סעיפים בתוך ההון העצמי בלבד — למשל, מעבר מ
              <strong>עודפים</strong> או <strong>פרמיה</strong> אל <strong>הון מניות</strong>. סך ההון העצמי
              נשאר זהה. זו מלכודת קלאסית במבחנים.
            </>
          }
        />
      </div>

      {/* ── 7. בנק מושגים ─────────────────────────────────────── */}
      <div className="mt-12">
        <Flashcards
          title="בחן את עצמך: מושגי יסוד"
          cards={[
            {
              front: 'מה ההבדל העיקרי בין מניות רגילות למניות בכורה?',
              back: 'למניות רגילות יש זכות הצבעה, בעוד שלמניות בכורה בדרך כלל אין. מנגד, למניות בכורה יש קדימות בחלוקת דיבידנד ובפירוק החברה.',
            },
            {
              front: 'האם חלוקת מניות הטבה משנה את סך ההון העצמי?',
              back: 'לא. מניות הטבה הן רק "העברה מכיס לכיס" בתוך ההון העצמי (למשל, מפרמיה להון מניות). סך כל ההון העצמי נשאר זהה.',
            },
            {
              front: 'מהי פרמיה?',
              back: 'הפרש חיובי בין התמורה שהתקבלה בהנפקת המניות לבין הערך הנקוב (ע.נ) שלהן.',
            },
            {
              front: 'מהו "עודפים" (Retained Earnings)?',
              back: 'רווחי החברה שלא חולקו כדיבידנד. גדל בכל שנה בה החברה מרוויחה, וקטן בכל חלוקת דיבידנד או העברה לקרן.',
            },
            {
              front: 'היכן נרשם דיבידנד שהוכרז אך עדיין לא שולם?',
              back: 'הכרזה על דיבידנד יוצרת מיידית התחייבות שוטפת בסעיף "זכאים לדיבידנד" או "דיבידנד לשלם" — ללא קשר למועד התשלום בפועל.',
            },
          ]}
        />
      </div>
    </PageLayout>
  );
}
