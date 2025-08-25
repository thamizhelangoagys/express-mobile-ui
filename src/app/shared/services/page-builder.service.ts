import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookingDetails } from '../widgets/booking-details-widget/booking-details-widget';
import { WeatherData } from '../widgets/weather-widget/weather-widget';
import { ExpectationCard } from '../widgets/expectations-widget/expectations-widget';

export interface PageWidget {
  type: 'room-image' | 'booking-details' | 'digital-key' | 'weather' | 'expectations';
  config?: any;
  order: number;
}

export interface PageConfig {
  id: string;
  title: string;
  widgets: PageWidget[];
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PageBuilderService {

  constructor() { }

  // Get page configuration by page ID
  getPageConfig(pageId: string): Observable<PageConfig> {
    const pages: { [key: string]: PageConfig } = {
      'checkin': {
        id: 'checkin',
        title: 'Hotel Check-In',
        widgets: [
          {
            type: 'room-image',
            order: 1,
            config: {
              imageSrc: 'assets/hotel-room.svg',
              altText: 'Double Deluxe Room'
            }
          },
          {
            type: 'booking-details',
            order: 2,
            config: {
              bookingDetails: {
                bookingId: '#AC56897',
                roomType: 'Double Deluxe Room',
                checkInDate: 'Dec 24, 2025',
                checkOutDate: 'Dec 27, 2025',
                nights: 3
              },
              buttonText: 'Start Check-In'
            }
          },
          {
            type: 'digital-key',
            order: 3,
            config: {
              title: 'Digital Key',
              description: 'Use your phone to unlock your room no lines, no hassle.',
              buttonText: 'Know More'
            }
          },
          {
            type: 'weather',
            order: 4,
            config: {
              title: 'Local Weather',
              weatherData: {
                temperature: '29°C',
                condition: 'Cloudy',
                location: 'Alpharetta, Georgia'
              }
            }
          },
          {
            type: 'expectations',
            order: 5,
            config: {
              sectionTitle: 'What to Expect?',
              expectationCards: [
                {
                  title: 'Breakfast & Dining',
                  description: 'Free Continental Breakfast (7 - 10 AM)',
                  icons: ['restaurant', 'local_cafe', 'cake'],
                  gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  iconColors: ['#f59e0b', '#92400e', '#d97706']
                },
                {
                  title: 'Wellness',
                  description: '24/7 Fitness Center & Swimming Pool',
                  icons: ['pool', 'fitness_center', 'spa'],
                  gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  iconColors: ['#3b82f6', '#1d4ed8', '#7c3aed']
                }
              ]
            }
          }
        ]
      },
      'dashboard': {
        id: 'dashboard',
        title: 'Hotel Dashboard',
        widgets: [
          {
            type: 'weather',
            order: 1,
            config: {
              title: 'Current Weather',
              weatherData: {
                temperature: '29°C',
                condition: 'Cloudy',
                location: 'Alpharetta, Georgia'
              }
            }
          },
          {
            type: 'digital-key',
            order: 2,
            config: {
              title: 'Room Access',
              description: 'Your digital key is ready for use.',
              buttonText: 'Access Room'
            }
          },
          {
            type: 'expectations',
            order: 3,
            config: {
              sectionTitle: 'Hotel Services',
              expectationCards: [
                {
                  title: 'Concierge',
                  description: '24/7 Front Desk Support',
                  icons: ['support_agent', 'phone', 'help'],
                  gradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  iconColors: ['#16a34a', '#15803d', '#166534']
                },
                {
                  title: 'Transportation',
                  description: 'Shuttle Service Available',
                  icons: ['directions_car', 'local_taxi', 'airport_shuttle'],
                  gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  iconColors: ['#f59e0b', '#d97706', '#b45309']
                }
              ]
            }
          }
        ]
      },
      'welcome': {
        id: 'welcome',
        title: 'Welcome to ALPHA Hotel',
        widgets: [
          {
            type: 'room-image',
            order: 1,
            config: {
              imageSrc: 'assets/hotel-room.svg',
              altText: 'Welcome to ALPHA Hotel'
            }
          },
          {
            type: 'booking-details',
            order: 2,
            config: {
              bookingDetails: {
                bookingId: '#AC56897',
                roomType: 'Double Deluxe Room',
                checkInDate: 'Dec 24, 2025',
                checkOutDate: 'Dec 27, 2025',
                nights: 3
              },
              buttonText: 'Begin Your Stay'
            }
          },
          {
            type: 'expectations',
            order: 3,
            config: {
              sectionTitle: 'Hotel Amenities',
              expectationCards: [
                {
                  title: 'Free WiFi',
                  description: 'High-speed internet throughout the hotel',
                  icons: ['wifi', 'router', 'signal_wifi_4_bar'],
                  gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                  iconColors: ['#6366f1', '#4f46e5', '#4338ca']
                },
                {
                  title: 'Parking',
                  description: 'Complimentary parking available',
                  icons: ['local_parking', 'directions_car', 'garage'],
                  gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  iconColors: ['#f59e0b', '#d97706', '#b45309']
                }
              ]
            }
          }
        ]
      }
    };

    return of(pages[pageId] || pages['checkin']);
  }

  // Get all available page configurations
  getAllPages(): Observable<string[]> {
    return of(['checkin', 'dashboard', 'welcome']);
  }

  // Create custom page configuration
  createCustomPage(widgets: PageWidget[], title: string = 'Custom Page'): PageConfig {
    return {
      id: 'custom-' + Date.now(),
      title,
      widgets: widgets.sort((a, b) => a.order - b.order)
    };
  }
}
