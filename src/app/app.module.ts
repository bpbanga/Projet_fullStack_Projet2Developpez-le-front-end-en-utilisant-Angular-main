import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TitleComponent } from './components/title/title.component';
import { GraphLineComponent } from './components/graph-line/graph-line.component';
import { GraphPieComponent } from './components/graph-pie/graph-pie.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- C'est bien celui-ci !
import { InformationsComponent } from './components/informations/informations.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, DetailsComponent,NotFoundComponent ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, TitleComponent,
            InformationsComponent,NgxChartsModule, GraphPieComponent, GraphLineComponent, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
