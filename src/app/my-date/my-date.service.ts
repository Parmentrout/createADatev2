import { Injectable } from '@angular/core';
import { MyDate, DateOption, DateCard } from '../models/date.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject, AsyncSubject } from 'rxjs';


@Injectable()
export class MyDateService {

    constructor(private db: AngularFireDatabase) {
    }

    getMyDates() {

    }
}