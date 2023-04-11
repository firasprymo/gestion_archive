import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(private http: HttpClient, private route: Router,
                private toastr: ToastrService) {
    }


    /**
     * @param url
     * @param entities
     */
    get(url: string) {

        return this.http.get(environment.apiUrl + url)
            .pipe(map((res: any) => {
                    console.log(url)
                    console.log(res)
                    return res.data.data;
                }
                , err => this.handleError));

    }

    public getData(entities: string) {

        return this.http.get(environment.apiUrl + entities)
            .pipe(map((res: any) => {
                // console.log(res);

                return res.data;
            }, err => {
                console.log(err.error.message);

            }));
    }

    /**
     *
     * @param url string
     * @param entities string
     * @param id number
     * @param entity object
     */
    put(url: string, entities: string, id: number) {

        return this.http.put(environment.apiUrl + url + id, entities)
            .pipe(map((res: any) => {
                return res.data;
            }, err => {
                console.log(err);

            }));
    }

    patchData(url: string, entities: any, id: number) {

        return this.http.patch(environment.apiUrl + url + id, entities)
            .pipe(map((res: any) => {
                return res;
            }, err => {
                console.log(err);

            }));
    }

    patch(url: string, entities: any) {
        console.log(entities);

        return this.http.patch(environment.apiUrl + url, entities)
            .pipe(map((res: any) => {
                // console.log(res)
                return res;
            }, err => {
                console.log(err);

            }));
    }

    /**
     *
     * @param url string
     */
    delete(url: string, id: string) {

        return this.http.delete(environment.apiUrl + url + '/' + id)
            .pipe(map((res: any) => {
                // console.log(res);

                return res;
            }, err => {
                console.log(err);

            }));
    }

    /**
     * @param url string
     * @param entities string
     * @param entity object
     */

    post(url, entity) {
        console.log(entity);

        return this.http.post(environment.apiUrl + url, entity).pipe(map((res: any) => {
            return res;
        }));
    }

    postData(url: string, entity: any) {

        return this.http.post(environment.apiUrl + url, entity)
            .pipe(map((res: any) => {
                return res;
            }, err => {

                console.log(err);

            }));
    }


    /**
     *
     * @param error Response or any
     */
    handleError(error: Response | any) {
        console.log(error)
        console.error(error.message || error);
        return Observable.throw(error);
    }

    private jwt() {
        const token = localStorage.getItem(environment.TOKEN);
        if (token) {
            const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
            //   console.log(headers);
            return ({headers: headers});
        }
    }

    typeError(message) {
        this.toastr.error(message);
    }
}
