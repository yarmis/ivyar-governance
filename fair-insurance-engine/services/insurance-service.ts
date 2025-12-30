/**
 * Main Insurance Service
 */

import {
  Policy, Claim, Insured, InsuranceProduct,
  PremiumCalculation, InsuranceType, PolicyStatus,
  PensionIntegrationData
} from '../models/types';
import { InsuranceConfig, defaultConfig } from '../config/insurance-config';
import { UnderwritingEngine } from '../underwriting/underwriting-engine';
import { ClaimsProcessor } from '../claims/claims-processor';
import { PensionIntegration } from '../integration/pension-integration';
import { PremiumCalculator } from './premium-calculator';

export class InsuranceService {
  private config: InsuranceConfig;
  private underwriting: UnderwritingEngine;
  private claims: ClaimsProcessor;
  private pensionIntegration: PensionIntegration;
  private premiumCalculator: PremiumCalculator;

  constructor(config: InsuranceConfig = defaultConfig) {
    this.config = config;
    this.underwriting = new UnderwritingEngine(config.underwriting);
    this.claims = new ClaimsProcessor(config.claims);
    this.pensionIntegration = new PensionIntegration(config.pension_integration);
    this.premiumCalculator = new PremiumCalculator(config);
  }

  /**
   * Create new policy
   */
  async createPolicy(
    insured: Insured,
    productCode: string,
    coverageAmount: number,
    pensionData?: PensionIntegrationData
  ): Promise<Policy> {
    // Get underwriting decision
    const underwritingResult = await this.underwriting.evaluate(insured, productCode);
    
    if (underwritingResult.decision === 'declined') {
      throw new Error(`Policy declined: ${underwritingResult.conditions?.join(', ')}`);
    }

    // Calculate premium
    const premium = this.premiumCalculator.calculate({
      productCode,
      coverageAmount,
      insured,
      pensionData,
    });

    // Check pension deduction eligibility
    let deductFromPension = false;
    if (pensionData && this.config.pension_integration.premium_deduction_enabled) {
      const maxDeduction = pensionData.pension_amount * 
        (this.config.pension_integration.max_deduction_percentage / 100);
      deductFromPension = premium.monthly_premium <= maxDeduction;
    }

    const policy: Policy = {
      id: this.generateId('POL'),
      policy_number: this.generatePolicyNumber(),
      insured_id: insured.id,
      pensioner_id: pensionData?.pensioner_id,
      insurance_type: this.getInsuranceType(productCode),
      product_code: productCode,
      product_name: this.getProductName(productCode),
      coverage_amount: coverageAmount,
      deductible: this.getDeductible(productCode),
      currency: this.config.general.currency,
      premium_amount: premium.monthly_premium,
      premium_frequency: 'monthly' as any,
      premium_deduct_from_pension: deductFromPension,
      effective_date: new Date().toISOString(),
      expiration_date: this.calculateExpirationDate(),
      beneficiaries: [],
      status: PolicyStatus.ACTIVE,
      underwriting_decision: underwritingResult,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // If pension deduction enabled, register with Pension Fund
    if (deductFromPension && pensionData) {
      await this.pensionIntegration.registerPremiumDeduction({
        policy_id: policy.id,
        pensioner_id: pensionData.pensioner_id,
        amount: premium.monthly_premium,
        period_month: new Date().getMonth() + 1,
        period_year: new Date().getFullYear(),
      });
    }

    return policy;
  }

  /**
   * Submit claim
   */
  async submitClaim(
    policyId: string,
    claimType: string,
    incidentDate: string,
    description: string,
    claimedAmount: number
  ): Promise<Claim> {
    return this.claims.submit({
      policy_id: policyId,
      claim_type: claimType,
      incident_date: incidentDate,
      description,
      claimed_amount: claimedAmount,
    });
  }

  /**
   * Process claim
   */
  async processClaim(claimId: string): Promise<Claim> {
    return this.claims.process(claimId);
  }

  /**
   * Get policy with pension data
   */
  async getPolicyWithPensionData(policyId: string): Promise<{
    policy: Policy;
    pensionData?: PensionIntegrationData;
  }> {
    // Get policy (mock)
    const policy = {} as Policy;
    
    let pensionData: PensionIntegrationData | undefined;
    if (policy.pensioner_id) {
      pensionData = await this.pensionIntegration.getPensionerData(policy.pensioner_id);
    }

    return { policy, pensionData };
  }

  /**
   * Coordinate benefits with pension
   */
  async coordinateBenefits(claimId: string): Promise<{
    insurance_payout: number;
    pension_benefit: number;
    total: number;
  }> {
    return this.pensionIntegration.coordinateBenefits(claimId);
  }

  // Helper methods
  private generateId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generatePolicyNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.random().toString().substr(2, 8);
    return `FIE-${year}-${random}`;
  }

  private getInsuranceType(productCode: string): InsuranceType {
    if (productCode.startsWith('LIFE')) return InsuranceType.LIFE;
    if (productCode.startsWith('HEALTH')) return InsuranceType.HEALTH;
    if (productCode.startsWith('DIS')) return InsuranceType.DISABILITY;
    return InsuranceType.LIFE;
  }

  private getProductName(code: string): string {
    const names: Record<string, string> = {
      'LIFE-MIL': 'Military Life Insurance',
      'LIFE-VET': 'Veteran Life Insurance',
      'HEALTH-BASIC': 'Basic Health Plan',
      'HEALTH-STD': 'Standard Health Plan',
      'HEALTH-PREM': 'Premium Health Plan',
      'DIS-INCOME': 'Disability Income Protection',
    };
    return names[code] || code;
  }

  private getDeductible(code: string): number {
    if (code.includes('BASIC')) return 2000;
    if (code.includes('STD')) return 1000;
    return 0;
  }

  private calculateExpirationDate(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString();
  }
}

export default InsuranceService;
