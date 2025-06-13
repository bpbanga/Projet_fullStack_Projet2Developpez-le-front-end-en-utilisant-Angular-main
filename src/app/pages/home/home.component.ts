import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { TitleComponent } from 'src/app/components/title/title.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> = of([]);

  public infos : { title: string; text: string}[]= [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe({
      next: (data) => {
        console.log(" Données reçues dans HomeComponent :", data);

        if (!data || data.length === 0) {
          console.error("Aucun pays récupéré !");
          return;
        }
        const nombrePays = data.length;
        const nombreParticipations = data.reduce(( acc, country) => {
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
}
