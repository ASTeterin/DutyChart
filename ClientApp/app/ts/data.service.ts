﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from './worker';
import { WorkerInDay } from './workerInDay';
import { Hour } from './hour';
import { Slot } from './slot';
import { Group } from './group';
import { AbsentPeriod } from './absentPeriod';
import * as moment from 'moment';
import { SpecialHourInDay } from './specialHourInDay';
import { SpecialHour } from './specialHour';
import { DefaultSlots } from './defaultSlots';

@Injectable()
export class DataService {

    public urlWorker = "/api/Workers";
    public urlHour = "/api/Hours";
    public urlSlot = "/api/Slot";
    public urlGroup = "/api/Group";
    public urlFiledSlot = "/api/Slot/get-filled-slots";
    public urlAbsentPeriods = "/api/AbsentPeriod";
    public urlFreeSlots = "/api/Workers/get-worker-free-slots"
    public urlAbsentWorker = "/api/Workers/get-absent-workers";
    public urlWorkerInDay = "/api/WorkerInDay";
    public urlWorkerInDayByGroupe = "/api/WorkerInDay/workers-by-group";
    public urlDelAllWorkersInDay = "/api/WorkerInDay/reset-worker-in-day";
    public urlSpecialHourInDay = "/api/SpecialHoursInDay";
    public urlDesirableHourInDay = "/api/SpecialHoursInDay/desirable-hours";
    public urlUnwantedHourInDay = "/api/SpecialHoursInDay/unwanted-hours";
    public urlSpecialHour = "/api/SpecialHour";
    public urlSpecialHours = "/api/SpecialHour/get-all-hours";
    public urlAllSpecialHoursInDay = "/api/SpecialHoursInDay/all-special-hours";
    public urlSpecialHoursInDayForWorker = "/api/SpecialHoursInDay/special-hours";
    public urlDefaultSlots = "/api/DefaultSlots";
    public urlSlotsInDay = "api/slot/get-slots-in-day";

    constructor(private http: HttpClient) {
    }

    getData(url: string) {
        return this.http.get(url);
    }

    getSlotsByHourId(hourId: number) {
        return this.http.get(`${this.urlSlot}?hourId=${hourId}`);
    }

    getSlots() {
        return this.http.get(this.urlSlot);
    }

    getSlotsInDay(date: moment.Moment) {
        return this.http.get(`${this.urlSlotsInDay}?date=${date.format('YYYY-MM-DD')}`);
    }

    createSlot(slot: Slot) {
        return this.http.post(this.urlSlot, slot);
    }

    updateSlot(slot: Slot) {

        return this.http.put(this.urlSlot + '/' + slot.id, slot);
    }

    deleteSlotsInHour(id: number) {
        return this.http.delete(this.urlSlot + '/' + id);
    }

    createWorker(worker: Worker) {
        return this.http.post(this.urlWorker, worker);
    }
    updateWorker(worker: Worker) {

        return this.http.put(this.urlWorker + '/' + worker.id, worker);
    }
    deleteWorker(id: number) {
        return this.http.delete(this.urlWorker + '/' + id);
    }

    getGroups() {
        return this.http.get(this.urlGroup);
    }

    createGroup(group: Group) {
        return this.http.post(this.urlGroup, group);
    }
    updateGroup(group: Group) {

        return this.http.put(this.urlGroup + '/' + group.id, group);
    }
    deleteGroup(id: number) {
        return this.http.delete(this.urlGroup + '/' + id);
    }

    getCountFreeSlotsForWorkers(date: moment.Moment) {
        return this.http.get(`${this.urlFreeSlots}?date=${date.format('YYYY-MM-DD')}`);
    }

    getAbsentWorkers(date: moment.Moment) {
        return this.http.get(`${this.urlAbsentWorker}?date=${date.format('YYYY-MM-DD')}`);
    }

    getHours(date: moment.Moment) {
        return this.http.get(`${this.urlHour}?date=${date.format('YYYY-MM-DD')}`);
    }

    getAllHours() {
        return this.http.get(`${this.urlHour}`);
    }

    createHour(hour: Hour) {
        return this.http.post(this.urlHour, hour);
    }

    updateHour(hour: Hour) {
        return this.http.put(this.urlHour + '/' + hour.id, hour);
    }

    getAbsentPeriodsForWorker(workerId: number) {
        return this.http.get(`${this.urlAbsentPeriods}?workerId=${workerId}`);
    }

    getAbsentPeriods() {
        return this.http.get(`${this.urlAbsentPeriods}`);
    }

    createAbsentPeriod(absentPeriod: AbsentPeriod) {
        return this.http.post(this.urlAbsentPeriods, absentPeriod);
    }

