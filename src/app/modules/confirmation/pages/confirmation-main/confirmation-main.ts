import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-main',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './confirmation-main.html',
  styleUrl: './confirmation-main.scss'
})
export class ConfirmationMain {

}
