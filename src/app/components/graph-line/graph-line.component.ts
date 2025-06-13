import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { partition } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';


@Component({
  selector: 'app-graph-line',
  imports :[NgxChartsModule],
  templateUrl: './graph-line.component.html',
  styleUrl: './graph-line.component.scss'
})
export class GraphLineComponent  implements OnInit{

  @Input() country: OlympicCountry | undefined;

  colorScheme = 'cool';
  multi: { name: string; series:{ name : String; value: number} []; id: number }[] = [];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;
  // Fonction pour formater les valeurs
  onSelect(data:Event): void {
    console.log('Item clicked', data);
  }
  constructor() {}
ngOnInit(): void {
  if (this.country && this.country.participations) {
    this.multi = [{
      name: this.country.country,
      series: this.country.participations.map((participation) => ({
        name: participation.year.toString(), // Convertir en chaîne
        value: participation.medalsCount

      })),
      id: this.country.id
    }];

    console.log('Données formatées :', this.multi);
  }
}



}
