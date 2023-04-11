import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {SalleService} from '../../../../shared/services/salle.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-salle',
    templateUrl: './add-salle.component.html',
    styleUrls: ['./add-salle.component.scss']
})
export class AddSalleComponent implements OnInit {
    salleForm: FormGroup;
    types = [{
        type: 'Amphi'
    }, {
        type: 'Salle'
    }]

    constructor(private salleService: SalleService,
                private router: Router) {
    }

    ngOnInit() {
        this.salleForm = new FormGroup({
            number: new FormControl(null, [Validators.required]),
            type: new FormControl(null, [Validators.required]),
        });
    }


    onAddSalle() {
        this.salleService.addSalle(this.salleForm.value).subscribe(res => {
            console.log(res)
            this.router.navigateByUrl('/show-salle');
        })
    }
}
