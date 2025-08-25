import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-main',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './profile-main.html',
  styleUrl: './profile-main.scss'
})
export class ProfileMain {

}
