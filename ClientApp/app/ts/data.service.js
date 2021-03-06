var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.urlWorker = "/api/Workers";
        this.urlHour = "/api/Hours";
        this.urlSlot = "/api/Slot";
        this.urlGroup = "/api/Group";
        this.urlFiledSlot = "/api/Slot/get-filled-slots";
        this.urlAbsentPeriods = "/api/AbsentPeriod";
        this.urlFreeSlots = "/api/Workers/get-worker-free-slots";
        this.urlAbsentWorker = "/api/Workers/get-absent-workers";
        this.urlWorkerInDay = "/api/WorkerInDay";
        this.urlWorkerInDayByGroupe = "/api/WorkerInDay/workers-by-group";
        this.urlDelAllWorkersInDay = "/api/WorkerInDay/reset-worker-in-day";
        this.urlSpecialHourInDay = "/api/SpecialHoursInDay";
        this.urlDesirableHourInDay = "/api/SpecialHoursInDay/desirable-hours";
        this.urlUnwantedHourInDay = "/api/SpecialHoursInDay/unwanted-hours";
        this.urlSpecialHour = "/api/SpecialHour";
        this.urlSpecialHours = "/api/SpecialHour/get-all-hours";
        this.urlAllSpecialHoursInDay = "/api/SpecialHoursInDay/all-special-hours";
        this.urlSpecialHoursInDayForWorker = "/api/SpecialHoursInDay/special-hours";
        this.urlDefaultSlots = "/api/DefaultSlots";
        this.urlSlotsInDay = "api/slot/get-slots-in-day";
    }
    DataService.prototype.getData = function (url) {
        return this.http.get(url);
    };
    DataService.prototype.getSlotsByHourId = function (hourId) {
        return this.http.get(this.urlSlot + "?hourId=" + hourId);
    };
    DataService.prototype.getSlots = function () {
        return this.http.get(this.urlSlot);
    };
    DataService.prototype.getSlotsInDay = function (date) {
        return this.http.get(this.urlSlotsInDay + "?date=" + date.format('YYYY-MM-DD'));
    };
    DataService.prototype.createSlot = function (slot) {
        return this.http.post(this.urlSlot, slot);
    };
    DataService.prototype.updateSlot = function (slot) {
        return this.http.put(this.urlSlot + '/' + slot.id, slot);
    };
    DataService.prototype.deleteSlotsInHour = function (id) {
        return this.http.delete(this.urlSlot + '/' + id);
    };
    DataService.prototype.createWorker = function (worker) {
        return this.http.post(this.urlWorker, worker);
    };
    DataService.prototype.updateWorker = function (worker) {
        return this.http.put(this.urlWorker + '/' + worker.id, worker);
    };
    DataService.prototype.deleteWorker = function (id) {
        return this.http.delete(this.urlWorker + '/' + id);
    };
    DataService.prototype.getGroups = function () {
        return this.http.get(this.urlGroup);
    };
    DataService.prototype.createGroup = function (group) {
        return this.http.post(this.urlGroup, group);
    };
    DataService.prototype.updateGroup = function (group) {
        return this.http.put(this.urlGroup + '/' + group.id, group);
    };
    DataService.prototype.deleteGroup = function (id) {
        return this.http.delete(this.urlGroup + '/' + id);
    };
    DataService.prototype.getCountFreeSlotsForWorkers = function (date) {
        return this.http.get(this.urlFreeSlots + "?date=" + date.format('YYYY-MM-DD'));
    };
    DataService.prototype.getAbsentWorkers = function (date) {
        return this.http.get(this.urlAbsentWorker + "?date=" + date.format('YYYY-MM-DD'));
    };
    DataService.prototype.getHours = function (date) {
        return this.http.get(this.urlHour + "?date=" + date.format('YYYY-MM-DD'));
    };
    DataService.prototype.getAllHours = function () {
        return this.http.get("" + this.urlHour);
    };
    DataService.prototype.createHour = function (hour) {
        return this.http.post(this.urlHour, hour);
    };
    DataService.prototype.updateHour = function (hour) {
        return this.http.put(this.urlHour + '/' + hour.id, hour);
    };
    DataService.prototype.getAbsentPeriodsForWorker = function (workerId) {
        return this.http.get(this.urlAbsentPeriods + "?workerId=" + workerId);
    };
    DataService.prototype.getAbsentPeriods = function () {
        return this.http.get("" + this.urlAbsentPeriods);
    };
    DataService.prototype.createAbsentPeriod = function (absentPeriod) {
        return this.http.post(this.urlAbsentPeriods, absentPeriod);
    };
    DataService.prototype.updateAbsentPeriod = function (absentPeriod) {
        return this.http.put(this.urlAbsentPeriods + '/' + absentPeriod.id, absentPeriod);
    };
    DataService.prototype.deleteAbsentPeriod = function (id) {
        return this.http.delete(this.urlAbsentPeriods + '/' + id);
    };
    DataService.prototype.getFilledSlots = function (date) {
        return this.http.get(this.urlFiledSlot + "?date=" + date.format('YYYY-MM-DD'));
    };
    DataService.prototype.getWorkersInDay = function (date) {
        return this.http.get(this.urlWorkerInDay + "?date=" + date.format('YYYY-MM-DD'));
    };
    DataService.prototype.getWorkersInDayByGroup = function (date, groupId) {
        return this.http.get(this.urlWorkerInDayByGroupe + "?date=" + date.format('YYYY-MM-DD') + "&groupId=" + groupId);
    };
    DataService.prototype.createWorkerInDay = function (workerInDay) {
        return this.http.post(this.urlWorkerInDay, workerInDay);
    };
    DataService.prototype.updateWorkerInDay = function (workerInDay) {
        return this.http.put(this.urlWorkerInDay + '/' + workerInDay.id, workerInDay);
    };
    DataService.prototype.updateWorkersInDay = function (workersInDay) {
        return this.http.put(this.urlWorkerInDay, workersInDay);
    };
    DataService.prototype.deleteWorkerInDay = function (date) {
        return this.http.get(this.urlDelAllWorkersInDay + "?date=" + date.format('YYYY-MM-DD'));
    };
    /*deleteAllWorkersInDay(date: moment.Moment) {
        return this.http.deleteAllWorkersInDay(`${this.urlDellAllWorkersInDay}?date=${date.format('YYYY-MM-DD')}`)
    }*/
    DataService.prototype.createSpecialHourInDay = function (specialHourInDay) {
        return this.http.post(this.urlSpecialHourInDay, specialHourInDay);
    };
    DataService.prototype.getDesirableHourInDay = function (date, workerId) {
        return this.http.get(this.urlDesirableHourInDay + "?date=" + date.format('YYYY-MM-DD') + "&workerId=" + workerId);
    };
    DataService.prototype.getSpecialHoursInDay = function (date, workerId) {
        return this.http.get(this.urlSpecialHourInDay + "?date=" + date.format('YYYY-MM-DD') + "&workerId=" + workerId);
    };
    DataService.prototype.getSpecialHourInDay = function (date, workerId) {
        return this.http.get(this.urlSpecialHourInDay + "?&date=" + date.format('YYYY-MM-DD') + "&workerId=" + workerId);
    };
    DataService.prototype.getSpecialHourInDayForWorker = function (date, workerId, type, hourNumber) {
        return this.http.get(this.urlSpecialHoursInDayForWorker + "?type=" + type + "&date=" + date.format('YYYY-MM-DD') + "&workerId=" + workerId + "&hourNumber=" + hourNumber);
    };
    DataService.prototype.deleteSpecialHourInDay = function (id) {
        return this.http.delete(this.urlSpecialHourInDay + '/' + id);
    };
    DataService.prototype.getUnwantedHourInDay = function (date, type, workerId) {
        return this.http.get(this.urlUnwantedHourInDay + "?date=" + date.format('YYYY-MM-DD') + "&workerId=" + workerId);
    };
    DataService.prototype.getAllSpecialHoursInDay = function (date) {
        return this.http.get(this.urlAllSpecialHoursInDay + "?date=" + date.format('YYYY-MM-DD'));
    };
    DataService.prototype.createSpecialHour = function (specialHour) {
        return this.http.post(this.urlSpecialHour, specialHour);
    };
    DataService.prototype.getSpecialHour = function (type, workerId, hourNumber) {
        return this.http.get(this.urlSpecialHour + "?type=" + type + "&workerId=" + workerId + "&hourNumber=" + hourNumber);
    };
    DataService.prototype.getSpecialHours = function (workerId) {
        return this.http.get(this.urlSpecialHours + "?workerId=" + workerId);
    };
    DataService.prototype.deleteSpecialHour = function (id) {
        return this.http.delete(this.urlSpecialHour + '/' + id);
    };
    DataService.prototype.getDefaultSlots = function () {
        return this.http.get(this.urlDefaultSlots);
    };
    DataService.prototype.createDefaultSlots = function (defaultSlot) {
        return this.http.post(this.urlDefaultSlots, defaultSlot);
    };
    DataService.prototype.updateDefaultSlots = function (defaultSlot) {
        return this.http.put(this.urlDefaultSlots + '/' + defaultSlot.id, defaultSlot);
    };
    DataService.prototype.deleteDefaultSlot = function (id) {
        return this.http.delete(this.urlDefaultSlots + '/' + id);
    };
    DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map