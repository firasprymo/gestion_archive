import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../../../shared/services/api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User = new User();
    users: any = [];
    rememberMe = '';
    error: string;
    souvien = false;
    description: string;
    color: string;
    formLogin: FormGroup;

    constructor(private router: Router,
                private authServ: AuthService,
                private apiSer: ApiService,
                private fb: FormBuilder,
                public toastr: ToastrService,
                private http: HttpClient,
                private activeroute: ActivatedRoute) {
        this.users = localStorage.getItem(environment.email)
        //    if( localStorage.getItem(environment.email)) this.souvien=true
        if (this.users) {

            this.souvien = true
            this.user.email = this.users
        }
    }

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            email: [null],
            password: [null],
            souvien: [null]
        });
    }

    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], {relativeTo: this.activeroute.parent});
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], {relativeTo: this.activeroute.parent});
    }

    onLogin() {
        this.user.email = this.formLogin.controls.email.value;
        this.user.password = this.formLogin.controls.password.value;
        this.authServ.login(this.user).subscribe(data => {
            console.log(data)

            if (this.souvien) {
                localStorage.setItem(environment.email, this.user.email)
            }

            if (data.data.user.role === 'user') {
                this.error = 'Bien!';
                this.color = 'info';
                this.description = 'Bienvenue';
                this.typeSuccess('Bienvenue ' + data.data.user.name);
                this.router.navigateByUrl('/show-salle');
            } else {
                this.typeError('Vous n\'avez  pas les droits d\'accés');
            }

        }, err => {
            console.log(err)
            this.typeError(err);
            this.error = err.error.status + '! ';
            this.color = 'danger';
            this.description = err.error.message;
        });


    }

    // Close Alert on close icon click
    typeError(message) {
        return this.toastr.error(message);
    }

    typeSuccess(message) {

        return this.toastr.success(message);


    }
}
