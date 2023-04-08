import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {Observable } from "rxjs";
import { SignInRequest } from "./models/sign-in-request-model";
import { SignInResponse } from "./models/sign-in-response.model";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SingInService{
    url = environment.api_url+'/auth/sign-in';
    constructor(private http: HttpClient){}

    signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
      
        return this.http.post<SignInResponse>(this.url, signInRequest, { headers });
      }
}