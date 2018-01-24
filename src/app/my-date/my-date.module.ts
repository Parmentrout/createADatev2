import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDateComponent } from './my-date.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MyDateComponent}
    ])
  ],
  declarations: [MyDateComponent]
})
export class MyDateModule { }
