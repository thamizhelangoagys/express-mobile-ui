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
    }

    .room-image {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .room-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 480px) {
      .room-image-section {
        height: 250px;
      }
    }
  `]
})
export class RoomImageWidget {
  @Input() imageSrc: string = 'assets/hotel-room.svg';
  @Input() altText: string = 'Hotel Room';

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }
}
