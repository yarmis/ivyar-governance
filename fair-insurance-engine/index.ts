/**
 * Fair Insurance Engine
 * Main module entry point
 */

// Configuration
export { defaultConfig, type InsuranceConfig } from './config/insurance-config';

// Models
export * from './models/types';

// Services
export { InsuranceService } from './services/insurance-service';
export { PremiumCalculator } from './services/premium-calculator';

// Underwriting
export { UnderwritingEngine } from './underwriting/underwriting-engine';

// Claims
export { ClaimsProcessor } from './claims/claims-processor';

// Integration
export { PensionIntegration } from './integration/pension-integration';

// API
export { default as insuranceRouter } from './api/insurance-api';

// Module metadata
export const moduleInfo = {
  id: 'fair-insurance-engine',
  name: 'Fair Insurance Engine',
  version: '1.0.0',
  description: 'Insurance management with Pension Fund integration',
  author: 'IVYAR Team',
  license: 'Government Use License',
  integrations: ['pension-fund-engine'],
};
