import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface RateBreakdownItem {
  date?: string;
  description: string;
  amount: number;
}

export interface RateBreakdown {
  items: RateBreakdownItem[];
  subtotal: number;
  grandTotal: number;
}

@Component({
  selector: 'app-rate-breakdown-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './rate-breakdown-modal.html',
  styleUrl: './rate-breakdown-modal.scss'
})
export class RateBreakdownModal {
  @Input() rateBreakdown: RateBreakdown = {
    items: [
      { date: 'Dec 24, 2024', description: 'Dec 24, 2024', amount: 450.00 },
      { date: 'Dec 25, 2024', description: 'Dec 25, 2024', amount: 450.00 },
      { date: 'Dec 26, 2024', description: 'Dec 26, 2024', amount: 450.00 },
      { description: 'Incidentals', amount: 50.00 }
    ],
    subtotal: 1400.00,
    grandTotal: 1400.00
  };

  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
