import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NGXToastrService } from './ngxtoastr.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const remoteAdress = environment.apiUrl;
const apiSTUDENT = remoteAdress + 'students/';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  token: any;
  myToast: any;
  header: any;

  constructor(
    private httpClient: HttpClient,
    private service: NGXToastrService
  ) {
    // this.jwt().subscribe(res => this.header = res);
    // this.jwt();
  }
  public async presentToast(message, color, position) {
    this.service.typeSuccess();
  }
  // jwt() {
  //   return this.storage.get(environment.token).pipe(map(res => {
  //     this.token = res;
  //     if (this.token) {
  //       const headers = new HttpHeaders({ authorization: 'Bearer ' + this.token });
  //       //   console.log(headers);
  //       return { headers };
  //     }
  //   }));

  // }
  public post(url: string, object: any): Observable<any> {
    // console.log(this.header);

    return this.httpClient
      .post<Object>(url, object).pipe(map(res => res), catchError(this.formatErrors));
  }

  public patch(url: string, object: any): Observable<any> {
    return this.httpClient.patch(url, object).pipe(map(res => res), catchError(this.formatErrors));
  }
  public put(url: string, object: any): Observable<any> {
    return this.httpClient.put(url, object).pipe(map(res => res), catchError(this.formatErrors));
  }

  public get(url: string): Observable<any> {
    const headers = new HttpHeaders({ authorization: 'Bearer ' + this.token });
    return this.httpClient.get<Object>(url, { observe: 'response' }).pipe(map(res => res.body), catchError(this.formatErrors));
  }

  public delete(url: string): Observable<any> {
    return this.httpClient.delete(url).pipe(map(res => res), catchError(this.formatErrors));
  }
  private formatErrors(error: HttpErrorResponse) {
    console.log(error);

    return throwError(error.error);

  }


}
