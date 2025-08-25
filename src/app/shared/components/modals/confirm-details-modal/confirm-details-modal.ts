import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface GuestDetails {
  name: string;
  email: string;
  mobile: string;
  address: string;
}

@Component({
  selector: 'app-confirm-details-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './confirm-details-modal.html',
  styleUrl: './confirm-details-modal.scss'
})
export class ConfirmDetailsModal {
  @Input() guestDetails: GuestDetails = {
    name: 'Alex Jeremy',
    email: 'alex.jeremy@gmail.com',
    mobile: '+1 (323) 223 - 2080',
    address: '2050 Marengo St, Los Angeles, CA 90033, United States'
  };

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  confirmDetails(): void {
    this.confirm.emit();
  }
}
