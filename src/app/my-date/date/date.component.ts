import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MyDate } from '../../models/date.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, OnDestroy {
  date: MyDate;
  userId: string = '';
  dateId: string = '';
  dateStarted: boolean = false;
  isLoggedIn: boolean = false;
  private cancellationToken = new Subject<any>();

  constructor(private _activatedRoute: ActivatedRoute, private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      }
    });

    this._activatedRoute.paramMap.subscribe((paramMap) => {
      let user = paramMap.get('userId');
      let date = paramMap.get('dateId');
      this.db.object(`dates/${user}/${date}`).snapshotChanges().subscribe(date => {
        // if (!dates || dates.length === 0) {
        //   //Error, we should route somewhere
        //     return;
        //   }
          let dateLookup = date;
          let dateConvert: MyDate = JSON.parse(date.payload.toJSON().toString());

          this.dateSettings(dateConvert);
          this.date = dateConvert;
      });
    });
  }

  startDate() {
    this.date.dateOptions[0].started = true;
    this.dateStarted = true;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  ngOnDestroy() {
    this.cancellationToken.next();
    this.cancellationToken.complete();
  }

  private dateSettings(date: MyDate) {
    let started = date.dateOptions.filter(x => x.started === true);

    if (started.length > 0) {
      this.dateStarted = true;
    }
  }
}
