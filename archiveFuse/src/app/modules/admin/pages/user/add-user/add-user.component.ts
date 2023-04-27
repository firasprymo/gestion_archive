import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Skills} from '../../../../../shared/model/skills.types';
import {Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {UsersService} from '../../../../../shared/service/users.service';
import {Observable} from 'rxjs';
import {Nomenclature} from '../../../../../shared/model/nomenclature.types';
import {StructureCentral} from '../../../../../shared/model/structure-central.types';
import {DirectionRegional} from '../../../../../shared/model/direction-regional.types';
import {Agence} from '../../../../../shared/model/agence.types';
import {StructureCentralService} from '../../../../../shared/service/structure-central.service';
import {AgenceService} from '../../../../../shared/service/agence.service';
import {DirectionRegionalService} from '../../../../../shared/service/direction-regional.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    structureCentrals$: Observable<StructureCentral[]>;
    directionRegionals$: Observable<DirectionRegional[]>;
    agences$: Observable<Agence[]>;

    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _structureCentralService: StructureCentralService,
                private _agenceService: AgenceService,
                private _directionRegionalService: DirectionRegionalService,
                private _userService: UsersService) {

    }

    ngOnInit(): void {

        // Horizontal stepper form
        this.userForm = this._formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            roleNames: [[''], Validators.required],
            directionRegional: ['',],
            structureCentral: ['',],
            agence: ['',],
        });
        this.structureCentrals$ = this._structureCentralService.structureCentrals$;
        this.agences$ = this._agenceService.agences$;
        this.directionRegionals$ = this._directionRegionalService.directionRegionals$;

    }

    addUser(): void {
        const roles = [];
        roles.push(this.userForm.value.roleNames);
        this.userForm.patchValue({
            roleNames: roles
        });
        this._userService.addUser(this.userForm.value)
            .subscribe((res) => {
                this._router.navigate(['pages/show-users']);
                return res;
            });
    }


    cancelUserForm(): void {
        this.userForm.reset();
    }

}
