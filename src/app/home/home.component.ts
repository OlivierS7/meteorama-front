import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../services/city/city.service';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cities: any[] = [];
  filteredCities: any[] = [];
  searchCity: string = '';
  selectedCity: any;
  weather: any[] = [];

  localisation: string = 'aze';

  constructor(private cityService: CityService, private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.cityService.getCities().subscribe(
      (data) => {
        this.cities = data
        this.filteredCities = this.cities.slice(0, 10)
      },
      (error) => {
        console.error('Erreur lors du chargement des villes :', error);
      }
    );
  }

  filterCities() {
    this.filteredCities = this.cities.filter(city =>
      city.label.toLowerCase().includes(this.searchCity.toLowerCase())
    ).slice(0, 10);
  }

  searchWeather(localisation: string) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const localisation = { latitude, longitude };
          this.weatherService.getWeatherWithLatitudeAndLongitude(latitude.toString(), longitude.toString()).subscribe((data) => {
            this.weather = data
            console.log(this.weather);
          })
        },
        error => {
          console.error('Erreur lors de la récupération de la position :', error);
          // Gérer les erreurs éventuelles ici
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      // Gérer le cas où la géolocalisation n'est pas prise en charge
    }
  }

  onCitySelected() {
    // Action à effectuer lorsque l'utilisateur sélectionne une ville
    console.log("Ville sélectionnée :", this.selectedCity);

    this.weatherService.getWeatherWithLatitudeAndLongitude(this.selectedCity.latitude, this.selectedCity.longitude).subscribe((data) => {
      this.weather = data
      console.log(this.weather);
      
    })
    // Vous pouvez exécuter d'autres actions ici en fonction de la ville sélectionnée
  }
}
