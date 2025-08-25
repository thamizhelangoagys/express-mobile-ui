import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface BookingDetails {
  bookingId: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  guestName: string;
  totalAmount: number;
  status: string;
}

@Component({
  selector: 'app-booking-details-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './booking-details-modal.html',
  styleUrl: './booking-details-modal.scss'
})
export class BookingDetailsModal {
  @Input() bookingDetails: BookingDetails = {
    bookingId: 'AC56897',
    roomType: 'Double Deluxe Room',
    checkInDate: 'Dec 24, 2024',
    checkOutDate: 'Dec 27, 2024',
    numberOfNights: 3,
    guestName: 'John Doe',
    totalAmount: 1440.00,
    status: 'Confirmed'
  };

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
