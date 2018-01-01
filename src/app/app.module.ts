import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { UiModule } from './ui/ui.module';
import { ContentModule } from './content/content.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AUTH_PROVIDERS} from 'angularfire2/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDg0mncwgtGjAOpYruM_yHq-Eb2pPWFNxw",
  authDomain: "createadate-26879.firebaseapp.com",
  databaseURL: "https://createadate-26879.firebaseio.com",
  projectId: "createadate-26879",
  storageBucket: "createadate-26879.appspot.com",
  messagingSenderId: "851098752751"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
