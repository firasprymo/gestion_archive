import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

const salleURL = environment.salles;

@Injectable({
    providedIn: 'root'
})
export class SalleService {

    constructor(private apiService: ApiService) {
    }

    addSalle(body) {
        console.log(body);
        return this.apiService.post(`${salleURL}`, body).pipe(map(res => res));
    }

    deleteSalle(id) {
        return this.apiService.delete(`${salleURL}/`, id).pipe(map(res => res));
    }

    getAllSalles() {
        return this.apiService.get(`${salleURL}`).pipe(map(res => res));
    }
}
