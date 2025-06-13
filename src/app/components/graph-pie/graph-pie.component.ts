import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router} from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicCountry } from 'src/app/core/models/Olympic';

interface DataCountryPie {
   name: string;
    value: number;
     id: number;
};


@Component({
  selector: 'app-graph-pie',
  imports :[NgxChartsModule],
  templateUrl: './graph-pie.component.html',
  styleUrl: './graph-pie.component.scss'
})
export class GraphPieComponent implements OnInit {

    @Input() olympics: OlympicCountry[] = []; // Maintenant, c'est un tableau !


   colorScheme = 'cool';

   single:  DataCountryPie[] = [];

  // Options du diagramme
  view: [number, number] = [700, 400];

  // Options de la légende
  legend: boolean = false;
  legendPosition: string = 'below';

  // Options des étiquettes
  labels: boolean = true;

  // Options des explosions
  explodeSlices: boolean = false;

  // Options des arcs
  doughnut: boolean = false;

  // Options des gradients
  gradients: boolean = false;

  // Fonction pour formater les valeurs
  onSelect(data:DataCountryPie): void {
    console.log('Item clicked', data);
    const country = this.single.find(country => country.name === data.name )
    console.log(country?.id)
    this.router.navigate([`/details/${country?.id}`])
  }

  constructor(private olympicService: OlympicService,
              private router: Router ) {}


ngOnInit(): void {
  console.log("Données reçues dans GraphPieComponent :", this.olympics);
  if (this.olympics && this.olympics.length > 0) {
    this.single = this.olympics.map((country) => ({
      name: country.country,
      value: country.participations.reduce((sum, p) => sum + p.medalsCount, 0),
      id: country.id
    }));

    console.log("Données formatées :", this.single);
  } else {
    console.error("Aucune donnée reçue pour 'olympics'");
  }
}
}