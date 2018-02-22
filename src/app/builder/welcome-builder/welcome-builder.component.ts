import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-welcome-builder',
  templateUrl: './welcome-builder.component.html',
  styleUrls: ['./welcome-builder.component.css']
})
export class WelcomeBuilderComponent implements OnInit {

  loggedIn: boolean;

  constructor(private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => { //if null logged out, else logged in
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
 }

}