    updateAbsentPeriod(absentPeriod: AbsentPeriod) {
        return this.http.put(this.urlAbsentPeriods + '/' + absentPeriod.id, absentPeriod);
    }

    deleteAbsentPeriod(id: number) {
        return this.http.delete(this.urlAbsentPeriods + '/' + id);
    }

    getFilledSlots(date: moment.Moment) {
        return this.http.get(`${this.urlFiledSlot}?date=${date.format('YYYY-MM-DD')}`);
    }

    getWorkersInDay(date: moment.Moment) {
        return this.http.get(`${this.urlWorkerInDay}?date=${date.format('YYYY-MM-DD')}`);
    }

    getWorkersInDayByGroup(date: moment.Moment, groupId: number) {
        return this.http.get(`${this.urlWorkerInDayByGroupe}?date=${date.format('YYYY-MM-DD')}&groupId=${groupId}`);
    }

    createWorkerInDay(workerInDay: WorkerInDay) {
        return this.http.post(this.urlWorkerInDay, workerInDay);
    }
    updateWorkerInDay(workerInDay: WorkerInDay) {

        return this.http.put(this.urlWorkerInDay + '/' + workerInDay.id, workerInDay);
    }

    updateWorkersInDay(workersInDay: WorkerInDay[]) {
        return this.http.put(this.urlWorkerInDay, workersInDay);
    }

    deleteWorkerInDay(date: moment.Moment) {
        return this.http.get(`${this.urlDelAllWorkersInDay}?date=${date.format('YYYY-MM-DD')}`);
    }

    /*deleteAllWorkersInDay(date: moment.Moment) {
        return this.http.deleteAllWorkersInDay(`${this.urlDellAllWorkersInDay}?date=${date.format('YYYY-MM-DD')}`)
    }*/

    createSpecialHourInDay(specialHourInDay: SpecialHourInDay) {
        return this.http.post(this.urlSpecialHourInDay, specialHourInDay);
    }

    getDesirableHourInDay(date: moment.Moment, workerId: number) {
        return this.http.get(`${this.urlDesirableHourInDay}?date=${date.format('YYYY-MM-DD')}&workerId=${workerId}`);
    }

    getSpecialHoursInDay(date: moment.Moment, workerId: number) {
        return this.http.get(`${this.urlSpecialHourInDay}?date=${date.format('YYYY-MM-DD')}&workerId=${workerId}`);
    }

    getSpecialHourInDay(date: moment.Moment, workerId: number) {
        return this.http.get(`${this.urlSpecialHourInDay}?&date=${date.format('YYYY-MM-DD')}&workerId=${workerId}`);
    }

    getSpecialHourInDayForWorker(date: moment.Moment, workerId: number, type: boolean, hourNumber: number) {
        return this.http.get(`${this.urlSpecialHoursInDayForWorker }?type=${type}&date=${date.format('YYYY-MM-DD')}&workerId=${workerId}&hourNumber=${hourNumber}`);
    }

    deleteSpecialHourInDay(id: number) {
        return this.http.delete(this.urlSpecialHourInDay + '/' + id);
    }

    getUnwantedHourInDay(date: moment.Moment, type: boolean, workerId: number) {
        return this.http.get(`${this.urlUnwantedHourInDay}?date=${date.format('YYYY-MM-DD')}&workerId=${workerId}`);
    }

    getAllSpecialHoursInDay(date: moment.Moment) {
        return this.http.get(`${this.urlAllSpecialHoursInDay}?date=${date.format('YYYY-MM-DD')}`);
    }

    createSpecialHour(specialHour: SpecialHour) {
        return this.http.post(this.urlSpecialHour, specialHour);
    }

    getSpecialHour(type: boolean, workerId: number, hourNumber: number) {
        return this.http.get(`${this.urlSpecialHour}?type=${type}&workerId=${workerId}&hourNumber=${hourNumber}`);
    }

    getSpecialHours(workerId: number) {
        return this.http.get(`${this.urlSpecialHours}?workerId=${workerId}`);
    }

    deleteSpecialHour(id: number) {
        return this.http.delete(this.urlSpecialHour + '/' + id);
    }

    getDefaultSlots() {
        return this.http.get(this.urlDefaultSlots);
    }

    createDefaultSlots(defaultSlot: DefaultSlots) {
        return this.http.post(this.urlDefaultSlots, defaultSlot);
    }

    updateDefaultSlots(defaultSlot: DefaultSlots) {

        return this.http.put(this.urlDefaultSlots + '/' + defaultSlot.id, defaultSlot);
    }
    deleteDefaultSlot(id: number) {
        return this.http.delete(this.urlDefaultSlots + '/' + id);
    }

}
