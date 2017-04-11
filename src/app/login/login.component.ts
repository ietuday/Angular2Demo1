import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebSocketService} from '../web-socket.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [WebSocketService]
})
export class LoginComponent implements OnInit {

    private username: string = "";

    constructor(private router: Router) {
        WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data => this.loginStatusBehaviorSubjectHandler(data));
    }

    ngOnInit() {
        console.log("Inside LoginComponent");
    }

    login() {
        WebSocketService.getInstance().sendMessage({
            action: "login",
            message: {
                "username": this.username
            },
            status: "Sent"
        });
    }

    dashboard() {
        this.router.navigate(['/dashboard']);
    }

    loginStatusBehaviorSubjectHandler(data) {
        console.log("LoginComponent: loginStatusBehaviorSubjectHandler: data", data);
        if (data != undefined) {
            if (data != '') {
                if (data == 'Success') {
                    WebSocketService.getInstance().loginStatusBehaviorSubject.next('');
                    this.router.navigate(['/call']);                    
                } else {
                    alert("Login failed");
                }
            }
        }
    }

}
