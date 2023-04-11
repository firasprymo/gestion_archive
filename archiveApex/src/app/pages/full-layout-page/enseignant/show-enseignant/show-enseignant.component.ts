import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../../../shared/services/teacher.service';

@Component({
    selector: 'app-show-enseignant',
    templateUrl: './show-enseignant.component.html',
    styleUrls: ['./show-enseignant.component.scss']
})
export class ShowEnseignantComponent implements OnInit {
    teachers: any = [];

    constructor(private teachersService: TeacherService) {
    }

    ngOnInit() {
        this.getAllTeachers();
    }

    getAllTeachers() {
        this.teachersService.getAllTeachers().subscribe((res: any) => {
            // console.log(res)
            this.teachers = res;
        })
    }

    deleteTeacher(id: number) {
        this.teachers = [];
        this.teachersService.deleteTeacher(id).subscribe(res => {
            this.getAllTeachers();
            return res;
        });
    }

}
