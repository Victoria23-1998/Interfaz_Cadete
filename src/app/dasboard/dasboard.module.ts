import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasboardRoutingModule } from './dasboard-routing.module';
import { DasboardComponent } from './dasboard.component';
import { PageModule } from './pages/page.module';
import { SharedModule } from '../shared/shared.module';
import 'animate.css';
@NgModule({
  declarations: [
    DasboardComponent
  ],
  imports: [
    CommonModule,
    DasboardRoutingModule,
    PageModule,
    SharedModule 
  ]
})
export class DasboardModule { }
