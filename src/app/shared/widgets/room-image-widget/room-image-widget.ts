import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-room-image-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="room-image-section">
      <div class="room-image">
        <img [src]="imageSrc" [alt]="altText" (error)="onImageError($event)">
      </div>
    </div>
  `,
  styles: [`
    .room-image-section {
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    }

    .room-image {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .room-image::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
      z-index: 1;
    }

    .room-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 2;
    }

    @media (max-width: 480px) {
      .room-image-section {
        height: 250px;
      }
    }

    @media (max-width: 768px) {
      .room-image-section {
        height: 280px;
      }
    }
  `]
})
export class RoomImageWidget {
  @Input() imageSrc: string = 'assets/room-image.jpg';
  @Input() altText: string = 'Double Deluxe Room';

  onImageError(event: any): void {
    // Fallback to SVG if JPG fails to load
    if (event.target.src && !event.target.src.includes('.svg')) {
      event.target.src = 'assets/room-image.svg';
    } else {
      event.target.style.display = 'none';
    }
  }
}
