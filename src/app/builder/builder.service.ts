import { Injectable } from '@angular/core';
import { MyDate, DateOption, DateCard } from '../models/date.model';


@Injectable()
export class BuilderService {
    public currentDate: MyDate
    constructor() {
    }

    public startDate(name: string, userId: string) {
        this.currentDate = new MyDate();
        this.currentDate.dateName = name;
        this.currentDate.dateId = new Date().valueOf();
        this.currentDate.userId = userId;
        this.currentDate.dateOptions = new Array<DateOption>();    
        console.log(this.currentDate);
        this.addDateOption();    
    }

    public addDateOption() {
        let dateOption = new DateOption();
        dateOption.option1 = new DateCard();
        dateOption.option2 = new DateCard();
        this.currentDate.dateOptions.push(dateOption);
    }
}