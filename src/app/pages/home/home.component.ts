import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  public infos : { title: string; text: string}[]= [];
  private destroy$ = new Subject<void>();

  constructor(private olympicService: OlympicService) {}
  olympicData$ = this.olympicService.getOlympics();

  ngOnInit(): void {

    this.olympicData$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log("Données reçues dans HomeComponent :", data);

          if (!data || data.length === 0) {
            console.error("Aucun pays récupéré !");
            return;
          }
          const nombrePays = data.length;
          const nombreParticipations = data.reduce((acc, country) => {
            const participationsCount = Array.isArray(country.participations) ? country.participations.length : country.participations;
            return acc + participationsCount;
          }, 0);

          this.infos = [
            { title: "Number of JOs", text: nombreParticipations.toString() },
            { title: "Number of Countries", text: nombrePays.toString() }
          ];
        },
        error: (err) => console.error("Erreur de chargement des données", err)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}