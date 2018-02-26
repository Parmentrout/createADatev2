import { Component, OnInit } from '@angular/core';
import { MyDate, IMyDate } from '../models/date.model';
import { UserService } from '../user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-date',
  templateUrl: './my-date.component.html',
  styleUrls: ['./my-date.component.css']
})
export class MyDateComponent implements OnInit {

  dates: MyDate[] = new Array<MyDate>();
  loggedIn: boolean = false;

  constructor(
    private _userService: UserService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.db.list(`dates/${user.uid}`).valueChanges().map(dates => {
          let converts: MyDate[] = new Array<MyDate>();
          for (let date of dates) {
            converts.push(date as IMyDate);
          }
          return converts;
        });
      } else {
        this.loggedIn = false;
      }
    });
  
  }
}
