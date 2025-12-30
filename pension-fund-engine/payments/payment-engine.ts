/**
 * Payment Engine
 * Handles pension payment processing
 */

import { Payment, PaymentStatus, PaymentMethod, Pensioner, PensionBenefit } from '../models/types';
import { PaymentConfig } from '../config/pension-config';

export interface PaymentRequest {
  pensioner: Pensioner;
  benefit: PensionBenefit;
  period_month: number;
  period_year: number;
  method?: PaymentMethod;
}

export interface BatchPaymentResult {
  total: number;
  successful: number;
  failed: number;
  pending: number;
  payments: Payment[];
  errors: Array<{ pensioner_id: string; error: string }>;
}

export class PaymentEngine {
  private config: PaymentConfig;

  constructor(config: PaymentConfig) {
    this.config = config;
  }

  /**
   * Create single payment
   */
  createPayment(request: PaymentRequest): Payment {
    const { pensioner, benefit, period_month, period_year, method } = request;

    return {
      id: this.generateId(),
      pensioner_id: pensioner.id,
      benefit_id: benefit.id,
      amount: benefit.net_amount,
      currency: 'UAH',
      payment_date: this.calculatePaymentDate(period_month, period_year),
      period_month,
      period_year,
      method: method || this.determinePaymentMethod(pensioner),
      status: PaymentStatus.PENDING,
      retry_count: 0,
      created_at: new Date().toISOString(),
    };
  }

  /**
   * Process payment batch
   */
  async processBatch(payments: Payment[]): Promise<BatchPaymentResult> {
    const results: Payment[] = [];
    const errors: Array<{ pensioner_id: string; error: string }> = [];

    for (const payment of payments) {
      try {
        const processed = await this.processPayment(payment);
        results.push(processed);
      } catch (error) {
        payment.status = PaymentStatus.FAILED;
        payment.failure_reason = (error as Error).message;
        results.push(payment);
        errors.push({
          pensioner_id: payment.pensioner_id,
          error: (error as Error).message,
        });
      }
    }

    return {
      total: payments.length,
      successful: results.filter(p => p.status === PaymentStatus.COMPLETED).length,
      failed: results.filter(p => p.status === PaymentStatus.FAILED).length,
      pending: results.filter(p => p.status === PaymentStatus.PENDING).length,
      payments: results,
      errors,
    };
  }

  /**
   * Process single payment
   */
  async processPayment(payment: Payment): Promise<Payment> {
    payment.status = PaymentStatus.PROCESSING;
    payment.processed_at = new Date().toISOString();

    try {
      // Validate payment
      this.validatePayment(payment);

      // Execute payment based on method
      const result = await this.executePayment(payment);

      if (result.success) {
        payment.status = PaymentStatus.COMPLETED;
        payment.completed_at = new Date().toISOString();
        payment.transaction_id = result.transaction_id;
        payment.bank_reference = result.reference;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      payment.status = PaymentStatus.FAILED;
      payment.failure_reason = (error as Error).message;
      payment.retry_count++;

      // Check if retry is possible
      if (payment.retry_count < this.config.retry_attempts) {
        payment.status = PaymentStatus.PENDING;
      }
    }

    return payment;
  }

  /**
   * Validate payment before processing
   */
  private validatePayment(payment: Payment): void {
    if (payment.amount <= 0) {
      throw new Error('Invalid payment amount');
    }
    if (!payment.pensioner_id) {
      throw new Error('Missing pensioner ID');
    }
    if (payment.status === PaymentStatus.COMPLETED) {
      throw new Error('Payment already completed');
    }
  }

  /**
   * Execute payment (mock implementation)
   */
  private async executePayment(payment: Payment): Promise<{
    success: boolean;
    transaction_id?: string;
    reference?: string;
    error?: string;
  }> {
    // In production, integrate with actual payment providers
    // This is a mock implementation
    
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API call

    // Mock 95% success rate
    if (Math.random() > 0.05) {
      return {
        success: true,
        transaction_id: `TXN_${Date.now()}`,
        reference: `REF_${payment.id}`,
      };
    }

    return {
      success: false,
      error: 'Payment provider temporarily unavailable',
    };
  }

  /**
   * Determine payment method based on pensioner data
   */
  private determinePaymentMethod(pensioner: Pensioner): PaymentMethod {
    if (pensioner.bank_account?.iban) {
      return PaymentMethod.BANK_TRANSFER;
    }
    if (pensioner.address.country !== 'Ukraine') {
      return PaymentMethod.INTERNATIONAL;
    }
    return PaymentMethod.POSTAL;
  }

  /**
   * Calculate payment date
   */
  private calculatePaymentDate(month: number, year: number): string {
    const date = new Date(year, month - 1, this.config.payment_day);
    
    // If payment day falls on weekend, move to next Monday
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) date.setDate(date.getDate() + 1);
    if (dayOfWeek === 6) date.setDate(date.getDate() + 2);
    
    return date.toISOString();
  }

  /**
   * Get payment statistics
   */
  async getStatistics(month: number, year: number): Promise<{
    total_payments: number;
    total_amount: number;
    by_status: Record<PaymentStatus, number>;
    by_method: Record<PaymentMethod, number>;
  }> {
    // In production, query from database
    return {
      total_payments: 0,
      total_amount: 0,
      by_status: {
        [PaymentStatus.PENDING]: 0,
        [PaymentStatus.PROCESSING]: 0,
        [PaymentStatus.COMPLETED]: 0,
        [PaymentStatus.FAILED]: 0,
        [PaymentStatus.CANCELLED]: 0,
      },
      by_method: {
        [PaymentMethod.BANK_TRANSFER]: 0,
        [PaymentMethod.POSTAL]: 0,
        [PaymentMethod.CASH]: 0,
        [PaymentMethod.INTERNATIONAL]: 0,
      },
    };
  }

  private generateId(): string {
    return `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default PaymentEngine;
