import { Injectable } from '@angular/core';
import { MyDate, DateOption, DateCard } from './models/date.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject, AsyncSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
    private _currentUser = null;

    constructor(private afAuth: AngularFireAuth) {

    }

    getUser(): AsyncSubject<any> {
        let result = new AsyncSubject<any>();

        if (this._currentUser) {
            result.next(this._currentUser);
            result.complete();
        } else {
            this.afAuth.authState.subscribe(user => {
                this._currentUser = user;
                result.next(user);
                result.complete();
            });
        }

        return result;
    }

    isLoggedIn(): boolean {
        return this._currentUser !== null;
    }

}