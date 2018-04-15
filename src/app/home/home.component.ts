import { Component, OnInit } from '@angular/core';
import { SampleDateService } from '../sample-date.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dates$: Observable<any>;

  constructor(private sampleDateService: SampleDateService) { }

  ngOnInit() {
   this.dates$ = this.sampleDateService.getSampleDates().map(result => {
      
      for (let date of result) {
        if (date === result[0]) {
          date.class = 'carousel-item active';
        } else {
          date.class= 'carousel-item'
        }
      }
      return result;
  });
  }

}
