import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router, ActivatedRoute } from '@angular/router';
import { BuilderService } from '../builder.service';
import { MyDate } from '../../models/date.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.css']
})
export class OptionMenuComponent implements OnInit {

  dateNumber: number;
  continueText: string;
  date: MyDate = new MyDate();

  constructor(private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router, private builderService: BuilderService) { }

  ngOnInit() {

    this.activatedRoute.paramMap
    .map(paramMap => paramMap.get('id'))
    .subscribe(id => { 
      this.afAuth.authState.subscribe(user => {
        this.db.object(`dates/${user.uid}/${id}`).snapshotChanges()
          .subscribe(date => {
            let dateConvert = date.payload.toJSON() as MyDate;
            this.setDate(dateConvert);
          });
      });
    });
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

  private setDate(date: MyDate) {
    this.date = date;

    if (!date.dateOptions || date.dateOptions.length === 0) {
      this.dateNumber = 1;
    }
  }

}
