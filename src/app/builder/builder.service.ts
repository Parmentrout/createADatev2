import { Injectable } from '@angular/core';
import { MyDate, DateOption, DateCard } from '../models/date.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject, AsyncSubject } from 'rxjs';


@Injectable()
export class BuilderService {
    public currentDate: MyDate
    constructor(private db: AngularFireDatabase) {
    }

    public startDate(name: string, desc: string, userId: string, isSample: boolean = false) {
        this.currentDate = new MyDate();
        this.currentDate.dateName = name;
        this.currentDate.description = desc;
        this.currentDate.dateId = new Date().valueOf();
        this.currentDate.userId = userId;
        this.currentDate.isSampleDate = isSample;
        this.currentDate.dateOptions = new Array<DateOption>();    
        this.addDateOption();
        return this.currentDate; 
    }

    public addDateOption() {
        let dateOption = new DateOption();
        dateOption.optionNumber = 1;
        this.currentDate.dateOptions.push(dateOption);

        let dateOption2 = new DateOption();
        dateOption2.optionNumber = 2;
        this.currentDate.dateOptions.push(dateOption2);

        let dateOption3 = new DateOption();
        dateOption3.optionNumber = 3;
        this.currentDate.dateOptions.push(dateOption3);

    }

    public saveDate(date: MyDate = null): Subject<boolean> {
        let callback = new Subject<boolean>()
        if (!date) {
            date = this.currentDate;
        }

        let dateRecord = this.db.object(`dates/${date.userId}/${date.dateId}`);
        dateRecord.set(JSON.stringify(date)).then(result => {
            callback.next(true);
            callback.complete();
        }).catch(err => {
            callback.next(false);
            callback.complete();
        });

        return callback;
    }

    public getDate(id: number, userId: string): AsyncSubject<MyDate> {
        let result = new AsyncSubject<MyDate>();

        if (this.currentDate) {
            result.next(this.currentDate);
            result.complete();
        } else {
            //result.this.db.object(`dates/${id}/${userId}`);
            
        }

        return result;
    }
}