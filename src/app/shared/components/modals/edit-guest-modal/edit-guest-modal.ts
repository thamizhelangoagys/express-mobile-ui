import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  isPrimary: boolean;
  chargesAllowed: boolean;
}

@Component({
  selector: 'app-edit-guest-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-guest-modal.html',
  styleUrl: './edit-guest-modal.scss'
})
export class EditGuestModal implements OnInit {
  @Input() guest: Guest = {
    id: '',
    name: '',
    email: '',
    phone: '',
    isPrimary: false,
    chargesAllowed: false
  };

  @Output() save = new EventEmitter<Guest>();
  @Output() close = new EventEmitter<void>();

  guestForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.guestForm = this.fb.group({
      name: [this.guest.name, [Validators.required, Validators.minLength(2)]],
      email: [this.guest.email, [Validators.email]],
      phone: [this.guest.phone, [Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      chargesAllowed: [this.guest.chargesAllowed]
    });
  }

  onSave(): void {
    if (this.guestForm.valid) {
      const updatedGuest: Guest = {
        ...this.guest,
        ...this.guestForm.value
      };
      this.save.emit(updatedGuest);
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.guestForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 2 characters`;
    }
    if (field?.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }
    return '';
  }
}
