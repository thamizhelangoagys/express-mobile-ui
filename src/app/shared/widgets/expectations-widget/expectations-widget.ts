import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface ExpectationCard {
  title: string;
  description: string;
  icons: string[];
  gradient: string;
  iconColors: string[];
}

@Component({
  selector: 'app-expectations-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="what-to-expect-section">
      <h3 class="section-title">{{ sectionTitle }}</h3>
      <div class="expectations-grid">
        <div 
          *ngFor="let card of expectationCards" 
          class="expectation-card"
          [style.background]="card.gradient">
          <div class="card-image">
            <div class="card-icons">
              <mat-icon 
                *ngFor="let icon of card.icons; let i = index"
                [style.color]="card.iconColors[i]"
                [class]="'expectation-icon-' + i">
                {{ icon }}
              </mat-icon>
            </div>
          </div>
          <div class="card-content">
            <h4 class="card-title">{{ card.title }}</h4>
            <p class="card-description">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .what-to-expect-section {
      margin: 0 16px 16px 16px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0 0 16px 0;
      text-align: left;
    }

    .expectations-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .expectation-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e9ecef;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .expectation-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    .card-image {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .card-icons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      height: 100%;
    }

    .expectation-icon-0 {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .expectation-icon-1 {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .expectation-icon-2 {
      font-size: 30px;
      width: 30px;
      height: 30px;
    }

    .card-content {
      padding: 16px;
      display: block;
      background: white;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
      text-align: left;
    }

    .card-description {
      font-size: 13px;
      color: #6c757d;
      margin: 0;
      line-height: 1.4;
      text-align: left;
    }

    @media (max-width: 480px) {
      .what-to-expect-section {
        margin: 0 12px 12px 12px;
      }
      
      .expectations-grid {
        gap: 8px;
      }
      
      .card-image {
        height: 100px;
      }
      
      .expectation-icon-0 {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
      
      .expectation-icon-1 {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
      
      .expectation-icon-2 {
        font-size: 26px;
        width: 26px;
        height: 26px;
      }
      
      .card-content {
        padding: 12px;
      }
      
      .card-title {
        font-size: 14px;
      }
      
      .card-description {
        font-size: 12px;
      }
    }
  `]
})
export class ExpectationsWidget {
  @Input() sectionTitle: string = 'What to Expect?';
  @Input() expectationCards: ExpectationCard[] = [
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
  ];
}
