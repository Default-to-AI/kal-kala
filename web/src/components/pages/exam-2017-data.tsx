/**
 * Data for the 2017 Moed B accounting exam (semester B, 13.7.2017, lecturer Adi Reinhold).
 *
 * Source: `web/docs/chapter-materials/exams/11-accounting-b-exam-2017-13-7.docx`
 *
 * Organized per question. Q1 has the full balance sheet and footnotes.
 * Q2-Q4 have their event lists (text). Phase 2 will add the solutions.
 */

import type { ReactNode } from 'react';
import type { BalanceSheetSection } from '../ui/BalanceSheetTable';
import type { CashFlowSection } from '../ui/CashFlowStatement';

// ─── Q1 — Cash flow + financial analysis (33%) ──────────────────────────

export const Q1_BALANCE_SHEET_SECTIONS: BalanceSheetSection[] = [
  {
    title: 'נכסים',
    rows: [
      { label: 'מזומנים ושווי מזומנים', current: 29_000, prior: 57_000 },
      { label: 'לקוחות', current: 75_000, prior: 63_000 },
      { label: 'חייבים', current: 89_000, prior: 80_000, note: '2' },
      { label: 'השקעה ב"שלווה"', current: 171_400, prior: 145_000, note: '1' },
      { label: 'רהוט - עלות', current: 104_000, prior: 92_000, note: '2' },
      {
        label: 'רהוט - פחת שנצבר',
        current: -56_000,
        prior: -45_000,
        note: '2',
      },
    ],
  },
  {
    title: 'התחייבויות והון עצמי',
    rows: [
      { label: 'הוצאות לשלם', current: 27_000, prior: 41_000 },
      { label: 'זכאים', current: 28_000, prior: 13_000 },
      { label: 'דיבידנד לשלם', current: 12_000, prior: 4_000, note: '5' },
      { label: 'הלוואות לזמן ארוך', current: 151_000, prior: 131_000, note: '3' },
      { label: 'הון מניות רגילות נפרע', current: 80_000, prior: 50_000, note: '4' },
      { label: 'קרן הון - פרמיה', current: 40_000, prior: 10_000, note: '4' },
      { label: 'עודפים - יתרת רווח', current: 74_400, prior: 143_000, note: '5' },
    ],
  },
];

export const Q1_FOOTNOTES: { n: string; body: ReactNode }[] = [
  {
    n: '1',
    body: (
      <>
        ב-31.12.2016 רכשה החברה 30% ממניות חברת "שלווה" בע"מ תמורת 145,000 ₪. כתוצאה מהרכישה
        נוצר הפרש מקורי המיוחס למוניטין בלבד. במהלך 2017{' '}
        <strong>לא</strong> חילקה חברת "שלווה" בע"מ דיבידנד, למרות שדיווחה על רווח נקי
        בסך 88,000 ₪.
      </>
    ),
  },
  {
    n: '2',
    body: (
      <>
        במהלך שנת 2017 מכרה החברה רהוט שעלותו 15,000 ₪ ויתרת הפחת שנצבר בגינו הנה 4,000 ₪.
        כתוצאה ממכירה זו נוצר לחברה הפסד הון בסך 2,000 ₪. התמורה ממכירת הרהוט צפויה
        להתקבל <strong>במרץ 2018.</strong> ב-30.9.2017 נרכש רהוט חדש במזומן. במהלך 2017 לא
        בוצעו מכירות או רכישות נוספות של רהוט.
      </>
    ),
  },
  {
    n: '3',
    body: (
      <>
        ב-31.12.2017 נטלה החברה הלוואה נוספת. במהלך שנת 2017{' '}
        <strong>לא</strong> נפרעו ולא נלקחו הלוואות נוספות. ההלוואות אינן נושאות ריבית ואינן
        צמודות.
      </>
    ),
  },
  {
    n: '4',
    body: (
      <>
        ב-1.1.2017 הנפיקה החברה מניות הטבה מתוך הפרמיה בשיעור 20%. כמו כן ביצעה הנפקת מניות
        בפרמיה, במזומן. <strong>לא</strong> בוצעו הנפקות נוספות במהלך 2017.
      </>
    ),
  },
  {
    n: '5',
    body: (
      <>
        ביום ה-31.12.2017 הכריזה החברה על חלוקת דיבידנד בסך 20,000 ₪.
      </>
    ),
  },
];

