/**
 * Pension-Medical Integration Bridge
 * Coordinates disability status, benefits, and coverage
 */

import { Patient, DisabilityGroup, BeneficiaryCategory } from '../models/types';

export interface PensionData {
  pensioner_id: string;
  pension_type: string;
  disability_group?: DisabilityGroup;
  combat_related: boolean;
  pension_amount: number;
}

export interface MedicalBenefits {
  category: BeneficiaryCategory;
  cost_sharing_waived: boolean;
  priority_access: boolean;
  caregiver_allowance: boolean;
  home_modification_eligible: boolean;
}

export class PensionMedicalBridge {
  private pensionApiEndpoint: string;

  constructor(endpoint: string = '/api/pension/v1') {
    this.pensionApiEndpoint = endpoint;
  }

  /**
   * Get patient's pension data
   */
  async getPensionData(patientId: string): Promise<PensionData | null> {
    // In production, call Pension Fund API
    return {
      pensioner_id: patientId,
      pension_type: 'military',
      disability_group: DisabilityGroup.GROUP_II,
      combat_related: true,
      pension_amount: 45000,
    };
  }

  /**
   * Determine medical benefits based on pension status
   */
  async determineMedicalBenefits(patientId: string): Promise<MedicalBenefits> {
    const pensionData = await this.getPensionData(patientId);

    if (!pensionData) {
      return {
        category: BeneficiaryCategory.CATEGORY_D,
        cost_sharing_waived: false,
        priority_access: false,
        caregiver_allowance: false,
        home_modification_eligible: false,
      };
    }

    // Combat veterans and disabled get Category A
    if (pensionData.combat_related || pensionData.disability_group) {
      return {
        category: BeneficiaryCategory.CATEGORY_A,
        cost_sharing_waived: true,
        priority_access: true,
        caregiver_allowance: pensionData.disability_group === DisabilityGroup.GROUP_I,
        home_modification_eligible: !!pensionData.disability_group,
      };
    }

    // Regular pensioners get Category B
    return {
      category: BeneficiaryCategory.CATEGORY_B,
      cost_sharing_waived: false,
      priority_access: false,
      caregiver_allowance: false,
      home_modification_eligible: false,
    };
  }

  /**
   * Sync disability status from MSEC
   */
  async syncDisabilityStatus(
    patientId: string,
    msecDecision: {
      group: DisabilityGroup;
      combat_related: boolean;
      effective_date: string;
      review_date: string;
    }
  ): Promise<void> {
    // Update patient record
    // Notify Pension Fund
    // Update beneficiary category
  }

  /**
   * Get combined benefits statement
   */
  async getCombinedStatement(patientId: string, month: number, year: number): Promise<{
    pension: { gross: number; deductions: number; net: number };
    medical: { services_used: number; cost_shared: number; remaining_oop: number };
    disability: { group?: string; benefits: string[] };
  }> {
    const pensionData = await this.getPensionData(patientId);
    
    return {
      pension: {
        gross: pensionData?.pension_amount || 0,
        deductions: 2100, // Insurance premiums
        net: (pensionData?.pension_amount || 0) - 2100,
      },
      medical: {
        services_used: 15,
        cost_shared: 0, // Category A
        remaining_oop: 0,
      },
      disability: {
        group: pensionData?.disability_group,
        benefits: [
          'Priority healthcare access',
          'No cost sharing',
          'Home modification support',
        ],
      },
    };
  }
}

export default PensionMedicalBridge;
