/**
 * Compliance API Endpoints
 */

import { Router, Request, Response } from 'express';
import ComplianceService from '../services/compliance-service';
import AuditService from '../services/audit-service';
import ReportGenerator from '../reports/report-generator';

const router = Router();
const complianceService = new ComplianceService();
const auditService = new AuditService();
const reportGenerator = new ReportGenerator();

/**
 * Check compliance for entity
 * POST /api/compliance/check
 */
router.post('/check', async (req: Request, res: Response) => {
  try {
    const { entity, options } = req.body;
    
    const summary = await complianceService.checkEntity(entity, options);
    
    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

/**
 * Check compliance for multiple entities
 * POST /api/compliance/check-batch
 */
router.post('/check-batch', async (req: Request, res: Response) => {
  try {
    const { entities, options } = req.body;
    
    const summaries = await complianceService.checkEntities(entities, options);
    
    res.json({
      success: true,
      data: Object.fromEntries(summaries),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

/**
 * Get all rules
 * GET /api/compliance/rules
 */
router.get('/rules', async (req: Request, res: Response) => {
  try {
    const rules = complianceService.getAllRules();
    
    res.json({
      success: true,
      data: rules,
      total: rules.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

/**
 * Get rule by ID
 * GET /api/compliance/rules/:ruleId
 */
router.get('/rules/:ruleId', async (req: Request, res: Response) => {
  try {
    const rule = complianceService.getRule(req.params.ruleId);
    
    if (!rule) {
      return res.status(404).json({
        success: false,
        error: 'Rule not found',
      });
    }
    
    res.json({
      success: true,
      data: rule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

/**
 * Get audit log
 * GET /api/compliance/audit
 */
router.get('/audit', async (req: Request, res: Response) => {
  try {
    const entries = await auditService.query({
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      eventType: req.query.eventType as any,
      ruleId: req.query.ruleId as string,
      entityId: req.query.entityId as string,
      limit: parseInt(req.query.limit as string) || 100,
    });
    
    res.json({
      success: true,
      data: entries,
      total: entries.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

/**
 * Generate compliance report
 * POST /api/compliance/reports
 */
router.post('/reports', async (req: Request, res: Response) => {
  try {
    const { type, period, filters } = req.body;
    
    // Get results based on filters
    const results: any[] = []; // Fetch from database
    const rules = complianceService.getAllRules();
    const auditEntries = await auditService.query({ ...period });
    
    let report;
    
    switch (type) {
      case 'full_compliance':
        report = await reportGenerator.generateFullReport(
          results, rules, auditEntries, period
        );
        break;
      case 'violations_summary':
        report = await reportGenerator.generateViolationsReport(results, period);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid report type',
        });
    }
    
    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

/**
 * Get violations summary
 * GET /api/compliance/violations/summary
 */
router.get('/violations/summary', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const summary = await auditService.getViolationsSummary(
      startDate as string,
      endDate as string
    );
    
    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

export default router;
