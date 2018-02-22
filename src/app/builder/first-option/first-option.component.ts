import { ElementRef, NgZone, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-first-option',
  templateUrl: './first-option.component.html',
  styleUrls: ['./first-option.component.css']
})
export class FirstOptionComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public optionNumber: string;
  //place_id: ChIJtRFG_4eJa4cRJWm2uaqpiks

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
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
  }

}
