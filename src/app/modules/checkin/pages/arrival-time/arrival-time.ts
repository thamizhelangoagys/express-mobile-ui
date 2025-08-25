import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PageHeaderWidget } from '../../../../shared/widgets/page-header-widget/page-header-widget';
import { BookingDetails } from '../../../../shared/components/modals/booking-details-modal/booking-details-modal';

export interface ArrivalTimeOption {
  id: string;
  time: string;
  cost: string;
  selected: boolean;
}

@Component({
  selector: 'app-arrival-time',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    PageHeaderWidget
  ],
  templateUrl: './arrival-time.html',
  styleUrl: './arrival-time.scss'
})
export class ArrivalTime implements OnInit {
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

  earlyCheckinOptions: ArrivalTimeOption[] = [
    {
      id: 'early-1',
      time: '9:00 AM',
      cost: '+$40.00',
      selected: false
    },
    {
      id: 'early-2',
      time: '10:00 AM',
      cost: '+$30.00',
      selected: false
    },
    {
      id: 'early-3',
      time: '11:00 AM',
      cost: '+$20.00',
      selected: false
    }
  ];

  regularCheckinOptions: ArrivalTimeOption[] = [
    {
      id: 'regular-1',
      time: '3:00 PM',
      cost: 'Free',
      selected: true
    },
    {
      id: 'regular-2',
      time: '4:00 PM',
      cost: 'Free',
      selected: false
    },
    {
      id: 'regular-3',
      time: '5:00 PM',
      cost: 'Free',
      selected: false
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  selectTimeOption(selectedOption: ArrivalTimeOption): void {
    // Deselect all options first
    [...this.earlyCheckinOptions, ...this.regularCheckinOptions].forEach(option => {
      option.selected = false;
    });
    
    // Select the clicked option
    selectedOption.selected = true;
  }

  hasSelection(): boolean {
    return [...this.earlyCheckinOptions, ...this.regularCheckinOptions].some(option => option.selected);
  }

  viewRoomDetails(): void {
    console.log('View room details');
  }

  proceedToNext(): void {
    const selectedOption = [...this.earlyCheckinOptions, ...this.regularCheckinOptions]
      .find(option => option.selected);
    if (selectedOption) {
      this.router.navigate(['/checkin/terms'], {
        state: {
          arrivalTime: selectedOption
        }
      });
    }
  }
}
