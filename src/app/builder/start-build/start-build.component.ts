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
  model: string = '';
  userId: string;

  constructor(private builderService: BuilderService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => { //if null logged out, else logged in
      if (user) {
        this.userId = user.uid;
      } else {
        // Navigate away
      }
    });
  }

  save() {
    this.builderService.startDate(this.model, this.userId);
  }

}
