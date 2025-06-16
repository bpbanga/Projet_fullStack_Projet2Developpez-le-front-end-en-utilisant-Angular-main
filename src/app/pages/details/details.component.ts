import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: false
})
export class DetailsComponent {
  public country$: Observable<OlympicCountry | undefined>;
  public infos$: Observable<{ title: string; text: string }[]> = of([]);

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));

    this.country$ = this.olympicService.getOlympicsById(countryId).pipe(
      tap((country) => {
        if (!country) {
          console.warn('Pays introuvable, redirection vers /not-found');
          this.router.navigate(['/not-found']);
        }
      }),
      catchError((err) => {
        console.error("Erreur lors du chargement du pays :", err);
        this.router.navigate(['/not-found']);
        return of(undefined);
      })
    );

    this.infos$ = this.country$.pipe(
      map((country) => {
        if (!country || !Array.isArray(country.participations)) {
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
