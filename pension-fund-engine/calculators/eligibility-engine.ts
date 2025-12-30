/**
 * Eligibility Engine
 * Determines retirement eligibility based on various criteria
 */

import { Pensioner, EligibilityResult, PensionType, ServiceStatus } from '../models/types';
import { EligibilityConfig } from '../config/pension-config';

export class EligibilityEngine {
  private config: EligibilityConfig;

  constructor(config: EligibilityConfig) {
    this.config = config;
  }

  /**
   * Check full eligibility for retirement
   */
  checkEligibility(pensioner: Pensioner): EligibilityResult {
    switch (pensioner.pension_type) {
      case PensionType.MILITARY:
        return this.checkMilitaryEligibility(pensioner);
      case PensionType.GOVERNMENT:
        return this.checkGovernmentEligibility(pensioner);
      case PensionType.DISABILITY:
        return this.checkDisabilityEligibility(pensioner);
      case PensionType.SURVIVOR:
        return this.checkSurvivorEligibility(pensioner);
      default:
        return this.checkGeneralEligibility(pensioner);
    }
  }

  /**
   * Check military pension eligibility
   */
  private checkMilitaryEligibility(pensioner: Pensioner): EligibilityResult {
    const reasons: string[] = [];
    const missing: string[] = [];
    const warnings: string[] = [];
    
    const age = this.calculateAge(pensioner.date_of_birth);
    const { min_age, min_service_years, min_combat_years_for_early } = this.config.military;

    // Check service years
    if (pensioner.total_service_years >= min_service_years) {
      reasons.push(`Service requirement met: ${pensioner.total_service_years} years (minimum: ${min_service_years})`);
    } else {
      missing.push(`Insufficient service: ${pensioner.total_service_years} years (need: ${min_service_years})`);
    }

    // Check age
    if (age >= min_age) {
      reasons.push(`Age requirement met: ${age} years (minimum: ${min_age})`);
    } else {
      // Check for early retirement due to combat service
      if (pensioner.combat_service_years >= min_combat_years_for_early) {
        reasons.push(`Early retirement eligible due to ${pensioner.combat_service_years} combat years`);
      } else {
        missing.push(`Age below minimum: ${age} years (need: ${min_age})`);
      }
    }

    // Check service status
    if (pensioner.service_status === ServiceStatus.RETIRED) {
      reasons.push('Service status: Retired');
    } else if (pensioner.service_status === ServiceStatus.ACTIVE) {
      warnings.push('Currently active duty - must be discharged for pension');
    }

    const eligible = missing.length === 0;
    let earliestDate: string | undefined;

    if (!eligible) {
      earliestDate = this.calculateEarliestRetirementDate(pensioner, PensionType.MILITARY);
    }

    return {
      eligible,
      pension_type: PensionType.MILITARY,
      earliest_retirement_date: earliestDate,
      reasons,
      missing_requirements: missing,
      warnings,
    };
  }

  /**
   * Check government pension eligibility
   */
  private checkGovernmentEligibility(pensioner: Pensioner): EligibilityResult {
    const reasons: string[] = [];
    const missing: string[] = [];
    const warnings: string[] = [];

    const age = this.calculateAge(pensioner.date_of_birth);
    const requiredAge = pensioner.gender === 'male' 
      ? this.config.government.male_retirement_age 
      : this.config.government.female_retirement_age;

    if (age >= requiredAge) {
      reasons.push(`Age requirement met: ${age} years`);
    } else {
      missing.push(`Age below retirement age: ${age} (need: ${requiredAge})`);
    }

    if (pensioner.total_service_years >= this.config.government.min_service_years) {
      reasons.push(`Service requirement met: ${pensioner.total_service_years} years`);
    } else {
      missing.push(`Insufficient service years: ${pensioner.total_service_years}`);
    }

    return {
      eligible: missing.length === 0,
      pension_type: PensionType.GOVERNMENT,
      reasons,
      missing_requirements: missing,
      warnings,
    };
  }

  /**
   * Check disability pension eligibility
   */
  private checkDisabilityEligibility(pensioner: Pensioner): EligibilityResult {
    const reasons: string[] = [];
    const missing: string[] = [];
    const warnings: string[] = [];

    if (!pensioner.disability_group) {
      missing.push('No disability group assigned');
    } else {
      reasons.push(`Disability group: ${pensioner.disability_group}`);
    }

    if (pensioner.disability_cause === 'combat') {
      reasons.push('Combat-related disability - eligible regardless of service length');
    } else if (this.config.disability.min_service_years > 0) {
      if (pensioner.total_service_years >= this.config.disability.min_service_years) {
        reasons.push(`Service requirement met for disability pension`);
      } else {
        missing.push(`Insufficient service for non-combat disability`);
      }
    }

    return {
      eligible: missing.length === 0,
      pension_type: PensionType.DISABILITY,
      reasons,
      missing_requirements: missing,
      warnings,
    };
  }

  /**
   * Check survivor pension eligibility
   */
  private checkSurvivorEligibility(pensioner: Pensioner): EligibilityResult {
    // Survivor pension eligibility is typically determined by the deceased's eligibility
    // and the relationship of the survivor
    return {
      eligible: true,
      pension_type: PensionType.SURVIVOR,
      reasons: ['Survivor pension - eligibility based on deceased servicemember'],
      missing_requirements: [],
      warnings: ['Requires documentation of relationship to deceased'],
    };
  }

  /**
   * Check general eligibility
   */
  private checkGeneralEligibility(pensioner: Pensioner): EligibilityResult {
    return {
      eligible: false,
      pension_type: pensioner.pension_type,
      reasons: [],
      missing_requirements: ['Pension type not recognized'],
      warnings: [],
    };
  }

  /**
   * Calculate age from date of birth
   */
  private calculateAge(dateOfBirth: string): number {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Calculate earliest possible retirement date
   */
  private calculateEarliestRetirementDate(
    pensioner: Pensioner,
    pensionType: PensionType
  ): string {
    const birth = new Date(pensioner.date_of_birth);
    let targetAge: number;

    switch (pensionType) {
      case PensionType.MILITARY:
        targetAge = this.config.military.min_age;
        break;
      case PensionType.GOVERNMENT:
        targetAge = pensioner.gender === 'male'
          ? this.config.government.male_retirement_age
          : this.config.government.female_retirement_age;
        break;
      default:
        targetAge = 65;
    }

    const retirementDate = new Date(birth);
    retirementDate.setFullYear(retirementDate.getFullYear() + targetAge);
    
    return retirementDate.toISOString().split('T')[0];
  }
}

export default EligibilityEngine;
