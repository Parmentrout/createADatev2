import { Component, OnInit } from '@angular/core';
import { BuilderService } from '../builder.service';
import { MyDate } from '../../models/date.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { firestore } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

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
  isCreate: boolean = true;

  constructor(private builderService: BuilderService, private _activatedRoute: ActivatedRoute,
    private router: Router, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.model.dateName = '';
    this.model.description = '';
    this.afAuth.authState.subscribe(user => { //if null logged out, else logged in
      if (user) {
        this.userId = user.uid;
        this._activatedRoute.paramMap
        .map(paramMap => paramMap.get('id'))
        .subscribe(id => {
          if (id && id !== '') {
            this.isCreate = false;
              this.db.object(`dates/${user.uid}/${id}`).snapshotChanges()
                .subscribe(date => {
                  let dateConvert = date.payload.toJSON().toString();
                  this.model = JSON.parse(dateConvert);
              });
          }
        });
      } else {
        // Navigate away
        this.router.navigate([`/build/welcome-builder`]);
      }
    });
  }

  save() {
    this.formSaving = true;
    if (this.isCreate) {
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
    } else {
      this.builderService.saveDate(this.model).take(1).subscribe(result => {
        this.formSaving = false;
          if (result) {
            this.router.navigate([`/build/option-menu/${this.model.dateId}`]);
          } else {
            this.errorMessages = 'Whoops!  Something went wrong, come back later to try again!';
          }
      });
    }
   
  }

}
