﻿import { Input, Component, ViewChild, Output, EventEmitter} from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Hour } from './hour';


@Component({
    selector: 'ngbd-tabset',
    templateUrl: './tabset.html',
    //styleUrls: ['./tabset.css']
    styles: [` 
            label.count_slot_label {font-size: 10px;}
            .nav-link {padding: .5rem .5rem;}
            .tab_time {padding: 2px;}
            
    `]
})
export class NgbdTabset {
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];
    id: string;
    @Input() timeArr: string;
    @Input() selectedHour: Hour;

    @Output() onChanged = new EventEmitter<any>()
    onChange($event: any) {
        this.onChanged.emit($event)
    }

    @Output() onMinSlotChanged = new EventEmitter<number>()
    onMinSlotChange($event: any) {
        this.onMinSlotChanged.emit($event);
    }

    @Output() onMaxSlotChanged = new EventEmitter<number>()
    onMaxSlotChange($event: any) {
        this.onMaxSlotChanged.emit($event);
    }

    /*public onChange($event: NgbTabChangeEvent) {
        this.id = $event.nextId;
    }*/
}
