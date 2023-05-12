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
import {CentreArchive} from '../../../../../shared/model/centre-archive.types';
import {CentrePreArchive} from '../../../../../shared/model/centre-pre-archive.types';
import {CentreArchiveService} from '../../../../../shared/service/centre-archive.service';
import {CentrePreArchiveService} from '../../../../../shared/service/centre-pre-archive.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    structureCentrals$: Observable<StructureCentral[]>;
    directionRegionals$: Observable<DirectionRegional[]>;
    centreArchive$: Observable<CentreArchive[]>;
    centrePreArchive$: Observable<CentrePreArchive[]>;
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
                private _centreArchiveService: CentreArchiveService,
                private _centrePreArchiveService: CentrePreArchiveService,
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
            centreArchive: [null],
            centrePreArchive: [null],
        });
        this.structureCentrals$ = this._structureCentralService.structureCentrals$;
        this.agences$ = this._agenceService.agences$;
        this.directionRegionals$ = this._directionRegionalService.directionRegionals$;
        this.centreArchive$ = this._centreArchiveService.centreArchives$;
        this.centrePreArchive$ = this._centrePreArchiveService.centrePreArchives$;
        this._userService.user$.subscribe((res: any) => {
            if (res) {
                this.user = res.id;
                this.isUpdate = true;
                this.userForm.patchValue({
                    id: res.id,
                    username: res.username,
                    structureCentral: res.structureCentral,
                    agence: res.agence,
                    directionRegional: res.directionRegional,
                    centreArchive: res.centreArchive,
                    centrePreArchive: res.centrePreArchive,
                    email: res.email,
                    roles: res.roles[0].roleName,
                });
            }
        });

    }

    addUser(): void {
        const roles = [];
        roles.push(this.userForm.value.roleNames);

        this.userForm.patchValue({
            id: this.userForm.value.id,
            username: this.userForm.value.username,
            structureCentral: this.userForm.value.structureCentral?.id,
            agence: this.userForm.value.agence?.id,
            directionRegional: this.userForm.value.directionRegional?.id,
            centreArchive: this.userForm.value.centreArchive?.id,
            centrePreArchive: this.userForm.value.centrePreArchive?.id,
            roles: this.userForm.value.roles,
            email: this.userForm.value.email,
        });

        this._userService.addUser(this.userForm.value)
            .subscribe((res) => {
                this._router.navigate(['pages/show-users']);
                return res;
            }, (err) => {
                if (err?.error?.message.includes('Username already exists')) {
                    this.userForm.get('username').setErrors({duplicateUsername: true});

                }
            });
    }
    cancelUserForm(): void {
        this.userForm.reset();
    }

    updateUser(): void {
        console.log(this.userForm.value);
        this.userForm.patchValue({
            id: this.userForm.value.id,
            username: this.userForm.value.username,
            structureCentral: this.userForm.value.structureCentral?.id,
            agence: this.userForm.value.agence?.id,
            directionRegional: this.userForm.value.directionRegional?.id,
            centreArchive: this.userForm.value.centreArchive?.id,
            centrePreArchive: this.userForm.value.centrePreArchive?.id,
            roles: this.userForm.value.roles,
            email: this.userForm.value.email,
        });

        this._userService.editUser(this.userForm.value, this.user)
            .subscribe((res) => {
                this._router.navigate(['pages/show-users']);
                return res;
            });

    }
}
