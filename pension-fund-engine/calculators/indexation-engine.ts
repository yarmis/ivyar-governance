/**
 * Indexation Engine
 * Handles pension adjustments based on inflation and special factors
 */

import { PensionBenefit, IndexationEntry } from '../models/types';
import { IndexationConfig } from '../config/pension-config';

export interface IndexationRequest {
  benefit: PensionBenefit;
  indexationType: 'inflation' | 'special' | 'government';
  rate: number;
  effectiveDate: string;
  reason: string;
}

export interface IndexationResult {
  original_amount: number;
  indexed_amount: number;
  change_amount: number;
  change_percentage: number;
  effective_date: string;
  indexation_entry: IndexationEntry;
}

export class IndexationEngine {
  private config: IndexationConfig;

  constructor(config: IndexationConfig) {
    this.config = config;
  }

  /**
   * Apply indexation to pension benefit
   */
  applyIndexation(request: IndexationRequest): IndexationResult {
    const { benefit, indexationType, rate, effectiveDate, reason } = request;
    
    // Validate rate
    const validatedRate = this.validateRate(rate);
    
    // Calculate new amount
    const changeAmount = benefit.net_amount * validatedRate;
    const indexedAmount = benefit.net_amount + changeAmount;
    
    // Create indexation entry
    const entry: IndexationEntry = {
      date: effectiveDate,
      rate: validatedRate,
      type: indexationType,
      amount_change: changeAmount,
    };

    return {
      original_amount: benefit.net_amount,
      indexed_amount: indexedAmount,
      change_amount: changeAmount,
      change_percentage: validatedRate * 100,
      effective_date: effectiveDate,
      indexation_entry: entry,
    };
  }

  /**
   * Calculate automatic inflation indexation
   */
  calculateInflationIndexation(
    currentAmount: number,
    inflationRate: number
  ): IndexationResult | null {
    // Check if inflation exceeds threshold
    if (inflationRate < this.config.min_inflation_threshold) {
      return null;
    }

    const rate = Math.min(inflationRate, this.config.max_single_indexation);
    const changeAmount = currentAmount * rate;

    return {
      original_amount: currentAmount,
      indexed_amount: currentAmount + changeAmount,
      change_amount: changeAmount,
      change_percentage: rate * 100,
      effective_date: new Date().toISOString(),
      indexation_entry: {
        date: new Date().toISOString(),
        rate,
        type: 'inflation',
        amount_change: changeAmount,
      },
    };
  }

  /**
   * Calculate catch-up indexation for historical period
   */
  calculateCatchUpIndexation(
    currentAmount: number,
    historicalRates: Array<{ date: string; rate: number }>
  ): IndexationResult {
    let amount = currentAmount;
    const entries: IndexationEntry[] = [];

    for (const { date, rate } of historicalRates) {
      const validatedRate = this.validateRate(rate);
      const change = amount * validatedRate;
      amount += change;
      
      entries.push({
        date,
        rate: validatedRate,
        type: 'inflation',
        amount_change: change,
      });
    }

    const totalChange = amount - currentAmount;

    return {
      original_amount: currentAmount,
      indexed_amount: amount,
      change_amount: totalChange,
      change_percentage: (totalChange / currentAmount) * 100,
      effective_date: new Date().toISOString(),
      indexation_entry: entries[entries.length - 1],
    };
  }

  /**
   * Validate and cap indexation rate
   */
  private validateRate(rate: number): number {
    if (rate < 0) return 0;
    return Math.min(rate, this.config.max_single_indexation);
  }
}

export default IndexationEngine;
