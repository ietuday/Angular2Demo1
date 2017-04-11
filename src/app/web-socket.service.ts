import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/share';

@Injectable()
export class WebSocketService {

    private static _instance: WebSocketService = new WebSocketService();
    private ws: WebSocket;
    private pingInterval: number;
    private messageQueue: Array<string> = new Array();
    private wsCreated: boolean = false;

    // define all your behavioural subjects below this

    public loginStatusBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject('');
    public sessionDataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject('');
    public callDataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject('');
    public cdrDataBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject('');


  constructor() {
      if (WebSocketService._instance) {
            throw new Error("Error: Instantiation failed: Use WebSocketService.getInstance() instead of new.");
        }
        WebSocketService._instance = this;
  }

    public static getInstance(): WebSocketService {
        console.log("WebSocketService: getInstance")
        return WebSocketService._instance;
    }

    public connect() {
        if ("WebSocket" in window) {
            console.log("WebSocket is supported by your Browser!");

        if (!this.wsCreated) {
            console.log("this wsCreated");

            // Let us open a web socket
            var url = ("https:" == document.location.protocol ? "wss://" : "ws://") + (document.location.hostname) + ("" == document.location.port ? "" : ":9000") + "/wsendpoint";
            console.log("ws url", url);
            this.ws = new WebSocket(url);

            this.ws.onopen = () => {
                console.log("Connection opened...");
                this.cleanMessageQueue();
            };

            this.ws.onmessage = (evt) => {
                try {
                    var message = JSON.parse(evt.data);
                    console.log("message", message);
                    if (message.action == 'login') {
                        if (message.status.indexOf('Success') > -1) {
                            this.loginStatusBehaviorSubject.next('Success');
                            //this.sessionDataBehaviorSubject.next(message.data.sessionData);
                           this.sessionDataBehaviorSubject.next(message.message);
                        } else {
                            this.loginStatusBehaviorSubject.next('Failure');
                        }
                    } else if (message.action == 'getDashboard') {
                        this.sessionDataBehaviorSubject.next(message.message);
                    }else if (message.action == 'getCdr') {
                        this.cdrDataBehaviorSubject.next(message.message);
                    }
                } catch (e) {
                    // console.log("Message received... Catch Error", evt.data, "error", e);
                }
            };

            this.ws.onclose = () => {
                // websocket is closed.
                console.log("Connection is closed...");
                clearInterval(this.pingInterval);
            };

            this.wsCreated = true;
        }

        } else {
            // The browser doesn't support WebSocket
            console.log("WebSocket NOT supported by your Browser!");
        }
    }

    public sendMessage(message: any) {
        console.log("Inside sendMessage: message.action", message.action);
        let sendFlag = this.ws === undefined ? false : (this.ws.readyState === 1);
        if (sendFlag) {
            this.ws.send(JSON.stringify(message));
            // this.ws.send(btoa(JSON.stringify(message)));
            console.log("Inside sendMessage: Message ", message);
        } else {
            console.log("Error");

            // Keep Alive Mechanism
            this.messageQueue.push(JSON.stringify(message));
            this.wsCreated = false;
            this.connect();
        }
    }

    // Ping Message Mechanism
    private cleanMessageQueue: any = function () {
        console.log("cleanMessageQueue");
        while (this.messageQueue.length > 0) {
            this.ws.send(this.messageQueue[0]);
            this.messageQueue.shift();
        }
        setInterval(function () {
            console.log("Sending Ping");
            this.ws.send(JSON.stringify({a: 'p'}));
        }, 50000);
    }

}
