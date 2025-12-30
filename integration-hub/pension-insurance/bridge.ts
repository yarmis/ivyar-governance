/**
 * Pension-Insurance Integration Bridge
 */

// Types
export interface PensionerProfile {
  pensioner_id: string;
  personal_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  military_rank: string;
  service_years: number;
  combat_years: number;
  disability_group?: string;
  pension_type: string;
  pension_amount: number;
  status: string;
}

export interface InsuredProfile {
  insured_id: string;
  pensioner_id?: string;
  personal_id: string;
  risk_category: string;
  policies: PolicySummary[];
  total_coverage: number;
  monthly_premium: number;
}

export interface PolicySummary {
  policy_id: string;
  product_code: string;
  coverage: number;
  premium: number;
  status: string;
}

export interface UnifiedProfile {
  personal_id: string;
  name: string;
  
  // Pension Data
  pension: {
    pensioner_id: string;
    type: string;
    monthly_amount: number;
    rank: string;
    service_years: number;
    combat_years: number;
    disability_group?: string;
    status: string;
  };
  
  // Insurance Data
  insurance: {
    insured_id: string;
    policies: PolicySummary[];
    total_coverage: number;
    monthly_premiums: number;
    claims_open: number;
  };
  
  // Financial Summary
  financial: {
    gross_pension: number;
    insurance_premiums: number;
    net_pension: number;
    total_coverage: number;
  };
}

export interface PremiumDeduction {
  deduction_id: string;
  pensioner_id: string;
  policy_id: string;
  amount: number;
  status: 'pending' | 'processed' | 'failed';
  period_month: number;
  period_year: number;
  processed_at?: string;
}

export interface BenefitCoordination {
  claim_id: string;
  pensioner_id: string;
  
  // Insurance Benefit
  insurance_benefit: {
    policy_id: string;
    approved_amount: number;
    paid_amount: number;
    status: string;
  };
  
  // Pension Benefit (if applicable)
  pension_benefit?: {
    benefit_type: string;
    amount: number;
    one_time: boolean;
  };
  
  // Coordination
  coordination_type: 'insurance_primary' | 'pension_primary' | 'supplemental';
  total_benefit: number;
  notes: string[];
}

/**
 * Pension-Insurance Bridge Service
 */
export class PensionInsuranceBridge {
  private pensionApiUrl: string;
  private insuranceApiUrl: string;

  constructor(
    pensionApiUrl: string = '/api/pension/v1',
    insuranceApiUrl: string = '/api/insurance/v1'
  ) {
    this.pensionApiUrl = pensionApiUrl;
    this.insuranceApiUrl = insuranceApiUrl;
  }

  /**
   * Get unified profile
   */
  async getUnifiedProfile(personalId: string): Promise<UnifiedProfile> {
    // Fetch from both systems
    const [pensionProfile, insuranceProfile] = await Promise.all([
      this.getPensionerProfile(personalId),
      this.getInsuredProfile(personalId),
    ]);

    const netPension = pensionProfile.pension_amount - (insuranceProfile?.monthly_premium || 0);

    return {
      personal_id: personalId,
      name: `${pensionProfile.first_name} ${pensionProfile.last_name}`,
      
      pension: {
        pensioner_id: pensionProfile.pensioner_id,
        type: pensionProfile.pension_type,
        monthly_amount: pensionProfile.pension_amount,
        rank: pensionProfile.military_rank,
        service_years: pensionProfile.service_years,
        combat_years: pensionProfile.combat_years,
        disability_group: pensionProfile.disability_group,
        status: pensionProfile.status,
      },
      
      insurance: {
        insured_id: insuranceProfile?.insured_id || '',
        policies: insuranceProfile?.policies || [],
        total_coverage: insuranceProfile?.total_coverage || 0,
        monthly_premiums: insuranceProfile?.monthly_premium || 0,
        claims_open: 0,
      },
      
      financial: {
        gross_pension: pensionProfile.pension_amount,
        insurance_premiums: insuranceProfile?.monthly_premium || 0,
        net_pension: netPension,
        total_coverage: insuranceProfile?.total_coverage || 0,
      },
    };
  }

