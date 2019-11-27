var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Worker } from './Worker';
import { Hour } from './hour';
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.worker = new Worker();
        this.tableMode = true;
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
        this.isFirstHour = true;
        this.isNewDay = true;
        this.isDisableSettings = true;
        //dutyWorkerArr: Worker[];
        //dutyWorkerByLetterArr: Worker[];
        //dutyWorkerInWednesday: Worker[];
        this.timeArr = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        this.selectedHour = new Hour;
        this.newHour = new Hour;
        //this.datepicker = new NgbdDatepicker(this.calendar);
        //this.today = calendar.getToday();
        //this.date = this.datepicker.model;
        //this.day = this.date.day;
        //this.month = this.date.month;
    }
    AppComponent.prototype.tabChangeHandler = function (t) {
        console.log(t);
        this.saveHour();
        if (!this.isNewDay) {
            var hour = this.selectedDateHours.find(function (x) { return x.name == t.nextId; });
            if (!hour) {
                this.selectedHour.name = t.nextId;
                this.selectedHour.date = this.selectedDate;
            }
            else {
                this.selectedHour = hour;
            }
            console.log(this.selectedHour);
        }
        else {
            this.selectedHour.name = t.nextId;
            this.selectedHour.date = this.selectedDate;
            console.log(this.selectedHour);
        }
    };
    AppComponent.prototype.minSlotChangeHandler = function (count) {
        this.newHour.minCount = count;
        //this.slots = this.getArray(count);
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
        var _this = this;
        this.day = date.day;
        this.month = date.month;
        console.log(date);
        this.selectedDate = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        console.log(this.selectedDate);
        //
        this.dataService.getHours(this.selectedDate).subscribe(function (data) {
            if (data.length == 0) {
                _this.isNewDay = true;
                //this.selectedHour.date = new Date (Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), 0, 0, 0, 0));
            }
            else {
                _this.selectedHour = data[0];
                _this.selectedDateHours = data;
                _this.isNewDay = false;
                console.log(_this.selectedDateHours);
                //console.log(this.workers);
            }
        });
    };
    AppComponent.prototype.generateGraph = function (date) {
        var _this = this;
        this.dataService.getHours(date).subscribe(function (data) {
            _this.selectedDateHours = data;
            console.log(_this.selectedDateHours);
            console.log(_this.workers);
        });
    };
    AppComponent.prototype.getToday = function () {
        var today;
        today = new Date();
        today.setHours(0, 0, 0, 0);
        //today.setDate(today.getDate());
        return today;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.loadWorkers();
        this.selectedDate = this.getToday();
        this.loadHours();
    };
    AppComponent.prototype.save = function () {
        var _this = this;
        console.log(this.worker);
        this.dataService.updateWorker(this.worker)
            .subscribe(function (data) { return _this.loadWorkers(); });
    };
    AppComponent.prototype.saveHour = function () {
        var _this = this;
        //this.selectedHour.date = new Date(Date.UTC(toISOString());
        this.selectedHour.date = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), 0, 0, 0, 0));
        if (!this.selectedHour.id) {
            this.dataService.createHour(this.selectedHour)
                .subscribe(function (data) { return _this.selectedDateHours.push(data); });
        }
        else {
            this.dataService.updateHour(this.selectedHour)
                .subscribe(function (data) { return _this.loadHours(); });
        }
        this.cancel();
    };
    AppComponent.prototype.loadHours = function () {
        var _this = this;
        this.dataService.getHours(this.selectedDate)
            .subscribe(function (data) { return _this.selectedDateHours = data; });
        console.log(this.selectedDateHours);
    };
    AppComponent.prototype.cancel = function () {
        this.selectedHour = new Hour();
    };
    AppComponent.prototype.isFind = function (itemId, item) {
        return itemId == item.id;
    };
    AppComponent.prototype.changeStaff = function (worker) {
        var _this = this;
        this.worker = this.workers.find(function (x) { return x.id == _this.selectedWorkerId; });
        this.isDisableSettings = false;
        console.log(this.worker);
    };
    AppComponent.prototype.loadWorkers = function () {
        var _this = this;
        //this.workers = this.dataService.getWorkers();
        this.dataService.getData(this.dataService.url)
            .subscribe(function (data) { return _this.workers = data; });
    };
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