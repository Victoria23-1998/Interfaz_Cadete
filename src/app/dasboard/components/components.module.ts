import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ TripComponent,HeaderComponent ],
  imports: [
    CommonModule,
    
    
  ],
  exports:[ TripComponent,HeaderComponent ]
})
export class ComponentsModule { }
