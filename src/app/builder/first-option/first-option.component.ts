import { ElementRef, NgZone, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { MyDate } from '../../models/date.model';
import { BuilderService } from '../builder.service';

@Component({
  selector: 'app-first-option',
  templateUrl: './first-option.component.html',
  styleUrls: ['./first-option.component.css']
})
export class FirstOptionComponent implements OnInit {

  public placeSelected: boolean = false;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public cardNumber: string;
  public optionNumber: string;
  //place_id: ChIJtRFG_4eJa4cRJWm2uaqpiks

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  private date: MyDate;
  private place: google.maps.places.PlaceResult;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private db: AngularFireDatabase,
    private builderService: BuilderService
  ) {}

  ngOnInit() {
    this._activateRoute.paramMap
    .subscribe(paramMap => {
      let dateId = paramMap.get('dateId');
      this.optionNumber = paramMap.get('optionId');
      this.cardNumber = paramMap.get('cardId');

      this.afAuth.authState.subscribe(user => {
        this.db.object(`dates/${user.uid}/${dateId}`).snapshotChanges()
          .subscribe(date => {
            let dateConvert = date.payload.toJSON().toString();
            this.date = JSON.parse(dateConvert);
          });
      });
    });

    this._activateRoute.paramMap.subscribe(params => {
      this.optionNumber = params.get('optionId');
      console.log(this.optionNumber);
    });
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();
    //this.searchControl.setValue('Snooze, an A.M. Eatery, West 104th Avenue, Westminster, CO, USA');
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.placeSelected = true;
          this.place = place;
          //nconsole.log(place);
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  public saveForm() {
    // What to save
    // Name, address, hours, website, id, url
    //console.log(this.searchControl);

    let name = this.searchControl.get('dateName').value;
    let place = this.place;

    let option = this.date.dateOptions[parseInt(this.optionNumber)];
    let card = parseInt(this.cardNumber);
    if (card === 1) {
      option.option1.name = name;
      option.option1.label = name;
      option.option1.address = place.formatted_address;
    }
  }

}
