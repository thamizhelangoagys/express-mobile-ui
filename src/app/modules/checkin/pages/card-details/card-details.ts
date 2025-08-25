import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { RateBreakdownModal, RateBreakdown } from '../../../../shared/components/modals/rate-breakdown-modal/rate-breakdown-modal';
import { NewCardModal, NewCardData } from '../../../../shared/components/modals/new-card-modal/new-card-modal';
import { PageHeaderWidget } from '../../../../shared/widgets/page-header-widget/page-header-widget';
import { BookingDetails } from '../../../../shared/components/modals/booking-details-modal/booking-details-modal';

export interface PaymentCard {
  id: string;
  type: 'amex' | 'mastercard' | 'visa';
  lastFour: string;
  selected: boolean;
}

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    RateBreakdownModal,
    NewCardModal,
    PageHeaderWidget
  ],
  templateUrl: './card-details.html',
  styleUrl: './card-details.scss'
})
export class CardDetails implements OnInit {
  bookingDetails: BookingDetails = {
    bookingId: 'AC56897',
    roomType: 'Double Deluxe Room',
    checkInDate: 'Dec 24, 2024',
    checkOutDate: 'Dec 27, 2024',
    numberOfNights: 3,
    guestName: 'John Doe',
    totalAmount: 1440.00,
    status: 'Confirmed'
  };

  paymentCards: PaymentCard[] = [
    {
      id: 'amex-5037',
      type: 'amex',
      lastFour: '5037',
      selected: true
    },
    {
      id: 'mastercard-9234',
      type: 'mastercard',
      lastFour: '9234',
      selected: false
    }
  ];

  showRateBreakdownModal = false;
  showNewCardModal = false;

  rateBreakdown: RateBreakdown = {
    items: [
      { date: 'Dec 24, 2024', description: 'Dec 24, 2024', amount: 450.00 },
      { date: 'Dec 25, 2024', description: 'Dec 25, 2024', amount: 450.00 },
      { date: 'Dec 26, 2024', description: 'Dec 26, 2024', amount: 450.00 },
      { description: 'Incidentals', amount: 50.00 },
      { description: 'Early Check-in Fee', amount: 40.00 }
    ],
    subtotal: 1400.00,
    grandTotal: 1440.00
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  selectCard(selectedCard: PaymentCard): void {
    // Deselect all cards first
    this.paymentCards.forEach(card => card.selected = false);
    
    // Select the clicked card
    selectedCard.selected = true;
  }

  getCardLogo(cardType: string): string {
    switch (cardType.toLowerCase()) {
      case 'amex':
        return 'assets/amex-logo.svg';
      case 'mastercard':
        return 'assets/mastercard-logo.svg';
      case 'visa':
        return 'assets/visa-logo.svg';
      default:
        return 'assets/card-logo.svg';
    }
  }

  getCardDisplayName(cardType: string): string {
    switch (cardType.toLowerCase()) {
      case 'amex':
        return 'American express';
      case 'mastercard':
        return 'Mastercard';
      case 'visa':
        return 'Visa';
      default:
        return 'Card';
    }
  }

  showRateBreakdown(): void {
    this.showRateBreakdownModal = true;
  }

  closeRateBreakdownModal(): void {
    this.showRateBreakdownModal = false;
  }

  addNewCard(): void {
    this.showNewCardModal = true;
  }

  closeNewCardModal(): void {
    this.showNewCardModal = false;
  }

  onAddNewCard(cardData: NewCardData): void {
    // Extract last 4 digits from card number
    const lastFour = cardData.cardNumber.replace(/\s/g, '').slice(-4);
    
    // Create new payment card
    const newCard: PaymentCard = {
      id: `${cardData.cardType}-${lastFour}`,
      type: cardData.cardType as 'amex' | 'mastercard' | 'visa',
      lastFour: lastFour,
      selected: true
    };

    // Deselect all existing cards
    this.paymentCards.forEach(card => card.selected = false);
    
    // Add new card and select it
    this.paymentCards.unshift(newCard);
    
    // Close modal
    this.closeNewCardModal();
    
    console.log('New card added:', cardData);
  }

  viewRoomDetails(): void {
    console.log('View room details');
  }

  completeCheckin(): void {
    console.log('Check-in completed successfully!');
    this.router.navigate(['/checkin/complete']);
  }
}
