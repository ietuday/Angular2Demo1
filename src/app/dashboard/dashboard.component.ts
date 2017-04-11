import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebSocketService} from '../web-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [WebSocketService]
})
export class DashboardComponent implements OnInit {

  private sessionData: any[] = [];
  private username :string = "";
  private agentStatus :boolean = true;
  constructor(private router: Router) {
    WebSocketService.getInstance().sendMessage({
      action: "registerDashboard",
      message: {},
      status: "Sent"
    });



    WebSocketService.getInstance().sessionDataBehaviorSubject.subscribe(data => this.sessionDataBehaviorSubjectHandler(data));
    WebSocketService.getInstance().loginStatusBehaviorSubject.subscribe(data => this.loginStatusBehaviorSubjectHandler(data));
    WebSocketService.getInstance().cdrDataBehaviorSubject.subscribe(data => this.cdrBehaviorSubjectHandler(data));

  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login']);
  }

  getCdr(){
    WebSocketService.getInstance().sendMessage({
      action: "getCdr",
      message: {
        username : this.username,
        status: this.agentStatus
      },
      status: "Sent"
    });
  }

  sessionDataBehaviorSubjectHandler(data) {
    console.log("DashboardComponent: sessionDataBehaviorSubjectHandler: data", data);
    if (data != undefined) {
      if (data.length >= 0) {
        this.sessionData = data;
      }
      this.username = data.username;
      if(data.available){
        this.agentStatus = true;
      }else{
        this.agentStatus= false;
      }
        // this.getCdr();
    }
  }
  loginStatusBehaviorSubjectHandler(data){
    console.log("DashboardComponent: loginStatusBehaviorSubjectHandler: data", data);
  }

  cdrBehaviorSubjectHandler(data){
    console.log("DashboardComponent: cdrBehaviorSubjectHandler: data", data);
  }

}