/**
 * Q1 cash flow statement — indirect method.
 *
 * Verified against the .xlsx solution file
 * (`12-accounting-b-solution-2017-13-7.xlsx`) on 2025-07-13.
 *
 * The 3 sections sum to -28,000, exactly matching the BS cash change
 * (29,000 ending - 57,000 beginning). The 9,000 increase in "חייבים"
 * is NOT in operating — it represents the non-cash sale of furniture
 * for a receivable (expected March 2018) and is disclosed separately
 * in `Q1_NON_CASH_OPERATIONS` (נספח ב׳).
 */
export const Q1_CASH_FLOW_SECTIONS: CashFlowSection[] = [
  {
    title: 'פעילות שוטפת',
    subtitle: 'שיטת הגישה העקיפה',
    rows: [
      { label: 'הפסד נקי לשנה', amount: -48_600, indent: true },
      { label: 'פחת רהוט', amount: 15_000, indent: true },
      { label: 'הפסד הון ממכירת רהוט', amount: 2_000, indent: true },
      { label: 'הכנסות אקוויטי מ"שלווה" (לא במזומן)', amount: -26_400, indent: true },
      { label: 'עלייה בלקוחות', amount: -12_000, indent: true },
      { label: 'ירידה בהוצאות לשלם', amount: -14_000, indent: true },
      { label: 'עלייה בזכאים', amount: 15_000, indent: true },
      {
        label: 'מזומנים נטו מפעילות שוטפת',
        amount: -69_000,
        isSubtotal: true,
      },
    ],
  },
  {
    title: 'פעילות השקעה',
    rows: [
      { label: 'מכירת רהוט (תמורה תתקבל במרץ 2018 — לא במזומן השנה)', amount: 0, indent: true },
      { label: 'רכישת רהוט חדש (30.9.17)', amount: -27_000, indent: true },
      {
        label: 'מזומנים נטו מפעילות השקעה',
        amount: -27_000,
        isSubtotal: true,
      },
    ],
  },
  {
    title: 'פעילות מימון',
    rows: [
      { label: 'נטילת הלוואה נוספת (31.12.17)', amount: 20_000, indent: true },
      { label: 'הנפקת מניות במזומן (כולל בונוס 20% מהפרמיה)', amount: 60_000, indent: true },
      { label: 'תשלום דיבידנד במזומן', amount: -12_000, indent: true },
      {
        label: 'מזומנים נטו מפעילות מימון',
        amount: 68_000,
        isSubtotal: true,
      },
    ],
  },
];

/**
 * Q1 blank cash flow statement template — student fills this in BEFORE
 * revealing the solution. All amounts are 0 (renders as "—").
 * Beginning + ending cash are given (from the balance sheet) so the
 * student can compute the net change as a final check.
 *
 * The 9,000 increase in "חייבים" is deliberately NOT a row — it's
 * the non-cash furniture sale receivable (see `Q1_NON_CASH_OPERATIONS`).
 */
