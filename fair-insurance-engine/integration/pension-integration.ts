/**
 * Pension Fund Integration
 */

import {
  PensionIntegrationData,
  PremiumDeductionRequest,
  BenefitCoordinationResult,
} from '../models/types';
import { PensionIntegrationConfig } from '../config/insurance-config';

export class PensionIntegration {
  private config: PensionIntegrationConfig;

  constructor(config: PensionIntegrationConfig) {
    this.config = config;
  }

  /**
   * Get pensioner data from Pension Fund
   */
  async getPensionerData(pensionerId: string): Promise<PensionIntegrationData> {
    if (!this.config.enabled) {
      throw new Error('Pension integration is disabled');
    }

    // Call Pension Fund API
    const response = await this.callPensionAPI(`/registry/${pensionerId}`);
    
    return {
      pensioner_id: response.id,
      pension_amount: response.current_pension_amount,
      pension_type: response.pension_type,
      disability_group: response.disability_group,
      service_years: response.total_service_years,
      combat_years: response.combat_service_years,
      rank: response.military_rank,
    };
  }

  /**
   * Register premium deduction from pension
   */
  async registerPremiumDeduction(request: PremiumDeductionRequest): Promise<{
    success: boolean;
    deduction_id: string;
  }> {
    if (!this.config.premium_deduction_enabled) {
      throw new Error('Premium deduction is disabled');
    }

    // Call Pension Fund API to register deduction
    const response = await this.callPensionAPI('/deductions/register', 'POST', {
      pensioner_id: request.pensioner_id,
      type: 'insurance_premium',
      amount: request.amount,
      policy_id: request.policy_id,
      recurring: true,
      start_month: request.period_month,
      start_year: request.period_year,
    });

    return {
      success: true,
      deduction_id: response.deduction_id,
    };
  }

  /**
   * Cancel premium deduction
   */
  async cancelPremiumDeduction(policyId: string, pensionerId: string): Promise<boolean> {
    await this.callPensionAPI('/deductions/cancel', 'POST', {
      pensioner_id: pensionerId,
      policy_id: policyId,
    });
    return true;
  }

  /**
   * Check eligibility for auto-enrollment
   */
  async checkAutoEnrollmentEligibility(pensionerId: string): Promise<{
    eligible: boolean;
    recommended_products: string[];
    max_premium: number;
  }> {
    const pensionerData = await this.getPensionerData(pensionerId);
    
    const maxPremium = pensionerData.pension_amount * 
      (this.config.max_deduction_percentage / 100);

    const recommendedProducts: string[] = [];
    
    // Recommend life insurance for all pensioners
    recommendedProducts.push('LIFE-VET');
    
    // Recommend health insurance
    if (pensionerData.pension_amount > 20000) {
      recommendedProducts.push('HEALTH-STD');
    } else {
      recommendedProducts.push('HEALTH-BASIC');
    }
    
    // Recommend disability coverage if not already disabled
    if (!pensionerData.disability_group) {
      recommendedProducts.push('DIS-INCOME');
    }

    return {
      eligible: true,
      recommended_products: recommendedProducts,
      max_premium: maxPremium,
    };
  }

  /**
   * Coordinate benefits between insurance and pension
   */
  async coordinateBenefits(claimId: string): Promise<{
    insurance_payout: number;
    pension_benefit: number;
    total: number;
  }> {
    if (!this.config.benefit_coordination) {
      return {
        insurance_payout: 0,
        pension_benefit: 0,
        total: 0,
      };
    }

    // Mock implementation
    // In production, would coordinate with Pension Fund
    // to prevent duplicate benefits and maximize total payout
    
    return {
      insurance_payout: 50000,
      pension_benefit: 30000,
      total: 80000,
    };
  }

  /**
   * Sync insured profile with pension data
   */
  async syncWithPensionProfile(pensionerId: string): Promise<{
    synced: boolean;
    updates: Record<string, any>;
  }> {
    const pensionData = await this.getPensionerData(pensionerId);
    
    return {
      synced: true,
      updates: {
        service_years: pensionData.service_years,
        combat_years: pensionData.combat_years,
        rank: pensionData.rank,
        disability_group: pensionData.disability_group,
      },
    };
  }

  /**
   * Get combined pension and insurance statement
   */
  async getCombinedStatement(pensionerId: string): Promise<{
    pension: {
      monthly_amount: number;
      annual_amount: number;
    };
    insurance: {
      policies: number;
      total_coverage: number;
      monthly_premiums: number;
    };
    net_monthly: number;
  }> {
    const pensionData = await this.getPensionerData(pensionerId);
    
    // Mock insurance data
    const insuranceData = {
      policies: 2,
      total_coverage: 1000000,
      monthly_premiums: 1500,
    };

    return {
      pension: {
        monthly_amount: pensionData.pension_amount,
        annual_amount: pensionData.pension_amount * 12,
      },
      insurance: insuranceData,
      net_monthly: pensionData.pension_amount - insuranceData.monthly_premiums,
    };
  }

  /**
   * Call Pension Fund API
   */
  private async callPensionAPI(
    endpoint: string,
    method: string = 'GET',
    body?: any
  ): Promise<any> {
    const url = `${this.config.api_endpoint}${endpoint}`;
    
    // Mock implementation
    // In production, would make actual HTTP request
    console.log(`Calling Pension API: ${method} ${url}`);
    
    // Return mock data
    return {
      id: 'PEN-2025-000001',
      current_pension_amount: 45000,
      pension_type: 'military',
      disability_group: null,
      total_service_years: 25,
      combat_service_years: 5,
      military_rank: 'colonel',
    };
  }
}

export default PensionIntegration;
