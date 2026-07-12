export interface BondAmortizationRow {
  year: number;
  opening: number;
  expense: number;
  coupon: number;
  closing: number;
}

/**
 * Calculate straight line amortization for a bond.
 */
export function calculateStraightLineBond(
  parValue: number,
  issuePrice: number,
  couponRatePercent: number,
  years: number
): BondAmortizationRow[] {
  const diff = Math.abs(parValue - issuePrice);
  const isDiscount = issuePrice < parValue;
  const isPar = issuePrice === parValue;

  const yearlyAmort = isPar ? 0 : diff / years;
  const yearlyCoupon = parValue * (couponRatePercent / 100);
  const yearlyExpense = isDiscount
    ? yearlyCoupon + yearlyAmort
    : yearlyCoupon - yearlyAmort;

  const sched: BondAmortizationRow[] = [];
  let currentBookValue = issuePrice;

  for (let i = 1; i <= years; i++) {
    const opening = currentBookValue;
    const closing = isDiscount ? opening + yearlyAmort : opening - yearlyAmort;
    
    sched.push({
      year: i,
      opening,
      expense: yearlyExpense,
      coupon: yearlyCoupon,
      closing: Math.round(closing)
    });
    
    currentBookValue = closing;
  }

  return sched;
}

/**
 * Calculate effective interest amortization for a bond.
 */
export function calculateEffectiveInterestBond(
  parValue: number,
  issuePrice: number,
  couponRatePercent: number,
  effectiveRatePercent: number,
  years: number
): BondAmortizationRow[] {
  const isDiscount = issuePrice < parValue;
  const yearlyCoupon = parValue * (couponRatePercent / 100);
  const effRate = effectiveRatePercent / 100;

  const sched: BondAmortizationRow[] = [];
  let currentBookValue = issuePrice;

  for (let i = 1; i <= years; i++) {
    const opening = currentBookValue;
    const expense = opening * effRate;
    
    // Amortization = absolute difference between expense and coupon
    const amort = Math.abs(expense - yearlyCoupon);
    
    // Book value moves towards Par Value
    const closing = isDiscount ? opening + amort : opening - amort;
    
    // Handle rounding on the final year to exactly match par value
    const isFinalYear = i === years;
    const finalClosing = isFinalYear ? parValue : closing;
    const adjustedExpense = isFinalYear 
      ? (isDiscount ? (parValue - opening) + yearlyCoupon : yearlyCoupon - (opening - parValue))
      : expense;
    
    sched.push({
      year: i,
      opening,
      expense: adjustedExpense,
      coupon: yearlyCoupon,
      closing: finalClosing
    });
    
    currentBookValue = finalClosing;
  }

  return sched;
}

/**
 * Calculate accrued interest (cutoff) for long term liabilities.
 */
export function calculateAccruedInterest(
  principal: number,
  annualRatePercent: number,
  monthsToAccrue: number
): number {
  return principal * (annualRatePercent / 100) * (monthsToAccrue / 12);
}