export const Q1_CASH_FLOW_TEMPLATE: CashFlowSection[] = [
  {
    title: 'פעילות שוטפת',
    subtitle: 'שיטת הגישה העקיפה — מלא בעצמך',
    rows: [
      { label: 'רווח (הפסד) נקי לשנה', amount: 0, solution: -48_600, indent: true },
      { label: 'פחת רהוט', amount: 0, solution: 15_000, indent: true },
      { label: 'הפסד הון ממכירת רהוט', amount: 0, solution: 2_000, indent: true },
      { label: 'הכנסות אקוויטי מ"שלווה" (לא במזומן)', amount: 0, solution: -26_400, indent: true },
      { label: 'שינוי בלקוחות', amount: 0, solution: -12_000, indent: true },
      { label: 'שינוי בהוצאות לשלם', amount: 0, solution: -14_000, indent: true },
      { label: 'שינוי בזכאים', amount: 0, solution: 15_000, indent: true },
      {
        label: 'מזומנים נטו מפעילות שוטפת',
        amount: 0,
        isSubtotal: true,
      },
    ],
  },
  {
    title: 'פעילות השקעה',
    rows: [
      { label: 'רכישת רהוט חדש (30.9.17)', amount: 0, solution: -27_000, indent: true },
      {
        label: 'מזומנים נטו מפעילות השקעה',
        amount: 0,
        isSubtotal: true,
      },
    ],
  },
  {
    title: 'פעילות מימון',
    rows: [
      { label: 'נטילת הלוואה (31.12.17)', amount: 0, solution: 20_000, indent: true },
      { label: 'הנפקת מניות במזומן (כולל בונוס 20% מהפרמיה)', amount: 0, solution: 60_000, indent: true },
      { label: 'תשלום דיבידנד במזומן', amount: 0, solution: -12_000, indent: true },
      {
        label: 'מזומנים נטו מפעילות מימון',
        amount: 0,
        isSubtotal: true,
      },
    ],
  },
];

/**
 * Q1 non-cash operations appendix (נספח ב׳) — significant BS movements
 * in 2017 that did NOT involve cash. Disclosed separately because they
 * don't appear in the cash flow statement, but they reconcile the BS.
 *
 * Verified against `12-accounting-b-solution-2017-13-7.xlsx`.
 */
export const Q1_NON_CASH_OPERATIONS: { label: string; amount: number }[] = [
  {
    label: 'מכירת רהוט באשראי — חייבים (תמורה צפויה במרץ 2018)',
    amount: 9_000,
  },
  {
    label: 'הנפקת מניות הטבה (העברה מפרמיה להון מניות)',
    amount: 10_000,
  },
  {
    label: 'דיבידנד לשלם — יתרת סוף שנה (הכרזה ללא תשלום מיידי)',
    amount: 12_000,
  },
];

// ─── Q2 — Equity (27%) ─────────────────────────────────────────────────

export const Q2_PRIOR_EQUITY = {
  commonStock: 300_000,
  premium: 220_000,
  /** Retained earnings at 31.12.2015 — Phase 1 placeholder (computed in Q2 sub-question 1). */
  retainedEarnings: null as number | null,
};

export const Q2_EVENTS_2016 = [
  { date: '1.2.2016', desc: 'הנפקת 50,000 מניות רגילות תמורת 120,000 ₪ (הוצאות הנפקה 10% מסך התמורה — מקוזזות מתוך הפרמיה).' },
  { date: '2.4.2016', desc: 'הנפקת 20,000 כתבי אופציה במחיר 5 ₪. כל אופציה ניתנת להמרה למניה אחת עד 31.12.2016 תמורת 8 ₪ תוספת מימוש.' },
  { date: '1.5.2016', desc: 'הנפקת מניות הטבה מתוך הפרמיה בשיעור 40% לבעלי המניות הרגילות.' },
  { date: '15.6.2016', desc: 'הקמת קרן לשיפוץ ציוד בסך 80,000 ₪.' },
  { date: '20.8.2016', desc: 'רכישת 50,000 מניות של חברת "יותם" (הנסחרת בבורסה) תמורת 110,000 ₪.' },
  { date: '2.9.2016', desc: 'רכישת מחסן תמורת 20,000 ₪ בתמורה להנפקת 10,000 מניות רגילות.' },
  { date: '21.10.2016', desc: 'מימוש 8,000 כתבי אופציה.' },
  { date: '31.12.2016', desc: 'סגירת רווח נקי 215,000 ₪.' },
  { date: '31.12.2016', desc: 'הכרזת דיבידנד 10% — ישולם במרץ 2017.' },
];

