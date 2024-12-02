import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.page.html',
  styleUrls: ['./tiempo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class TiempoPage {
  weatherTemp: any;
  todayDate = new Date();
  cityName: string = "";
  name: string = "";
  loading = true;
  weatherIcon: string = "";
  weatherDetails: any;

  constructor(public httpClient: HttpClient, public menu: MenuController) {
    this.menuActive();
  }

  menuActive() {
    this.menu.enable(true, 'menu');
  }

  loadData() {
    if (this.cityName) {
      this.httpClient.get(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`).subscribe(
        (results: any) => {
          this.weatherTemp = results.main;
          this.name = results.name;
          this.weatherDetails = results.weather[0];
          this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
          this.loading = false;
        },
        (error) => {
          console.error('Error al obtener el clima:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('El nombre de la ciudad está vacío');
      this.loading = false;
    }
  }
}
