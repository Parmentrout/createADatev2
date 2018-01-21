import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit{
  title = 'app';
  user: any;
  test: any;
  items: any;
  message: string;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  ngOnInit(){
    this.items = this.db.list('/date').valueChanges(); //Realtime observable for getting data
    this.afAuth.authState.subscribe(user => { //if null logged out, else logged in
      this.user = JSON.stringify(user);
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
     this.afAuth.auth.signOut();
  }

  writeToDatabase() {
    let date = this.db.object('date/abc');
    date.set({name: 'My date 1'}).then(() => this.message = "Success");
  }

  testRead() {
   
  }
}
