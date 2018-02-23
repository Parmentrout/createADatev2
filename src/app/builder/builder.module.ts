import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartBuildComponent } from './start-build/start-build.component';
import { FirstOptionComponent } from './first-option/first-option.component';
import { AdditionalOptionComponent } from './additional-option/additional-option.component';
import { WelcomeBuilderComponent } from './welcome-builder/welcome-builder.component';
import { OptionMenuComponent } from './option-menu/option-menu.component';
import { DateSummaryComponent } from './date-summary/date-summary.component';
import { BuilderService } from './builder.service';


@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAbwgTE4MJEuiIM5xOW8Wq6zzywT1NBT8A",
      libraries: ["places"]
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeBuilderComponent},
      {path: 'start-build', component: StartBuildComponent},
      {path: 'option-menu/:id', component: OptionMenuComponent},
      {path: 'option', component: FirstOptionComponent},
      {path: 'option/:optionId', component: FirstOptionComponent},
      {path: 'option/:dateId/:optionId:/:cardId', component: FirstOptionComponent},
      {path: 'date-summary', component: DateSummaryComponent},
      {path: 'additional-option', component: AdditionalOptionComponent},
      {path: 'additional-option/:id', component: AdditionalOptionComponent}
    ])
  ],
  declarations: [BuilderComponent, WelcomeBuilderComponent,
    StartBuildComponent, FirstOptionComponent, AdditionalOptionComponent, OptionMenuComponent, DateSummaryComponent],
  providers: [BuilderService]
})
export class BuilderModule { }
