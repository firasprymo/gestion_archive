import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FiliereService} from '../../../../shared/services/filiere.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-add-filiere',
    templateUrl: './add-filiere.component.html',
    styleUrls: ['./add-filiere.component.scss']
})
export class AddFiliereComponent implements OnInit {
    regularForm: FormGroup;
    idFiliere = 0;

    constructor(private filiereService: FiliereService,
                private active: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.active.params.subscribe(res => {
            if (res.id) {
                this.getFiliereById(res.id);
                this.idFiliere = res.id;
            }
        })
        this.regularForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
        });
    }

    addFiliere() {
        this.filiereService.addFiliere(this.regularForm.value).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/show-filieres');
        })
    }

    editFiliere() {
        this.filiereService.editFiliere(this.regularForm.value, this.idFiliere).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/show-filieres');
        })
    }

    getFiliereById(id) {
        this.filiereService.getFiliereById(id).subscribe(res => {
            console.log(res);
            this.regularForm.controls.name.setValue(res.name);
        })
    }

}
