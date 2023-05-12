import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {UserService} from '../../../core/user/user.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }
        // // Disable the form
        this.signInForm.disable();
        //
        // // Hide the alert
        this.showAlert = false;
        const body = {
            username: this.signInForm.value.username,
            password: this.signInForm.value.password
        };
        this._authService.signIn(body)
            .subscribe(
                (res) => {
                    this._userService.get().subscribe((user: any) => {
                        console.log(user.roles[0]);
                        if (user.roles[0].roleName === 'ROLE_ADMIN') {
                            this._router.navigateByUrl('/pages/show-users');

                        } else if (user.roles[0].roleName === 'ROLE_AGENT') {
                            this._router.navigateByUrl('pages/show-documents');

                        } else if (user.roles[0].roleName === 'ROLE_RESOPONSABLE' || user.roles[0].roleName === 'ROLE_RESOPONSABLE_CENTRE_ARCHIVE'
                            || user.roles[0].roleName === 'ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE') {
                            this._router.navigateByUrl('pages/consult-documents');

                        }
                    });
                    //
                },
                (response) => {
                    //
                    //             // Re-enable the form
                    this.signInForm.enable();
                    //
                    //             // Reset the form
                    this.signInNgForm.resetForm();
                    //
                    //             // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password'
                    };
                    //
                    //             // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
