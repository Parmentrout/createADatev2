export class MyDate {
    dateName: string;
    description: string;
    userId: string;
    dateId: number;

    dateOptions: DateOption[];
}

export class DateOption {
    option1: DateCard;
    option2: DateCard;
}

export class DateCard {
    label: string;
    name: string;
    address: string;
    placesInfo: any;
}