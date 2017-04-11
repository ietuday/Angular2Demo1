import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {WebSocketService} from '../web-socket.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  private status : string = 'Available';
  private username : string = '';


  constructor(private router: Router) {
    WebSocketService.getInstance().sessionDataBehaviorSubject.subscribe(data => this.sessionDataBehaviorSubject(data));
  }

  ngOnInit() {
  }

  submitStatus(){
    console.log("Inside AgentAssistLoginComponent : statusUpdate",this.username);
    console.log("######stausavailable ",this.status);
    if(this.username!= undefined){
      WebSocketService.getInstance().sendMessage({
        action: "toggleStatus",
        status: this.status,
        username: this.username
      });
    }

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
    WebSocketService.getInstance().sendMessage({
      action: "logout",
      message: {},
      status: "Sent"
    });
  }

  sessionDataBehaviorSubject(data){
    if(data != undefined){
      console.log("In Call Component ::  sessionDataBehaviorSubject", data);
      this.username = data.username;
    }
  }
}
