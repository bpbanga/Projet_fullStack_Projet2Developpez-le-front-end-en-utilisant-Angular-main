import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: false
})
export class DetailsComponent implements OnInit {
  public country$: Observable<OlympicCountry | undefined> = of(undefined);
  public infos: { title: string; text: string }[] = [];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));
    this.country$ = this.olympicService.getOlympicsById(countryId);

    this.country$.subscribe({
      next: (country) => {
        console.log("Pays reçu :", country);

        if (!country || !Array.isArray(country.participations)) {
          console.error("Pays ou participations invalides !");
          return;
        }

        const numberOfEntries = country.participations.length;

        const totalMedals = country.participations.reduce((acc, participation) => {
          return acc + (participation.medalsCount || 0);
        }, 0);

        const totalAthletes = country.participations.reduce((acc, participation) => {
          return acc + (participation.athleteCount || 0);
        }, 0);

        this.infos = [
          { title: "Number of Entries", text: numberOfEntries.toString() },
          { title: "Total Number of Medals", text: totalMedals.toString() },
          { title: "Total Number of Athletes", text: totalAthletes.toString() }
        ];
      },
      error: (err) => console.error("Erreur de chargement du pays", err)
    });
  }
}
