import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInRequest } from '../models/sign-in-request-model';
import { SignInResponse } from '../models/sign-in-response.model';
import { SingInService } from '../sign-in.service';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../models/decoded-token-model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    password: new FormControl('',[Validators.required, Validators.maxLength(50)])
  })
  constructor(private signInService : SingInService, private router: Router) {}

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.signInForm.valid) {
      const value = this.signInForm.value;
      this.signInService.signIn(value as SignInRequest).subscribe({
        next: (res: SignInResponse )=> {
          sessionStorage.setItem('isConnected', 'true');
          sessionStorage.setItem('token', res.accessToken);
          const decodedToken = jwt_decode(res.accessToken) as DecodedToken;;
          const scope = decodedToken.scope;
          sessionStorage.setItem('role', scope);
          if(scope ==='ROLE_ADMIN'){
          this.router.navigate(['/']); // Navigate to the home page after successful login
          }else if(scope === "ROLE_USER"){
            this.router.navigate(['user-front']);
          }
        },
        error: error => {
          console.error('Error:', error); // Log any errors
          sessionStorage.setItem('isConnected', 'false');
        }
      });
    }
  }
}
