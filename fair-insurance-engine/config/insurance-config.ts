/**
 * Fair Insurance Engine Configuration
 */

export interface InsuranceConfig {
  general: {
    currency: string;
    max_policies_per_person: number;
  };
  
  products: {
    life: {
      min_coverage: number;
      max_coverage: number;
      base_rate_per_1000: number;
    };
    health: {
      plans: Array<{
        code: string;
        name: string;
        annual_premium: number;
        coverage_limit: number;
        deductible: number;
      }>;
    };
  };
  
  discounts: {
    military: number;
    pensioner: number;
    multi_policy: number;
  };
  
  loadings: {
    combat_veteran: number;
    high_risk: number;
  };
  
  pension_integration: {
    enabled: boolean;
    max_deduction_percentage: number;
    auto_enroll_enabled: boolean;
  };
}

export const defaultConfig: InsuranceConfig = {
  general: {
    currency: 'UAH',
    max_policies_per_person: 5,
  },
  
  products: {
    life: {
      min_coverage: 50000,
      max_coverage: 2000000,
      base_rate_per_1000: 3.5,
    },
    health: {
      plans: [
        { code: 'BASIC', name: 'Basic Health', annual_premium: 3600, coverage_limit: 100000, deductible: 2000 },
        { code: 'STANDARD', name: 'Standard Health', annual_premium: 7200, coverage_limit: 300000, deductible: 1000 },
        { code: 'PREMIUM', name: 'Premium Health', annual_premium: 14400, coverage_limit: 1000000, deductible: 0 },
      ],
    },
  },
  
  discounts: {
    military: 0.15,       // 15% discount
    pensioner: 0.10,      // 10% discount
    multi_policy: 0.05,   // 5% for 2+ policies
  },
  
  loadings: {
    combat_veteran: 0.25, // 25% loading
    high_risk: 0.50,      // 50% loading
  },
  
  pension_integration: {
    enabled: true,
    max_deduction_percentage: 10,  // Max 10% of pension
    auto_enroll_enabled: true,
  },
};

export default defaultConfig;
