import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informations',
    imports :[CommonModule],
  
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.scss'
})
export class InformationsComponent   {
  @Input() infos : { title: string; text: string}[]= [];
}
