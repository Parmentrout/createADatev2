import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.css']
})
export class OptionMenuComponent implements OnInit {

  dateNumber: number;
  continueText: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //First time through? 
    this.dateNumber = 1;
    this.continueText = `Continue to Date Night part ${this.dateNumber + 1}`;
  }

  bumpDateAndSave() {
    this.dateNumber++;

    if (this.dateNumber === 3) {
      this.continueText = 'Save and Finish!';
    } else if (this.dateNumber === 4) {
      this.router.navigateByUrl('/build/date-summary');
    }
  }

}
