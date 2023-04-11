import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

const filiereURL = environment.filieres;

@Injectable({
    providedIn: 'root'
})
export class FiliereService {

    constructor(private apiService: ApiService) {
    }

    addFiliere(body) {
        return this.apiService.post(`${filiereURL}`, body).pipe(map(res => res));
    }

    editFiliere(body, id) {
        return this.apiService.patch(`${filiereURL}/${id}`, body).pipe(map(res => res));
    }

    deleteFiliere(id) {
        return this.apiService.delete(`${filiereURL}`, id).pipe(map(res => res));
    }

    getAllFilieres() {
        return this.apiService.get(`${filiereURL}`).pipe(map(res => res));
    }

    getFiliereById(id) {
        return this.apiService.get(`${filiereURL}/${id}`).pipe(map(res => res));
    }
}
