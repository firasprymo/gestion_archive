import { Component, OnInit } from '@angular/core';
import { DirectionRegional } from '../auth/models/direction-regional-model';
import { DirectionRegionalService } from '../service/direction-regional.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentRoute = 'home'; 


  constructor(private directionRegionalService: DirectionRegionalService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDirectionRegionals();
    this.activatedRoute.url.subscribe(url => {
      this.currentRoute = url[0].path;
    });

    
  }
  directionRegionals: DirectionRegional[] = [];




  getDirectionRegionals(): void {
    this.directionRegionalService
      .getAllDirectionRegional()
      .subscribe((data: DirectionRegional[]) => {
        this.directionRegionals = data;
      });
  }
}
