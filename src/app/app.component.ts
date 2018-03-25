import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { firestore } from 'firebase/app';

import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loginOut = 'login';
  loggedIn = false;
  userName: string;
  test: any;
  message: string;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
  }

  ngOnInit(){
    this.afAuth.authState.subscribe(user => { //if null logged out, else logged in
      if (user) {
        this.userName = user.displayName;
        this.loginOut = 'logout';
        this.loggedIn = true;
      } else {
        this.loginOut = 'login';
        this.loggedIn = false;
      }
    });
  }

  logInOut() {
    if (!this.loggedIn) {
      this.login().then(user => {
        this.loginOut = 'logout';
        this.loggedIn = true;
      });
    } else {
      this.logout().then(() => {
        this.loginOut = 'login';
        this.loggedIn = false;
        this.router.navigate(['/home']);
      });
    }
  }

  login() {
     return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    return this.afAuth.auth.signOut();
  }

  // writeToDatabase() {
  //   let date = this.db.object('date/abc');
  //   date.set({name: 'My date 1'}).then(() => this.message = "Success");
  // }

  testRead() {
   
  }
}
