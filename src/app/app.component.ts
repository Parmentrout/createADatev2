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
  loginOut = 'login';
  loggedIn = false;
  userName: string;
  user: any;
  test: any;
  items: any;
  message: string;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  ngOnInit(){
    this.items = this.db.list('/date').valueChanges(); //Realtime observable for getting data
    this.afAuth.authState.subscribe(user => { //if null logged out, else logged in
      if (this.user) {
        this.userName = user.displayName;
        this.loginOut = 'Logout';
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
  }

  // logInOut() {
  //   if (!this.loggedIn) {
  //     this.login().then(user => {
  //       this.loginOut = 'Logout';
  //       this.loggedIn = true;
  //     });
  //   } else {
  //     this.logout().then(() => {
  //       this.loginOut = 'Login';
  //       this.loggedIn = false;
  //     });
  //   }

  //   this.loggedIn = !this.loggedIn;
  // }

  login() {
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
     this.loggedIn = !this.loggedIn;
  }
  logout() {
    console.log('logout');
    this.afAuth.auth.signOut();
    this.loggedIn = !this.loggedIn;
  }

  writeToDatabase() {
    let date = this.db.object('date/abc');
    date.set({name: 'My date 1'}).then(() => this.message = "Success");
  }

  testRead() {
   
  }
}
