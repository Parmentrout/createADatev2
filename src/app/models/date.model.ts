export interface IMyDate {
    dateName: string;
    description: string;
    userId: string;
    dateId: number;

    dateOptions: IDateOption[];
}

export class MyDate implements IMyDate {
    dateName: string = '';
    description: string = '';
    userId: string = '';
    dateId: number = 0;

    dateOptions: IDateOption[] = new Array<DateOption>();
}

export interface IDateOption {
    optionNumber: number;
    started: boolean;
    finished: boolean;
    option1: IDateCard;
    option2: IDateCard;
}

export class DateOption implements IDateOption {
    optionNumber: number;
    started: boolean = false;
    finished: boolean = false;
    option1: DateCard;
    option2: DateCard;
}

export interface IDateCard {
    label: string;
    name: string;
    address: string;
    selected: boolean;
    finished: boolean;
    latitude: number;
    longitude: number;
    placesInfo: google.maps.places.PlaceResult;
}

export class DateCard implements IDateCard {
    label: string;
    name: string;
    selected: boolean = false;
    finished: boolean = false;
    address: string;
    latitude: number;
    longitude: number;
    placesInfo: google.maps.places.PlaceResult;
}