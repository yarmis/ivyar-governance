/**
 * Actuarial Forecast Engine
 * Long-term pension liability forecasting
 */

import { ActuarialForecast, YearlyProjection, ForecastAssumptions, Pensioner } from '../models/types';

export interface ForecastInput {
  current_beneficiaries: Pensioner[];
  current_fund_balance: number;
  forecast_years: number;
  assumptions: ForecastAssumptions;
}

export class ActuarialEngine {
  /**
   * Generate full actuarial forecast
   */
  generateForecast(input: ForecastInput): ActuarialForecast {
    const {
      current_beneficiaries,
      current_fund_balance,
      forecast_years,
      assumptions,
    } = input;

    // Calculate current state
    const currentMonthlyLiability = this.calculateCurrentLiability(current_beneficiaries);
    
    // Generate yearly projections
    const projections = this.generateProjections(
      current_beneficiaries.length,
      currentMonthlyLiability,
      current_fund_balance,
      forecast_years,
      assumptions
    );

    // Calculate risk metrics
    const fundingRatio = this.calculateFundingRatio(
      current_fund_balance,
      currentMonthlyLiability * 12 * forecast_years
    );
    const deficitRisk = this.calculateDeficitRisk(projections);
    const sustainabilityScore = this.calculateSustainabilityScore(projections, fundingRatio);

    return {
      id: this.generateId(),
      forecast_date: new Date().toISOString(),
      forecast_horizon_years: forecast_years,
      current_beneficiaries: current_beneficiaries.length,
      current_monthly_liability: currentMonthlyLiability,
      current_fund_balance: current_fund_balance,
      yearly_projections: projections,
      funding_ratio: fundingRatio,
      deficit_risk: deficitRisk,
      sustainability_score: sustainabilityScore,
      assumptions,
      created_by: 'actuarial-engine',
      created_at: new Date().toISOString(),
    };
  }

  /**
   * Calculate current monthly liability
   */
  private calculateCurrentLiability(beneficiaries: Pensioner[]): number {
    return beneficiaries.reduce((sum, p) => sum + p.current_pension_amount, 0);
  }

  /**
   * Generate yearly projections
   */
  private generateProjections(
    currentBeneficiaries: number,
    currentMonthlyLiability: number,
    currentBalance: number,
    years: number,
    assumptions: ForecastAssumptions
  ): YearlyProjection[] {
    const projections: YearlyProjection[] = [];
    
    let beneficiaries = currentBeneficiaries;
    let monthlyPayment = currentMonthlyLiability;
    let balance = currentBalance;

    for (let year = 1; year <= years; year++) {
      // Project new retirees
      const newRetirees = Math.round(beneficiaries * assumptions.new_entrants_rate);
      
      // Project deaths using simplified mortality
      const deaths = Math.round(beneficiaries * this.getMortalityRate(assumptions.mortality_table));
      
      // Update beneficiary count
      beneficiaries = beneficiaries + newRetirees - deaths;
      
      // Apply indexation to monthly payment
      monthlyPayment *= (1 + assumptions.indexation_rate);
      
      // Scale for beneficiary change
      const adjustedMonthlyPayment = monthlyPayment * (beneficiaries / currentBeneficiaries);
      
      // Calculate annual liability
      const annualLiability = adjustedMonthlyPayment * 12;
      
      // Update balance (simplified: contributions + returns - payments)
      const contributions = annualLiability * 0.1; // Assumed 10% contribution rate
      const investmentReturn = balance * assumptions.investment_return_rate;
      balance = balance + contributions + investmentReturn - annualLiability;
      
      // Calculate funding ratio
      const fundingRatio = balance / (annualLiability * (years - year + 1));

      projections.push({
        year: new Date().getFullYear() + year,
        expected_beneficiaries: beneficiaries,
        expected_new_retirees: newRetirees,
        expected_deaths: deaths,
        projected_monthly_payment: adjustedMonthlyPayment,
        projected_annual_liability: annualLiability,
        projected_fund_balance: Math.max(0, balance),
        funding_ratio: Math.max(0, fundingRatio),
      });
    }

    return projections;
  }

  /**
   * Get mortality rate from table
   */
  private getMortalityRate(mortalityTable: string): number {
    // Simplified mortality rates
    const rates: Record<string, number> = {
      'ua_military_2024': 0.025, // 2.5% annual mortality
      'ua_general_2024': 0.015,
      'who_standard': 0.012,
    };
    return rates[mortalityTable] || 0.02;
  }

  /**
   * Calculate funding ratio
   */
  private calculateFundingRatio(assets: number, liabilities: number): number {
    if (liabilities <= 0) return 1;
    return Math.min(assets / liabilities, 2); // Cap at 200%
  }

  /**
   * Calculate deficit risk (probability of fund depletion)
   */
  private calculateDeficitRisk(projections: YearlyProjection[]): number {
    const deficitYears = projections.filter(p => p.projected_fund_balance <= 0).length;
    return deficitYears / projections.length;
  }

  /**
   * Calculate sustainability score (0-100)
   */
  private calculateSustainabilityScore(
    projections: YearlyProjection[],
    fundingRatio: number
  ): number {
    let score = 50; // Base score

    // Add points for good funding ratio
    score += Math.min(fundingRatio * 30, 30);

    // Add points for positive balance in later years
    const laterYears = projections.slice(-5);
    const positiveYears = laterYears.filter(p => p.projected_fund_balance > 0).length;
    score += positiveYears * 4;

    return Math.min(Math.max(score, 0), 100);
  }

  private generateId(): string {
    return `forecast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default ActuarialEngine;
