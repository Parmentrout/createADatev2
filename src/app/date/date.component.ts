import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MyDate } from '../models/date.model';
import { Subject } from 'rxjs';
import { SampleDateService } from '../sample-date.service';

@Component({
  selector: 'sample-dates',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, OnDestroy {
  dates$: Observable<any>;
  private cancellationToken = new Subject<any>();
  constructor(private db: AngularFireDatabase, private sampleDateService: SampleDateService) { }

  ngOnInit() {
    this.dates$ = this.sampleDateService.getSampleDates();
  }

  ngOnDestroy() {
    this.cancellationToken.next();
    this.cancellationToken.complete();
  }

}
