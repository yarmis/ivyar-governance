import { describe, it, expect } from 'vitest';
import { PensionIntegration } from '../integration/pension-integration';
import { defaultConfig } from '../config/insurance-config';

describe('PensionIntegration', () => {
  const integration = new PensionIntegration(defaultConfig.pension_integration);

  it('should check auto-enrollment eligibility', async () => {
    const result = await integration.checkAutoEnrollmentEligibility('PEN-001');
    
    expect(result.eligible).toBe(true);
    expect(result.recommended_products.length).toBeGreaterThan(0);
    expect(result.max_premium).toBeGreaterThan(0);
  });

  it('should get combined statement', async () => {
    const statement = await integration.getCombinedStatement('PEN-001');
    
    expect(statement.pension.monthly_amount).toBeGreaterThan(0);
    expect(statement.net_monthly).toBeDefined();
  });

  it('should coordinate benefits', async () => {
    const result = await integration.coordinateBenefits('CLM-001');
    
    expect(result.insurance_payout).toBeDefined();
    expect(result.pension_benefit).toBeDefined();
    expect(result.total).toBe(result.insurance_payout + result.pension_benefit);
  });
});
