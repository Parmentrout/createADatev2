import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { DateComponent } from '../date/date.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'sample-dates', component: DateComponent}
    ])
  ],
  declarations: [HomeComponent, DateComponent]
})
export class HomeModule { }
