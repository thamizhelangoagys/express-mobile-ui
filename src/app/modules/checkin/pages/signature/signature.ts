import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderWidget } from '../../../../shared/widgets/page-header-widget/page-header-widget';

@Component({
  selector: 'app-signature',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    PageHeaderWidget
  ],
  templateUrl: './signature.html',
  styleUrl: './signature.scss'
})
export class Signature implements OnInit, AfterViewInit {
  @ViewChild('signatureCanvas', { static: false }) signatureCanvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  hasSignature = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  ngAfterViewInit(): void {
    this.initializeCanvas();
  }

  private initializeCanvas(): void {
    const canvas = this.signatureCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Set drawing styles
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#1e3a8a';
  }

  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    this.draw(event);
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing) return;
    
    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    
    this.checkSignature();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    this.ctx.beginPath();
  }

  startDrawingTouch(event: TouchEvent): void {
    event.preventDefault();
    this.isDrawing = true;
    this.drawTouch(event);
  }

  drawTouch(event: TouchEvent): void {
    if (!this.isDrawing) return;
    
    event.preventDefault();
    const touch = event.touches[0];
    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    
    this.checkSignature();
  }

  private checkSignature(): void {
    const canvas = this.signatureCanvas.nativeElement;
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let hasPixels = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) {
        hasPixels = true;
        break;
      }
    }
    
    this.hasSignature = hasPixels;
  }

  clearSignature(): void {
    const canvas = this.signatureCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.hasSignature = false;
  }

  goBack(): void {
    this.router.navigate(['/checkin/terms']);
  }

  viewRoomDetails(): void {
    console.log('View room details');
  }

  signAndContinue(): void {
    if (this.hasSignature) {
      this.router.navigate(['/checkin/card-details'], {
        state: {
          signature: true
        }
      });
    }
  }
}
