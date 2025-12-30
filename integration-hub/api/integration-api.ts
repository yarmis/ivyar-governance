/**
 * Integration Hub API
 */

import { Router, Request, Response } from 'express';
import { PensionInsuranceBridge } from '../pension-insurance/bridge';

const router = Router();
const bridge = new PensionInsuranceBridge();

// Get unified profile
router.get('/profile/:personal_id', async (req: Request, res: Response) => {
  try {
    const profile = await bridge.getUnifiedProfile(req.params.personal_id);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Sync pensioner to insurance
router.post('/sync/pensioner-to-insurance', async (req: Request, res: Response) => {
  try {
    const { pensioner_id } = req.body;
    const result = await bridge.syncPensionerToInsurance(pensioner_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Auto-enroll pensioner
router.post('/auto-enroll', async (req: Request, res: Response) => {
  try {
    const { pensioner_id, products } = req.body;
    const result = await bridge.autoEnrollPensioner(pensioner_id, products);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Process premium deduction
router.post('/deduction', async (req: Request, res: Response) => {
  try {
    const { pensioner_id, policy_id, amount, month, year } = req.body;
    const deduction = await bridge.processPremiumDeduction(
      pensioner_id, policy_id, amount, month, year
    );
    res.json({ success: true, data: deduction });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Coordinate benefits
router.post('/coordinate-benefits', async (req: Request, res: Response) => {
  try {
    const { claim_id, pensioner_id, claim_type } = req.body;
    const result = await bridge.coordinateBenefits(claim_id, pensioner_id, claim_type);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Get combined statement
router.get('/statement/:pensioner_id', async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    const statement = await bridge.getCombinedStatement(
      req.params.pensioner_id,
      parseInt(month as string) || new Date().getMonth() + 1,
      parseInt(year as string) || new Date().getFullYear()
    );
    res.json({ success: true, data: statement });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Health check
router.get('/health', async (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      integrations: {
        'pension-insurance': 'active',
      },
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
