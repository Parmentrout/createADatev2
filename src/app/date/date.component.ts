import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MyDate } from '../models/date.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, OnDestroy {
  dates$: Observable<any>;
  private cancellationToken = new Subject<any>();
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.dates$ = this.db.list('dates/EGpGpztEstbO8OxpDrJ2TxkXyhY2').snapshotChanges().map(dates => {
        let converts = new Array<MyDate>();
          for (let date of dates) {
            let dateConvert = date.payload.toJSON().toString();
            converts.push(JSON.parse(dateConvert));
          }
          return converts;
        });
  }

  ngOnDestroy() {
    this.cancellationToken.next();
    this.cancellationToken.complete();
  }

}
