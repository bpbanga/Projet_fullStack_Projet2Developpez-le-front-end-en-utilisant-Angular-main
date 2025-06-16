import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-graph-line',
  imports: [NgxChartsModule],
  templateUrl: './graph-line.component.html',
  styleUrl: './graph-line.component.scss'
})
export class GraphLineComponent implements OnInit {

  @Input() country: OlympicCountry | undefined;

  colorScheme = 'cool';

  multi: { name: string; series: { name: string; value: number }[]; id: number }[] = [];

  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  yAxisLabel = 'Medals';
  timeline = true;

  onSelect(data: Event): void {}

  constructor() {}

  ngOnInit(): void {
    if (this.country?.participations) {
      this.multi = [{
        name: this.country.country,
        series: this.country.participations.map(participation => ({
          name: participation.year.toString(),
          value: participation.medalsCount
        })),
        id: this.country.id
      }];
    }
  }
}
