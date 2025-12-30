/**
 * Appointment Service
 * Handles scheduling, confirmation, and management
 */

import {
  Appointment,
  AppointmentStatus,
  AppointmentType,
  ServiceType,
  Patient,
  Provider,
} from '../models/types';

export interface ScheduleRequest {
  patient_id: string;
  provider_id?: string;
  service_type: ServiceType;
  appointment_type: AppointmentType;
  preferred_date: string;
  preferred_time?: string;
  reason_for_visit: string;
  urgent: boolean;
}

export interface AvailableSlot {
  date: string;
  time: string;
  provider_id: string;
  provider_name: string;
  facility_name: string;
  appointment_type: AppointmentType;
}

export class AppointmentService {
  /**
   * Get available appointment slots
   */
  async getAvailableSlots(
    serviceType: ServiceType,
    startDate: string,
    endDate: string,
    providerId?: string
  ): Promise<AvailableSlot[]> {
    // In production, query scheduling system
    // Mock implementation
    const slots: AvailableSlot[] = [];
    const providers = providerId ? [providerId] : ['PROV-001', 'PROV-002'];
    
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        for (const provId of providers) {
          const times = ['09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00'];
          for (const time of times) {
            slots.push({
              date: currentDate.toISOString().split('T')[0],
              time,
              provider_id: provId,
              provider_name: provId === 'PROV-001' ? 'Dr. Koval' : 'Dr. Shevchenko',
              facility_name: 'Military Clinic A',
              appointment_type: AppointmentType.IN_PERSON,
            });
          }
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return slots;
  }

  /**
   * Schedule new appointment
   */
  async scheduleAppointment(request: ScheduleRequest): Promise<Appointment> {
    // Validate patient eligibility
    const isEligible = await this.validateEligibility(request.patient_id);
    if (!isEligible) {
      throw new Error('Patient not eligible for services');
    }

    // Check authorization if required
    const authRequired = this.isAuthorizationRequired(request.service_type);
    let authId: string | undefined;
    
    if (authRequired && !request.urgent) {
      // In production, check existing authorization or create request
      authId = undefined;
    }

    // Create appointment
    const appointment: Appointment = {
      id: this.generateId(),
      patient_id: request.patient_id,
      provider_id: request.provider_id || 'PROV-001',
      facility_id: 'FAC-001',
      service_type: request.service_type,
      appointment_type: request.appointment_type,
      scheduled_date: request.preferred_date,
      scheduled_time: request.preferred_time || '09:00',
      duration_minutes: this.getDefaultDuration(request.service_type),
      status: AppointmentStatus.SCHEDULED,
      reason_for_visit: request.reason_for_visit,
      authorization_required: authRequired,
      authorization_id: authId,
      reminder_sent: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Schedule reminders
    await this.scheduleReminders(appointment);

    return appointment;
  }

  /**
   * Confirm appointment
   */
  async confirmAppointment(appointmentId: string): Promise<Appointment> {
    // In production, update database
    return {
      id: appointmentId,
      status: AppointmentStatus.CONFIRMED,
      confirmed_at: new Date().toISOString(),
    } as Appointment;
  }

  /**
   * Cancel appointment
   */
  async cancelAppointment(
    appointmentId: string,
    reason: string
  ): Promise<Appointment> {
    return {
      id: appointmentId,
      status: AppointmentStatus.CANCELLED,
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason,
    } as Appointment;
  }

  /**
   * Reschedule appointment
   */
  async rescheduleAppointment(
    appointmentId: string,
    newDate: string,
    newTime: string
  ): Promise<Appointment> {
    // Cancel old appointment
    await this.cancelAppointment(appointmentId, 'Rescheduled');
    
    // Create new appointment with same details
    // In production, copy details from original
    return {
      id: this.generateId(),
      scheduled_date: newDate,
      scheduled_time: newTime,
      status: AppointmentStatus.SCHEDULED,
    } as Appointment;
  }

  /**
   * Check in patient
   */
  async checkIn(appointmentId: string): Promise<Appointment> {
    return {
      id: appointmentId,
      status: AppointmentStatus.CHECKED_IN,
      checked_in_at: new Date().toISOString(),
    } as Appointment;
  }

  // Private methods

  private async validateEligibility(patientId: string): Promise<boolean> {
    // In production, check enrollment status
    return true;
  }

  private isAuthorizationRequired(serviceType: ServiceType): boolean {
    const requiresAuth = [
      ServiceType.SPECIALTY_CARE,
      ServiceType.REHABILITATION,
    ];
    return requiresAuth.includes(serviceType);
  }

  private getDefaultDuration(serviceType: ServiceType): number {
    const durations: Record<ServiceType, number> = {
      [ServiceType.PRIMARY_CARE]: 30,
      [ServiceType.SPECIALTY_CARE]: 45,
      [ServiceType.EMERGENCY]: 60,
      [ServiceType.MENTAL_HEALTH]: 60,
      [ServiceType.REHABILITATION]: 60,
      [ServiceType.PREVENTIVE]: 30,
      [ServiceType.PHARMACY]: 15,
      [ServiceType.DENTAL]: 45,
      [ServiceType.VISION]: 30,
      [ServiceType.HEARING]: 30,
      [ServiceType.TELEMEDICINE]: 20,
    };
    return durations[serviceType] || 30;
  }

  private async scheduleReminders(appointment: Appointment): Promise<void> {
    // In production, schedule SMS/email reminders
    // 24 hours before
    // 2 hours before
  }

  private generateId(): string {
    return `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default AppointmentService;
