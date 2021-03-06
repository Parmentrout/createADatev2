import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDateComponent } from './my-date.component';
import { RouterModule } from '@angular/router';
import { StartDateComponent } from './start-date/start-date.component';
import { DateComponent } from './date/date.component';
import { BuilderService } from '../builder/builder.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'summary', pathMatch: 'full'},
      {path: 'summary', component: MyDateComponent},
      {path: 'date/:dateId/:userId', component: DateComponent}
    ])
  ],
  declarations: [MyDateComponent, StartDateComponent, DateComponent],
  providers: [BuilderService]
})
export class MyDateModule { }
