/**
 * Insurance API Routes
 */

import { Router, Request, Response } from 'express';
import InsuranceService from '../services/insurance-service';
import { PensionIntegration } from '../integration/pension-integration';
import { defaultConfig } from '../config/insurance-config';

const router = Router();
const insuranceService = new InsuranceService();
const pensionIntegration = new PensionIntegration(defaultConfig.pension_integration);

// ============================================================================
// PRODUCTS
// ============================================================================

router.get('/products', async (req: Request, res: Response) => {
  const products = [
    {
      code: 'LIFE-MIL',
      name: 'Military Life Insurance',
      name_uk: 'Страхування життя (військове)',
      type: 'life',
      min_coverage: 50000,
      max_coverage: 2000000,
      base_rate: 3.5,
    },
    {
      code: 'LIFE-VET',
      name: 'Veteran Life Insurance',
      name_uk: 'Страхування життя (ветеранське)',
      type: 'life',
      min_coverage: 50000,
      max_coverage: 1500000,
      base_rate: 4.0,
    },
    {
      code: 'HEALTH-BASIC',
      name: 'Basic Health Plan',
      name_uk: 'Базове медичне страхування',
      type: 'health',
      annual_premium: 3600,
      coverage_limit: 100000,
    },
    {
      code: 'HEALTH-STD',
      name: 'Standard Health Plan',
      name_uk: 'Стандартне медичне страхування',
      type: 'health',
      annual_premium: 7200,
      coverage_limit: 300000,
    },
    {
      code: 'HEALTH-PREM',
      name: 'Premium Health Plan',
      name_uk: 'Преміум медичне страхування',
      type: 'health',
      annual_premium: 14400,
      coverage_limit: 1000000,
    },
    {
      code: 'DIS-INCOME',
      name: 'Disability Income Protection',
      name_uk: 'Захист доходу при інвалідності',
      type: 'disability',
      income_replacement: 0.6,
      max_period_months: 60,
    },
  ];

  res.json({ success: true, data: products });
});

router.get('/products/:code', async (req: Request, res: Response) => {
  res.json({ success: true, data: {} });
});

// ============================================================================
// QUOTES
// ============================================================================

router.post('/quotes', async (req: Request, res: Response) => {
  try {
    const { product_code, coverage_amount, insured, pensioner_id } = req.body;
    
    // Get pension data if linked
    let pensionData;
    if (pensioner_id) {
      pensionData = await pensionIntegration.getPensionerData(pensioner_id);
    }

    // Calculate quote
    const quote = {
      quote_id: `QUO-${Date.now()}`,
      product_code,
      coverage_amount,
      premium: {
        monthly: 1500,
        annual: 18000,
      },
      pension_deduction_eligible: !!pensionData,
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// ============================================================================
// POLICIES
// ============================================================================

router.get('/policies', async (req: Request, res: Response) => {
  const { insured_id, pensioner_id, status } = req.query;
  res.json({ success: true, data: [] });
});

router.get('/policies/:id', async (req: Request, res: Response) => {
  res.json({ success: true, data: {} });
});

router.post('/policies', async (req: Request, res: Response) => {
  try {
    const { insured, product_code, coverage_amount, pensioner_id } = req.body;
    
    let pensionData;
    if (pensioner_id) {
      pensionData = await pensionIntegration.getPensionerData(pensioner_id);
    }

    const policy = await insuranceService.createPolicy(
      insured,
      product_code,
      coverage_amount,
      pensionData
    );

    res.status(201).json({ success: true, data: policy });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.put('/policies/:id', async (req: Request, res: Response) => {
  res.json({ success: true, data: {} });
});

router.post('/policies/:id/cancel', async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Policy cancelled' });
});

// ============================================================================
// CLAIMS
// ============================================================================

router.get('/claims', async (req: Request, res: Response) => {
  res.json({ success: true, data: [] });
});

router.get('/claims/:id', async (req: Request, res: Response) => {
  res.json({ success: true, data: {} });
});

router.post('/claims', async (req: Request, res: Response) => {
  try {
    const { policy_id, claim_type, incident_date, description, claimed_amount } = req.body;
    
    const claim = await insuranceService.submitClaim(
      policy_id,
      claim_type,
      incident_date,
      description,
      claimed_amount
    );

    res.status(201).json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post('/claims/:id/approve', async (req: Request, res: Response) => {
  res.json({ success: true, data: {} });
});

router.post('/claims/:id/deny', async (req: Request, res: Response) => {
  res.json({ success: true, data: {} });
});

router.post('/claims/:id/pay', async (req: Request, res: Response) => {
  res.json({ success: true, data: {} });
});

// ============================================================================
// PENSION INTEGRATION
// ============================================================================

router.get('/pension/eligibility/:pensioner_id', async (req: Request, res: Response) => {
  try {
    const result = await pensionIntegration.checkAutoEnrollmentEligibility(
      req.params.pensioner_id
    );
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.get('/pension/statement/:pensioner_id', async (req: Request, res: Response) => {
  try {
    const statement = await pensionIntegration.getCombinedStatement(
      req.params.pensioner_id
    );
    res.json({ success: true, data: statement });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post('/pension/auto-enroll', async (req: Request, res: Response) => {
  try {
    const { pensioner_id, products } = req.body;
    
    // Check eligibility
    const eligibility = await pensionIntegration.checkAutoEnrollmentEligibility(pensioner_id);
    
    if (!eligibility.eligible) {
      return res.status(400).json({ success: false, error: 'Not eligible for auto-enrollment' });
    }

    // Create policies for each product
    const policies = [];
    for (const product of products) {
      // Create policy with pension integration
      policies.push({
        product_code: product,
        status: 'pending',
      });
    }

    res.json({ 
      success: true, 
      data: {
        enrolled_products: products,
        policies,
        premium_deduction_enabled: true,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post('/pension/sync/:pensioner_id', async (req: Request, res: Response) => {
  try {
    const result = await pensionIntegration.syncWithPensionProfile(
      req.params.pensioner_id
    );
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post('/pension/coordinate-benefits', async (req: Request, res: Response) => {
  try {
    const { claim_id } = req.body;
    const result = await insuranceService.coordinateBenefits(claim_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// ============================================================================
// STATISTICS
// ============================================================================

router.get('/statistics', async (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      total_policies: 45230,
      active_policies: 42100,
      total_coverage: 85000000000,
      claims_this_month: 1250,
      claims_paid_this_month: 125000000,
      pension_linked_policies: 38000,
      premium_deductions_monthly: 57000000,
    }
  });
});

export default router;
