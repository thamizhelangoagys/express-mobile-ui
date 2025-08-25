import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-checkout-main',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './checkout-main.html',
  styleUrl: './checkout-main.scss'
})
export class CheckoutMain {

}