/**
 * Q2 Statement of Changes in Equity — fillable template.
 *
 * 5 columns × 12 rows. The student fills in 12 editable cells; the Total
 * column and ending balance auto-compute. Events 4 (equipment fund) and
 * 5 (יותם stock purchase) are shown as informational rows with no inputs
 * — they're pedagogical traps to test if the student recognizes them as
 * non-equity events.
 *
 * Verified solution:
 *   RE(1.1.2016) = 50,000 (derived from 205,400 = 50,000 + 215,000 − 59,600)
 *   Dividend = 298,000 shares × 0.20 ₪ = 59,600
 *   Ending balances: CS=596,000, P=116,000, W=60,000, RE=205,400, Total=977,400
 */
export const Q2_EQUITY_COLUMNS = [
  { key: 'commonStock', title: 'הון מניות', subtitle: '2 ₪ ע.נ' },
  { key: 'premium', title: 'פרמיה' },
  { key: 'warrants', title: 'כתבי אופציה' },
  { key: 'retainedEarnings', title: 'עודפים' },
  { key: 'total', title: 'סה״כ', isTotal: true },
] as const;

export const Q2_EQUITY_TEMPLATE = [
  {
    key: 'beginning',
    label: 'יתרה ליום 1.1.2016',
    isBeginning: true,
    solution: {
      commonStock: 300_000,
      premium: 220_000,
      warrants: 0,
      retainedEarnings: 50_000, // The answer to sub-question 1
    },
  },
  {
    key: 'event1',
    date: '1.2.2016',
    label: 'הנפקת 50,000 מניות רגילות תמורת 120,000 ₪',
    solution: {
      commonStock: 100_000, // 50,000 × 2 ₪ par
      premium: 8_000, // 120,000 − 100,000 − 12,000 issue costs
      warrants: null,
      retainedEarnings: null,
    },
  },
  {
    key: 'event2',
    date: '2.4.2016',
    label: 'הנפקת 20,000 כתבי אופציה במחיר 5 ₪',
    solution: {
      commonStock: null,
      premium: null,
      warrants: 100_000, // 20,000 × 5 ₪
      retainedEarnings: null,
    },
  },
  {
    key: 'event3',
    date: '1.5.2016',
    label: 'הנפקת מניות הטבה (40% מהפרמיה) — 80,000 מניות',
    solution: {
      commonStock: 160_000, // 80,000 × 2 ₪ par
      premium: -160_000, // Transfer from premium
      warrants: null,
      retainedEarnings: null,
    },
  },
  {
    key: 'event4',
    date: '15.6.2016',
    label: 'הקמת קרן לשיפוץ ציוד — אינו אירוע הון עצמי',
    isInformational: true,
    solution: {
      commonStock: 0,
      premium: 0,
      warrants: 0,
      retainedEarnings: 0,
    },
  },
  {
    key: 'event5',
    date: '20.8.2016',
    label: 'רכישת מניות "יותם" — אינו אירוע הון עצמי (השקעה)',
    isInformational: true,
    solution: {
      commonStock: 0,
      premium: 0,
      warrants: 0,
      retainedEarnings: 0,
    },
  },
  {
    key: 'event6',
    date: '2.9.2016',
    label: 'רכישת מחסן תמורת הנפקת 10,000 מניות רגילות',
    solution: {
      commonStock: 20_000, // 10,000 × 2 ₪ par (issued at par, warehouse worth 20,000)
      premium: null,
      warrants: null,
      retainedEarnings: null,
    },
  },
  {
    key: 'event7',
    date: '21.10.2016',
    label: 'מימוש 8,000 כתבי אופציה (8 ₪ תוספת מימוש)',
    solution: {
      commonStock: 16_000, // 8,000 × 2 ₪ par
      premium: 48_000, // 8,000 × 8 ₪ exercise − 16,000 par
      warrants: -40_000, // Remove 8,000 of 20,000 warrants at 5 ₪ each
      retainedEarnings: null,
    },
  },
  {
    key: 'event8',
    date: '31.12.2016',
    label: 'רווח נקי לשנת 2016',
    solution: {
      commonStock: null,
      premium: null,
      warrants: null,
      retainedEarnings: 215_000,
    },
  },
  {
    key: 'event9',
    date: '31.12.2016',
    label: 'הכרזת דיבידנד 10% (298,000 מניות × 0.20 ₪ = 59,600)',
    solution: {
      commonStock: null,
      premium: null,
      warrants: null,
      retainedEarnings: -59_600,
    },
  },
  {
    key: 'ending',
    label: 'יתרה ליום 31.12.2016',
    isEnding: true,
    targetEndingRE: 205_400, // Given in the question — for reconciliation check
    solution: {
      commonStock: 596_000,
      premium: 116_000,
      warrants: 60_000,
      retainedEarnings: 205_400,
    },
  },
];

