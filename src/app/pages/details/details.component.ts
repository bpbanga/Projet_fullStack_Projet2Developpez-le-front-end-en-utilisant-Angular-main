

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: false
})
export class DetailsComponent {
  public country$: Observable<OlympicCountry | undefined>;
  public infos$: Observable<{ title: string; text: string }[]> = of([]);
  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));

    this.country$ = this.olympicService.getOlympicsById(countryId).pipe(
      catchError(() => {
        console.error("Erreur de chargement du pays");
        return of(undefined);
      })
    );

   this.infos$ = this.country$.pipe(
      map((country) => {
        if (!country || !Array.isArray(country?.participations)) {
          return [];
        }
        return [
          { title: "Number of Entries", text: country.participations.length.toString() },
          { title: "Total Number of Medals", text: country.participations.reduce((acc, p) => acc + (p.medalsCount || 0), 0).toString() },
          { title: "Total Number of Athletes", text: country.participations.reduce((acc, p) => acc + (p.athleteCount || 0), 0).toString() }
        ];
      }),
    );
  }
}