import { Component, OnInit } from '@angular/core';
import { MyDate } from '../../models/date.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { BuilderService } from '../builder.service';

@Component({
  selector: 'app-date-summary',
  templateUrl: './date-summary.component.html',
  styleUrls: ['./date-summary.component.css']
})
export class DateSummaryComponent implements OnInit {

  date: MyDate = new MyDate();
  userId: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {

    this.activatedRoute.paramMap
    .map(paramMap => paramMap.get('id'))
    .subscribe(id => { 
      this.afAuth.authState.subscribe(user => {
        this.userId = user.uid;
        this.db.object(`dates/${user.uid}/${id}`).snapshotChanges()
          .subscribe(date => {
            let dateConvert = date.payload.toJSON().toString();
            this.setDate(dateConvert);
          });
      });
    });
  }

  private setDate(date: any) {
    this.date = JSON.parse(date);
  }

}
