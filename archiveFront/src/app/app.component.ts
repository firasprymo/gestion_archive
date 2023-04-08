import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  isConnectedAdmin(): boolean{
    return (sessionStorage.getItem('isConnected') === 'true' && sessionStorage.getItem('role') === 'ROLE_ADMIN');
  }
  isConnectedUser(): boolean{
    return (sessionStorage.getItem('isConnected') === 'true' && sessionStorage.getItem('role') === 'ROLE_AGENT');
  }
  isConnectedResponsable(): boolean{
    return (sessionStorage.getItem('isConnected') === 'true' && sessionStorage.getItem('role') === 'ROLE_RESPONSABLE');
  }
  isConnected(): boolean{
    return (sessionStorage.getItem('isConnected')==='true')
  }

}
