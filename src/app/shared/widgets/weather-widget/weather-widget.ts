import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface WeatherData {
  temperature: string;
  condition: string;
  location: string;
}

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './weather-widget.html',
  styleUrl: './weather-widget.scss'
})
export class WeatherWidget {
  @Input() title: string = 'Local Weather';
  @Input() weatherData: WeatherData = {
    temperature: '29°C',
    condition: 'Cloudy',
    location: 'Alpharetta, Georgia'
  };
}
