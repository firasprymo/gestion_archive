import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    sessionStorage.removeItem('isConnected');
    sessionStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
  isConnected(): boolean{
    return sessionStorage.getItem('isConnected') === 'true';
  }

}
