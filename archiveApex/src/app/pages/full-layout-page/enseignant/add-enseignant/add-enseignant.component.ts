import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {FiliereService} from '../../../../shared/services/filiere.service';

@Component({
    selector: 'app-add-enseignant',
    templateUrl: './add-enseignant.component.html',
    styleUrls: ['./add-enseignant.component.scss']
})
export class AddEnseignantComponent implements OnInit {
    idTeacher: number;
    regularForm: FormGroup;

    filieres = [];

    constructor(private teacherService: TeacherService,
                private active: ActivatedRoute,
                private filiereService: FiliereService,
                private router: Router) {
    }

    ngOnInit() {
        forkJoin([this.filiereService.getAllFilieres()
        ]).subscribe(results => {
            this.filieres = results[0];
        }, error => {
            console.log(error)
        });

        this.active.params.subscribe((res: any) => {
            // console.log(res.id);
            if (res.id) {
                this.idTeacher = res.id;
                this.getTeacherById(res.id);
            }
        })
        this.regularForm = new FormGroup({
            'name': new FormControl(null),
            'lastName': new FormControl(null, [Validators.required]),
            'firstName': new FormControl(null, [Validators.required]),
            'filiere': new FormControl(null, [Validators.required])
        });
    }

    addTeacher() {
        this.regularForm.controls.name.patchValue(this.regularForm.controls.firstName.value + ' ' + this.regularForm.controls.lastName.value)

        this.teacherService.addTeacher(this.regularForm.value).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/enseignant/show-enseignant');
        })
    }

    editTeacher() {
        this.regularForm.controls.name.patchValue(this.regularForm.controls.firstName.value + ' ' + this.regularForm.controls.lastName.value)

        this.teacherService.editTeacher(this.regularForm.value, this.idTeacher).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/teacher/show-teacher');
        })
    }

    getTeacherById(id) {
        console.log(id)
        this.teacherService.getTeacherById(id).subscribe(res => {
            console.log(res);
            this.regularForm.controls.firstName.setValue(res.name.split(' ')[0]);
            console.log(res.filiere.name)
            this.regularForm.controls.filiere.setValue(res.filiere);
            this.regularForm.controls.lastName.setValue(res.name.split(' ')[1]);
        })
    }

}