  /**
   * Sync pensioner to insurance system
   */
  async syncPensionerToInsurance(pensionerId: string): Promise<{
    success: boolean;
    insured_id?: string;
    updates: string[];
  }> {
    const pensioner = await this.getPensionerByPensionerId(pensionerId);
    
    // Create or update insured profile
    const insuredData = {
      pensioner_id: pensionerId,
      personal_id: pensioner.personal_id,
      first_name: pensioner.first_name,
      last_name: pensioner.last_name,
      date_of_birth: pensioner.date_of_birth,
      gender: pensioner.gender,
      military_status: this.mapPensionTypeToMilitaryStatus(pensioner.pension_type),
      military_rank: pensioner.military_rank,
      service_years: pensioner.service_years,
      combat_service: pensioner.combat_years > 0,
      disability_group: pensioner.disability_group,
    };

    // Call insurance API
    const result = await this.createOrUpdateInsured(insuredData);

    return {
      success: true,
      insured_id: result.insured_id,
      updates: [
        'Profile synced',
        'Service history updated',
        pensioner.disability_group ? 'Disability status synced' : '',
      ].filter(Boolean),
    };
  }

  /**
   * Process premium deduction
   */
  async processPremiumDeduction(
    pensionerId: string,
    policyId: string,
    amount: number,
    month: number,
    year: number
  ): Promise<PremiumDeduction> {
    // Validate deduction doesn't exceed limit
    const pensioner = await this.getPensionerByPensionerId(pensionerId);
    const maxDeduction = pensioner.pension_amount * 0.10; // 10% limit

    if (amount > maxDeduction) {
      throw new Error(`Premium ${amount} exceeds max deduction ${maxDeduction}`);
    }

    // Register deduction with pension system
    const deduction: PremiumDeduction = {
      deduction_id: `DED-${Date.now()}`,
      pensioner_id: pensionerId,
      policy_id: policyId,
      amount,
      status: 'pending',
      period_month: month,
      period_year: year,
    };

    // In production, would call pension API
    console.log('Registering premium deduction:', deduction);

    return deduction;
  }

  /**
   * Get all deductions for pensioner
   */
  async getPensionerDeductions(pensionerId: string): Promise<PremiumDeduction[]> {
    // Call pension API to get deductions
    return [];
  }

  /**
   * Coordinate benefits for claim
   */
  async coordinateBenefits(
    claimId: string,
    pensionerId: string,
    claimType: string
  ): Promise<BenefitCoordination> {
    // Get insurance claim details
    const insuranceBenefit = await this.getInsuranceClaimBenefit(claimId);
    
    // Check if pension benefit applies
    let pensionBenefit;
    if (this.isPensionBenefitApplicable(claimType)) {
      pensionBenefit = await this.getPensionBenefit(pensionerId, claimType);
    }

    // Determine coordination type
    const coordinationType = this.determineCoordinationType(claimType);

    // Calculate total
    const total = (insuranceBenefit?.approved_amount || 0) + 
                  (pensionBenefit?.amount || 0);

    return {
      claim_id: claimId,
      pensioner_id: pensionerId,
      insurance_benefit: {
        policy_id: insuranceBenefit?.policy_id || '',
        approved_amount: insuranceBenefit?.approved_amount || 0,
        paid_amount: insuranceBenefit?.paid_amount || 0,
        status: insuranceBenefit?.status || 'pending',
      },
      pension_benefit: pensionBenefit,
      coordination_type: coordinationType,
      total_benefit: total,
      notes: [
        `Insurance: ${coordinationType === 'insurance_primary' ? 'Primary' : 'Secondary'}`,
        pensionBenefit ? `Pension supplement: ${pensionBenefit.amount} ₴` : 'No pension benefit applicable',
      ],
    };
  }

  /**
   * Get combined statement
   */
  async getCombinedStatement(
    pensionerId: string,
    month: number,
    year: number
  ): Promise<{
    period: string;
    pension: {
      gross: number;
      deductions: Array<{ description: string; amount: number }>;
      net: number;
    };
    insurance: {
      policies: Array<{ name: string; coverage: number; premium: number }>;
      total_premiums: number;
    };
    summary: {
      total_income: number;
      total_deductions: number;
      net_income: number;
      total_coverage: number;
    };
  }> {
    const profile = await this.getUnifiedProfile(pensionerId);
    
    return {
      period: `${month}/${year}`,
      pension: {
        gross: profile.financial.gross_pension,
        deductions: [
          { description: 'Insurance Premiums', amount: profile.financial.insurance_premiums },
        ],
        net: profile.financial.net_pension,
      },
      insurance: {
        policies: profile.insurance.policies.map(p => ({
          name: p.product_code,
          coverage: p.coverage,
          premium: p.premium,
        })),
        total_premiums: profile.financial.insurance_premiums,
      },
      summary: {
        total_income: profile.financial.gross_pension,
        total_deductions: profile.financial.insurance_premiums,
        net_income: profile.financial.net_pension,
        total_coverage: profile.financial.total_coverage,
      },
    };
  }

