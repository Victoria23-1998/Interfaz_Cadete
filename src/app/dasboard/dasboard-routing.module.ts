import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './dasboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TravelComponent } from './pages/travel/travel.component';
import { HistoryComponent } from './pages/history/history.component';
const routes: Routes = [  
  {
    path: '',
    
    children: [{
      path: '',
      component:HomeComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'history', component: HistoryComponent
    },
    {
      path: 'travel', component: TravelComponent
    },
    {
      path: '**',
      redirectTo: ''
    }],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
