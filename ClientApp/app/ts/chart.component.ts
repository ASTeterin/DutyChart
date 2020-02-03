﻿import { Input, Component } from '@angular/core';
import { Hour } from "./hour"
import { log } from 'util';

@Component({
    selector: 'chart',
    templateUrl: '../html/chart.component.html',
    styleUrls: ['../css/chart.css']
})
export class ChartComponent {
    @Input() slots: any[];
    @Input() workers: any[];
    @Input() selectedDateHours: any[];
    maxSlotsArray: number[];
    minSlotsArray: number[];
    //@Input() minSlotsCount: number;
    //@Input() maxSlotsCount: number;
    @Input() hour: Hour;


    createArray(countElement: number): number[] {
        var arr: number[];
        for (var j = 1; j <= countElement; j++) {
            arr.push(j);
        }
        return arr;
    }

    getChartParam() {
        //this.maxSlotsArray = this.createArray(this.maxSlotsCount);

        this.minSlotsArray = (this.hour && this.hour.minCount) ? this.createArray(this.hour.minCount) : [1, 2, 3];
    }

    getWorkerName(workerId: any) {
        let worker = this.workers.find(w => w.id == workerId);
        return worker ? worker.name : "";
    }

    getWorkerColor(workerId: any) {
        let worker = this.workers.find(w => w.id == workerId);
        return worker ? worker.color : "";
    }

    constructor() {
        //this.getChartParam();
    }
}