  /**
   * Auto-enroll pensioner in insurance
   */
  async autoEnrollPensioner(
    pensionerId: string,
    products: string[]
  ): Promise<{
    success: boolean;
    enrolled_policies: string[];
    monthly_premium: number;
    error?: string;
  }> {
    try {
      // Get pensioner profile
      const pensioner = await this.getPensionerByPensionerId(pensionerId);
      
      // Check eligibility
      const maxPremium = pensioner.pension_amount * 0.10;
      
      // Sync profile first
      await this.syncPensionerToInsurance(pensionerId);
      
      // Create policies
      const enrolledPolicies: string[] = [];
      let totalPremium = 0;

      for (const product of products) {
        // Calculate premium for this product
        const premium = this.estimatePremium(product, pensioner);
        
        if (totalPremium + premium <= maxPremium) {
          // Create policy
          enrolledPolicies.push(product);
          totalPremium += premium;
        }
      }

      // Register premium deductions
      for (const policy of enrolledPolicies) {
        await this.processPremiumDeduction(
          pensionerId,
          policy,
          this.estimatePremium(policy, pensioner),
          new Date().getMonth() + 1,
          new Date().getFullYear()
        );
      }

      return {
        success: true,
        enrolled_policies: enrolledPolicies,
        monthly_premium: totalPremium,
      };
    } catch (error) {
      return {
        success: false,
        enrolled_policies: [],
        monthly_premium: 0,
        error: (error as Error).message,
      };
    }
  }

  // Private helper methods
  
  private async getPensionerProfile(personalId: string): Promise<PensionerProfile> {
    // Mock - would call pension API
    return {
      pensioner_id: 'PEN-001',
      personal_id: personalId,
      first_name: 'Іван',
      last_name: 'Петренко',
      date_of_birth: '1970-01-01',
      gender: 'male',
      military_rank: 'colonel',
      service_years: 28,
      combat_years: 6,
      pension_type: 'military',
      pension_amount: 51230,
      status: 'active',
    };
  }

  private async getPensionerByPensionerId(pensionerId: string): Promise<PensionerProfile> {
    return this.getPensionerProfile(pensionerId);
  }

  private async getInsuredProfile(personalId: string): Promise<InsuredProfile | null> {
    // Mock - would call insurance API
    return {
      insured_id: 'INS-001',
      pensioner_id: 'PEN-001',
      personal_id: personalId,
      risk_category: 'medium',
      policies: [
        { policy_id: 'POL-001', product_code: 'LIFE-VET', coverage: 500000, premium: 1500, status: 'active' },
        { policy_id: 'POL-002', product_code: 'HEALTH-STD', coverage: 300000, premium: 600, status: 'active' },
      ],
      total_coverage: 800000,
      monthly_premium: 2100,
    };
  }

  private async createOrUpdateInsured(data: any): Promise<{ insured_id: string }> {
    return { insured_id: `INS-${Date.now()}` };
  }

  private async getInsuranceClaimBenefit(claimId: string): Promise<any> {
    return {
      policy_id: 'POL-001',
      approved_amount: 50000,
      paid_amount: 0,
      status: 'approved',
    };
  }

  private async getPensionBenefit(pensionerId: string, claimType: string): Promise<any> {
    if (claimType === 'disability' || claimType === 'death') {
      return {
        benefit_type: 'one_time_payment',
        amount: 100000,
        one_time: true,
      };
    }
    return null;
  }

  private isPensionBenefitApplicable(claimType: string): boolean {
    return ['disability', 'death', 'injury'].includes(claimType);
  }

  private determineCoordinationType(claimType: string): 'insurance_primary' | 'pension_primary' | 'supplemental' {
    if (claimType === 'health' || claimType === 'medical') {
      return 'insurance_primary';
    }
    if (claimType === 'disability' || claimType === 'death') {
      return 'supplemental';
    }
    return 'insurance_primary';
  }

  private mapPensionTypeToMilitaryStatus(pensionType: string): string {
    const mapping: Record<string, string> = {
      'military': 'retired',
      'disability': 'disabled_veteran',
      'survivor': 'veteran',
    };
    return mapping[pensionType] || 'veteran';
  }

  private estimatePremium(product: string, pensioner: PensionerProfile): number {
    const basePremiums: Record<string, number> = {
      'LIFE-VET': 1500,
      'HEALTH-BASIC': 300,
      'HEALTH-STD': 600,
      'HEALTH-PREM': 1200,
      'DIS-INCOME': 800,
    };
    return basePremiums[product] || 500;
  }
}

export default PensionInsuranceBridge;
