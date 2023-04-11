import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const classesURL = environment.classes;

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    constructor(private apiService: ApiService) {
    }

    getAllClasses() {
        return this.apiService.get(classesURL).pipe(map((res: any) => {
            return res;
        }))
    }

    getClassesById(id: number): Observable<any> {
        return this.apiService.get(`${classesURL}/${id}`).pipe(map((res: any) => {
            console.log(res)
            return res;
        }))
    }

    addClasses(body): Observable<any> {
        return this.apiService.post(classesURL, body).pipe(map((res: any) => {
            return res.data;
        }))
    }

    editClasses(body, id): Observable<any> {
        return this.apiService.patch(`${classesURL}/${id}`, body).pipe(map((res: any) => {
            return res.data;
        }))
    }

    deleteClasses(id): Observable<any> {
        return this.apiService.delete(classesURL, id).pipe(map((res: any) => {
            return res;
        }))
    }
}
