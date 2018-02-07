import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.component';
import { RouterModule } from '@angular/router';
import { StartBuildComponent } from './start-build/start-build.component';
import { FirstOptionComponent } from './first-option/first-option.component';
import { SecondOptionComponent } from './second-option/second-option.component';
import { AdditionalOptionComponent } from './additional-option/additional-option.component';
import { WelcomeBuilderComponent } from './welcome-builder/welcome-builder.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeBuilderComponent},
      {path: 'start-build', component: StartBuildComponent},
      {path: 'first-option', component: FirstOptionComponent},
      {path: 'first-option/:id', component: FirstOptionComponent},
      {path: 'second-option', component: SecondOptionComponent},
      {path: 'second-option/:id', component: SecondOptionComponent},
      {path: 'additional-option', component: AdditionalOptionComponent},
      {path: 'additional-option/:id', component: AdditionalOptionComponent}
    ])
  ],
  declarations: [BuilderComponent, WelcomeBuilderComponent,
    StartBuildComponent, FirstOptionComponent, SecondOptionComponent, AdditionalOptionComponent]
})
export class BuilderModule { }
