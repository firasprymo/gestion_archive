import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Skills} from '../../../../../shared/model/skills.types';
import {Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {UsersService} from '../../../../../shared/service/users.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _userService: UsersService) {

    }

    ngOnInit(): void {

        // Horizontal stepper form
        this.userForm = this._formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            roleNames: [[''], Validators.required],
            lieuAffectation: ['', Validators.required],
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

}
