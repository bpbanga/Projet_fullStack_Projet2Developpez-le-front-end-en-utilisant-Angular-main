import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }
//   getOlympics() {
//   return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
//     catchError((error, caught) => {
//       console.error(" Erreur de chargement des données :", error);
//       return caught;
//     })
//   );
// }
//   getOlympicsById( id : number){

//     return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
//       map((countries) => countries.find(country => country.id === id)
//     ),
//       catchError((error, caught) => {
//         // TODO: improve error handling
//         console.error(error);       
//         return caught;
//       })
//     );
//   }
getOlympics() {
  return this.olympics$.asObservable();
}

getOlympicsById(id: number) {
  return this.olympics$.pipe(
    map(countries => countries.find(c => c.id === id))
  );
}

}
