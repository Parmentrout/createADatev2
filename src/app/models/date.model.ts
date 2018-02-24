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
    option1: IDateCard;
    option2: IDateCard;
}

export class DateOption implements IDateOption {
    optionNumber: number;
    option1: DateCard;
    option2: DateCard;
}

export interface IDateCard {
    label: string;
    name: string;
    address: string;
    placesInfo: any;
}

export class DateCard implements IDateCard {
    label: string;
    name: string;
    address: string;
    placesInfo: any;
}