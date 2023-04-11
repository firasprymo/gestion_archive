import { Component, OnInit } from '@angular/core';
import {ClassesService} from '../../../../shared/services/classes.service';

@Component({
  selector: 'app-show-classes',
  templateUrl: './show-classes.component.html',
  styleUrls: ['./show-classes.component.scss']
})
export class ShowClassesComponent implements OnInit {
  classes: any = [];

  constructor(private classesService: ClassesService) {
  }

  ngOnInit() {
    this.getAllClassess();
  }

  getAllClassess() {
    this.classesService.getAllClasses().subscribe((res: any) => {
      // console.log(res)
      this.classes = res;
    })
  }

  deleteClasses(id: number) {
    this.classesService.deleteClasses(id).subscribe(res => {
      return res;
    });
  }
}
