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
import { Router } from '@angular/router';
import { WebSocketService } from '../web-socket.service';
var DashboardComponent = (function () {
    function DashboardComponent(router) {
        var _this = this;
        this.router = router;
        this.sessionData = [];
        this.username = "";
        this.agentStatus = true;
        WebSocketService.getInstance().sendMessage({
            action: "registerDashboard",
            message: {},
            status: "Sent"
        });
        WebSocketService.getInstance().sessionDataBehaviorSubject.subscribe(function (data) { return _this.sessionDataBehaviorSubjectHandler(data); });
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(function (data) { return _this.loginStatusBehaviorSubjectHandler(data); });
        WebSocketService.getInstance().cdrDataBehaviorSubject.subscribe(function (data) { return _this.cdrBehaviorSubjectHandler(data); });
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.login = function () {
        this.router.navigate(['/login']);
    };
    DashboardComponent.prototype.getCdr = function () {
        WebSocketService.getInstance().sendMessage({
            action: "getCdr",
            message: {
                username: this.username,
                status: this.agentStatus
            },
            status: "Sent"
        });
    };
    DashboardComponent.prototype.sessionDataBehaviorSubjectHandler = function (data) {
        console.log("DashboardComponent: sessionDataBehaviorSubjectHandler: data", data);
        if (data != undefined) {
            if (data.length >= 0) {
                this.sessionData = data;
            }
            this.username = data.username;
            if (data.available) {
                this.agentStatus = true;
            }
            else {
                this.agentStatus = false;
            }
        }
    };
    DashboardComponent.prototype.loginStatusBehaviorSubjectHandler = function (data) {
        console.log("DashboardComponent: loginStatusBehaviorSubjectHandler: data", data);
    };
    DashboardComponent.prototype.cdrBehaviorSubjectHandler = function (data) {
        console.log("DashboardComponent: cdrBehaviorSubjectHandler: data", data);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss'],
        providers: [WebSocketService]
    }),
    __metadata("design:paramtypes", [Router])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=../../../../src/app/dashboard/dashboard.component.js.map