// ─── Q3 — Equity method (20%) ──────────────────────────────────────────

/**
 * Q3 sub-question 1 — original difference breakdown.
 *
 * Cost 284,000 for 40% (4,800/12,000) of "חרסינות".
 * Book value of equity at acquisition: 460,000 (stock 140k + premium 40k + RE 280k).
 * 40% share of book equity = 184,000.
 * FV adjustments to net assets: machine +70,000, land +55,000.
 * 40% share of FV adjustments = 50,000 (machine 28,000 + land 22,000).
 * Cost − 40% × (book + FV) = 284,000 − 234,000 = 50,000 → all to goodwill.
 *
 * Machine acquired 1.4.2011, useful life 9 years → fully depreciated 31.3.2020.
 * At acquisition (1.4.2016), 5 years have passed → 4 years remaining.
 * Annual amort of machine FV excess = 28,000 / 4 = 7,000.
 * For 2016 (9/12 since acquisition) = 7,000 × 9/12 = 5,250.
 */
export const Q3_INVESTMENT_TEMPLATE = [
  {
    key: 'acquisition',
    date: '1.4.2016',
    label: 'רכישת 40% ממניות "חרסינות"',
    isBeginning: true,
    /** Acquisition cost is GIVEN (read-only). */
    solution: 284_000,
  },
  {
    key: 'equityIncome',
    date: '31.12.2016',
    label:
      'חלק ברווח נקי (40% × 240,000 × 9/12) — מאז תאריך הרכישה (4/2016)',
    /** 40% × 240,000 × 9/12 = 72,000. */
    solution: 72_000,
  },
  {
    key: 'amortization',
    date: '31.12.2016',
    label:
      'הפחתת עודף שווי הוגן — מכונה (40% × 70,000 / 4 שנים נותרות × 9/12)',
    /** 28,000 / 4 × 9/12 = 5,250. Negative because it REDUCES the investment. */
    solution: -5_250,
  },
  {
    key: 'dividend',
    date: '31.12.2016',
    label: 'דיבידנד שהתקבל (40% × 62,000) — מקטין את ההשקעה',
    /** 40% × 62,000 = 24,800. */
    solution: -24_800,
  },
  {
    key: 'ending',
    label: 'יתרה ליום 31.12.2016',
    isEnding: true,
    /** 284,000 + 72,000 − 5,250 − 24,800 = 325,950. */
    targetBalance: 325_950,
  },
];

