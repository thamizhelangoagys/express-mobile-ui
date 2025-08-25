import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-main',
  imports: [MatCardModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './settings-main.html',
  styleUrl: './settings-main.scss'
})
export class SettingsMain {

}
