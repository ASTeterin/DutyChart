var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './Worker';
import { Hour } from './hour';
import { NgbdTabset } from './tabset';
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.worker = new Worker();
        this.tableMode = true;
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
        this.isFirstHour = true;
        this.isDisableSettings = true;
        //dutyWorkerArr: Worker[];
        //dutyWorkerByLetterArr: Worker[];
        //dutyWorkerInWednesday: Worker[];
        this.timeArr = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        this.slots = [1, 2, 3];
        this.newHour = new Hour;
        //this.datepicker = new NgbdDatepicker(this.calendar);
        //this.today = calendar.getToday();
        //this.date = this.datepicker.model;
        //this.day = this.date.day;
        //this.month = this.date.month;
    }
    AppComponent.prototype.tabChangeHandler = function (t) {
        console.log(t);
        /*if (this.isFirstHour) {
            this.newHour.name = t.activeId;
            this.isFirstHour = false;
        } else {
            this.newHour.name = t.nextId;
        }*/
        this.newHour.name = t.activeId;
        console.log(this.newHour);
    };
    AppComponent.prototype.minSlotChangeHandler = function (count) {
        this.newHour.minCount = count;
        this.slots = this.getArray(count);
        //console.log(count);
    };
    AppComponent.prototype.maxSlotChangeHandler = function (count) {
        this.newHour.maxCount = count;
        //console.log(count);
    };
    AppComponent.prototype.getArray = function (countElem) {
        var arr = [];
        for (var i = 1; i <= countElem; i++) {
            arr.push(i);
        }
        console.log(arr);
        return arr;
    };
    AppComponent.prototype.dateChangeHandler = function (date) {
        this.day = date.day;
        this.month = date.month;
        console.log(date);
        this.newHour.date = new Date(date.year, date.month - 1, date.day);
    };
    AppComponent.prototype.generateGraph = function (date) {
        var _this = this;
        this.dataService.getHours(date).subscribe(function (data) {
            _this.selectedDateHours = data;
            console.log(_this.selectedDateHours);
            console.log(_this.workers);
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.loadWorkers();
        this.newHour.date = new Date();
    };
    AppComponent.prototype.save = function () {
        var _this = this;
        console.log(this.worker);
        this.dataService.updateWorker(this.worker)
            .subscribe(function (data) { return _this.loadWorkers(); });
    };
    AppComponent.prototype.isFind = function (itemId, item) {
        return itemId == item.id;
    };
    AppComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        this.worker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        this.isDisableSettings = false;
        //this.currenStaffIsDutyCheck = this.worker.isDuty;
        console.log(this.worker);
        //console.log(this.currenStaffIsDutyCheck);
        //this.date = this.datepicker.model;
        //console.log(this.date);
    };
    AppComponent.prototype.loadWorkers = function () {
        var _this = this;
        //this.workers = this.dataService.getWorkers();
        this.dataService.getData(this.dataService.url)
            .subscribe(function (data) { return _this.workers = data; });
    };
    __decorate([
        ViewChild(NgbdTabset, { static: false }),
        __metadata("design:type", NgbdTabset)
    ], AppComponent.prototype, "tab", void 0);
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            //styleUrls: ['./app.component.css'],
            styles: [" \n            .form-group {width: 100%;}\n            .worker_info_item {display: inline-block;}\n    "],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map