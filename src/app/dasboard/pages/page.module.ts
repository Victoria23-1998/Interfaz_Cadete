import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TravelComponent } from './travel/travel.component';
import { HistoryComponent } from './history/history.component';
import { HeaderComponent } from '../components/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TripComponent } from '../components/trip/trip.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import 'animate.css';

@NgModule({
  declarations: [HomeComponent,TravelComponent,HistoryComponent,HeaderComponent,TripComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  exports:[HomeComponent,TravelComponent,HistoryComponent,HeaderComponent,TripComponent ]
})
export class PageModule { }
