/**
 * Underwriting Engine
 */

import { Insured, UnderwritingDecision, RiskCategory } from '../models/types';
import { UnderwritingConfig } from '../config/insurance-config';

export class UnderwritingEngine {
  private config: UnderwritingConfig;

  constructor(config: UnderwritingConfig) {
    this.config = config;
  }

  /**
   * Evaluate risk and make underwriting decision
   */
  async evaluate(insured: Insured, productCode: string): Promise<UnderwritingDecision> {
    // Calculate risk score
    const riskScore = this.calculateRiskScore(insured);
    
    // Determine risk category
    const riskCategory = this.determineRiskCategory(riskScore);
    
    // Make decision
    let decision: 'approved' | 'approved_with_conditions' | 'declined';
    let conditions: string[] = [];
    let exclusions: string[] = [];
    let premiumAdjustment = 0;

    if (riskScore >= this.config.auto_approve_threshold) {
      decision = 'approved';
    } else if (riskScore >= this.config.decline_threshold) {
      decision = 'approved_with_conditions';
      
      // Add conditions based on factors
      if (insured.combat_service) {
        conditions.push('Combat service waiting period: 90 days');
        premiumAdjustment += 25;
      }
      
      if (insured.health_conditions.length > 0) {
        exclusions.push(...insured.health_conditions.map(c => `Pre-existing: ${c}`));
        premiumAdjustment += 15;
      }
      
      if (insured.disability_group) {
        conditions.push(`Disability group ${insured.disability_group} limitations apply`);
        premiumAdjustment += 20;
      }
    } else {
      decision = 'declined';
      conditions.push('Risk profile exceeds acceptable threshold');
    }

    return {
      decision,
      risk_category: riskCategory,
      risk_score: riskScore,
      premium_adjustment: premiumAdjustment,
      conditions: conditions.length > 0 ? conditions : undefined,
      exclusions: exclusions.length > 0 ? exclusions : undefined,
      decided_at: new Date().toISOString(),
      decided_by: 'underwriting-engine',
    };
  }

  /**
   * Calculate risk score (0-100)
   */
  private calculateRiskScore(insured: Insured): number {
    let score = 100;
    
    // Age factor
    const age = this.calculateAge(insured.date_of_birth);
    if (age > 60) score -= 15;
    else if (age > 50) score -= 10;
    else if (age > 40) score -= 5;
    
    // Health conditions
    score -= insured.health_conditions.length * 10;
    
    // Disability
    if (insured.disability_group === 'I') score -= 30;
    else if (insured.disability_group === 'II') score -= 20;
    else if (insured.disability_group === 'III') score -= 10;
    
    // Combat service (higher risk but also valued)
    if (insured.combat_service) score -= 5;
    
    // Military status bonus
    if (insured.military_status === 'veteran' || 
        insured.military_status === 'retired') {
      score += 5; // Slight bonus for veterans
    }
    
    // Service years bonus
    if (insured.service_years > 20) score += 5;
    
    return Math.max(0, Math.min(100, score));
  }

  private determineRiskCategory(score: number): RiskCategory {
    if (score >= 80) return RiskCategory.LOW;
    if (score >= 60) return RiskCategory.MEDIUM;
    if (score >= 40) return RiskCategory.HIGH;
    if (score >= this.config.decline_threshold) return RiskCategory.VERY_HIGH;
    return RiskCategory.DECLINED;
  }

  private calculateAge(dateOfBirth: string): number {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }
}

export default UnderwritingEngine;
