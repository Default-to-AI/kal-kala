import { describe, it, expect } from 'vitest';
import {
  calculateStraightLineBond,
  calculateEffectiveInterestBond,
  calculateAccruedInterest
} from './accounting';

describe('Accounting Utils', () => {
  describe('calculateAccruedInterest', () => {
    it('calculates cutoff interest correctly for 4 months', () => {
      // 100,000 principal, 5% annual rate, 4 months
      const result = calculateAccruedInterest(100000, 5, 4);
      expect(result).toBeCloseTo(1666.67, 2);
    });

    it('calculates full year interest correctly', () => {
      const result = calculateAccruedInterest(100000, 5, 12);
      expect(result).toBeCloseTo(5000);
    });
  });

  describe('calculateStraightLineBond', () => {
    it('calculates bond at discount', () => {
      // 1000 par, 900 issue, 5% coupon, 5 years
      const sched = calculateStraightLineBond(1000, 900, 5, 5);
      expect(sched).toHaveLength(5);
      
      // Amortization = (1000 - 900) / 5 = 20
      // Coupon = 1000 * 5% = 50
      // Expense = 50 + 20 = 70
      
      expect(sched[0].expense).toBe(70);
      expect(sched[0].coupon).toBe(50);
      expect(sched[0].opening).toBe(900);
      expect(sched[0].closing).toBe(920);
      
      // Final year closing should be par value
      expect(sched[4].closing).toBe(1000);
    });

    it('calculates bond at premium', () => {
      // 1000 par, 1100 issue, 5% coupon, 5 years
      const sched = calculateStraightLineBond(1000, 1100, 5, 5);

      // Amortization = 100 / 5 = 20
      // Expense = 50 - 20 = 30

      expect(sched[0].expense).toBe(30);
      expect(sched[0].closing).toBe(1080);
      expect(sched[4].closing).toBe(1000);
    });

    it('calculates bond at par (no amortization)', () => {
      // 1000 par, 1000 issue (at par), 5% coupon, 5 years
      const sched = calculateStraightLineBond(1000, 1000, 5, 5);

      // No discount/premium → yearlyAmort = 0
      // Coupon = 1000 * 5% = 50
      // Expense = 50 (coupon - 0 since isDiscount = false but amort = 0 anyway)

      expect(sched).toHaveLength(5);
      expect(sched[0].opening).toBe(1000);
      expect(sched[0].expense).toBe(50);
      expect(sched[0].coupon).toBe(50);
      expect(sched[0].closing).toBe(1000);
      expect(sched[4].closing).toBe(1000);
    });
  });

  describe('calculateEffectiveInterestBond', () => {
    it('calculates bond at discount with effective rate', () => {
      // Par: 100,000, Issue: 95,000, Coupon: 5%, Effective: 6%, 3 years
      const sched = calculateEffectiveInterestBond(100000, 95000, 5, 6, 3);
      
      // Year 1 Expense = 95,000 * 6% = 5,700
      // Coupon = 5,000
      // Amortization = 700
      // Closing = 95,700
      expect(sched[0].opening).toBe(95000);
      expect(sched[0].expense).toBeCloseTo(5700);
      expect(sched[0].coupon).toBe(5000);
      expect(sched[0].closing).toBeCloseTo(95700);

      // Final year must close at 100,000 due to rounding
      expect(sched[2].closing).toBe(100000);
    });

    it('calculates bond at premium with effective rate', () => {
      // Par: 100,000, Issue: 105,000, Coupon: 6%, Effective: 5%, 2 years
      const sched = calculateEffectiveInterestBond(100000, 105000, 6, 5, 2);
      
      // Year 1 Expense = 105,000 * 5% = 5,250
      // Coupon = 6,000
      // Amortization = 750
      // Closing = 104,250
      expect(sched[0].expense).toBeCloseTo(5250);
      expect(sched[0].closing).toBeCloseTo(104250);
      expect(sched[1].closing).toBe(100000);
    });
  });
});
