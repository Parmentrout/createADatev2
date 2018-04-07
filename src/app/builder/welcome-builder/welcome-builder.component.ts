import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { SampleDateService } from '../../sample-date.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-welcome-builder',
  templateUrl: './welcome-builder.component.html',
  styleUrls: ['./welcome-builder.component.css']
})
export class WelcomeBuilderComponent implements OnInit {

  loggedIn: boolean;
  dates$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private _router: Router, private sampleDateService: SampleDateService) {
  }

  ngOnInit() {
    this.dates$ = this.sampleDateService.getSampleDates();

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

 startBuild() {
    this._router.navigate(['/build/start-build']);
 }

}
