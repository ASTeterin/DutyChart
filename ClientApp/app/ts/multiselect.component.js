var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Component, Output, EventEmitter } from '@angular/core';
var NgMultiselect = /** @class */ (function () {
    function NgMultiselect() {
        //dropdownList: any[];
        this.selectedItems = [];
        this.selectedIds = [];
        this.dropdownSettings = {};
        this.onChanged = new EventEmitter();
        console.log(this.dropdownList);
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: false
        };
    }
    NgMultiselect.prototype.onItemSelect = function (item) {
        this.onChanged.emit({ operation: "select", data: item.item_id });
    };
    NgMultiselect.prototype.onItemDeSelect = function (item) {
        this.onChanged.emit({ operation: "unSelect", data: item.item_id });
    };
    NgMultiselect.prototype.onSelectAll = function (items) {
        var _this = this;
        items.forEach(function (item) { _this.onItemSelect(item); });
    };
    NgMultiselect.prototype.onDeSelectAll = function (items) {
        var _this = this;
        this.selectedHours.forEach(function (item) { _this.onItemDeSelect(item); });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgMultiselect.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NgMultiselect.prototype, "isDisable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NgMultiselect.prototype, "selectedHours", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NgMultiselect.prototype, "dropdownList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgMultiselect.prototype, "userName", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgMultiselect.prototype, "onChanged", void 0);
    NgMultiselect = __decorate([
        Component({
            selector: 'multiselect',
            templateUrl: '../html/multiselect.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], NgMultiselect);
    return NgMultiselect;
}());
export { NgMultiselect };
//# sourceMappingURL=multiselect.component.js.map