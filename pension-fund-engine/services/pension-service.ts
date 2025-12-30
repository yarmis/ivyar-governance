/**
 * Pension Service
 * Main orchestration service
 */

import { Pensioner, PensionBenefit, Payment, EligibilityResult, ActuarialForecast } from '../models/types';
import { PensionConfig, defaultConfig } from '../config/pension-config';
import BenefitCalculator from '../calculators/benefit-calculator';
import IndexationEngine from '../calculators/indexation-engine';
import EligibilityEngine from '../calculators/eligibility-engine';
import PaymentEngine from '../payments/payment-engine';
import ActuarialEngine from '../forecasting/actuarial-engine';

export class PensionService {
  private config: PensionConfig;
  private benefitCalculator: BenefitCalculator;
  private indexationEngine: IndexationEngine;
  private eligibilityEngine: EligibilityEngine;
  private paymentEngine: PaymentEngine;
  private actuarialEngine: ActuarialEngine;

  constructor(config: PensionConfig = defaultConfig) {
    this.config = config;
    this.benefitCalculator = new BenefitCalculator(config);
    this.indexationEngine = new IndexationEngine(config.indexation);
    this.eligibilityEngine = new EligibilityEngine(config.eligibility);
    this.paymentEngine = new PaymentEngine(config.payments);
    this.actuarialEngine = new ActuarialEngine();
  }

  /**
   * Check retirement eligibility
   */
  checkEligibility(pensioner: Pensioner): EligibilityResult {
    return this.eligibilityEngine.checkEligibility(pensioner);
  }

  /**
   * Calculate pension benefit
   */
  calculateBenefit(pensioner: Pensioner, dependentsCount: number = 0): PensionBenefit {
    // First check eligibility
    const eligibility = this.checkEligibility(pensioner);
    if (!eligibility.eligible) {
      throw new Error(`Not eligible: ${eligibility.missing_requirements.join(', ')}`);
    }

    return this.benefitCalculator.calculate(pensioner, dependentsCount);
  }

  /**
   * Apply indexation to benefit
   */
  applyIndexation(
    benefit: PensionBenefit,
    rate: number,
    type: 'inflation' | 'special' | 'government' = 'inflation'
  ) {
    return this.indexationEngine.applyIndexation({
      benefit,
      indexationType: type,
      rate,
      effectiveDate: new Date().toISOString(),
      reason: `${type} indexation`,
    });
  }

  /**
   * Create payment for benefit
   */
  createPayment(pensioner: Pensioner, benefit: PensionBenefit, month: number, year: number): Payment {
    return this.paymentEngine.createPayment({
      pensioner,
      benefit,
      period_month: month,
      period_year: year,
    });
  }

  /**
   * Process payments batch
   */
  async processPayments(payments: Payment[]) {
    return this.paymentEngine.processBatch(payments);
  }

  /**
   * Generate actuarial forecast
   */
  generateForecast(
    beneficiaries: Pensioner[],
    fundBalance: number,
    years: number = 30
  ): ActuarialForecast {
    return this.actuarialEngine.generateForecast({
      current_beneficiaries: beneficiaries,
      current_fund_balance: fundBalance,
      forecast_years: years,
      assumptions: {
        inflation_rate: 0.05,
        indexation_rate: 0.05,
        mortality_table: 'ua_military_2024',
        new_entrants_rate: 0.03,
        salary_growth_rate: 0.04,
        investment_return_rate: 0.06,
      },
    });
  }

  /**
   * Get fund statistics
   */
  async getFundStatistics(): Promise<{
    total_beneficiaries: number;
    total_monthly_liability: number;
    average_pension: number;
    by_type: Record<string, number>;
    by_rank: Record<string, number>;
  }> {
    // In production, query from database
    return {
      total_beneficiaries: 0,
      total_monthly_liability: 0,
      average_pension: 0,
      by_type: {},
      by_rank: {},
    };
  }
}

export default PensionService;
