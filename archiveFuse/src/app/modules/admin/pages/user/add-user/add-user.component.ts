import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../../../../shared/service/users.service';
import {Observable} from 'rxjs';
import {StructureCentral} from '../../../../../shared/model/structure-central.types';
import {DirectionRegional} from '../../../../../shared/model/direction-regional.types';
import {Agence} from '../../../../../shared/model/agence.types';
import {StructureCentralService} from '../../../../../shared/service/structure-central.service';
import {AgenceService} from '../../../../../shared/service/agence.service';
import {DirectionRegionalService} from '../../../../../shared/service/direction-regional.service';
import {Users} from '../../../../../shared/model/users.types';

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
    isUpdate = false;
    user: Users;
    roles: any =
        [
            {
                roleName: 'ROLE_AGENT',
                value: 'AGENT'
            },
            {
                roleName: 'ROLE_ADMIN',
                value: 'Admin'
            },
            {
                roleName: 'ROLE_RESOPONSABLE',
                value: 'RESPONSABLE'
            },
            {
                roleName: 'ROLE_RESOPONSABLE_CENTRE_ARCHIVE',
                value: 'RESOPONSABLE CENTRE ARCHIVE'
            },
            {
                roleName: 'ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE',
                value: 'RESOPONSABLE CENTRE PRE ARCHIVE'
            },
        ];
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
            roles: [[''], Validators.required],
            directionRegional: [null],
            structureCentral: [null],
            agence: [null],
        });
        this.structureCentrals$ = this._structureCentralService.structureCentrals$;
        this.agences$ = this._agenceService.agences$;
        this.directionRegionals$ = this._directionRegionalService.directionRegionals$;
        this._userService.user$.subscribe((res: any) => {
            console.log(res);
            if (res) {
                this.user = res.id;
                this.isUpdate = true;
                this.userForm.patchValue({
                    id: res.id,
                    username: res.username,
                    structureCentral: res.structureCentral,
                    agence: res.agence,
                    directionRegional: res.directionRegional,
                    email: res.email,
                });
            }
        });

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

    updateUser(): void {
        console.log(this.userForm.value)
        this._userService.editUser(this.userForm.value, this.user)
            .subscribe((res) => {
                this._router.navigate(['pages/show-users']);
                return res;
            });

    }
}