export const Q3_DATA = {
  acquiree: 'חרסינות',
  acquirer: 'כלי בית',
  acquisitionDate: '1.4.2016',
  sharesAcquired: 4_800,
  totalShares: 12_000,
  cost: 284_000,
  acquireeEquityAtAcquisition: { stockCapital: 140_000, premium: 40_000, retainedEarnings: 280_000 },
  fairValueAdjustments: [
    { item: 'מכונה', bookValue: 0, fairValueExcess: 70_000, usefulLifeYears: 9, acquisitionYear: 2011 },
    { item: 'קרקע', bookValue: 0, fairValueExcess: 55_000, usefulLifeYears: null, acquisitionYear: null },
  ],
  netIncome2016: 240_000,
  /** Whether income is distributed evenly across the year. */
  incomeEvenlyDistributed: true,
  dividendDeclared2016: 62_000,
};

// ─── Q4 — Liabilities (20%) ───────────────────────────────────────────

export const Q4_DATA = {
  issuer: 'עמית',
  issuanceDate: '1.1.2017',
  bondsIssued: 350_000,
  faceValuePerBond: 1,
  couponRate: 0.07,
  termYears: 8,
  principalRepayment: 'תום תקופה (8 שנים) — 1.1.2025',
  interestPaymentTiming: 'בתחילת כל שנה (1.1.2018 ואילך)',
  premiumBalance_31_12_2019: 20_000,
  amortizationMethod: 'שיטת הקו הישר',
  /**
   * Phase 1 placeholder: proceeds are back-calculated from the 31.12.19
   * premium balance. Annual amortization = 2 × (premium at issuance / 8).
   * If premium(31.12.19) = 20,000, then amortization so far = X/4 (years 2017-2019).
   * Solving: X − (X/8 × 3) = 20,000 → X(5/8) = 20,000 → X = 32,000. So issuance premium
   * = 32,000. Face = 350,000. Proceeds = 350,000 + 32,000 = 382,000.
   * Cross-check: amortization per year = 32,000/8 = 4,000. After 3 years = 12,000. 32,000 − 12,000 = 20,000 ✓
   */
  proceedsPhase1Estimate: 382_000,
};

/**
 * Q4 — fillable bond amortization schedule.
 *
 * The 8-year schedule is auto-computed from the original premium at
 * issuance (which the student back-derives from the given 31.12.19
 * balance of 20,000). The 2 extra fillable cells map 1-to-1 to the
 * remaining sub-questions, so the student gets a single coherent
 * practice session covering all 4 parts of Q4.
 *
 * Math:
 *   Original premium X (5/8) = 20,000 → X = 32,000
 *   Annual amort = 32,000 / 8 = 4,000
 *   Annual cash interest = 350,000 × 7% = 24,500
 *   2017 net interest expense = 24,500 − 4,000 = 20,500
 *   At 31.12.2021 (end of year 5): premium = 32,000 − 5×4,000 = 12,000
 *                                    bonds net = 350,000 + 12,000 = 362,000
 */
export const Q4_BOND_TEMPLATE = {
  /** Editable — original premium at issuance. Solution: 32,000. */
  originalPremium: { solution: 32_000 },
  /** 8 rows, one per year 2017-2024. The final year (2024) ends at 0. */
  schedule: [
    { year: 2017, date: '31.12.2017' },
    { year: 2018, date: '31.12.2018' },
    { year: 2019, date: '31.12.2019' },
    { year: 2020, date: '31.12.2020' },
    { year: 2021, date: '31.12.2021' },
    { year: 2022, date: '31.12.2022' },
    { year: 2023, date: '31.12.2023' },
    { year: 2024, date: '31.12.2024' },
  ],
  /** Editable — net interest expense for 2017. Solution: 20,500. */
  netInterest2017: { solution: 20_500 },
  /** Editable — net bond balance at 31.12.2021. Solution: 362,000. */
  netBalance2021: { solution: 362_000 },
  /** Verification anchor — 31.12.2019 closing balance must equal 20,000. */
  verifyBalance2019: 20_000,
};
