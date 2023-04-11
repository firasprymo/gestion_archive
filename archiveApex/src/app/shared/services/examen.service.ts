import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {environment} from '../../../environments/environment';

const examenURL = environment.examens;

@Injectable({
    providedIn: 'root'
})
export class ExamenService {

    constructor(private apiService: ApiService) {
    }

    getAllExamens() {
        return this.apiService.get(examenURL).pipe(map((res: any) => {
            return res;
        }))
    }

    getExamenById(id) {
        return this.apiService.get(`${examenURL}/${id}`).pipe(map((res: any) => {
            return res;
        }))
    }

    getExamenByDate(body) {
        return this.apiService.post(`${examenURL}/get-examens-by-date`, body).pipe(map((res: any) => {
            return res;
        }))
    }

    addExamen(body): Observable<any> {
        console.log(body)
        return this.apiService.post(examenURL, body).pipe(map((res: any) => {
            return res.data;
        }))
    }

    editExamen(body, id): Observable<any> {
        console.log(body)
        return this.apiService.patch(examenURL + '/' + id, body).pipe(map((res: any) => {
            return res;
        }))
    }

    deleteExamen(id): Observable<any> {
        return this.apiService.delete(examenURL, id).pipe(map((res: any) => {
            return res;
        }))
    }
}
