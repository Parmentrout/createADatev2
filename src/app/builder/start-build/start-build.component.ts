import { Component, OnInit } from '@angular/core';
import { BuilderService } from '../builder.service';
import { MyDate } from '../../models/date.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { firestore } from 'firebase';

@Component({
  selector: 'app-start-build',
  templateUrl: './start-build.component.html',
  styleUrls: ['./start-build.component.css']
})
export class StartBuildComponent implements OnInit {
  model: MyDate = new MyDate();
  userId: string;
  errorMessages: string;
  formSaving: boolean = false;

  constructor(private builderService: BuilderService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.model.dateName = '';
    this.model.description = '';
    this.afAuth.authState.subscribe(user => { //if null logged out, else logged in
      if (user) {
        this.userId = user.uid;
      } else {
        // Navigate away
      }
    });
  }

  save() {
    this.formSaving = true;
    let newDate = this.builderService.startDate(this.model.dateName, this.model.description, this.userId);
    this.builderService.saveDate().take(1)
      .subscribe(result => {
        this.formSaving = false;
        if (result) {
          this.router.navigate([`/build/option-menu/${newDate.dateId}`]);
        } else {
          this.errorMessages = 'Whoops!  Something went wrong, come back later to try again!';
        }
      });
  }

}
