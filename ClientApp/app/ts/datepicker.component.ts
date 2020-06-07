﻿import { Component , EventEmitter, Output} from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker',
    templateUrl: '../html/datepicker.component.html',
    styleUrls: ['../css/datapicker.css']

})
export class NgbdDatepicker {

    model: NgbDateStruct;
    today: NgbDateStruct;
    tomorrow: NgbDateStruct;

    constructor(private calendar: NgbCalendar) {
        this.tomorrow = calendar.getNext(calendar.getToday(), 'd', 1);;
        this.model = this.tomorrow;
        this.getDate(this.tomorrow);
    }

    @Output() onChanged = new EventEmitter<NgbDateStruct>()

    getDate($event: any): void {
        this.onChanged.emit(this.model);
    }
}