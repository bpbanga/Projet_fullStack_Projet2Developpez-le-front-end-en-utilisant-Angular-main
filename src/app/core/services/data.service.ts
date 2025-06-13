import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = './assets/mock/olympic.json'; // Remplace par ton API réelle

  constructor(private http: HttpClient) {}

  getOlympicData(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.apiUrl);
  }
}


