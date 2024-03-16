import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherWithLatitudeAndLongitude(latitude: string, longitude: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3333/weather?lat=${latitude}&lon=${longitude}`);
  }
}
