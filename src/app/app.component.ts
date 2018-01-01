import { Component } from '@angular/core';
import { Observable } from 'rxjs'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { firestore } from 'firebase/app';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: any;
  test: any;
  items: any;
  constructor(private afAuth: AngularFireAuth) { //, private db: AngularFireDatabase
    this.user = afAuth.authState;
   // this.items = db.list('items');
  }
  login() {
    
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
     this.afAuth.auth.signOut();
  }
}
