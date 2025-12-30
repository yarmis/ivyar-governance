/**
 * Prescription Service
 * Handles medication management and refills
 */

import {
  Prescription,
  PrescriptionStatus,
  FormularyTier,
  Patient,
  BeneficiaryCategory,
  FORMULARY_COPAYMENTS,
} from '../models/types';

export interface RefillRequest {
  prescription_id: string;
  patient_id: string;
  pharmacy_id?: string;
}

export interface RefillResult {
  success: boolean;
  prescription?: Prescription;
  error?: string;
  estimated_pickup?: string;
}

export class PrescriptionService {
  /**
   * Get patient's active prescriptions
   */
  async getActivePrescriptions(patientId: string): Promise<Prescription[]> {
    // In production, query database
    return [];
  }

  /**
   * Request prescription refill
   */
  async requestRefill(request: RefillRequest): Promise<RefillResult> {
    // Validate prescription
    const prescription = await this.getPrescription(request.prescription_id);
    
    if (!prescription) {
      return { success: false, error: 'Prescription not found' };
    }

    // Check refills remaining
    if (prescription.refills_remaining <= 0) {
      return { 
        success: false, 
        error: 'No refills remaining. Contact your provider for renewal.' 
      };
    }

    // Check if expired
    if (new Date(prescription.expiration_date) < new Date()) {
      return { 
        success: false, 
        error: 'Prescription has expired. Contact your provider for renewal.' 
      };
    }

    // Check prior authorization if required
    if (prescription.prior_authorization_required && !prescription.authorization_id) {
      return { 
        success: false, 
        error: 'Prior authorization required for this medication.' 
      };
    }

    // Process refill
    const updatedPrescription: Prescription = {
      ...prescription,
      refills_remaining: prescription.refills_remaining - 1,
      last_filled_date: new Date().toISOString(),
      next_refill_date: this.calculateNextRefillDate(prescription.days_supply),
      status: PrescriptionStatus.ACTIVE,
    };

    // Calculate pickup time
    const estimatedPickup = this.calculatePickupTime();

    return {
      success: true,
      prescription: updatedPrescription,
      estimated_pickup: estimatedPickup,
    };
  }

  /**
   * Calculate copayment for prescription
   */
  calculateCopayment(
    tier: FormularyTier,
    category: BeneficiaryCategory,
    totalCost?: number
  ): number {
    // Category A (combat veterans, disabled) - no copayment
    if (category === BeneficiaryCategory.CATEGORY_A) {
      return 0;
    }

    // Get tier copayment
    const copayment = FORMULARY_COPAYMENTS[tier];

    // Tier 5 is percentage-based
    if (tier === FormularyTier.TIER_5 && totalCost) {
      return Math.round(totalCost * 0.5); // 50% coinsurance
    }

    return copayment;
  }

  /**
   * Check drug interactions
   */
  async checkInteractions(
    patientId: string,
    newMedicationId: string
  ): Promise<{ hasInteraction: boolean; interactions: string[] }> {
    // In production, check against patient's current medications
    return { hasInteraction: false, interactions: [] };
  }

  /**
   * Get medication alternatives (generics, preferred)
   */
  async getAlternatives(medicationId: string): Promise<Array<{
    name: string;
    tier: FormularyTier;
    copayment: number;
  }>> {
    // In production, query formulary database
    return [];
  }

  // Private methods

  private async getPrescription(id: string): Promise<Prescription | null> {
    // In production, query database
    return null;
  }

  private calculateNextRefillDate(daysSupply: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysSupply - 5); // 5 days early
    return date.toISOString();
  }

  private calculatePickupTime(): string {
    const date = new Date();
    date.setHours(date.getHours() + 2); // 2 hours from now
    return date.toISOString();
  }
}

export default PrescriptionService;
