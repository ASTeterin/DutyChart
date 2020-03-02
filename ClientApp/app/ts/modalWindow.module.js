var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModal1Content, NgbdModal2Content, NgbdModalStacked } from './modalWindow.component';
var NgbdModalStackedModule = /** @class */ (function () {
    function NgbdModalStackedModule() {
    }
    NgbdModalStackedModule = __decorate([
        NgModule({
            imports: [BrowserModule, NgbModule],
            declarations: [NgbdModalStacked, NgbdModal1Content, NgbdModal2Content],
            exports: [NgbdModalStacked],
            bootstrap: [NgbdModalStacked],
            entryComponents: [NgbdModal1Content, NgbdModal2Content]
        })
    ], NgbdModalStackedModule);
    return NgbdModalStackedModule;
}());
export { NgbdModalStackedModule };
//# sourceMappingURL=modalWindow.module.js.map