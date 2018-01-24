import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AUTH_PROVIDERS} from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';

import { BuilderModule } from './builder/builder.module';
import { DateModule } from './date/date.module';
import { HomeModule } from './home/home.module';
import { MyDateModule } from './my-date/my-date.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HomeModule,
    DateModule,
    MyDateModule,
    BuilderModule
  ],
  providers: [ AngularFireDatabase ],
  bootstrap: [AppComponent]
})
export class AppModule { }
