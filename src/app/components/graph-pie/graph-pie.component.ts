import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicCountry } from 'src/app/core/models/Olympic';

interface DataCountryPie {
  name: string;
  value: number;
  id: number;
}

@Component({
  selector: 'app-graph-pie',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './graph-pie.component.html',
  styleUrls: ['./graph-pie.component.scss']
})
export class GraphPieComponent implements OnChanges {
  @Input() olympics: OlympicCountry[] = [];

  colorScheme = 'cool';
  single: DataCountryPie[] = [];
  view: [number, number] = [700, 400];
  legend: boolean = false;
  legendPosition: string = 'below';
  labels: boolean = true;
  explodeSlices: boolean = false;
  doughnut: boolean = false;
  gradients: boolean = false;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['olympics'] && this.olympics?.length > 0) {
      console.log("Mise à jour des données dans GraphPieComponent :", this.olympics);
      this.single = this.olympics.map((country) => ({
        name: country.country,
        value: country.participations.reduce((sum, p) => sum + p.medalsCount, 0),
        id: country.id
      }));
      console.log("Données formatées :", this.single);
    } else {
      console.warn("Pas de données olympics valides pour le graphique.");
    }
  }

  onSelect(data: DataCountryPie): void {
    console.log('Item clicked', data);
    const country = this.single.find(c => c.name === data.name);
    if (country) {
      this.router.navigate([`/details/${country.id}`]);
    }
  }
}
