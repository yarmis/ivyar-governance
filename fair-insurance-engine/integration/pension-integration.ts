/**
 * Pension Fund Integration Service
 */

export interface PensionData {
  pensioner_id: string;
  pension_amount: number;
  pension_type: string;
  service_years: number;
  combat_years: number;
  rank: string;
  disability_group?: string;
}

export interface DeductionRequest {
  pensioner_id: string;
  policy_id: string;
  amount: number;
  description: string;
}

export interface DeductionResult {
  success: boolean;
  deduction_id?: string;
  error?: string;
}

export class PensionIntegration {
  private apiEndpoint: string;
  private maxDeductionPct: number;

  constructor(apiEndpoint: string = '/api/pension/v1', maxDeductionPct: number = 10) {
    this.apiEndpoint = apiEndpoint;
    this.maxDeductionPct = maxDeductionPct;
  }

  /**
   * Get pensioner data
   */
  async getPensionerData(pensionerId: string): Promise<PensionData> {
    // In production, call Pension Fund API
    // Mock implementation
    return {
      pensioner_id: pensionerId,
      pension_amount: 45000,
      pension_type: 'military',
      service_years: 25,
      combat_years: 5,
      rank: 'colonel',
    };
  }

  /**
   * Check if premium deduction is allowed
   */
  async checkDeductionEligibility(pensionerId: string, premiumAmount: number): Promise<{
    eligible: boolean;
    max_deduction: number;
    reason?: string;
  }> {
    const data = await this.getPensionerData(pensionerId);
    const maxDeduction = data.pension_amount * (this.maxDeductionPct / 100);

    if (premiumAmount > maxDeduction) {
      return {
        eligible: false,
        max_deduction: maxDeduction,
        reason: `Premium ${premiumAmount} exceeds maximum deduction ${maxDeduction} (${this.maxDeductionPct}% of pension)`,
      };
    }

    return {
      eligible: true,
      max_deduction: maxDeduction,
    };
  }

  /**
   * Register premium deduction
   */
  async registerDeduction(request: DeductionRequest): Promise<DeductionResult> {
    const eligibility = await this.checkDeductionEligibility(
      request.pensioner_id,
      request.amount
    );

    if (!eligibility.eligible) {
      return {
        success: false,
        error: eligibility.reason,
      };
    }

    // In production, call Pension Fund API
    return {
      success: true,
      deduction_id: `DED-${Date.now()}`,
    };
  }

  /**
   * Cancel deduction
   */
  async cancelDeduction(deductionId: string): Promise<boolean> {
    // In production, call Pension Fund API
    return true;
  }

  /**
   * Get recommended products for pensioner
   */
  async getRecommendedProducts(pensionerId: string): Promise<string[]> {
    const data = await this.getPensionerData(pensionerId);
    const products: string[] = [];

    // Life insurance for all
    products.push('LIFE-VET');

    // Health based on pension amount
    if (data.pension_amount > 30000) {
      products.push('HEALTH-STD');
    } else {
      products.push('HEALTH-BASIC');
    }

    // Disability if no existing disability
    if (!data.disability_group) {
      products.push('DIS-INCOME');
    }

    return products;
  }

  /**
   * Coordinate benefits for claim
   */
  async coordinateBenefits(claimId: string, pensionerId: string, claimType: string): Promise<{
    insurance_benefit: number;
    pension_benefit: number;
    total: number;
    coordination_type: string;
  }> {
    // Mock implementation
    const insuranceBenefit = 50000;
    let pensionBenefit = 0;

    // Pension may provide additional benefit for disability/death
    if (claimType === 'disability' || claimType === 'death') {
      pensionBenefit = 100000; // One-time pension benefit
    }

    return {
      insurance_benefit: insuranceBenefit,
      pension_benefit: pensionBenefit,
      total: insuranceBenefit + pensionBenefit,
      coordination_type: pensionBenefit > 0 ? 'supplemental' : 'insurance_primary',
    };
  }
}

export default PensionIntegration;
