/**
 * AI Admin API
 */

import { Router, Request, Response } from 'express';
import AIService from '../services/ai-service';
import PromptRegistry from '../prompts/prompt-registry';
import UsageTracker from '../analytics/usage-tracker';
import HealthCheckService from '../monitoring/health-check';
import AuditLogger from '../services/audit-logger';
import { defaultConfig } from '../config/ai-config';

const router = Router();
const aiService = new AIService(defaultConfig);
const promptRegistry = new PromptRegistry();
const usageTracker = new UsageTracker();
const healthCheck = new HealthCheckService();
const auditLogger = new AuditLogger();

router.get('/health', async (req: Request, res: Response) => {
  res.json(await healthCheck.getHealth());
});

router.post('/process', async (req: Request, res: Response) => {
  try { res.json({ success: true, data: await aiService.process(req.body) }); }
  catch (e) { res.status(500).json({ success: false, error: (e as Error).message }); }
});

router.get('/prompts', (req: Request, res: Response) => {
  res.json({ success: true, data: promptRegistry.list(req.query.category as string) });
});

router.get('/prompts/:id', (req: Request, res: Response) => {
  const p = promptRegistry.get(req.params.id);
  if (!p) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: p });
});

router.get('/usage', async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  res.json({ success: true, data: await usageTracker.getSummary(startDate as string || new Date(Date.now() - 30*24*60*60*1000).toISOString(), endDate as string || new Date().toISOString()) });
});

router.get('/usage/daily', async (req: Request, res: Response) => {
  res.json({ success: true, data: await usageTracker.getDailyUsage(parseInt(req.query.days as string) || 30) });
});

router.get('/audit', async (req: Request, res: Response) => {
  res.json({ success: true, data: await auditLogger.query({ userId: req.query.userId as string, feature: req.query.feature as string, limit: parseInt(req.query.limit as string) || 100 }) });
});

export default router;
