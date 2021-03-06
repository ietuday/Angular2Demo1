import { Component } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [WebSocketService]
})
export class AppComponent {
    title = 'app works!';

    constructor() {
        console.log('Inside AppComponent from constructor');
        sessionStorage.clear();
        WebSocketService.getInstance().connect();
    }
}
