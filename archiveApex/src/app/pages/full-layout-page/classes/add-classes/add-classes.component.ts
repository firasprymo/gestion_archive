import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassesService} from '../../../../shared/services/classes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {FiliereService} from '../../../../shared/services/filiere.service';

@Component({
    selector: 'app-add-classes',
    templateUrl: './add-classes.component.html',
    styleUrls: ['./add-classes.component.scss']
})
export class AddClassesComponent implements OnInit {
    idClass: number;
    regularForm: FormGroup;

    constructor(private classesService: ClassesService,
                private active: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.active.params.subscribe((res: any) => {
            // console.log(res.id);
            if (res.id) {
                this.idClass = res.id;
                this.getClassesById(res.id);
            }
        })

        this.regularForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),

        });
    }

    addClasses() {
        this.classesService.addClasses(this.regularForm.value).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/classes/show-classes');
        })
    }

    editClasses() {
        this.classesService.editClasses(this.regularForm.value, this.idClass).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/classes/show-classes');
        })
    }

    getClassesById(id) {
        console.log(id)
        this.classesService.getClassesById(id).subscribe(res => {
            console.log(res);
            this.regularForm.controls.name.setValue(res.name);
        })
    }

}
