import { Injectable } from '@angular/core';
import { MyDate, DateOption, DateCard } from './models/date.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class SampleDateService {
    private _currentUser = null;

    constructor(private db: AngularFireDatabase) {
    }

    getSampleDates(): Observable<MyDate[]> {
        return this.db.list('dates/EGpGpztEstbO8OxpDrJ2TxkXyhY2').snapshotChanges().map(dates => {
            let converts = new Array<MyDate>();
              for (let date of dates) {
                let dateConvert = date.payload.toJSON().toString();
                converts.push(JSON.parse(dateConvert));
              }
              return converts;
            });
    }
}