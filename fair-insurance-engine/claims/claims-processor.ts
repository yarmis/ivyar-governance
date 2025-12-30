/**
 * Claims Processor
 */

import { Claim, ClaimStatus, StatusChange } from '../models/types';
import { ClaimsConfig } from '../config/insurance-config';

export interface ClaimSubmission {
  policy_id: string;
  claim_type: string;
  incident_date: string;
  description: string;
  claimed_amount: number;
}

export class ClaimsProcessor {
  private config: ClaimsConfig;

  constructor(config: ClaimsConfig) {
    this.config = config;
  }

  /**
   * Submit new claim
   */
  async submit(submission: ClaimSubmission): Promise<Claim> {
    const claim: Claim = {
      id: this.generateId(),
      claim_number: this.generateClaimNumber(),
      policy_id: submission.policy_id,
      insured_id: '', // Would be fetched from policy
      claim_type: submission.claim_type,
      incident_date: submission.incident_date,
      reported_date: new Date().toISOString(),
      description: submission.description,
      claimed_amount: submission.claimed_amount,
      currency: 'UAH',
      status: ClaimStatus.SUBMITTED,
      priority: this.determinePriority(submission.claimed_amount),
      documents: [],
      status_history: [{
        status: ClaimStatus.SUBMITTED,
        changed_at: new Date().toISOString(),
        changed_by: 'system',
      }],
      coordinate_with_pension: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Auto-approve small claims
    if (submission.claimed_amount <= this.config.auto_approve_threshold) {
      claim.status = ClaimStatus.APPROVED;
      claim.approved_amount = submission.claimed_amount;
      claim.status_history.push({
        status: ClaimStatus.APPROVED,
        changed_at: new Date().toISOString(),
        changed_by: 'auto-processor',
        reason: 'Auto-approved: below threshold',
      });
    }

    return claim;
  }

  /**
   * Process claim
   */
  async process(claimId: string): Promise<Claim> {
    // Mock implementation
    const claim = {} as Claim;
    
    // Would include:
    // 1. Document verification
    // 2. Coverage check
    // 3. Fraud detection
    // 4. Approval workflow
    // 5. Payment initiation
    
    return claim;
  }

  /**
   * Approve claim
   */
  async approve(claimId: string, approvedAmount: number, notes?: string): Promise<Claim> {
    const claim = {} as Claim;
    claim.status = ClaimStatus.APPROVED;
    claim.approved_amount = approvedAmount;
    claim.status_history.push({
      status: ClaimStatus.APPROVED,
      changed_at: new Date().toISOString(),
      changed_by: 'claims-officer',
      reason: notes,
    });
    return claim;
  }

  /**
   * Deny claim
   */
  async deny(claimId: string, reason: string): Promise<Claim> {
    const claim = {} as Claim;
    claim.status = ClaimStatus.DENIED;
    claim.status_history.push({
      status: ClaimStatus.DENIED,
      changed_at: new Date().toISOString(),
      changed_by: 'claims-officer',
      reason,
    });
    return claim;
  }

  /**
   * Pay claim
   */
  async pay(claimId: string): Promise<Claim> {
    const claim = {} as Claim;
    claim.status = ClaimStatus.PAID;
    claim.paid_amount = claim.approved_amount;
    claim.payment_date = new Date().toISOString();
    return claim;
  }

  private generateId(): string {
    return `CLM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateClaimNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.random().toString().substr(2, 8);
    return `CLM-${year}-${random}`;
  }

  private determinePriority(amount: number): 'low' | 'medium' | 'high' | 'urgent' {
    if (amount > 500000) return 'urgent';
    if (amount > 100000) return 'high';
    if (amount > 50000) return 'medium';
    return 'low';
  }
}

export default ClaimsProcessor;
