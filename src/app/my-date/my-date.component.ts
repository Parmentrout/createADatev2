import { Component, OnInit } from '@angular/core';
import { MyDate, IMyDate } from '../models/date.model';
import { UserService } from '../user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { BuilderService } from '../builder/builder.service';

@Component({
  selector: 'app-my-date',
  templateUrl: './my-date.component.html',
  styleUrls: ['./my-date.component.css']
})
export class MyDateComponent implements OnInit {

  dates: MyDate[] = new Array<MyDate>();
  dates$: Observable<any>;
  loggedIn: boolean = false;
  user: any;
  noDates: boolean = true;

  constructor(
    private _userService: UserService,
    private db: AngularFireDatabase,
    private builderService: BuilderService,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    

    this.dates$ = this.afAuth.authState.switchMap(user => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
        return this.db.list(`dates/${user.uid}`).snapshotChanges().map(dates => {
          if (dates && dates.length > 0) {
            this.noDates = false;
          }

          let converts = new Array<MyDate>();
          for (let date of dates) {
            let dateConvert = date.payload.toJSON().toString();
            converts.push(JSON.parse(dateConvert));
          }
          return converts;
        });
      } else {
        this.loggedIn = false;
        return Observable.of(new Array<MyDate>());
      }
    });
  }

  deleteDate(dateId: number) {
    let dateRecord = this.db.object(`dates/${this.user.uid}/${dateId}`);
    dateRecord.remove().then(() => {}).catch(() => alert('Error!'));
  }

  resetDate(date: MyDate) {
    for (let option of date.dateOptions) {
      option.started = false;
      option.finished = false;

      option.option1.selected = false;
      option.option2.selected = false;

      option.option1.finished = false;
      option.option2.finished = false;
    }
    this.builderService.saveDate(date).take(1).subscribe(result => {
      if (result) {
        alert('Successfully Reset Date!');
      }
    })
  }

  isDateReady(date: MyDate): boolean {
    let result = false;

      if (date.dateOptions && date.dateOptions.length === 3) {
        let firstOption = date.dateOptions[0];
        let middleOption = date.dateOptions[1];
        let lastOption = date.dateOptions[2];
        if (firstOption.option1 && firstOption.option1.name && firstOption.option2 && firstOption.option2.name) {
          if (middleOption.option1 && middleOption.option1.name && middleOption.option2 && middleOption.option2.name) {
            if (lastOption.option1 && lastOption.option1.name) {
              if (lastOption.option2 && lastOption.option2.name) {
                result = true;
              }
            }
          }
        }
    }


    return result;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
 }
}
