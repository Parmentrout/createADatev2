import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router, ActivatedRoute } from '@angular/router';
import { BuilderService } from '../builder.service';
import { MyDate, IMyDate } from '../../models/date.model';
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
  isDateReady: boolean = false;
  continueText: string;
  date: MyDate = new MyDate();

  constructor(private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router, private builderService: BuilderService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.paramMap
    .map(paramMap => paramMap.get('id'))
    .subscribe(id => { 
      this.afAuth.authState.subscribe(user => {
        this.db.object(`dates/${user.uid}/${id}`).snapshotChanges()
          .subscribe(date => {
            let dateConvert = date.payload.toJSON().toString();
            this.setDate(dateConvert);
          });
      });
    });
    //First time through? 
    this.dateNumber = 1;
    //this.continueText = `Continue to Date Night pa ${this.dateNumber + 1}`;
  }

  bumpDateAndSave() {
      this.router.navigateByUrl(`/build/date-summary/${this.date.dateId}`);
  }

  private setDate(date: any) {
    this.date = JSON.parse(date);
    if (this.date.dateOptions && this.date.dateOptions.length === 3) {
      let firstOption = this.date.dateOptions[0];
      let middleOption = this.date.dateOptions[1];
      let lastOption = this.date.dateOptions[2];
      if (firstOption.option1 && firstOption.option1.name && firstOption.option2 && firstOption.option2.name) {
        if (middleOption.option1 && middleOption.option1.name && middleOption.option2 && middleOption.option2.name) {
          if (lastOption.option1 && lastOption.option1.name) {
            if (lastOption.option2 && lastOption.option2.name) {
              this.isDateReady = true;
            }
          }
        }
      }
    }
  }

}
