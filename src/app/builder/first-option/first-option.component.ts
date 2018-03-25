import { ElementRef, NgZone, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { MyDate, DateCard } from '../../models/date.model';
import { BuilderService } from '../builder.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-first-option',
  templateUrl: './first-option.component.html',
  styleUrls: ['./first-option.component.css']
})
export class FirstOptionComponent implements OnInit, OnDestroy {

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
  
  public formSaving: boolean = false;
  public errorMessages: string = '';

  private date: MyDate = new MyDate();
  private place: google.maps.places.PlaceResult;
  public cardLabel: string = '';
  public isCreatePage: boolean = true;
  private cancellationToken = new Subject<any>();

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
    this.searchControl = new FormControl();

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

            let option = this.date.dateOptions[parseInt(this.optionNumber) - 1];
            let card = parseInt(this.cardNumber);
            if (card === 1) { 
              if (option.option1 && option.option1.label && option.option1.label !== '') {
                this.cardLabel = option.option1.label;
                this.isCreatePage = false;
              }

              if (option.option1 && option.option1.placesInfo) {
                this.searchControl.setValue(`${option.option1.placesInfo.name},${option.option1.placesInfo.formatted_address}`);
                this.place = option.option1.placesInfo;
                this.latitude = option.option1.latitude;
                this.longitude = option.option1.longitude;
                this.placeSelected = true;
              }
            } else if (card === 2) {
              if (option.option2 && option.option2.label && option.option2.label !== '') {
                this.cardLabel = option.option2.label;
                this.isCreatePage = false;
              }

              if (option.option2 && option.option2.placesInfo) {
                this.searchControl.setValue(`${option.option2.placesInfo.name},${option.option2.placesInfo.formatted_address}`);
                this.place = option.option2.placesInfo;
                this.latitude = option.option2.latitude;
                this.longitude = option.option2.longitude;
                this.placeSelected = true;
              }
            }

            this.zoom = 15;

          });
      });
    });

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //create search FormControl
    //this.searchControl.setValue('Snooze, an A.M. Eatery, West 104th Avenue, Westminster, CO, USA');
    //set current position
    if (this.isCreatePage) {
      this.setCurrentPosition();
    }

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
          this.zoom = 15;
        });
      });
    });
  }

  ngOnDestroy() {
    this.cancellationToken.next();
    this.cancellationToken.complete();
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  public saveForm() {
    // What to save
    // Name, address, hours, website, id, url
    let place = this.place;

    let option = this.date.dateOptions[parseInt(this.optionNumber) - 1];
    let card = parseInt(this.cardNumber);
    if (card === 1) {
      option.option1 = new DateCard();
      option.option1.name = place.name;
      option.option1.label = this.cardLabel;
      option.option1.address = place.formatted_address;
      option.option1.latitude = this.latitude;
      option.option1.longitude = this.longitude;

      option.option1.placesInfo = place;
    } else if (card === 2) {
      option.option2 = new DateCard();
      option.option2.name = place.name;
      option.option2.label = this.cardLabel;
      option.option2.address = place.formatted_address;
      option.option2.latitude = this.latitude;
      option.option2.longitude = this.longitude;

      option.option2.placesInfo = place;
    } else { 
      return;
    }

    this.builderService.saveDate(this.date).subscribe(result => {
      this.formSaving = false;
        if (result) {
          this._router.navigate([`/build/option-menu/${this.date.dateId}`]);
        } else {
          this.errorMessages = 'Whoops!  Something went wrong, come back later to try again!';
        }
    });
  }
}
