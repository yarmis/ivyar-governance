import { describe, it, expect } from 'vitest';
import ActuarialEngine from '../forecasting/actuarial-engine';
import { PensionType, ServiceStatus } from '../models/types';

describe('ActuarialEngine', () => {
  const engine = new ActuarialEngine();

  it('should generate forecast', () => {
    const forecast = engine.generateForecast({
      current_beneficiaries: [
        {
          id: '1',
          current_pension_amount: 10000,
          pension_type: PensionType.MILITARY,
        } as any,
      ],
      current_fund_balance: 1000000,
      forecast_years: 10,
      assumptions: {
        inflation_rate: 0.05,
        indexation_rate: 0.05,
        mortality_table: 'ua_military_2024',
        new_entrants_rate: 0.03,
        salary_growth_rate: 0.04,
        investment_return_rate: 0.06,
      },
    });

    expect(forecast.yearly_projections.length).toBe(10);
    expect(forecast.sustainability_score).toBeGreaterThanOrEqual(0);
    expect(forecast.sustainability_score).toBeLessThanOrEqual(100);
  });

  it('should calculate funding ratio', () => {
    const forecast = engine.generateForecast({
      current_beneficiaries: [],
      current_fund_balance: 1000000,
      forecast_years: 5,
      assumptions: {
        inflation_rate: 0.05,
        indexation_rate: 0.05,
        mortality_table: 'ua_general_2024',
        new_entrants_rate: 0.03,
        salary_growth_rate: 0.04,
        investment_return_rate: 0.06,
      },
    });

    expect(forecast.funding_ratio).toBeGreaterThanOrEqual(0);
  });
});
